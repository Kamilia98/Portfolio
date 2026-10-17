import { test, expect } from '@playwright/test'

test('reduced motion removes the bar transition', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('')
  const bar = page.getByTestId('after-bar').first()
  await expect(bar).toHaveCSS('transition-duration', '0s')
})
