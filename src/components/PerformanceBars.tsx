import { useRef, useState } from 'react'
import { results } from '../content'
import { percentChange, formatValue, formatPercent } from '../lib/results'
import { useInView } from '../lib/useInView'
import styles from './PerformanceBars.module.css'

export function PerformanceBars() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref)
  const [reduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const rows = results.filter((r) => r.unit === 's')
  return (
    <div ref={ref} className={styles.bars}>
      {rows.map((r) => {
        const change = formatPercent(percentChange(r.before, r.after))
        const before = formatValue(r.before, r.unit)
        const after = formatValue(r.after, r.unit)
        const finalWidth = `${(r.after / r.before * 100).toFixed(2)}%`
        const width = reduced || inView ? finalWidth : '100%'
        return (
          <div key={r.id} className={styles.row}>
            <div className={styles.label}>{r.label}</div>
            <div className={styles.group} role="img" aria-label={`${before} before, ${after} after, ${change}`}>
              <div className={styles.line}>
                <span className={styles.value}>{before}</span>
                <span className={styles.track}>
                  <span className={styles.before} />
                </span>
              </div>
              <div className={styles.line}>
                <span className={styles.value}>{after}</span>
                <span className={`${styles.track} ${styles.afterTrack}`}>
                  <span
                    className={styles.after}
                    data-testid="after-bar"
                    data-animated={reduced ? 'false' : 'true'}
                    style={{ width }}
                  />
                </span>
              </div>
            </div>
            <div className={styles.change}>{change}</div>
          </div>
        )
      })}
    </div>
  )
}
