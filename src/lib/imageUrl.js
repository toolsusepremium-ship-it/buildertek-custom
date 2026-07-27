// Sanity's CDN can resize/re-encode on the fly. Asset URLs come back at full
// original resolution, so always request a width and let it pick WebP/AVIF.
export const cdnImage = (url, width = 800, quality = 72) => {
  if (!url || typeof url !== 'string') return url
  if (!url.includes('cdn.sanity.io')) return url
  const sep = url.includes('?') ? '&' : '?'
  return `${url}${sep}w=${width}&q=${quality}&auto=format&fit=max`
}
