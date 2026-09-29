import { describe, expect, it, afterEach } from 'vitest'
import { removeNetlifyBadgeNodes, scrubNetlifyBadge } from './scrubNetlifyBadge'

describe('scrubNetlifyBadge', () => {
  afterEach(() => {
    document.body.innerHTML = ''
    document.head.querySelectorAll('script[data-nf-variant]').forEach((el) => el.remove())
  })

  it('removes the Netlify HUD badge iframe and script', () => {
    const iframe = document.createElement('iframe')
    iframe.id = 'nl-badge-frame'
    document.body.appendChild(iframe)

    const script = document.createElement('script')
    script.setAttribute('data-nf-variant', 'public')
    script.setAttribute('data-netlify-site-id', 'test')
    script.src = '/.netlify/scripts/hud?variant=public'
    document.body.appendChild(script)

    expect(document.getElementById('nl-badge-frame')).not.toBeNull()
    expect(removeNetlifyBadgeNodes()).toBeGreaterThanOrEqual(2)
    expect(document.getElementById('nl-badge-frame')).toBeNull()
    expect(document.querySelector('script[data-nf-variant]')).toBeNull()
  })

  it('keeps scrubbing when the badge is re-injected', () => {
    const stop = scrubNetlifyBadge()
    const iframe = document.createElement('iframe')
    iframe.id = 'nl-badge-frame'
    document.body.appendChild(iframe)

    // MutationObserver is sync for our remove-on-mutate path after microtasks
    return Promise.resolve().then(() => {
      expect(document.getElementById('nl-badge-frame')).toBeNull()
      stop()
    })
  })
})
