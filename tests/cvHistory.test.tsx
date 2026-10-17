import { render, screen, within } from '@testing-library/react'
import { vi } from 'vitest'
import { CvDocument } from '../src/cv/CvDocument'

// Out of order, and no title says what kind it is: only `kind` can sort these.
vi.mock('../src/content/history', () => ({
  history: [
    { kind: 'education', period: 'Sep 2019 – Jul 2024', title: 'A school', detail: 'One' },
    { kind: 'freelance', period: 'Sep 2023 – now', title: 'Contract work', detail: 'Two' },
    { kind: 'work', period: 'Jul 2025 – now', title: 'Engineer, a company', detail: 'Three' },
  ],
}))

const names = (heading: string) =>
  within(screen.getByRole('heading', { level: 2, name: heading }).parentElement!)
    .getAllByRole('listitem')
    .map((li) => li.querySelector('strong')!.textContent)

test('the CV picks the job, the education and the freelance work by kind', () => {
  render(<CvDocument />)
  expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(/^Engineer, a company/)
  expect(names('Education')).toEqual(['A school'])
  expect(names('Freelance')).toEqual(['Contract work'])
})
