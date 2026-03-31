import { useEffect, useRef } from 'react'
import { DOCUMENTS } from '../../content'
import { Icon } from '../Icons/Icons'
import styles from './Documents.module.css'

function scrollToContact() {
  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
}

export default function Documents() {
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
    <section className={styles.section} id="documents" ref={ref}>
      <div className="container">
        <h2 className="section-title">Соответствие стандартам подтверждено документально</h2>
        <p className="section-subtitle">
          Системы водоочистки IPSAR прошли все необходимые процедуры регистрации и сертификации
        </p>

        <div className={styles.grid}>
          {DOCUMENTS.map((doc, i) => (
            <div key={i} className={`fade-in ${styles.card}`}>
              <span className={styles.icon}><Icon name={doc.icon} size={32} color="var(--color-accent)" /></span>
              <h3 className={styles.title}>{doc.title}</h3>
              <p className={styles.text}>{doc.text}</p>
              <div className={styles.cardFooter}>
                {doc.file ? (
                  <a
                    href={doc.file}
                    className={styles.downloadBtn}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon name="eye" size={14} color="currentColor" />
                    Открыть
                  </a>
                ) : (
                  <button className={styles.requestBtn} onClick={scrollToContact}>
                    По запросу
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
