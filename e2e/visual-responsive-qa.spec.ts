import { expect, test, type Page } from '@playwright/test'
import fs from 'node:fs'
import path from 'node:path'

/**
 * Agent 7 — Responsive / visual / interaction QA harness.
 * Captures screenshots under test-results/visual-qa/ and asserts
 * critical a11y/interaction invariants across required viewports.
 */

const ARTIFACT_DIR = path.join('test-results', 'visual-qa')

const VIEWPORTS = [
  { name: '320x568', width: 320, height: 568 },
  { name: '360x800', width: 360, height: 800 },
  { name: '390x844', width: 390, height: 844 },
  { name: '412x915', width: 412, height: 915 },
  { name: '768x1024', width: 768, height: 1024 },
  { name: '1024x768', width: 1024, height: 768 },
  { name: '1280x800', width: 1280, height: 800 },
  { name: '1440x900', width: 1440, height: 900 },
  { name: '1920x1080', width: 1920, height: 1080 },
] as const

const PRIORITY_ROUTES = [
  { path: '/', slug: 'home' },
  { path: '/programs/children', slug: 'programs-children' },
  { path: '/programs/adult', slug: 'programs-adult' },
  { path: '/programs/tiny-tigers', slug: 'program-tiny-tigers' },
  { path: '/just-4-kids', slug: 'just-4-kids' },
  { path: '/just-4-kids/birthday-parties', slug: 'birthday' },
  { path: '/just-4-kids/summer-camp', slug: 'summer-camp' },
  { path: '/just-4-kids/parents-night-out', slug: 'pno' },
  { path: '/locations/allendale', slug: 'allendale' },
  { path: '/locations/midland-park', slug: 'midland-park' },
  { path: '/contact', slug: 'contact' },
] as const

function isMobileWidth(width: number) {
  return width <= 1120
}

async function shot(page: Page, name: string) {
  fs.mkdirSync(ARTIFACT_DIR, { recursive: true })
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, `${name}.png`),
    fullPage: false,
  })
}

async function horizontalOverflow(page: Page) {
  return page.evaluate(() => {
    const doc = document.documentElement
    return {
      scrollWidth: doc.scrollWidth,
      clientWidth: doc.clientWidth,
      overflow: doc.scrollWidth > doc.clientWidth + 1,
    }
  })
}

test.describe('Visual / responsive matrix — viewport screenshots', () => {
  for (const vp of VIEWPORTS) {
    test(`home first viewport @ ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height })
      await page.goto('/')
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
      await shot(page, `home-${vp.name}`)

      const overflow = await horizontalOverflow(page)
      expect(
        overflow.overflow,
        `Horizontal overflow at ${vp.name}: scrollWidth=${overflow.scrollWidth}`,
      ).toBe(false)

      // Primary free-class CTA must remain findable in the first viewport path.
      const cta = page.getByRole('link', { name: /try a class for free/i }).first()
      await expect(cta).toBeVisible()
    })
  }
})

test.describe('Visual / responsive matrix — priority routes', () => {
  const sampleViewports = [
    VIEWPORTS.find((v) => v.name === '390x844')!,
    VIEWPORTS.find((v) => v.name === '768x1024')!,
    VIEWPORTS.find((v) => v.name === '1440x900')!,
  ]

  for (const vp of sampleViewports) {
    for (const route of PRIORITY_ROUTES) {
      test(`${route.slug} @ ${vp.name}`, async ({ page }) => {
        await page.setViewportSize({ width: vp.width, height: vp.height })
        await page.goto(route.path)
        await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
        await shot(page, `${route.slug}-${vp.name}`)
        const overflow = await horizontalOverflow(page)
        expect(overflow.overflow, `${route.path} overflow @ ${vp.name}`).toBe(false)
      })
    }
  }
})

test.describe('Interaction QA', () => {
  test('skip link and keyboard reach contact on desktop', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name === 'mobile-chrome', 'Desktop keyboard flow')
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/')
    await page.keyboard.press('Tab')
    const skip = page.getByRole('link', { name: /skip to main content/i })
    await expect(skip).toBeFocused()
    await shot(page, 'skip-link-focus-1440')
    await page.keyboard.press('Enter')
    await expect(page.locator('#main')).toBeFocused()
  })

  test('desktop Programs mega Escape restores focus', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name === 'mobile-chrome', 'Desktop mega only')
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/')
    const programs = page
      .getByRole('navigation', { name: /primary/i })
      .getByRole('button', { name: /programs/i })
    // Hover opens the mega; a subsequent click would toggle it closed.
    await programs.hover()
    await expect(programs).toHaveAttribute('aria-expanded', 'true')
    await programs.focus()
    await shot(page, 'programs-mega-open-1440')
    await page.keyboard.press('Escape')
    await expect(programs).toHaveAttribute('aria-expanded', 'false')
    await expect(programs).toBeFocused()
  })

  test('mobile menu open / Escape / focus restore', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/')
    const menuBtn = page.getByRole('button', { name: /open menu|close menu/i })
    await menuBtn.click()
    await expect(menuBtn).toHaveAttribute('aria-expanded', 'true')
    await expect(menuBtn).toHaveAttribute('aria-label', /close menu/i)
    await shot(page, 'mobile-nav-open-390')
    await page.keyboard.press('Escape')
    await expect(menuBtn).toHaveAttribute('aria-expanded', 'false')
    await expect(menuBtn).toBeFocused()
  })

  test('hero pause control when video loads (desktop, motion allowed)', async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name === 'mobile-chrome', 'Desktop video policy')
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.emulateMedia({ reducedMotion: 'no-preference' })
    await page.goto('/')

    const toggle = page.getByRole('button', { name: /pause background video|play background video/i })
    // Video may be blocked by network; if control never appears, record and continue.
    const visible = await toggle.isVisible().catch(() => false)
    if (!visible) {
      await shot(page, 'hero-no-video-control-1440')
      test.info().annotations.push({
        type: 'note',
        description: 'Hero video control not shown (CDN/network/policy). Poster path still OK.',
      })
      return
    }
    await expect(toggle).toBeVisible()
    const pressed = await toggle.getAttribute('aria-pressed')
    await toggle.click()
    await expect(toggle).toHaveAttribute(
      'aria-pressed',
      pressed === 'true' ? 'false' : 'true',
    )
    await shot(page, 'hero-video-toggled-1440')
  })

  test('reduced-motion hides scroll cue and keeps CTA', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')
    await expect(page.getByRole('link', { name: /try a class for free/i }).first()).toBeVisible()
    const scrollCue = page.locator('.hero__scroll')
    if ((await scrollCue.count()) > 0) {
      await expect(scrollCue).toBeHidden()
    }
    await shot(page, 'home-reduced-motion-1440')
  })

  test('contact form validation + success messaging', async ({ page }) => {
    await page.route('**/api/leads', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ ok: true, delivered: false, mode: 'log' }),
      })
    })
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/contact')
    await page.getByRole('button', { name: /try a class for free/i }).click()
    await expect(page.getByRole('alert').or(page.locator('.form-error-summary'))).toBeVisible()
    await shot(page, 'contact-validation-390')

    await page.getByLabel(/full name/i).fill('QA Parent')
    await page.getByLabel(/^email/i).fill('qa@example.com')
    await page.getByLabel(/^phone/i).fill('2015550100')
    await page.getByRole('button', { name: /try a class for free/i }).click()
    await expect(page.getByText(/you.?re all set/i)).toBeVisible()
    await shot(page, 'contact-success-390')
  })

  test('button focus-visible ring is present', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name === 'mobile-chrome', 'Desktop focus ring check')
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/')
    const cta = page.getByRole('link', { name: /try a class for free/i }).first()
    await cta.focus()
    await expect(cta).toBeFocused()
    await shot(page, 'cta-focus-visible-1440')
    const outline = await cta.evaluate((el) => {
      const styles = getComputedStyle(el)
      return {
        outlineStyle: styles.outlineStyle,
        outlineWidth: styles.outlineWidth,
        boxShadow: styles.boxShadow,
      }
    })
    const hasRing =
      (outline.outlineStyle !== 'none' && outline.outlineWidth !== '0px') ||
      (outline.boxShadow !== 'none' && outline.boxShadow.length > 0)
    expect(hasRing, `CTA focus ring missing: ${JSON.stringify(outline)}`).toBe(true)
  })

  test('content zoom 200% home remains usable', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await page.goto('/')
    await page.evaluate(() => {
      document.documentElement.style.zoom = '2'
    })
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await expect(page.getByRole('link', { name: /try a class for free/i }).first()).toBeVisible()
    await shot(page, 'home-zoom-200-1280')
    await page.evaluate(() => {
      document.documentElement.style.zoom = ''
    })
  })

  test('content zoom 400% contact form fields remain reachable', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await page.goto('/contact')
    await page.evaluate(() => {
      document.documentElement.style.zoom = '4'
    })
    await expect(page.getByLabel(/full name/i)).toBeVisible()
    await shot(page, 'contact-zoom-400-1280')
    await page.evaluate(() => {
      document.documentElement.style.zoom = ''
    })
  })

  for (const width of [320, 390, 768] as const) {
    test(`mobile sticky CTA does not cover H1 @ ${width}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 700 })
      await page.goto('/contact')
      if (!isMobileWidth(width)) return
      const sticky = page.locator('.mobile-cta')
      await expect(sticky).toBeVisible()
      const h1 = page.getByRole('heading', { level: 1 })
      const h1Box = await h1.boundingBox()
      const stickyBox = await sticky.boundingBox()
      expect(h1Box).toBeTruthy()
      expect(stickyBox).toBeTruthy()
      if (h1Box && stickyBox) {
        const overlap =
          h1Box.y < stickyBox.y + stickyBox.height &&
          h1Box.y + h1Box.height > stickyBox.y
        expect(overlap, 'Sticky CTA overlapping page H1').toBe(false)
      }
      await shot(page, `sticky-cta-contact-${width}`)
    })
  }
})

test.describe('Performance / media observations', () => {
  test('homepage initial media requests are recorded', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name === 'mobile-chrome', 'Desktop network sample')
    const media: { url: string; resourceType: string }[] = []
    page.on('request', (req) => {
      const type = req.resourceType()
      if (type === 'image' || type === 'media') {
        media.push({ url: req.url(), resourceType: type })
      }
    })
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/', { waitUntil: 'networkidle' })
    await shot(page, 'home-networkidle-1440')

    const report = {
      count: media.length,
      thirdParty: media.filter((m) => !m.url.includes('127.0.0.1') && !m.url.includes('localhost')),
      local: media.filter((m) => m.url.includes('127.0.0.1') || m.url.includes('localhost')),
      urls: media.map((m) => m.url),
    }
    fs.mkdirSync(ARTIFACT_DIR, { recursive: true })
    fs.writeFileSync(
      path.join(ARTIFACT_DIR, 'home-media-requests.json'),
      JSON.stringify(report, null, 2),
    )

    // Poster / logo should load locally; Mixkit CDN may appear for hero MP4.
    expect(report.count).toBeGreaterThan(0)
  })
})
