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

test('a malformed hash does not break the page', async ({ page }) => {
  const errors: Error[] = []
  page.on('pageerror', (e) => errors.push(e))
  await page.goto('#%E0%A4%A')
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  expect(errors).toEqual([])
})

for (const width of [390, 768, 1024, 1280, 1440]) {
  test(`diagram blocks keep room for their words at ${width} px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('')
    const widths = await page.locator('figure li li').evaluateAll((els) => els.map((el) => el.getBoundingClientRect().width))
    expect(widths.length).toBeGreaterThan(0)
    expect(Math.min(...widths)).toBeGreaterThanOrEqual(120)
  })
}

test('the CV page has no sideways scroll on a phone', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('cv.html')
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390)
})
