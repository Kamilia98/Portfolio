import { test, expect, type BrowserContext } from '@playwright/test'

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

/** The paths of the JavaScript files a page loads (module preloads included) that contain the text. */
async function scriptsWith(context: BrowserContext, path: string, text: string): Promise<string[]> {
  const page = await context.newPage()
  const scripts: Promise<[string, string]>[] = []
  page.on('response', (res) => {
    const { pathname } = new URL(res.url())
    if (pathname.endsWith('.js')) scripts.push(res.text().then((body) => [pathname, body]))
  })
  await page.goto(path)
  await expect(page.locator('h1')).toBeVisible()
  await page.waitForLoadState('networkidle')
  expect(scripts.length).toBeGreaterThan(0)
  const loaded = await Promise.all(scripts)
  await page.close()
  return loaded.filter(([, body]) => body.includes(text)).map(([name]) => name)
}

test("the phone number ships in the CV's scripts only, never in the site's", async ({ context }) => {
  expect(await scriptsWith(context, '', '112 452')).toEqual([])
  expect(await scriptsWith(context, 'cv.html', '112 452')).not.toEqual([])
})
