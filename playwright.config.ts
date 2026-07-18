import { defineConfig, devices } from '@playwright/test'

/**
 * Lightweight E2E suite for critical UBBA marketing flows.
 * Run: pnpm test:e2e
 * Requires: pnpm build (or a running preview/dev server — see webServer below).
 */
export default defineConfig({
  testDir: 'e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: 'http://127.0.0.1:4173',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 7'] },
    },
  ],
  webServer: {
    // Build when dist/ is missing (local `pnpm test:e2e`); CI already runs `pnpm build` via test:ci.
    command: 'sh -c "test -d dist || pnpm build; pnpm preview --host 127.0.0.1 --port 4173"',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
})
