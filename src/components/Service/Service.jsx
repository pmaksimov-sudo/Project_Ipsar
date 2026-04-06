import { useEffect, useRef } from 'react'
import { SERVICE_ITEMS } from '../../content'
import { Icon } from '../Icons/Icons'
import styles from './Service.module.css'

export default function Service() {
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
    <section className={styles.section} id="service" ref={ref}>
      <div className="container">
        <h2 className="section-title">Полное сервисное сопровождение на весь срок эксплуатации</h2>
        <p className="section-subtitle">
          Сервисная служба компании ООО «МНПФ СПЕЦМЕДТЕХНИКА», российского производителя систем лабораторной водоочистки IPSAR, обеспечивает техническую поддержку.
        </p>

        <div className={styles.grid}>
          {SERVICE_ITEMS.map((item, i) => (
            <div key={i} className={`fade-in ${styles.card}`}>
              <span className={styles.icon}><Icon name={item.icon} size={24} color="var(--color-accent)" /></span>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.text}>{item.text}</p>
            </div>
          ))}
        </div>

        <div className={`fade-in ${styles.highlight}`}>
          <span className={styles.highlightIcon}><Icon name="zap" size={32} color="var(--color-accent)" /></span>
          <div>
            <strong>Среднее время реакции на обращение — менее 2 часов</strong>
            <p>Техническая поддержка доступна круглосуточно и без выходных</p>
          </div>
        </div>
      </div>
    </section>
  )
}
