import { earlierWork } from '../content'
import styles from './tables.module.css'

const external = { target: '_blank', rel: 'noopener noreferrer' } as const

export function RelatedParts() {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th scope="col">Part</th>
          <th scope="col">What it is</th>
          <th scope="col">Stack</th>
          <th scope="col">Links</th>
        </tr>
      </thead>
      <tbody>
        {earlierWork.map((w) => (
          <tr key={w.name}>
            <th scope="row">{w.name}</th>
            <td data-label="What it is">{w.what}</td>
            <td data-label="Stack">{w.stack}</td>
            <td data-label="Links" className={styles.links}>
              <a href={w.url} {...external}>Code</a>
              {w.live && <a href={w.live} {...external}>Live</a>}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
