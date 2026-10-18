import { pins } from './pins'
import { results } from './results'
import type { LayerId, Pin, PinId, Result } from './types'

export { profile } from './profile'
export { layers, pins } from './pins'
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

export function pinById(id: PinId): Pin {
  return pins.find((p) => p.id === id)!
}

/** A diagram block takes the layer of its first pin; a block with no pins (a result) has none. */
export function layerOf(pinIds: PinId[]): LayerId | undefined {
  return pinIds.length > 0 ? pinById(pinIds[0]).layer : undefined
}
