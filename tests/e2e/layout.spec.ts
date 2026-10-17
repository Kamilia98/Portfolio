import { test, expect, type Page } from '@playwright/test'

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

/** Hold Archivo back, so the page lays out in the fallback font first and reflows when it lands. */
async function slowFont(page: Page) {
  await page.route('**/*.woff2', async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 1500))
    await route.continue()
  })
}

test('a deep link lands on the case study heading when the font arrives late', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await slowFont(page)
  await page.goto('#5-2-chart-speed')
  await page.evaluate(() => document.fonts.ready)
  // The case study itself, not its heading: its top must clear the 56 px bar, as scroll-margin-top intends.
  const study = page.locator('[id="5-2-chart-speed"]')
  await expect.poll(async () => (await study.boundingBox())!.y).toBeGreaterThanOrEqual(56)
  await expect.poll(async () => (await study.boundingBox())!.y).toBeLessThan(240)
})

test('a reader who scrolls before the late font arrives is not pulled back', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await slowFont(page)
  await page.goto('#5-2-chart-speed')
  const heading = page.getByRole('heading', { name: /5\.2 Chart speed/ })
  await expect(heading).toBeInViewport()
  await page.mouse.move(200, 400)
  await page.mouse.wheel(0, 1200)
  await expect.poll(async () => (await heading.boundingBox())!.y).toBeLessThan(0)
  await page.evaluate(() => document.fonts.ready)
  await page.evaluate(() => new Promise(requestAnimationFrame))
  expect((await heading.boundingBox())!.y).toBeLessThan(0)
})

test('on a 375 × 667 phone the first Features row ends inside the first screen', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 })
  await page.goto('')
  await page.evaluate(() => document.fonts.ready)
  const figure = page.locator('[id="1-features"] li').first().locator('strong')
  await expect(figure).toHaveText(/\S/)
  expect((await figure.boundingBox())!.y + (await figure.boundingBox())!.height).toBeLessThanOrEqual(667)
})

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

for (const [width, axis] of [[1440, 'row'], [390, 'column']] as const) {
  test(`stage connectors are drawn lines in the ${axis} layout at ${width} px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('')
    const stage = page.locator('[id="5-1-ask-your-data"] figure ol > li').nth(1)
    const line = await stage.evaluate((el) => {
      const s = getComputedStyle(el, '::before')
      return { width: s.width, height: s.height, background: s.backgroundColor, content: s.content }
    })
    expect(line.content).toBe('""')
    expect(line.background).toBe('rgb(18, 20, 23)')
    expect(axis === 'row' ? line.width : line.height).toBe('22px')
    expect(axis === 'row' ? line.height : line.width).toBe('1.5px')
  })
}
