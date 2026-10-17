import { preview } from 'vite'
import { chromium } from '@playwright/test'

const server = await preview({ preview: { port: 4174, strictPort: true } })
let browser
try {
  const base = server.resolvedUrls.local[0]
  browser = await chromium.launch()
  const page = await browser.newPage()
  await page.goto(new URL('cv.html', base).href)
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
  await new Promise((resolve) => server.httpServer.close(resolve))
}
