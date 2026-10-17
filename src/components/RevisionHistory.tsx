import { history } from '../content'
import styles from './tables.module.css'

export function RevisionHistory() {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th scope="col">Period</th>
          <th scope="col">Title</th>
          <th scope="col">Detail</th>
        </tr>
      </thead>
      <tbody>
        {history.map((h) => (
          <tr key={h.period + h.title}>
            <td data-label="Period">{h.period}</td>
            <td data-label="Title"><strong>{h.title}</strong></td>
            <td data-label="Detail">{h.detail}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
