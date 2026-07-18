import { expect, test } from '@playwright/test'

test.describe('Critical marketing flows', () => {
  test('homepage exposes free-class CTA and form path', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      /united\s+black\s+belt\s+academy/i,
    )

    const cta = page.getByRole('link', { name: /try a class for free/i }).first()
    await expect(cta).toBeVisible()
    await cta.click()
    await expect(page).toHaveURL(/\/contact/)
    await expect(page.getByLabel(/full name/i)).toBeVisible()
    await expect(page.getByRole('button', { name: /try a class for free/i })).toBeVisible()
  })

  test('homepage free-class form validates and can submit against mocked API', async ({
    page,
  }) => {
    await page.route('**/api/leads', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ ok: true, delivered: false, mode: 'log' }),
      })
    })

    await page.goto('/contact')
    await page.getByLabel(/full name/i).fill('E2E Parent')
    await page.getByLabel(/^email$/i).fill('e2e@example.com')
    await page.getByLabel(/^phone$/i).fill('2015550100')
    await page.getByRole('button', { name: /try a class for free/i }).click()
    await expect(page.getByText(/you.?re all set/i)).toBeVisible()
  })

  test('mobile navigation reaches a program page', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'mobile-chrome', 'Mobile nav project only')

    await page.goto('/')
    await page.getByRole('button', { name: /open menu/i }).click()
    await page.getByRole('button', { name: /^programs$/i }).click()
    // Mega/mobile program links currently route to category overviews.
    await page.getByRole('link', { name: /tiny tigers/i }).click()
    await expect(page).toHaveURL(/\/programs\/children/)
    await expect(
      page.getByRole('heading', { level: 1, name: /children's martial arts programs/i }),
    ).toBeVisible()
  })

  test('location landing pages are reachable', async ({ page }, testInfo) => {
    await page.goto('/')

    if (testInfo.project.name === 'mobile-chrome') {
      await page.getByRole('button', { name: /open menu/i }).click()
      await page.getByRole('navigation', { name: /mobile/i }).getByRole('link', {
        name: /^locations$/i,
      }).click()
      await expect(page.locator('#locations')).toBeVisible()
      await page.getByRole('link', { name: /allendale/i }).first().click()
    } else {
      await page.goto('/locations/allendale')
    }

    await expect(page).toHaveURL(/\/locations\/allendale/)
    await expect(
      page.getByRole('heading', { level: 1, name: /allendale martial arts classes/i }),
    ).toBeVisible()

    await page.goto('/locations/midland-park')
    await expect(
      page.getByRole('heading', { level: 1, name: /midland park martial arts classes/i }),
    ).toBeVisible()
  })

  test('event inquiry form submits with mocked API', async ({ page }) => {
    await page.route('**/api/leads', async (route) => {
      const body = route.request().postDataJSON() as { intent?: string }
      expect(body.intent).toBe('birthday')
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ ok: true, delivered: false, mode: 'log' }),
      })
    })

    await page.goto('/just-4-kids/birthday-parties')
    await page.getByLabel(/parent \/ guardian name/i).fill('Sam Parent')
    await page.getByLabel(/^email$/i).fill('sam@example.com')
    await page.getByLabel(/^phone$/i).fill('2015559999')
    await page.getByRole('button', { name: /schedule my party/i }).click()
    await expect(page.getByText(/party request sent/i)).toBeVisible()
  })

  test('keyboard-only path reaches contact form', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name === 'mobile-chrome', 'Desktop keyboard flow')

    await page.goto('/')
    await page.keyboard.press('Tab')
    const skip = page.getByRole('link', { name: /skip to main content/i })
    await expect(skip).toBeFocused()
    await page.keyboard.press('Enter')

    for (let i = 0; i < 20; i += 1) {
      await page.keyboard.press('Tab')
      const focused = page.locator(':focus')
      const text = ((await focused.textContent()) || '').toLowerCase()
      const aria = ((await focused.getAttribute('aria-label')) || '').toLowerCase()
      if (text.includes('try a class') || aria.includes('try a class')) {
        await page.keyboard.press('Enter')
        break
      }
    }

    await expect(page).toHaveURL(/\/contact/)
    await expect(page.getByLabel(/full name/i)).toBeVisible()
  })
})
