import type { Result } from '../content/types'

export function percentChange(before: number, after: number): number {
  return Math.round(((after - before) / before) * 100)
}

const number = new Intl.NumberFormat('en-GB')

export function formatValue(n: number, unit: Result['unit']): string {
  return unit ? `${number.format(n)} ${unit}` : number.format(n)
}

export function formatResult(r: Result): string {
  return `${formatValue(r.before, r.unit)} → ${formatValue(r.after, r.unit)}`
}

export function formatPercent(p: number): string {
  return p < 0 ? `−${Math.abs(p)}%` : `+${p}%`
}
