import { caseStudies, resultById } from '../content'
import { formatMeasured } from '../lib/results'
import styles from './Features.module.css'

export function Features() {
  return (
    <ol className={styles.list}>
      {caseStudies.map((c) => (
        <li key={c.id} className={styles.row}>
          <a className={styles.title} href={`#${c.anchor}`}>
            {c.title}
          </a>{' '}
          <span>{c.summary}</span>{' '}
          <strong className={styles.result}>
            {c.headlineResult ? formatMeasured(resultById(c.headlineResult)) : c.figure}
          </strong>
        </li>
      ))}
    </ol>
  )
}
