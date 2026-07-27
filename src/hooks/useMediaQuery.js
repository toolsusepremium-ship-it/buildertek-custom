import { useCallback, useSyncExternalStore } from 'react'

// Shared matchMedia store. Reading `window.innerWidth` during render forces the
// browser to flush style + layout (the "forced reflow" PageSpeed flags); a media
// query list is precomputed by the browser and costs nothing to read. One
// MediaQueryList per unique query is shared across every component that asks.
const cache = new Map()

const getList = (query) => {
  if (typeof window === 'undefined' || !window.matchMedia) return null
  let mql = cache.get(query)
  if (!mql) {
    mql = window.matchMedia(query)
    cache.set(query, mql)
  }
  return mql
}

export function useMediaQuery(query) {
  // Stable identities, otherwise React tears down and re-subscribes every render.
  const subscribe = useCallback((onChange) => {
    const mql = getList(query)
    if (!mql) return () => {}
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])
  const getSnapshot = useCallback(() => getList(query)?.matches ?? false, [query])
  return useSyncExternalStore(subscribe, getSnapshot, () => false)
}

export const useIsMobile = () => useMediaQuery('(max-width: 767px)')
export const useIsTablet = () => useMediaQuery('(max-width: 1023px)')
export const useIsDesktop = () => useMediaQuery('(min-width: 769px)')
