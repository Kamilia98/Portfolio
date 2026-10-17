import { render, screen } from '@testing-library/react'
import { CvDocument } from '../src/cv/CvDocument'
import { caseStudies, profile } from '../src/content'

describe('CvDocument', () => {
  it('shows the name, the phone and the education', () => {
    render(<CvDocument />)
    expect(screen.getByRole('heading', { level: 1, name: 'Kamilia Ahmed Hamed' })).toBeInTheDocument()
    expect(screen.getByText('+20 112 452 9888')).toBeInTheDocument()
    expect(screen.getByText(/Zagazig University/)).toBeInTheDocument()
  })

  it('links the email, LinkedIn, GitHub and the site by their full URLs', () => {
    render(<CvDocument />)
    const href = (name: string) => screen.getByRole('link', { name }).getAttribute('href')
    expect(href(profile.email)).toBe(`mailto:${profile.email}`)
    expect(href('linkedin.com/in/kamiliaahmed')).toBe(profile.linkedin)
    expect(href('github.com/Kamilia98')).toBe(profile.github)
    expect(href('kamilia98.github.io/Portfolio')).toBe(profile.site)
  })

  it('lists every case study', () => {
    render(<CvDocument />)
    for (const c of caseStudies) expect(screen.getByText(`${c.title}:`)).toBeInTheDocument()
  })

  it('writes the chart speed bullet with both computed results', () => {
    render(<CvDocument />)
    const li = screen.getByText('Chart speed:').closest('li')!
    expect(li.textContent).toBe(
      'Chart speed: Tag breakdowns sent to Elasticsearch once instead of once per tab. Slowest chart load 63 s → 4.3 s (−93%); Fifteen heavy charts, together 262 s → 50 s (−81%).',
    )
  })

  it('writes the other computed bullets', () => {
    render(<CvDocument />)
    expect(screen.getByText(/ESLint rules\. Dialog components 5 → 1\.$/)).toBeInTheDocument()
    expect(screen.getByText('Frontend image build 89 s → 52 s (−42%).')).toBeInTheDocument()
  })

  it('mentions the commit count once', () => {
    const { container } = render(<CvDocument />)
    expect(container.textContent!.match(/4,400/g)).toHaveLength(1)
  })

  it('heads the experience from the history entry', () => {
    render(<CvDocument />)
    expect(screen.getByText('Jul 2025 – now · Cairo')).toBeInTheDocument()
    expect(screen.getByText(/^Full-stack engineer, AIM Technologies/)).toBeInTheDocument()
  })
})

test('a count without a unit carries no percentage', () => {
  const { container } = render(<CvDocument />)
  expect(container.textContent).not.toContain('−80%')
})
