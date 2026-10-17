import { caseStudies, cvHighlights, cvSkills, earlierWork, history, profile, resultById } from '../content'
import { formatMeasured } from '../lib/results'

function studyResults(ids: string[]): string {
  return ids
    .map((id) => `${resultById(id).label} ${formatMeasured(resultById(id))}`)
    .join('; ')
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
        {profile.description.slice(0, 2).map((p) => (
          <p key={p}>{p}</p>
        ))}
      </section>

      <section>
        <h2>Experience</h2>
        <h3>
          {current.title} <span className="period">{current.period} · Cairo</span>
        </h3>
        <ul>
          {caseStudies.map((c) => (
            <li key={c.id}>
              <strong>{c.title}:</strong> {c.cv}
              {c.resultIds.length > 0 && ` ${studyResults(c.resultIds)}.`}
            </li>
          ))}
          <li>{resultById('frontend-build').label} {formatMeasured(resultById('frontend-build'))}.</li>
          {cvHighlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Skills</h2>
        <ul className="plain skills">
          {cvSkills.map((sk) => (
            <li key={sk.label}>
              <strong>{sk.label}:</strong> {sk.items}
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

      {/* Education and freelance share one row, so the CV fits one A4 page. */}
      <div className="pair">
        <section>
          <h2>Education</h2>
          <ul className="plain ruled">
            {education.map((h) => (
              <li key={h.title}>
                <strong>{h.title}</strong>
                <span className="when">{h.period}</span>
                <span className="detail">{h.detail}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2>Freelance</h2>
          <ul className="plain ruled">
            {freelance.map((h) => (
              <li key={h.title}>
                <strong>{h.title}</strong>
                <span className="when">{h.period}</span>
                <span className="detail">{h.detail}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  )
}
