import { profile } from '../content'
import styles from './Description.module.css'

export function Description() {
  return <p className={styles.text}>{profile.description.join(' ')}</p>
}
