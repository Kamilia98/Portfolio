import { test, expect } from '@playwright/test'

test('raw HTML carries title and Open Graph tags for link previews', async ({ request }) => {
  const res = await request.get('')
  const html = await res.text()
  expect(html).toContain('<title>Kamilia Ahmed')
  expect(html).toContain('og:title')
  expect(html).toContain('og:description')
})

test('the index marks the section in view', async ({ page }) => {
  await page.goto('')
  // Put the section's top inside the observer band (30% to 40% down the viewport).
  await page.evaluate(() => {
    const el = document.getElementById('7-revision-history')!
    window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.35)
  })
  await expect(page.locator('nav[aria-label="Sections"] a[href="#7-revision-history"]')).toHaveAttribute('aria-current', 'location')
})
