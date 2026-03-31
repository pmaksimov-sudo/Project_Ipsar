import { useEffect, useRef } from 'react'
import { TECH_FEATURES } from '../../content'
import { Icon } from '../Icons/Icons'
import styles from './Technology.module.css'

export default function Technology() {
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
    <section className={styles.section} id="technology" ref={ref}>
      <div className="container">
        <h2 className="section-title">Запатентованное программное обеспечение</h2>
        <p className="section-subtitle">
          Программное обеспечение WaterNext IPSAR 1.2 производит непрерывное отслеживание параметров воды и состояние системы. Данные отображаются в режиме реального времени на встроенном экране и в удалённом интерфейсе.
        </p>

        <div className={styles.grid}>
          {TECH_FEATURES.map((f, i) => (
            <div key={i} className={`fade-in ${styles.card}`}>
              <span className={styles.icon}><Icon name={f.icon} size={28} color="var(--color-accent)" /></span>
              <h3 className={styles.title}>{f.title}</h3>
              <p className={styles.text}>{f.text}</p>
            </div>
          ))}
        </div>

        <div className={`fade-in ${styles.note}`}>
          <Icon name="check" size={16} color="var(--color-accent)" />
          ПО зарегистрировано в Роспатенте.
        </div>
      </div>
    </section>
  )
}
