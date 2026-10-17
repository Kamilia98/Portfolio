import { readFileSync } from 'node:fs'
import { test, expect } from '@playwright/test'
import { PDFDict, PDFDocument, PDFHexString, PDFName, PDFString } from 'pdf-lib'
import { profile } from '../../src/content'

const pdfPath = 'dist/kamilia-ahmed-hamed.pdf'

/** The URI of every link annotation on one page of the PDF. */
function linkUris(doc: PDFDocument, pageIndex: number): string[] {
  const annots = doc.getPage(pageIndex).node.Annots()
  if (!annots) return []
  return annots.asArray().flatMap((_, i) => {
    const action = annots.lookup(i, PDFDict).lookupMaybe(PDFName.of('A'), PDFDict)
    const uri = action?.lookupMaybe(PDFName.of('URI'), PDFString, PDFHexString)
    return uri ? [uri.decodeText()] : []
  })
}

test('the Download CV link serves the PDF under the base path', async ({ page, request }) => {
  await page.goto('')
  const href = await page.getByRole('link', { name: 'Download CV' }).first().getAttribute('href')
  const res = await request.get(href!)
  expect(res.status()).toBe(200)
  expect(res.headers()['content-type']).toContain('application/pdf')
})

test('the PDF runs to at most two pages', async () => {
  const doc = await PDFDocument.load(readFileSync(pdfPath))
  expect([1, 2]).toContain(doc.getPageCount())
})

test('the PDF embeds Archivo', () => {
  expect(readFileSync(pdfPath).toString('latin1')).toContain('Archivo')
})

test('the PDF links the site and the email on page 1', async () => {
  const doc = await PDFDocument.load(readFileSync(pdfPath))
  const uris = linkUris(doc, 0)
  expect(uris).toContain(profile.site)
  expect(uris).toContain(`mailto:${profile.email}`)
  expect(uris).toContain(profile.linkedin)
  expect(uris).toContain(profile.github)
})

test('the job heading puts its period at the right of the same line, with no float', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 })
  await page.goto('cv.html')
  const job = page.getByRole('heading', { level: 3 })
  const title = job.locator('span').first()
  const period = job.locator('span').last()
  await expect(period).toHaveText(/^Jul 2025/)
  await expect(period).toHaveCSS('float', 'none')
  const [t, p, h] = [(await title.boundingBox())!, (await period.boundingBox())!, (await job.boundingBox())!]
  expect(p.x).toBeGreaterThan(t.x + t.width)
  expect(Math.abs(p.x + p.width - (h.x + h.width))).toBeLessThan(1)
  expect(Math.abs(p.y - t.y)).toBeLessThan(4)
})
