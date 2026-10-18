import { useEffect, useRef } from 'react'
import { sections } from '../content'
import { useActiveSection } from '../lib/useActiveSection'
import styles from './SectionIndex.module.css'

export function SectionIndex() {
  const active = useActiveSection(sections.map((s) => s.id))
  const navRef = useRef<HTMLElement>(null)

  // On a phone the index is a sideways-scrolling bar: keep the marked section in sight, also when the
  // links change width after the bar was scrolled (the web font arrives after the first render).
  useEffect(() => {
    const nav = navRef.current!
    const reveal = () => {
      const link = nav.querySelector<HTMLElement>('[aria-current="location"]')
      if (!link || nav.scrollWidth <= nav.clientWidth) return
      const start = link.offsetLeft
      const end = start + link.offsetWidth
      if (start < nav.scrollLeft || end > nav.scrollLeft + nav.clientWidth) {
        nav.scrollTo({ left: start - (nav.clientWidth - link.offsetWidth) / 2 })
      }
    }
    reveal()
    const observer = new ResizeObserver(reveal)
    observer.observe(nav.firstElementChild!)
    return () => observer.disconnect()
  }, [active])

  return (
    <nav ref={navRef} aria-label="Sections" className={styles.nav}>
      <ol className={styles.list}>
        {sections.map((s) => {
          const label = `${s.number} ${s.title}`
          return (
            <li key={s.id} className={styles.item}>
              <a
                href={`#${s.id}`}
                className={styles.link}
                data-label={label}
                aria-current={active === s.id ? 'location' : undefined}
              >
                {label}
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
