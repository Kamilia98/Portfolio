import { pins as allPins, resultById } from '../content'
import type { CaseStudy as CaseStudyData } from '../content/types'
import { formatMeasured } from '../lib/results'
import { usePinSelection } from '../state/pinSelection'
import { BlockDiagram } from './BlockDiagram'
import styles from './CaseStudy.module.css'

export function CaseStudy({ study }: { study: CaseStudyData }) {
  const { activePin, isActive, isDimmed } = usePinSelection()
  const stack = study.pins.map((id) => allPins.find((p) => p.id === id)!)
  return (
    <article
      id={study.anchor}
      className={styles.study}
      data-active={isActive(study.pins) ? 'true' : undefined}
      data-dimmed={isDimmed(study.pins) ? 'true' : undefined}
    >
      <div className={styles.head}>
        <h3 className={styles.title}>{`${study.number} ${study.title}`}</h3>
        <p className={styles.status}>{study.status}</p>
      </div>
      <h4 className={styles.part}>Problem</h4>
      <p className={styles.text}>{study.problem}</p>
      <h4 className={styles.part}>What I built</h4>
      <ul className={styles.built}>
        {study.built.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
      <h4 className={styles.part}>How it works</h4>
      {study.diagrams.map((d) => (
        <BlockDiagram key={d.caption} diagram={d} />
      ))}
      <h4 className={styles.part}>Result</h4>
      {study.resultIds.length === 0 ? (
        <p className={styles.text}>{study.summary}</p>
      ) : (
        <ul className={styles.results}>
          {study.resultIds.map((id) => {
            const r = resultById(id)
            return (
              <li key={id}>
                {`${r.label}: `}
                <span className={styles.value}>{formatMeasured(r)}</span>
              </li>
            )
          })}
        </ul>
      )}
      {study.resultNote && <p className={styles.note}>{study.resultNote}</p>}
      <h4 className={styles.part}>Stack</h4>
      <p className={styles.text}>
        {stack.map((p, i) => (
          <span key={p.id}>
            {i > 0 && ', '}
            <span className={styles.stackItem} data-active={p.id === activePin ? 'true' : undefined}>
              {p.label}
            </span>
          </span>
        ))}
      </p>
    </article>
  )
}
