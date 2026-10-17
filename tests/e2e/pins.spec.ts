import { test, expect } from '@playwright/test'

test('a keyboard reader can reach a pin, see its focus ring and toggle it', async ({ page }) => {
  await page.goto('')
  const node = page.getByRole('button', { name: 'Node.js', exact: true })
  let reached = false
  for (let i = 0; i < 40; i++) {
    await page.keyboard.press('Tab')
    const name = await page.evaluate(() => document.activeElement?.textContent?.trim() ?? '')
    if (name === 'Node.js') { reached = true; break }
  }
  expect(reached).toBe(true)
  await expect(node).toBeFocused()
  expect(await node.evaluate((el) => getComputedStyle(el).outlineStyle)).toBe('solid')
  await page.keyboard.press('Enter')
  await expect(node).toHaveAttribute('aria-pressed', 'true')
})
