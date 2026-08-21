import { expect, test } from '@playwright/test'

const NEXTKICK_FORM =
  'https://student.nextkick.ai/form/6fbe8b2c-2e75-45ab-9d92-994135c06e17'

test.describe('Critical marketing flows', () => {
  test('homepage free-class CTA opens the NextKick trial portal', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      /united\s+black\s+belt\s+academy/i,
    )

    const cta = page.getByRole('button', { name: /try a class for free/i }).first()
    await expect(cta).toBeVisible()
    await cta.click()

    const dialog = page.getByRole('dialog', { name: /1 free time trial/i })
    await expect(dialog).toBeVisible()
    await expect(dialog.getByTitle(/1 free time trial form/i)).toHaveAttribute(
      'src',
      NEXTKICK_FORM,
    )
  })

  test('contact page launcher opens the same NextKick form iframe', async ({ page }) => {
    await page.goto('/contact')
    await page.getByRole('button', { name: /try a class for free/i }).last().click()
    const dialog = page.getByRole('dialog', { name: /1 free time trial/i })
    await expect(dialog).toBeVisible()
    await expect(dialog.getByTitle(/1 free time trial form/i)).toHaveAttribute(
      'src',
      NEXTKICK_FORM,
    )
    await expect(page.getByRole('link', { name: /open it in a new tab/i })).toHaveAttribute(
      'href',
      NEXTKICK_FORM,
    )
  })

  test('mobile navigation reaches a program page', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'mobile-chrome', 'Mobile nav project only')

    await page.goto('/')
    await page.getByRole('button', { name: /open menu/i }).click()
    const mobileNav = page.getByRole('navigation', { name: /mobile/i })
    await mobileNav.getByRole('button', { name: /^programs$/i }).click()
    await mobileNav.getByRole('link', { name: /tiny tigers/i }).click()
    await expect(page).toHaveURL(/\/programs\/tiny-tigers/)
    await expect(
      page.getByRole('heading', { level: 1, name: /^tiny tigers$/i }),
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
    await page.getByLabel(/^email/i).fill('sam@example.com')
    await page.getByLabel(/^phone/i).fill('2015559999')
    await page.getByRole('button', { name: /schedule my party/i }).click()
    await expect(page.getByText(/party request sent/i)).toBeVisible()
  })

  test('keyboard-only path opens the NextKick trial portal', async ({ page }, testInfo) => {
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

    await expect(page.getByRole('dialog', { name: /1 free time trial/i })).toBeVisible()
  })
})
