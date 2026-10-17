import * as content from '../src/content'
import { pins, caseStudies, sections, resultById, history } from '../src/content'

test('pin ids referenced by case studies and blocks exist', () => {
  const ids = new Set(pins.map((p) => p.id))
  for (const cs of caseStudies) {
    cs.pins.forEach((p) => expect(ids.has(p)).toBe(true))
    cs.diagrams.forEach((d) =>
      d.stages.forEach((s) => s.blocks.forEach((b) => b.pins.forEach((p) => expect(ids.has(p)).toBe(true)))),
    )
  }
})

test("every block's pins are a subset of its case study's pins", () => {
  for (const cs of caseStudies) {
    cs.diagrams.forEach((d) =>
      d.stages.forEach((s) => s.blocks.forEach((b) => b.pins.forEach((p) => expect(cs.pins).toContain(p)))),
    )
  }
})

test('every pin is used by at least one case study', () => {
  for (const p of pins) expect(caseStudies.some((cs) => cs.pins.includes(p.id))).toBe(true)
})

test('result ids resolve', () => {
  for (const cs of caseStudies) {
    cs.resultIds.forEach((id) => expect(() => resultById(id)).not.toThrow())
    if (cs.headlineResult) expect(() => resultById(cs.headlineResult!)).not.toThrow()
  }
})

test('anchors are unique, well formed, numbered 5.1 to 5.4 in order', () => {
  const anchors = caseStudies.map((c) => c.anchor)
  expect(new Set(anchors).size).toBe(anchors.length)
  anchors.forEach((a) => expect(a).toMatch(/^5-[1-4]-[a-z-]+$/))
  expect(caseStudies.map((c) => c.number)).toEqual(['5.1', '5.2', '5.3', '5.4'])
})

test('sections are the eight datasheet sections', () => {
  expect(sections.map((s) => s.id)).toEqual([
    '1-features',
    '2-description',
    '3-pin-configuration',
    '4-typical-performance',
    '5-detailed-description',
    '6-related-parts',
    '7-revision-history',
    '8-ordering-information',
  ])
  expect(sections.map((s) => s.number)).toEqual([1, 2, 3, 4, 5, 6, 7, 8])
})

test('no banned client or account names anywhere in the content', () => {
  const banned = /vodafone|etisalat|beyti|ora_properties|consumer_finance/i
  const walk = (v: unknown): void => {
    if (typeof v === 'string') expect(v).not.toMatch(banned)
    else if (Array.isArray(v)) v.forEach(walk)
    else if (v && typeof v === 'object') Object.values(v).forEach(walk)
  }
  for (const [name, value] of Object.entries(content)) {
    if (typeof value !== 'function') walk(value)
    else expect(name).toBe('resultById')
  }
})

test('case studies claim only what happened', () => {
  const study = (id: string) => caseStudies.find((c) => c.id === id)!
  const text = (v: unknown) => JSON.stringify(v)
  // A lint rule flags the old way; it cannot stop it coming back.
  expect(text(study('one-interface'))).not.toContain('cannot come back')
  expect(study('one-interface').built).toContain(
    'An ESLint rule for each pattern, so the old way is flagged, plus the matching end-to-end test changes.',
  )
  // The e2e work was changes to existing tests, not new tests.
  const kept = study('one-interface').diagrams[0].stages.find((s) => s.title === 'Kept')!
  expect(kept.blocks.map((b) => b.label)).toContain('end-to-end test changes · Playwright')
  // The slowest chart took 63 s.
  expect(study('chart-speed').problem).toContain('took over a minute')
})

test("the CV's current job is the newest work entry and still runs", () => {
  expect(history.find((h) => h.kind === 'work')!.period).toMatch(/– now$/)
})
