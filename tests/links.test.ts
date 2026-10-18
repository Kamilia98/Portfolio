afterEach(() => {
  vi.unstubAllEnvs()
  vi.resetModules()
})

test('a built site links the CV PDF and downloads it', async () => {
  const { cvHref, cvDownloads } = await import('../src/lib/links')
  expect(cvHref).toBe('/Portfolio/kamilia-ahmed-hamed.pdf')
  expect(cvDownloads).toBe(true)
})

test('the dev server links the CV page, because the PDF only exists after npm run cv', async () => {
  vi.stubEnv('MODE', 'development')
  vi.resetModules()
  const { cvHref, cvDownloads } = await import('../src/lib/links')
  expect(cvHref).toBe('/Portfolio/cv.html')
  expect(cvDownloads).toBe(false)
})
