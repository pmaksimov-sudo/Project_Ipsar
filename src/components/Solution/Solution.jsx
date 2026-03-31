import { useEffect, useRef } from 'react'
import { SOLUTION_FEATURES, PROCESS_STEPS } from '../../content'
import { Icon } from '../Icons/Icons'
import styles from './Solution.module.css'

export default function Solution() {
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
    <section className={styles.section} id="solution" ref={ref}>
      <div className="container">
        <h2 className="section-title">IPSAR — автоматизированная система очистки воды</h2>
        <p className="section-subtitle">
          Российская лабораторная система водоочистки для получения воды I и II типа осуществляет автоматический контроль качества воды, отслеживает ресурс картриджей, проводит самодиагностику и уведомляет о необходимости проведения ремонта, технического обслуживания или замены фильтрующих элементов.
        </p>

        <div className={styles.features}>
          {SOLUTION_FEATURES.map((f, i) => (
            <div key={i} className={`fade-in ${styles.featureCard}`}>
              <span className={styles.featureIcon}><Icon name={f.icon} size={22} color="var(--color-accent)" /></span>
              <h3 className={styles.featureTitle}>{f.title}</h3>
              <p className={styles.featureText}>{f.text}</p>
            </div>
          ))}
        </div>

        <div className={`fade-in ${styles.schemeWrap}`}>
          <p className={styles.schemeLabel}>Схема процесса водоочистки</p>
          <div className={styles.marqueeOuter}>
            <div className={styles.marqueeTrack}>
              {[0, 1].map((copy) => (
                <div key={copy} className={styles.marqueeInner} aria-hidden={copy === 1}>
                  {PROCESS_STEPS.map((step, i) => (
                    <span key={i} className={styles.marqueeItem}>
                      <span className={`${styles.schemeNode} ${i === PROCESS_STEPS.length - 1 ? styles.schemeNodeFinal : ''}`}>
                        {step}
                      </span>
                      {i < PROCESS_STEPS.length - 1 && (
                        <svg className={styles.arrow} viewBox="0 0 24 12" fill="none" aria-hidden="true">
                          <path d="M0 6H20M20 6L14 1M20 6L14 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </span>
                  ))}
                  {/* Длинная пауза перед следующим циклом */}
                  <span className={styles.cyclePause} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
