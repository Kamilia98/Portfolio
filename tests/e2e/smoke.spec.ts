import { test, expect } from '@playwright/test'

test('home loads under the /Portfolio/ base', async ({ page }) => {
  const errors: string[] = []
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text())
  })
  page.on('pageerror', (err) => errors.push(err.message))

  await page.goto('')
  await expect(page.locator('h1')).toHaveText('Kamilia Ahmed')
  expect(errors).toEqual([])
})
