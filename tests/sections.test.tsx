import { render, screen, within } from '@testing-library/react'
import { Features } from '../src/components/Features'
import { Description } from '../src/components/Description'
import { RelatedParts } from '../src/components/RelatedParts'
import { RevisionHistory } from '../src/components/RevisionHistory'
import { OrderingInfo } from '../src/components/OrderingInfo'

describe('Features', () => {
  it('links the four case studies and shows headline results', () => {
    const { container } = render(<Features />)
    const hrefs = within(container).getAllByRole('link').map((a) => a.getAttribute('href'))
    expect(hrefs).toEqual(['#5-1-ask-your-data', '#5-2-chart-speed', '#5-3-ai-cost-dashboard', '#5-4-one-interface'])
    expect(container.textContent).toContain('63 s → 4.3 s (−93%)')
    expect(container.textContent).toContain('5 → 1 (−80%)')
  })
})

describe('Description', () => {
  it('renders one paragraph', () => {
    const { container } = render(<Description />)
    expect(container.querySelectorAll('p')).toHaveLength(1)
    expect(container.textContent).toContain('I build features for AIM Insights')
  })
})

describe('RelatedParts', () => {
  it('has six body rows and links Bloogy live', () => {
    render(<RelatedParts />)
    const rows = screen.getAllByRole('row')
    expect(rows).toHaveLength(7)
    const bloogy = rows.find((r) => r.textContent?.includes('Bloogy'))!
    const live = within(bloogy).getByRole('link', { name: /live/i })
    expect(live.getAttribute('href')).toBe('https://bloogy-ashy.vercel.app')
    expect(live.getAttribute('rel')).toBe('noopener noreferrer')
  })

  // The accessible name itself ("Code for Bloogy") is checked in a real browser in e2e/shell.spec.ts:
  // jsdom's name computation drops the space at the start of the hidden text.
  it('carries the part name inside each link', () => {
    render(<RelatedParts />)
    const bloogy = screen.getAllByRole('row').find((r) => r.textContent?.includes('Bloogy'))!
    expect(within(bloogy).getAllByRole('link').map((a) => a.textContent)).toEqual(['Code for Bloogy', 'Live site for Bloogy'])
  })
})

describe('RevisionHistory', () => {
  it('starts with the current role', () => {
    render(<RevisionHistory />)
    const rows = screen.getAllByRole('row')
    expect(within(rows[1]).getAllByRole('cell')[0].textContent).toBe('Jul 2025 – now')
  })
})

describe('OrderingInfo', () => {
  it('links the CV under the base path', () => {
    render(<OrderingInfo />)
    expect(screen.getByRole('link', { name: /CV|kamilia-ahmed-hamed/i }).getAttribute('href')).toBe('/Portfolio/kamilia-ahmed-hamed.pdf')
  })
})
