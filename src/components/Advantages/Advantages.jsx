import { useEffect, useRef } from 'react'
import { ADVANTAGES } from '../../content'
import { Icon } from '../Icons/Icons'
import styles from './Advantages.module.css'

export default function Advantages() {
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
    <section className={styles.section} id="advantages" ref={ref}>
      <div className="container">
        <h2 className="section-title">Почему лаборатории выбирают IPSAR</h2>
        <p className="section-subtitle">
          Ключевые преимущества систем водоочистки IPSAR для лабораторий
        </p>

        <div className={styles.grid}>
          {ADVANTAGES.map((item, i) => (
            <div key={i} className={`fade-in ${styles.item}`}>
              <span className={styles.icon}><Icon name={item.icon} size={22} color="var(--color-accent)" /></span>
              <div>
                <h3 className={styles.title}>{item.title}</h3>
                <p className={styles.text}>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
