import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const TOKEN = process.argv[2]
if (!TOKEN) {
  console.error('Usage: node scripts/migrate-blogs.js <your-sanity-token>')
  process.exit(1)
}

const client = createClient({
  projectId: '9ntsd3jl',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: TOKEN,
  useCdn: false,
})

const blogsData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../src/data/blogs.json'), 'utf-8')
)

function mapBlock(block, i) {
  const key = `block_${i}`
  switch (block.type) {
    case 'paragraph': return { _type: 'paragraph', _key: key, type: 'paragraph', text: block.text }
    case 'h3':        return { _type: 'heading3',  _key: key, type: 'h3',        text: block.text }
    case 'h4':        return { _type: 'heading4',  _key: key, type: 'h4',        text: block.text }
    case 'list':      return { _type: 'bulletList', _key: key, type: 'list',     items: block.items }
    case 'quote':     return { _type: 'quote',     _key: key, type: 'quote',     text: block.text }
    default: return null
  }
}

async function uploadImage(relPath) {
  const fullPath = path.join(__dirname, '../public', relPath)
  const asset = await client.assets.upload('image', fs.createReadStream(fullPath), {
    filename: path.basename(relPath),
    contentType: 'image/png',
  })
  return asset._id
}

async function run() {
  for (const blog of blogsData.blogs) {
    // Skip if already in Sanity
    const existing = await client.fetch(
      `*[_type == "blogPost" && slug.current == $slug][0]._id`,
      { slug: blog.slug }
    )
    if (existing) {
      console.log(`⏭  Skipping (already exists): ${blog.title}`)
      continue
    }

    console.log(`\n📝 Migrating: ${blog.title}`)

    const imageAssetId = await uploadImage(blog.image)
    console.log(`   ✓ Image uploaded`)

    const doc = {
      _type: 'blogPost',
      title: blog.title,
      slug: { _type: 'slug', current: blog.slug },
      category: blog.category,
      excerpt: blog.excerpt,
      publishedAt: new Date(blog.date).toISOString(),
      readTime: blog.readTime,
      image: {
        _type: 'image',
        asset: { _type: 'reference', _ref: imageAssetId },
      },
      content: blog.content.map(mapBlock).filter(Boolean),
    }

    const created = await client.create(doc)
    console.log(`   ✓ Published: ${created._id}`)
  }

  console.log('\n✅ Migration complete!')
}

run().catch((err) => {
  console.error('Migration failed:', err.message)
  process.exit(1)
})
