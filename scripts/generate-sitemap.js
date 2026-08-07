// Regenerates public/sitemap.xml from the static route list + live Sanity blog posts.
// Run with:  node scripts/generate-sitemap.js
// Blog posts are CMS-driven, so re-run this after publishing new posts.

import { writeFileSync } from 'node:fs'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')

// Apex 308-redirects to www — sitemaps must list the post-redirect URL.
const ORIGIN = 'https://www.buildertek.com'

// /thank-you is intentionally excluded (post-conversion page, not for indexing).
const STATIC_ROUTES = [
  ['/', 'weekly', '1.0'],
  ['/about', 'monthly', '0.7'],
  ['/contact', 'monthly', '0.9'],
  ['/services', 'monthly', '0.9'],
  ['/services/finance', 'monthly', '0.8'],
  ['/services/construction', 'monthly', '0.8'],
  ['/services/crm-management', 'monthly', '0.8'],
  ['/services/realty-management', 'monthly', '0.8'],
  ['/services/resource-management', 'monthly', '0.8'],
  ['/solutions/rfq', 'monthly', '0.8'],
  ['/solutions/quote', 'monthly', '0.8'],
  ['/solutions/contract', 'monthly', '0.8'],
  ['/solutions/budgets', 'monthly', '0.8'],
  ['/solutions/schedule', 'monthly', '0.8'],
  ['/who-we-serve', 'monthly', '0.8'],
  ['/serve/general-contractors', 'monthly', '0.7'],
  ['/serve/residential-builders', 'monthly', '0.7'],
  ['/serve/remodelers', 'monthly', '0.7'],
  ['/serve/specialty-contractors', 'monthly', '0.7'],
  ['/serve/developers', 'monthly', '0.7'],
  ['/blogs', 'weekly', '0.7'],
]

function readEnv() {
  const env = {}
  try {
    for (const line of readFileSync(resolve(ROOT, '.env'), 'utf8').split('\n')) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
      if (m) env[m[1]] = m[2].trim()
    }
  } catch { /* .env is optional — falls back to static routes only */ }
  return env
}

async function fetchBlogSlugs() {
  const env = readEnv()
  const projectId = process.env.VITE_SANITY_PROJECT_ID || env.VITE_SANITY_PROJECT_ID
  const dataset = process.env.VITE_SANITY_DATASET || env.VITE_SANITY_DATASET || 'production'
  if (!projectId) {
    console.warn('! No VITE_SANITY_PROJECT_ID — writing sitemap without blog posts.')
    return []
  }

  const groq = '*[_type=="blogPost" && defined(slug.current)]{"slug":slug.current,"date":coalesce(publishedAt,_createdAt)}|order(date desc)'
  const url = `https://${projectId}.apicdn.sanity.io/v2024-01-01/data/query/${dataset}?query=${encodeURIComponent(groq)}`

  const res = await fetch(url)
  if (!res.ok) throw new Error(`Sanity query failed: ${res.status}`)
  const { result } = await res.json()
  return result || []
}

const day = (iso) => (iso ? new Date(iso) : new Date()).toISOString().slice(0, 10)

const urlTag = (loc, lastmod, changefreq, priority) =>
  `  <url><loc>${ORIGIN}${loc}</loc><lastmod>${lastmod}</lastmod>` +
  `<changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`

const today = day()
const posts = await fetchBlogSlugs()

const body = [
  ...STATIC_ROUTES.map(([path, freq, pri]) => urlTag(path, today, freq, pri)),
  ...posts.map((p) => urlTag(`/blog/${p.slug}`, day(p.date), 'monthly', '0.6')),
].join('\n')

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`

writeFileSync(resolve(ROOT, 'public/sitemap.xml'), xml)
console.log(`✓ public/sitemap.xml — ${STATIC_ROUTES.length} static + ${posts.length} blog URLs`)
