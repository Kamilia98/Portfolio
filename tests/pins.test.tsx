import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PinSelectionProvider } from '../src/state/pinSelection'
import { PinDiagram } from '../src/components/PinDiagram'
import { pins } from '../src/content'

function setup() {
  render(
    <PinSelectionProvider>
      <PinDiagram />
    </PinSelectionProvider>,
  )
}
const states = () => pins.map((p) => screen.getByRole('button', { name: p.label }).getAttribute('aria-pressed'))

describe('PinDiagram', () => {
  it('selects one pin and clears it on a second click', async () => {
    setup()
    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: 'React' }))
    expect(states()).toEqual(['true', ...Array(7).fill('false')])
    await user.click(screen.getByRole('button', { name: 'React' }))
    expect(states()).toEqual(Array(8).fill('false'))
  })

  it('toggles a pin with the keyboard', async () => {
    setup()
    const user = userEvent.setup()
    await user.tab()
    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'React' }))
    await user.keyboard(' ')
    expect(screen.getByRole('button', { name: 'React' })).toHaveAttribute('aria-pressed', 'true')
  })

  it('shows how many case studies use a pin', () => {
    setup()
    expect(screen.getByRole('button', { name: 'Elasticsearch' })).toHaveAccessibleDescription('in 2 case studies')
    expect(screen.getAllByText('in 1 case study').length).toBeGreaterThan(0)
    expect(screen.getByText('Select a pin to see where it is used.')).toBeTruthy()
  })
})

describe('Pin readout', () => {
  it('lists and links the case studies that use the selected pin, and goes back to the hint', async () => {
    setup()
    const user = userEvent.setup()
    const readout = screen.getByText('Select a pin to see where it is used.')
    expect(readout).toHaveAttribute('aria-live', 'polite')
    await user.click(screen.getByRole('button', { name: 'Elasticsearch' }))
    expect(readout.textContent).toBe('Elasticsearch is used in 5.1 Ask your data · 5.2 Chart speed')
    expect(within(readout).getAllByRole('link').map((a) => a.getAttribute('href'))).toEqual(['#5-1-ask-your-data', '#5-2-chart-speed'])
    await user.click(screen.getByRole('button', { name: 'Elasticsearch' }))
    expect(readout.textContent).toBe('Select a pin to see where it is used.')
  })
})
