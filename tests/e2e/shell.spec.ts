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
  await expect(page.locator('nav[aria-label="Sections"] a[href="#7-revision-history"]')).toHaveAttribute('aria-current', 'location')
})

test('at the bottom of the page the last section is marked', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 400 })
  await page.goto('')
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight))
  await expect(page.locator('nav[aria-label="Sections"] a[href="#8-ordering-information"]')).toHaveAttribute('aria-current', 'location')
})

test('focus ring on a link in the mobile bar is not clipped', async ({ page }) => {
  await page.setViewportSize({ width: 600, height: 800 })
  await page.goto('')
  const link = page.locator('nav[aria-label="Sections"] a').first()
  await link.focus()
  const [nav, box] = await Promise.all([
    page.locator('nav[aria-label="Sections"]').boundingBox(),
    link.boundingBox(),
  ])
  // outline 3px + offset 2px must fit inside the bar
  expect(box!.y - 5).toBeGreaterThanOrEqual(nav!.y)
  expect(box!.y + box!.height + 5).toBeLessThanOrEqual(nav!.y + nav!.height)
})
