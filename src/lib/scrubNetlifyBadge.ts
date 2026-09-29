/**
 * Free-tier Netlify injects `/.netlify/scripts/hud`, which mounts
 * `#nl-badge-frame` (“Powered by Netlify”). Paid plans can toggle it off;
 * free plans often cannot. Remove the badge DOM whenever it appears.
 */
const NETLIFY_BADGE_SELECTOR = [
  '#nl-badge-frame',
  '.nl-badge',
  'iframe#nl-badge-frame',
  'iframe[id*="nl-badge"]',
  'iframe[src*="netlify"][src*="badge"]',
  'script[src*="/.netlify/scripts/hud"]',
  'script[data-nf-variant]',
  'script[data-netlify-site-id]',
].join(',')

export function removeNetlifyBadgeNodes(root: ParentNode = document): number {
  const nodes = root.querySelectorAll(NETLIFY_BADGE_SELECTOR)
  nodes.forEach((el) => el.remove())
  return nodes.length
}

/** Scrub once and keep scrubbing if Netlify re-injects the badge later. */
export function scrubNetlifyBadge(): () => void {
  if (typeof document === 'undefined') return () => {}

  removeNetlifyBadgeNodes()

  if (typeof MutationObserver !== 'function') return () => {}

  const observer = new MutationObserver(() => {
    removeNetlifyBadgeNodes()
  })
  observer.observe(document.documentElement, { childList: true, subtree: true })
  return () => observer.disconnect()
}
