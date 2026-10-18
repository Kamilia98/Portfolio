import { caseStudies, layers, pins, profile } from '../content'
import type { Pin } from '../content/types'
import { usePinSelection } from '../state/pinSelection'
import styles from './PinDiagram.module.css'

function countText(n: number) {
  return `in ${n} case ${n === 1 ? 'study' : 'studies'}`
}

function PinItem({ pin }: { pin: Pin }) {
  const { activePin, togglePin } = usePinSelection()
  const active = activePin === pin.id
  const dimmed = activePin !== null && !active
  const count = caseStudies.filter((c) => c.pins.includes(pin.id)).length
  const countId = `pin-count-${pin.id}`
  const cls = [styles.pin, active ? styles.active : '', dimmed ? styles.dimmed : ''].join(' ')
  return (
    <li className={cls} data-layer={pin.layer}>
      <span className={styles.lead} aria-hidden="true" />
      <span className={styles.label}>
        <button
          type="button"
          className={styles.button}
          aria-pressed={active}
          aria-describedby={countId}
          onClick={() => togglePin(pin.id)}
        >
          {pin.label}
        </button>
        <span id={countId} className={styles.count}>
          {countText(count)}
        </span>
      </span>
    </li>
  )
}

export function PinDiagram() {
  const half = pins.length / 2
  return (
    <div>
      <div className={styles.diagram}>
        <ul className={`${styles.side} ${styles.left}`}>
          {pins.slice(0, half).map((p) => (
            <PinItem key={p.id} pin={p} />
          ))}
        </ul>
        <div className={styles.chip} aria-hidden="true">
          {profile.name}
        </div>
        <ul className={`${styles.side} ${styles.right}`}>
          {pins.slice(half).map((p) => (
            <PinItem key={p.id} pin={p} />
          ))}
        </ul>
      </div>
      <ul className={styles.legend} aria-label="Pin colours">
        {layers.map((l) => (
          <li key={l.id} data-layer={l.id}>
            <span className={styles.swatch} aria-hidden="true" />
            {l.label}
          </li>
        ))}
      </ul>
      <Readout />
    </div>
  )
}

/** Under the chip: where the selected pin is used, or how to select one. Announced when it changes. */
function Readout() {
  const { activePin } = usePinSelection()
  const pin = pins.find((p) => p.id === activePin)
  const studies = pin ? caseStudies.filter((c) => c.pins.includes(pin.id)) : []
  return (
    <p className={styles.hint} aria-live="polite">
      {pin ? (
        <>
          {`${pin.label} is used in `}
          {studies.map((c, i) => (
            <span key={c.id}>
              {i > 0 && ' · '}
              <a href={`#${c.anchor}`}>{`${c.number} ${c.title}`}</a>
            </span>
          ))}
        </>
      ) : (
        'Select a pin to see where it is used.'
      )}
    </p>
  )
}
