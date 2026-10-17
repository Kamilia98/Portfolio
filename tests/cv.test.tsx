import { render, screen } from '@testing-library/react'
import { CvDocument } from '../src/cv/CvDocument'
import { caseStudies } from '../src/content'

describe('CvDocument', () => {
  it('shows the name, the phone and the education', () => {
    render(<CvDocument />)
    expect(screen.getByRole('heading', { level: 1, name: 'Kamilia Ahmed Hamed' })).toBeInTheDocument()
    expect(screen.getByText('+20 112 452 9888')).toBeInTheDocument()
    expect(screen.getByText(/Zagazig University/)).toBeInTheDocument()
  })

  it('lists every case study and the headline result', () => {
    render(<CvDocument />)
    for (const c of caseStudies) expect(screen.getByText(`${c.title}:`)).toBeInTheDocument()
    expect(screen.getByText(/−93%/)).toBeInTheDocument()
  })
})
