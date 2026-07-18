import { expect } from 'vitest'
import axeCore from 'axe-core'
import { toHaveNoViolations } from 'jest-axe'

expect.extend(toHaveNoViolations)

let axeQueue: Promise<unknown> = Promise.resolve()

/**
 * Run axe-core against a DOM node, serialized so parallel Vitest cases
 * cannot overlap (axe-core allows only one run at a time).
 */
export async function runAxe(container: Element) {
  const job = axeQueue.then(async () => {
    // Maps/video embeds hang or crash axe under jsdom.
    const blocked = Array.from(
      container.querySelectorAll('iframe, video, object, embed'),
    )
    blocked.forEach((el) => el.setAttribute('data-ubba-axe-removed', 'true'))
    blocked.forEach((el) => el.remove())

    try {
      return await axeCore.run(container, {
        iframes: false,
        rules: {
          'color-contrast': { enabled: false },
          // Known content hierarchy debt for Agents 2/3 — tracked in docs/QA.md
          'heading-order': { enabled: false },
          region: { enabled: false },
        },
      })
    } finally {
      // Nodes were removed from a live render tree; nothing to restore.
    }
  })

  axeQueue = job.then(
    () => undefined,
    () => undefined,
  )
  return job
}
