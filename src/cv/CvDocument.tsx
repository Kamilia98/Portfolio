import { caseStudies, earlierWork, history, profile, resultById } from '../content'
import { formatPercent, formatResult, percentChange } from '../lib/results'

const skills: [string, string][] = [
  ['Core', 'React, TypeScript, Node.js, NestJS'],
  ['Data', 'Elasticsearch, MongoDB'],
  ['AI', 'LLM features via Portkey'],
  ['Testing', 'Jest, Playwright'],
  ['Also used', 'Next.js, Angular, Vue, Ant Design, Tailwind CSS, Material UI'],
]

function withPercent(id: string): string {
  const r = resultById(id)
  return `${formatResult(r)} (${formatPercent(percentChange(r.before, r.after))})`
}

export function CvDocument() {
  const [current, ...rest] = history
  const freelance = rest.filter((h) => h.title.startsWith('Freelance'))
  const education = rest.filter((h) => !h.title.startsWith('Freelance'))

  return (
    <main className="sheet">
      <header className="head">
        <h1>{profile.fullName}</h1>
        <p className="role">{profile.role}</p>
        <p className="contact">
          <span>{profile.location}</span>
          <span>{profile.email}</span>
          <span>{profile.phone}</span>
          <span>{profile.linkedin.replace('https://www.', '')}</span>
          <span>{profile.github.replace('https://', '')}</span>
          <span>{profile.site.replace('https://', '')}</span>
        </p>
      </header>

      <section>
        <h2>Summary</h2>
        {profile.description.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </section>

      <section>
        <h2>Experience</h2>
        <h3>
          AIM Technologies — Full-stack engineer, <span className="period">{current.period}</span>
        </h3>
        <ul>
          {caseStudies.map((c) => (
            <li key={c.id}>
              <strong>{c.title}:</strong> {c.summary}
              {c.headlineResult && <> <strong>{withPercent(c.headlineResult)}</strong></>}
            </li>
          ))}
          <li>Frontend image build {withPercent('frontend-build')}.</li>
          <li>Site speed fix (gzip, trimmed CSS) with 17 production errors resolved.</li>
          <li>About 4,400 commits across 16 repositories by October 2026.</li>
        </ul>
      </section>

      <section>
        <h2>Skills</h2>
        <ul className="plain">
          {skills.map(([label, items]) => (
            <li key={label}>
              <strong>{label}:</strong> {items}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Earlier work</h2>
        <ul className="plain ruled">
          {earlierWork.map((w) => (
            <li key={w.name}>
              <strong>{w.name}</strong> — {w.what} <span className="stack">({w.stack})</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Education</h2>
        <ul className="plain ruled">
          {education.map((h) => (
            <li key={h.title}>
              <strong>{h.title}</strong> <span className="period">{h.period}</span>
              <br />
              {h.detail}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Freelance</h2>
        <ul className="plain ruled">
          {freelance.map((h) => (
            <li key={h.title}>
              <strong>{h.title}</strong> <span className="period">{h.period}</span>
              <br />
              {h.detail}
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
