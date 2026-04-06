import { useEffect, useRef } from 'react'
import { WATER_TYPE_I, WATER_TYPE_II, WATER_TABLE } from '../../content'
import { Icon } from '../Icons/Icons'
import styles from './WaterTypes.module.css'

export default function WaterTypes() {
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    )
    ref.current?.querySelectorAll('.fade-in').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section className={styles.section} id="water-types" ref={ref}>
      <div className="container">
        <h2 className="section-title">Вода под любые задачи лаборатории</h2>
        <p className="section-subtitle">
          Системы водоочистки IPSAR обеспечивают получение воды I и II типа для высокоточных и рутинных задач.
        </p>

        <div className={styles.columns}>
          <div className={`fade-in ${styles.colLight}`}>
            <div className={styles.colBadge}>Тип I</div>
            <h3 className={styles.colTitle}>{WATER_TYPE_I.title}</h3>
            <ul className={styles.useList}>
              {WATER_TYPE_I.uses.map((u, i) => (
                <li key={i} className={styles.useItem}>
                  <Icon name="check" size={14} color="var(--color-accent)" className={styles.check} /> {u}
                </li>
              ))}
            </ul>
            <div className={styles.params}>
              {WATER_TYPE_I.params.map((p, i) => (
                <div key={i} className={styles.param}>
                  <span className={styles.paramLabel}>{p.label}</span>
                  <span className={styles.paramValue}>{p.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={`fade-in ${styles.colDark}`}>
            <div className={styles.colBadgeDark}>Тип II</div>
            <h3 className={styles.colTitleDark}>{WATER_TYPE_II.title}</h3>
            <ul className={styles.useList}>
              {WATER_TYPE_II.uses.map((u, i) => (
                <li key={i} className={`${styles.useItem} ${styles.useItemDark}`}>
                  <Icon name="check" size={14} color="rgba(255,255,255,0.55)" className={styles.checkDark} /> {u}
                </li>
              ))}
            </ul>
            <div className={`${styles.params} ${styles.paramsDark}`}>
              {WATER_TYPE_II.params.map((p, i) => (
                <div key={i} className={`${styles.param} ${styles.paramDark}`}>
                  <span className={styles.paramLabelDark}>{p.label}</span>
                  <span className={styles.paramValueDark}>{p.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={`fade-in ${styles.tableWrap}`}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Параметр</th>
                <th>Тип I</th>
                <th>Тип II</th>
              </tr>
            </thead>
            <tbody>
              {WATER_TABLE.map((row, i) => (
                <tr key={i}>
                  <td>{row.param}</td>
                  <td><strong>{row.type1}</strong></td>
                  <td>{row.type2}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
