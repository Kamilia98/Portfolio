import { test, expect } from '@playwright/test'

for (const [width, height] of [[320, 800], [390, 844], [1440, 900]]) {
  test(`no horizontal scroll at ${width} px`, async ({ page }) => {
    await page.setViewportSize({ width, height })
    await page.goto('')
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
    expect(scrollWidth).toBeLessThanOrEqual(width)
  })
}

for (const [width, height, minY] of [[390, 844, 56], [1440, 900, 0]]) {
  test(`deep link shows the case study heading at ${width} px`, async ({ page }) => {
    await page.setViewportSize({ width, height })
    await page.goto('#5-2-chart-speed')
    const heading = page.getByRole('heading', { name: /5\.2 Chart speed/ })
    await expect(heading).toBeVisible()
    await expect.poll(async () => (await heading.boundingBox())!.y).toBeGreaterThanOrEqual(minY)
    await expect.poll(async () => (await heading.boundingBox())!.y).toBeLessThan(240)
  })
}
