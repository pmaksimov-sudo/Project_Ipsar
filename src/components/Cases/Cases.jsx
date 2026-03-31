import { useEffect, useRef, useState, useCallback } from 'react'
import { CASES_TYPES } from '../../content'
import styles from './Cases.module.css'

const AUTOPLAY_DELAY = 4000

export default function Cases() {
  const [active, setActive] = useState(0)
  const timerRef = useRef(null)
  const sectionRef = useRef(null)

  const goTo = useCallback((index) => {
    setActive(index)
  }, [])

  const startTimer = useCallback(() => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % CASES_TYPES.length)
    }, AUTOPLAY_DELAY)
  }, [])

  useEffect(() => {
    startTimer()
    return () => clearInterval(timerRef.current)
  }, [startTimer])

  const handleItemClick = (index) => {
    goTo(index)
    startTimer()
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    )
    sectionRef.current?.querySelectorAll('.fade-in').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section className={styles.section} id="cases" ref={sectionRef}>
      <div className="container">
        <div className={`fade-in ${styles.header}`}>
          <h2 className={`section-title ${styles.title}`}>Системы IPSAR работают в ведущих учреждениях России</h2>
          <p className={styles.subtitle}>
            Системы водоочистки IPSAR эксплуатируются в медицинских учреждениях, клинико-диагностических лабораториях, научно-исследовательских институтах, а также в лабораториях судмедэкспертизы, пищевой промышленности и сельского хозяйства по всей стране.
          </p>
        </div>

        <div className={styles.inner}>
          <div className={`fade-in ${styles.sliderWrap}`}>
            {CASES_TYPES.map((item, i) => (
              <div
                key={i}
                className={`${styles.slide} ${i === active ? styles.slideActive : ''}`}
              >
                <img src={item.image} alt={item.label} className={styles.slideImg} />
                <div className={styles.slideCaption}>{item.label}</div>
              </div>
            ))}
            <div className={styles.dots}>
              {CASES_TYPES.map((_, i) => (
                <button
                  key={i}
                  className={`${styles.dot} ${i === active ? styles.dotActive : ''}`}
                  onClick={() => handleItemClick(i)}
                  aria-label={`Слайд ${i + 1}`}
                />
              ))}
            </div>
          </div>

          <div className={`fade-in ${styles.right}`}>
            <ul className={styles.list}>
              {CASES_TYPES.map((item, i) => (
                <li
                  key={i}
                  className={`${styles.listItem} ${i === active ? styles.listItemActive : ''}`}
                  onClick={() => handleItemClick(i)}
                >
                  <span className={styles.listDot} />
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
