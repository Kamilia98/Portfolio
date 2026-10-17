import { useEffect, type ReactNode } from 'react'
import { sections, caseStudies } from './content'
import { Header } from './components/Header'
import { Section } from './components/Section'
import { SectionIndex } from './components/SectionIndex'
import { Features } from './components/Features'
import { Description } from './components/Description'
import { RelatedParts } from './components/RelatedParts'
import { RevisionHistory } from './components/RevisionHistory'
import { OrderingInfo } from './components/OrderingInfo'
import { CaseStudy } from './components/CaseStudy'
import { PinDiagram } from './components/PinDiagram'
import { PinSelectionProvider } from './state/pinSelection'
import styles from './App.module.css'

const bodies: Record<string, ReactNode> = {
  '1-features': <Features />,
  '2-description': <Description />,
  '3-pin-configuration': <PinDiagram />,
  '5-detailed-description': caseStudies.map((c) => <CaseStudy key={c.id} study={c} />),
  '6-related-parts': <RelatedParts />,
  '7-revision-history': <RevisionHistory />,
  '8-ordering-information': <OrderingInfo />,
}

export default function App() {
  // The page renders after load, so the browser has no target to scroll to for a shared #anchor.
  useEffect(() => {
    document.getElementById(window.location.hash.slice(1))?.scrollIntoView()
  }, [])
  return (
    <PinSelectionProvider>
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
    </PinSelectionProvider>
  )
}
