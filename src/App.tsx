import { sections } from './content'
import { Header } from './components/Header'
import { Section } from './components/Section'
import { SectionIndex } from './components/SectionIndex'
import styles from './App.module.css'

export default function App() {
  return (
    <div className={styles.page}>
      <SectionIndex />
      <main className={styles.main}>
        <Header />
        {sections.map((info) => (
          <Section key={info.id} info={info}>
            {null}
          </Section>
        ))}
      </main>
    </div>
  )
}
