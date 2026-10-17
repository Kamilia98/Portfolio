import { percentChange, formatResult, formatPercent } from '../src/lib/results'
import { resultById } from '../src/content'

test.each([[63, 4.3, -93], [262, 50, -81], [89, 52, -42], [5, 1, -80]])('percentChange(%d, %d) = %d', (b, a, p) => {
  expect(percentChange(b, a)).toBe(p)
})
test('formats', () => {
  expect(formatResult(resultById('slowest-chart'))).toBe('63 s → 4.3 s')
  expect(formatResult(resultById('dialog-components'))).toBe('5 → 1')
  expect(formatPercent(-93)).toBe('−93%')
  expect(formatPercent(12)).toBe('+12%')
})
