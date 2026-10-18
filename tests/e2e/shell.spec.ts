import { test, expect } from '@playwright/test'

test('raw HTML carries title and Open Graph tags for link previews', async ({ request }) => {
  const res = await request.get('')
  const html = await res.text()
  expect(html).toContain('<title>Kamilia Ahmed')
  expect(html).toContain('og:title')
  expect(html).toContain('og:description')
})

test('the index marks the section in view', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 400 })
  await page.goto('')
  // Put the section's top inside the observer band (30% to 40% down the viewport).
  await page.evaluate(() => {
    const el = document.getElementById('7-revision-history')!
    window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.35)
  })
  await expect(page.locator('nav[aria-label="Sections"] a[href="#7-revision-history"]')).toHaveAttribute(
    'aria-current',
    'location',
  )
})

test('at the bottom of the page the last section is marked', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 400 })
  await page.goto('')
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight))
  await expect(page.locator('nav[aria-label="Sections"] a[href="#8-ordering-information"]')).toHaveAttribute(
    'aria-current',
    'location',
  )
})

test('focus ring on a link in the mobile bar is not clipped', async ({ page }) => {
  await page.setViewportSize({ width: 600, height: 800 })
  await page.goto('')
  const link = page.locator('nav[aria-label="Sections"] a').first()
  await link.focus()
  const [nav, box] = await Promise.all([page.locator('nav[aria-label="Sections"]').boundingBox(), link.boundingBox()])
  // outline 3px + offset 2px must fit inside the bar
  expect(box!.y - 5).toBeGreaterThanOrEqual(nav!.y)
  expect(box!.y + box!.height + 5).toBeLessThanOrEqual(nav!.y + nav!.height)
})

test('table and contact links use ink, not the browser default blue', async ({ page }) => {
  await page.goto('')
  for (const sel of ['[id="6-related-parts"] a', '[id="8-ordering-information"] a']) {
    const color = await page
      .locator(sel)
      .first()
      .evaluate((el) => getComputedStyle(el).color)
    expect(color).toBe('rgb(18, 20, 23)')
  }
})

test('related-part links are named after their part for screen readers', async ({ page }) => {
  await page.goto('')
  const table = page.locator('[id="6-related-parts"]')
  await expect(table.getByRole('link', { name: 'Code for Bloogy', exact: true })).toHaveCount(1)
  await expect(table.getByRole('link', { name: 'Live site for Bloogy', exact: true })).toHaveCount(1)
  await expect(table.getByRole('link', { name: 'Code', exact: true })).toHaveCount(0)
  await expect(table.getByRole('link', { name: 'Code for Bloogy' })).toHaveText('Code for Bloogy')
})

test('marking a section does not change the width of its link in the phone bar', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('')
  // Measure in Archivo, not the fallback font it replaces.
  await page.evaluate(() => document.fonts.ready)
  const links = page.locator('nav[aria-label="Sections"] a')
  const before = await links.evaluateAll((els) => els.map((el) => el.getBoundingClientRect().width))
  await page.evaluate(() => document.getElementById('2-description')!.scrollIntoView())
  await expect(page.locator('nav[aria-label="Sections"] [aria-current="location"]')).toHaveCount(1)
  const after = await links.evaluateAll((els) => els.map((el) => el.getBoundingClientRect().width))
  expect(after).toEqual(before)
})

test('the phone bar scrolls the marked section into sight', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('')
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight))
  const link = page.locator('nav[aria-label="Sections"] a[href="#8-ordering-information"]')
  await expect(link).toHaveAttribute('aria-current', 'location')
  // The bar's 5px end padding must survive at full scroll, not leave the last link flush with the edge.
  // On failure the received value shows the whole state, not just "false".
  await expect
    .poll(() =>
      page.evaluate(() => {
        const nav = document.querySelector('nav[aria-label="Sections"]')!
        const box = nav.querySelector('a[href="#8-ordering-information"]')!.getBoundingClientRect()
        if (box.left >= 0 && box.right <= 390 - 4) return 'in view'
        return JSON.stringify({
          marked: nav.querySelector('[aria-current="location"]')?.getAttribute('href'),
          left: box.left,
          right: box.right,
          barScrollLeft: nav.scrollLeft,
          barScrollWidth: nav.scrollWidth,
          barClientWidth: nav.clientWidth,
          innerWidth: window.innerWidth,
          scrollY: window.scrollY,
          innerHeight: window.innerHeight,
          scrollHeight: document.documentElement.scrollHeight,
        })
      }),
    )
    .toBe('in view')
})

test('at the top of the page the first section is marked, in accent and bold, with no side stripe', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('')
  const link = page.locator('nav[aria-label="Sections"] a[href="#1-features"]')
  await expect(link).toHaveAttribute('aria-current', 'location')
  await expect(link).toHaveCSS('color', 'rgb(29, 95, 191)')
  await expect(link).toHaveCSS('font-weight', '800')
  await expect(link).toHaveCSS('border-left-width', '0px')
  await expect(link).toHaveCSS('text-decoration-line', 'none')
})

test('in the phone bar the marked section is also underlined in accent', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('')
  const link = page.locator('nav[aria-label="Sections"] a[href="#1-features"]')
  await expect(link).toHaveAttribute('aria-current', 'location')
  await expect(link).toHaveCSS('text-decoration-line', 'underline')
  await expect(link).toHaveCSS('text-decoration-thickness', '2px')
  await expect(link).toHaveCSS('color', 'rgb(29, 95, 191)')
  await expect(link).toHaveCSS('border-left-width', '0px')
})
