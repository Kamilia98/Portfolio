import type { Diagram } from '../content/types'
import { usePinSelection } from '../state/pinSelection'
import styles from './BlockDiagram.module.css'

export function BlockDiagram({ diagram }: { diagram: Diagram }) {
  const { isActive, isDimmed } = usePinSelection()
  return (
    <figure className={styles.figure}>
      <figcaption className={styles.caption}>{diagram.caption}</figcaption>
      <ol className={styles.stages}>
        {diagram.stages.map((stage) => (
          <li key={stage.title} className={styles.stage}>
            <p className={styles.stageTitle}>{stage.title}</p>
            <ul className={styles.blocks}>
              {stage.blocks.map((block) => (
                <li
                  key={block.id}
                  className={styles.block}
                  data-active={isActive(block.pins) ? 'true' : undefined}
                  data-dimmed={isDimmed(block.pins) ? 'true' : undefined}
                >
                  {block.label}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </figure>
  )
}
