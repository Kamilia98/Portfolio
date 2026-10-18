import { preview } from 'vite'
import { chromium } from '@playwright/test'

let server
let browser
try {
  server = await preview({ preview: { port: 4174, strictPort: true } })
  const base = server.resolvedUrls.local[0]
  browser = await chromium.launch()
  const page = await browser.newPage()
  await page.goto(new URL('cv.html', base).href)
  // The CV renders after load: wait for it, then for the fonts its text asked for.
  await page.locator('h1').waitFor({ state: 'visible' })
  await page.evaluate(() => document.fonts.ready)
  await page.pdf({
    path: 'dist/kamilia-ahmed-hamed.pdf',
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
  })
} catch (err) {
  console.error(err)
  process.exitCode = 1
} finally {
  if (browser) await browser.close()
  if (server) await new Promise((resolve) => server.httpServer.close(resolve))
}
