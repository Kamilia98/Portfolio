import { caseStudies, resultById } from '../content'
import { formatPercent, formatResult, percentChange } from '../lib/results'
import styles from './Features.module.css'

export function Features() {
  return (
    <ol className={styles.list}>
      {caseStudies.map((c) => {
        const r = c.headlineResult ? resultById(c.headlineResult) : undefined
        return (
          <li key={c.id} className={styles.row}>
            <a className={styles.title} href={`#${c.anchor}`}>{c.title}</a>
            {' '}
            <span>{c.summary}</span>
            {r && (
              <>
                {' '}
                <strong className={styles.result}>
                  {`${formatResult(r)} (${formatPercent(percentChange(r.before, r.after))})`}
                </strong>
              </>
            )}
          </li>
        )
      })}
    </ol>
  )
}
