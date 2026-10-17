import { sections } from '../content'
import { useActiveSection } from '../lib/useActiveSection'
import styles from './SectionIndex.module.css'

export function SectionIndex() {
  const active = useActiveSection(sections.map((s) => s.id))
  return (
    <nav aria-label="Sections" className={styles.nav}>
      <ol className={styles.list}>
        {sections.map((s) => (
          <li key={s.id} className={styles.item}>
            <a
              href={`#${s.id}`}
              className={styles.link}
              aria-current={active === s.id ? 'location' : undefined}
            >
              {`${s.number} ${s.title}`}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
