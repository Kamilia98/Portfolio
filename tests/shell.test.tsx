import { render, screen, within } from '@testing-library/react'
import App from '../src/App'
import { pins, profile } from '../src/content'
import { atPageBottom } from '../src/lib/useActiveSection'

const titles = [
  '1 Features',
  '2 Description',
  '3 Pin configuration',
  '4 Typical performance characteristics',
  '5 Detailed description',
  '6 Related parts',
  '7 Revision history',
  '8 Ordering information',
]
const ids = [
  '1-features',
  '2-description',
  '3-pin-configuration',
  '4-typical-performance',
  '5-detailed-description',
  '6-related-parts',
  '7-revision-history',
  '8-ordering-information',
]

test('renders eight numbered h2 headings in order', () => {
  render(<App />)
  const h2s = screen.getAllByRole('heading', { level: 2 }).map((h) => h.textContent)
  expect(h2s.slice(0, 8)).toEqual(titles)
})

test('the section index links to every section', () => {
  render(<App />)
  const links = within(screen.getByRole('navigation', { name: 'Sections' })).getAllByRole('link')
  expect(links.map((a) => a.getAttribute('href'))).toEqual(ids.map((i) => `#${i}`))
})

test('header links', () => {
  render(<App />)
  expect(screen.getByRole('link', { name: 'Download CV' })).toHaveAttribute(
    'href',
    '/Portfolio/kamilia-ahmed-hamed.pdf',
  )
  expect(screen.getByRole('link', { name: 'Email' })).toHaveAttribute('href', 'mailto:kamiliaahmed01@gmail.com')
})

test('the phone number is not on the page', () => {
  const { container } = render(<App />)
  expect(container.textContent).not.toContain('112 452')
})

test('atPageBottom is true within 2px of the end only', () => {
  expect(atPageBottom(1000, 700, 1700)).toBe(true)
  expect(atPageBottom(998, 700, 1700)).toBe(true)
  expect(atPageBottom(900, 700, 1700)).toBe(false)
})

test('the header lists the stack from the pin labels', () => {
  render(<App />)
  const header = screen.getByRole('banner')
  const line = within(header).getByText(/^React · /)
  expect(line.textContent!.replace(/\u00A0/g, ' ')).toBe(pins.map((p) => p.label).join(' · '))
})

test('the role keeps "React + Node" on one line', () => {
  expect(profile.role).toContain('React\u00A0+\u00A0Node')
})

test('the first section is marked before any section reaches the reading band', () => {
  render(<App />)
  const nav = screen.getByRole('navigation', { name: 'Sections' })
  expect(within(nav).getByRole('link', { name: '1 Features' })).toHaveAttribute('aria-current', 'location')
})
