import { results } from './results'
import type { Result } from './types'

export { profile } from './profile'
export { pins } from './pins'
export { results } from './results'
export { caseStudies } from './caseStudies'
export { earlierWork } from './earlierWork'
export { history } from './history'
export { sections } from './sections'

export function resultById(id: string): Result {
  const r = results.find((x) => x.id === id)
  if (!r) throw new Error(`Unknown result id: ${id}`)
  return r
}
