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

test('a dimmed pin keeps full opacity, muted text and a full focus ring', async ({ page }) => {
  await page.goto('')
  await page.getByRole('button', { name: 'React', exact: true }).click()
  const mongo = page.getByRole('button', { name: 'MongoDB', exact: true })
  const li = page.locator('li', { has: mongo })
  expect(await li.evaluate((el) => getComputedStyle(el).opacity)).toBe('1')
  await expect(mongo).toHaveCSS('color', 'rgb(74, 81, 96)')
  await page.keyboard.press('Tab')
  for (let i = 0; i < 40 && !(await mongo.evaluate((el) => el === document.activeElement)); i++) {
    await page.keyboard.press('Tab')
  }
  await expect(mongo).toBeFocused()
  expect(await mongo.evaluate((el) => getComputedStyle(el).outlineStyle)).toBe('solid')
})
