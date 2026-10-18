import { caseStudies, earlierWork, history, profile, resultById } from '../content'
import { cvHighlights, cvPhone, cvSkills } from '../content/cv'
import type { CaseStudy, HistoryEntry, Result } from '../content/types'
import { formatMeasured } from '../lib/results'

/** The link text on the sheet: "linkedin.com/in/kamiliaahmed"; the href keeps the full URL. */
function shortUrl(url: string): string {
  return url.replace(/^https:\/\/(www\.)?/, '').replace(/\/$/, '')
}

/** "Jul 2025 – now · Cairo", or the period alone when the entry names no place. */
function when(h: HistoryEntry): string {
  return h.place ? `${h.period} · ${h.place}` : h.period
}

/** "Slowest chart load: 63 s → 4.3 s (−93%)"; a later result in the same sentence starts in lower case. */
function resultText(r: Result, first = true): string {
  const label = first ? r.label : r.label.charAt(0).toLowerCase() + r.label.slice(1)
  return `${label}: ${formatMeasured(r)}`
}

/** The timed results after a study's CV text, then where they were measured. Counts stay on the site. */
function resultsSentence(study: CaseStudy): string {
  const timed = study.resultIds.map(resultById).filter((r) => r.unit)
  if (timed.length === 0) return ''
  const results = timed.map((r, i) => resultText(r, i === 0)).join('; ')
  return ` ${results}${study.cvResultNote ? `, ${study.cvResultNote}` : ''}.`
}

export function CvDocument() {
  // History runs newest first, so the first job is the current one.
  const [current] = history.filter((h) => h.kind === 'work')
  const education = history.filter((h) => h.kind === 'education')
  const freelance = history.filter((h) => h.kind === 'freelance')

  return (
    <main className="sheet">
      <header className="head">
        <h1>{profile.fullName}</h1>
        <p className="role">{profile.role}</p>
        <p className="contact">
          <span>{profile.location}</span>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <span>{cvPhone}</span>
          <a href={profile.linkedin}>{shortUrl(profile.linkedin)}</a>
          <a href={profile.github}>{shortUrl(profile.github)}</a>
          <a href={profile.site}>{shortUrl(profile.site)}</a>
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
        <h3 className="job">
          <span>{current.title}</span>
          <span className="period">{when(current)}</span>
        </h3>
        <ul>
          {caseStudies.map((c) => (
            <li key={c.id}>
              <strong>{c.title}:</strong> {c.cv}
              {resultsSentence(c)}
            </li>
          ))}
          <li>{resultText(resultById('frontend-build'))}.</li>
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
                <span className="when">{when(h)}</span>
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
                <span className="when">{when(h)}</span>
                <span className="detail">{h.detail}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  )
}
