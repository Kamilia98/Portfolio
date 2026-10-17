import { pins as allPins, resultById } from '../content'
import type { CaseStudy as CaseStudyData } from '../content/types'
import { formatPercent, formatResult, percentChange } from '../lib/results'
import { usePinSelection } from '../state/pinSelection'
import { BlockDiagram } from './BlockDiagram'
import styles from './CaseStudy.module.css'

export function CaseStudy({ study }: { study: CaseStudyData }) {
  const { isDimmed } = usePinSelection()
  const stack = study.pins.map((id) => allPins.find((p) => p.id === id)!.label).join(', ')
  return (
    <article id={study.anchor} className={styles.study} data-dimmed={isDimmed(study.pins) ? 'true' : undefined}>
      <h3 className={styles.title}>
        {`${study.number} ${study.title}`}
        <span className={styles.status}>{study.status}</span>
      </h3>
      <h4 className={styles.part}>Problem</h4>
      <p className={styles.text}>{study.problem}</p>
      <h4 className={styles.part}>What I built</h4>
      <ul className={styles.built}>
        {study.built.map((b) => <li key={b}>{b}</li>)}
      </ul>
      <h4 className={styles.part}>How it works</h4>
      {study.diagrams.map((d) => <BlockDiagram key={d.caption} diagram={d} />)}
      <h4 className={styles.part}>Result</h4>
      {study.resultIds.length === 0 ? (
        <p className={styles.text}>{study.summary}</p>
      ) : (
        <ul className={styles.results}>
          {study.resultIds.map((id) => {
            const r = resultById(id)
            return (
              <li key={id}>
                {`${r.label}: ${formatResult(r)} (${formatPercent(percentChange(r.before, r.after))})`}
              </li>
            )
          })}
        </ul>
      )}
      {study.resultNote && <p className={styles.note}>{study.resultNote}</p>}
      <h4 className={styles.part}>Stack</h4>
      <p className={styles.text}>{stack}</p>
    </article>
  )
}
