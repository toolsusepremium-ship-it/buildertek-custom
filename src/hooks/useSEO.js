import { useEffect } from 'react'

// Apex (buildertek.com) 308-redirects to www, so www is the canonical host.
const CANONICAL_ORIGIN = 'https://www.buildertek.com'

function upsertMeta(name, content) {
  if (!content) return
  let tag = document.querySelector(`meta[name="${name}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute('name', name)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

export function useSEO({ title, description, keywords, canonical }) {
  useEffect(() => {
    document.title = title

    upsertMeta('description', description)
    upsertMeta('keywords', keywords)

    // Self-referencing canonical per route — without this every SPA route
    // would be crawled without one, and the apex/www split can look duplicated.
    const path = canonical || window.location.pathname
    const href = CANONICAL_ORIGIN + (path === '/' ? '/' : path.replace(/\/$/, ''))

    let link = document.querySelector('link[rel="canonical"]')
    if (!link) {
      link = document.createElement('link')
      link.setAttribute('rel', 'canonical')
      document.head.appendChild(link)
    }
    link.setAttribute('href', href)
  }, [title, description, keywords, canonical])
}
