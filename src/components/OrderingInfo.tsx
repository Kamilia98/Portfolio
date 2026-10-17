import { profile } from '../content'
import { cvHref } from '../lib/links'
import styles from './OrderingInfo.module.css'

export function OrderingInfo() {
  const rows: { term: string; href: string; text: string }[] = [
    { term: 'Email', href: `mailto:${profile.email}`, text: profile.email },
    { term: 'LinkedIn', href: profile.linkedin, text: profile.linkedin },
    { term: 'GitHub', href: profile.github, text: profile.github },
    { term: 'CV (PDF)', href: cvHref, text: profile.cvFile },
  ]
  return (
    <dl className={styles.list}>
      {rows.map((r) => (
        <div key={r.term} className={styles.row}>
          <dt className={styles.term}>{r.term}</dt>
          <dd className={styles.value}>
            <a href={r.href}>{r.text}</a>
          </dd>
        </div>
      ))}
    </dl>
  )
}
