import { client } from './sanityClient'

const blogFields = `
  "id": _id,
  "slug": slug.current,
  category,
  title,
  excerpt,
  "date": coalesce(
    dateTime(publishedAt),
    dateTime(_createdAt)
  ),
  readTime,
  "image": image.asset->url,
  content
`

export async function getAllBlogs() {
  return client.fetch(`*[_type == "blogPost"] | order(publishedAt desc) { ${blogFields} }`)
}

export async function getBlogBySlug(slug) {
  return client.fetch(
    `*[_type == "blogPost" && slug.current == $slug][0] { ${blogFields} }`,
    { slug }
  )
}

export async function getCategories() {
  return client.fetch(`array::unique(*[_type == "blogPost"].category)`)
}
