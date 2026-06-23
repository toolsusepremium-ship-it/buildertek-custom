import { client } from './sanityClient'

const formatDate = (iso) => {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

const blogFields = `
  "id": _id,
  "slug": slug.current,
  category,
  title,
  excerpt,
  "rawDate": coalesce(publishedAt, _createdAt),
  readTime,
  "image": image.asset->url,
  content
`

const mapBlog = (b) => b ? { ...b, date: formatDate(b.rawDate) } : b

export async function getAllBlogs() {
  const data = await client.fetch(`*[_type == "blogPost"] | order(publishedAt desc) { ${blogFields} }`)
  return data?.map(mapBlog)
}

export async function getBlogBySlug(slug) {
  const data = await client.fetch(
    `*[_type == "blogPost" && slug.current == $slug][0] { ${blogFields} }`,
    { slug }
  )
  return mapBlog(data)
}

export async function getCategories() {
  return client.fetch(`array::unique(*[_type == "blogPost"].category)`)
}
