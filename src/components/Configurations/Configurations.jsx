import { useEffect, useRef } from 'react'
import { CONFIGURATIONS } from '../../content'
import { ymGoal } from '../../hooks/useYandexMetrika'
import { Icon } from '../Icons/Icons'
import styles from './Configurations.module.css'

export default function Configurations() {
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    )
    ref.current?.querySelectorAll('.fade-in').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className={styles.section} id="configurations" ref={ref}>
      <div className="container">
        <h2 className="section-title">Оптимальное решение для вашей лаборатории</h2>
        <p className="section-subtitle">
          Три типовые конфигурации для лабораторий разного размера или индивидуальное решение под ваши задачи.
        </p>

        <div className={styles.grid}>
          {CONFIGURATIONS.map((conf, i) => (
            <div
              key={i}
              className={`fade-in ${styles.card} ${conf.popular ? styles.popular : ''}`}
              onClick={() => ymGoal('config_card_click')}
            >
              {conf.popular && <div className={styles.badge}>Популярный выбор</div>}
              <div className={styles.cardHeader}>
                <h3 className={styles.name}>{conf.name}</h3>
                <p className={styles.desc}>{conf.desc}</p>
              </div>

              <div className={styles.productivity}>
                <span className={styles.productivityLabel}>Производительность</span>
                <span className={styles.productivityValue}>{conf.productivity}</span>
              </div>

              <div className={styles.waterType}>{conf.waterType}</div>

              <ul className={styles.features}>
                {conf.features.map((f, fi) => (
                  <li key={fi} className={styles.feature}>
                    <Icon name="check" size={14} color="var(--color-accent)" />
                    {f}
                  </li>
                ))}
              </ul>

              <p className={styles.suitable}>
                <strong>Подходит для:</strong> {conf.suitable}
              </p>

              <button
                className={`btn ${conf.popular ? 'btn-primary' : 'btn-secondary'} ${styles.cta}`}
                onClick={(e) => { e.stopPropagation(); ymGoal('config_card_click'); scrollToContact() }}
              >
                Запросить КП
              </button>
            </div>
          ))}
        </div>

        <div className={`fade-in ${styles.custom}`}>
          <p>Нужна индивидуальная конфигурация?</p>
          <button className="btn btn-primary" onClick={scrollToContact}>
            <span className={styles.btnTextFull}>Оставьте заявку — подберём под ваши задачи</span>
            <span className={styles.btnTextMobile}>Оставить заявку</span>
          </button>
        </div>
      </div>
    </section>
  )
}
