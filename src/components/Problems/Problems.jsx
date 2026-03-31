import { useEffect, useRef } from 'react'
import { PROBLEMS, CONSEQUENCES } from '../../content'
import { Icon } from '../Icons/Icons'
import styles from './Problems.module.css'

export default function Problems() {
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        })
      },
      { threshold: 0.1 }
    )
    const items = ref.current?.querySelectorAll('.fade-in')
    items?.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section className={styles.section} id="problems" ref={ref}>
      <div className="container">
        <h2 className="section-title">Что мешает лаборатории работать без сбоев</h2>
        <p className="section-subtitle">
          Типичные проблемы, с которыми сталкиваются лаборатории при использовании систем водоочистки
        </p>

        <div className={styles.grid}>
          {PROBLEMS.map((item, i) => (
            <div key={i} className={`fade-in ${styles.card}`}>
              <span className={styles.icon}><Icon name={item.icon} size={24} color="var(--color-accent)" /></span>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardText}>{item.text}</p>
            </div>
          ))}
        </div>

        <div className={`fade-in ${styles.consequences}`}>
          <p className={styles.consLabel}>Последствия для лаборатории:</p>
          <ul className={styles.consList}>
            {CONSEQUENCES.map((c, i) => (
              <li key={i} className={styles.consItem}>
                <Icon name={c.icon} size={16} color="#856404" />
                {c.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
