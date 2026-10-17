import { readFileSync } from 'node:fs'
import { test, expect } from '@playwright/test'
import { PDFDocument } from 'pdf-lib'

const pdfPath = 'dist/kamilia-ahmed-hamed.pdf'

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
