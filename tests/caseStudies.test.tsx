import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PinSelectionProvider } from '../src/state/pinSelection'
import { PinDiagram } from '../src/components/PinDiagram'
import { CaseStudy } from '../src/components/CaseStudy'
import { caseStudies } from '../src/content'

function setup() {
  return render(
    <PinSelectionProvider>
      <PinDiagram />
      {caseStudies.map((c) => <CaseStudy key={c.id} study={c} />)}
    </PinSelectionProvider>,
  )
}
const byId = (id: string) => document.getElementById(id) as HTMLElement

describe('CaseStudy', () => {
  it('shows the five parts in a fixed order', () => {
    setup()
    const heads = [...byId('5-2-chart-speed').querySelectorAll('h4')].map((h) => h.textContent)
    expect(heads).toEqual(['Problem', 'What I built', 'How it works', 'Result', 'Stack'])
  })

  it('computes the result line from the content', () => {
    setup()
    expect(byId('5-2-chart-speed').textContent).toContain('Slowest chart load: 63 s → 4.3 s (−93%)')
  })

  it('highlights matching blocks and dims other studies for the selected pin', async () => {
    setup()
    await userEvent.setup().click(screen.getByRole('button', { name: 'Elasticsearch' }))
    expect(document.querySelectorAll('[data-active="true"]').length).toBe(3)
    expect(byId('5-3-ai-cost-dashboard')).toHaveAttribute('data-dimmed', 'true')
    expect(byId('5-4-one-interface')).toHaveAttribute('data-dimmed', 'true')
    expect(byId('5-1-ask-your-data')).not.toHaveAttribute('data-dimmed')
  })
})
