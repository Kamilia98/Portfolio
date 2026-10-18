import { pins, profile } from '../content'
import { cvDownloads, cvHref } from '../lib/links'
import styles from './Header.module.css'

export function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.name}>{profile.name}</h1>
      <p className={styles.role}>{profile.role}</p>
      <p className={styles.location}>{profile.location}</p>
      {/* No-break spaces inside a label, so the line wraps only between technologies. */}
      <p className={styles.stack}>{pins.map((p) => p.label.replaceAll(' ', '\u00A0')).join(' · ')}</p>
      <div className={styles.links}>
        <a className={`${styles.button} ${styles.primary}`} href={cvHref} download={cvDownloads}>
          Download CV
        </a>
        <a className={styles.button} href={`mailto:${profile.email}`}>
          Email
        </a>
        <a className={styles.button} href={profile.linkedin}>
          LinkedIn
        </a>
        <a className={styles.button} href={profile.github}>
          GitHub
        </a>
      </div>
    </header>
  )
}
