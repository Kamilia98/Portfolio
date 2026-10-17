import { render, screen } from '@testing-library/react'
import { vi, beforeEach, afterEach, describe, it, expect } from 'vitest'
import { PerformanceBars } from '../src/components/PerformanceBars'

function stubs(reduced: boolean) {
  class InView {
    constructor(private cb: IntersectionObserverCallback) {}
    observe(el: Element) {
      this.cb(
        [{ isIntersecting: true, target: el } as IntersectionObserverEntry],
        this as unknown as IntersectionObserver,
      )
    }
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return []
    }
  }
  vi.stubGlobal('IntersectionObserver', InView)
  vi.stubGlobal('matchMedia', (query: string) => ({
    matches: reduced && query === '(prefers-reduced-motion: reduce)',
    media: query,
    addEventListener() {},
    removeEventListener() {},
  }))
}

afterEach(() => vi.unstubAllGlobals())

describe('PerformanceBars', () => {
  beforeEach(() => stubs(false))

  it('renders three rows, one per result measured in seconds', () => {
    render(<PerformanceBars />)
    expect(screen.getAllByRole('img')).toHaveLength(3)
    expect(screen.queryByText(/Dialog components/)).toBeNull()
  })

  it('labels each bar group with before, after and the change', () => {
    render(<PerformanceBars />)
    expect(screen.getByRole('img', { name: '63 s before, 4.3 s after, −93%' })).toBeInTheDocument()
  })

  it('shows the computed percentage changes', () => {
    render(<PerformanceBars />)
    for (const t of ['−93%', '−81%', '−42%']) expect(screen.getByText(t)).toBeInTheDocument()
  })

  it('sizes the after bar from the measured values once in view', () => {
    render(<PerformanceBars />)
    const after = screen.getAllByTestId('after-bar')[0]
    expect(after.style.width).toBe('6.83%')
    expect(after).toHaveAttribute('data-animated', 'true')
  })
})

describe('PerformanceBars with reduced motion', () => {
  it('has the final width from the first render and does not animate', () => {
    stubs(true)
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        observe() {}
        unobserve() {}
        disconnect() {}
        takeRecords() {
          return []
        }
      },
    )
    render(<PerformanceBars />)
    const after = screen.getAllByTestId('after-bar')[0]
    expect(after).toHaveAttribute('data-animated', 'false')
    expect(after.style.width).toBe('6.83%')
  })
})
