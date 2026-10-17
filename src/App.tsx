import type { ReactNode } from 'react'
import { sections } from './content'
import { Header } from './components/Header'
import { Section } from './components/Section'
import { SectionIndex } from './components/SectionIndex'
import { Features } from './components/Features'
import { Description } from './components/Description'
import { RelatedParts } from './components/RelatedParts'
import { RevisionHistory } from './components/RevisionHistory'
import { OrderingInfo } from './components/OrderingInfo'
import styles from './App.module.css'

const bodies: Record<string, ReactNode> = {
  '1-features': <Features />,
  '2-description': <Description />,
  '6-related-parts': <RelatedParts />,
  '7-revision-history': <RevisionHistory />,
  '8-ordering-information': <OrderingInfo />,
}

export default function App() {
  return (
    <div className={styles.page}>
      <SectionIndex />
      <main className={styles.main}>
        <Header />
        {sections.map((info) => (
          <Section key={info.id} info={info}>
            {bodies[info.id] ?? null}
          </Section>
        ))}
      </main>
    </div>
  )
}
