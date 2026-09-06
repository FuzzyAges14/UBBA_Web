import { expect, test } from '@playwright/test'

const TRIAL_ALLENDALE =
  'https://student.nextkick.ai/form/0318c4be-65de-4c00-b554-192c0e1d65eb'
const BIRTHDAY_ALLENDALE =
  'https://student.nextkick.ai/form/8e4e23d6-da04-4d94-818e-06c71baf3de6'
async function pickAllendaleInPortal(page: import('@playwright/test').Page) {
  const dialog = page.getByRole('dialog').filter({ hasText: /allendale|midland|glen rock/i })
  await dialog.getByText('Allendale').click()
}

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
    await pickAllendaleInPortal(page)
    await expect(dialog.getByTitle(/1 free time trial — allendale form/i)).toHaveAttribute(
      'src',
      TRIAL_ALLENDALE,
    )
  })

  test('contact page launcher opens the same NextKick form iframe', async ({ page }) => {
    await page.goto('/contact')
    await page.getByRole('button', { name: /try a class for free/i }).last().click()
    const dialog = page.getByRole('dialog', { name: /1 free time trial/i })
    await expect(dialog).toBeVisible()
    await pickAllendaleInPortal(page)
    await expect(dialog.getByTitle(/1 free time trial — allendale form/i)).toHaveAttribute(
      'src',
      TRIAL_ALLENDALE,
    )
    await expect(page.getByRole('link', { name: /open it in a new tab/i })).toHaveAttribute(
      'href',
      TRIAL_ALLENDALE,
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
      const allendalePage = page.getByRole('link', { name: /visit allendale page/i })
      await allendalePage.scrollIntoViewIfNeeded()
      await allendalePage.click()
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

  test('birthday page opens the birthday NextKick portal', async ({ page }) => {
    await page.goto('/just-4-kids/birthday-parties')
    await page.getByRole('button', { name: /schedule my party/i }).click()
    const dialog = page.getByRole('dialog', { name: /schedule a birthday party/i })
    await expect(dialog).toBeVisible()
    await pickAllendaleInPortal(page)
    await expect(
      dialog.getByTitle(/schedule a birthday party — allendale form/i),
    ).toHaveAttribute('src', BIRTHDAY_ALLENDALE)
  })

  test('Parents Night Out page directs visitors to call', async ({ page }) => {
    await page.goto('/just-4-kids/parents-night-out')
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await expect(page.getByText(/there is no online form/i).first()).toBeVisible()
    const callCta = page.getByRole('link', { name: /call allendale/i })
    await expect(callCta).toBeVisible()
    await expect(callCta).toHaveAttribute('href', /tel:2019622922/)
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
