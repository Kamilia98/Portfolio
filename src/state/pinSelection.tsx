import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import type { PinId } from '../content/types'

interface PinSelection {
  activePin: PinId | null
  togglePin(id: PinId): void
  isActive(pins: PinId[]): boolean
  isDimmed(pins: PinId[]): boolean
}

const PinSelectionContext = createContext<PinSelection | null>(null)

export function PinSelectionProvider({ children }: { children: ReactNode }) {
  const [activePin, setActivePin] = useState<PinId | null>(null)
  const value = useMemo<PinSelection>(
    () => ({
      activePin,
      togglePin: (id) => setActivePin((current) => (current === id ? null : id)),
      isActive: (pins) => activePin !== null && pins.includes(activePin),
      isDimmed: (pins) => activePin !== null && !pins.includes(activePin),
    }),
    [activePin],
  )
  return <PinSelectionContext.Provider value={value}>{children}</PinSelectionContext.Provider>
}

export function usePinSelection(): PinSelection {
  const value = useContext(PinSelectionContext)
  if (!value) throw new Error('usePinSelection must be used inside PinSelectionProvider')
  return value
}
