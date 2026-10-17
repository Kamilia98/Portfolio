import type { Result } from './types'

export const results: Result[] = [
  { id: 'slowest-chart', label: 'Slowest chart load', before: 63, after: 4.3, unit: 's', caseStudy: 'chart-speed' },
  { id: 'heavy-charts', label: 'Fifteen heavy charts, together', before: 262, after: 50, unit: 's', caseStudy: 'chart-speed' },
  { id: 'frontend-build', label: 'Frontend image build', before: 89, after: 52, unit: 's' },
  { id: 'dialog-components', label: 'Dialog components', before: 5, after: 1, unit: '', caseStudy: 'one-interface' },
]
