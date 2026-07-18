type NetworkInformationLike = {
  saveData?: boolean
  effectiveType?: string
}

function readConnection(): NetworkInformationLike | undefined {
  if (typeof navigator === 'undefined') return undefined
  return (navigator as Navigator & { connection?: NetworkInformationLike }).connection
}

/**
 * Decide whether to download the hero video. Poster always renders for LCP;
 * video is skipped on reduced-motion, Save-Data, slow networks, and narrow
 * viewports where the cinematic loop is less valuable than bandwidth.
 */
export function shouldLoadHeroVideo(): boolean {
  if (typeof window === 'undefined') return false

  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return false
    }
  } catch {
    // matchMedia may be unavailable in some test environments
  }

  const connection = readConnection()
  if (connection?.saveData) return false
  if (connection?.effectiveType === 'slow-2g' || connection?.effectiveType === '2g') {
    return false
  }

  try {
    if (window.matchMedia('(max-width: 720px)').matches) {
      return false
    }
  } catch {
    // ignore
  }

  return true
}
