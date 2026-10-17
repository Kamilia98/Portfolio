import type { ReactNode } from 'react'
import type { SectionInfo } from '../content/types'
import styles from './Section.module.css'

export function Section({ info, children }: { info: SectionInfo; children: ReactNode }) {
  const headingId = `${info.id}-heading`
  return (
    <section id={info.id} aria-labelledby={headingId} className={styles.section}>
      <h2 id={headingId} className={styles.heading}>{`${info.number} ${info.title}`}</h2>
      {children}
    </section>
  )
}
