import { ymGoal } from '../../hooks/useYandexMetrika'
import { TRUST_LINE } from '../../content'
import { Icon } from '../Icons/Icons'
import WaterGraphic from './WaterGraphic'
import styles from './Hero.module.css'

export default function Hero() {
  const scrollToContact = () => {
    const target = document.querySelector('#contact')
    const container = document.getElementById('page-scroll')
    if (!target) return
    if (container) {
      container.scrollTo({ top: target.offsetTop - 68, behavior: 'smooth' })
    } else {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className={styles.hero} id="hero">
      <div className={`container ${styles.inner}`}>
        <div className={styles.content}>
          <div className={`hero-animate ${styles.badge}`}>
            <Icon name="flag" size={14} color="rgba(255,255,255,0.7)" />
            Российское производство
          </div>

          <h1 className={`hero-animate ${styles.title}`}>
            Универсальная лабораторная система очистки воды IPSAR.
          </h1>

          <p className={`hero-animate ${styles.subtitle}`}>
            Получение сверхчистой воды для научно-исследовательских и клинико-диагностических лабораторий любых направлений.
          </p>

          <div className={`hero-animate ${styles.actions}`}>
            <a
              href="/brochure-ipsar.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              onClick={() => ymGoal('hero_brochure')}
            >
              Открыть брошюру
            </a>
          </div>
        </div>

        <WaterGraphic />
      </div>

      <div className={styles.trustLine}>
        <div className="container">
          <ul className={styles.trustList}>
            {TRUST_LINE.map((item, i) => (
              <li key={i} className={styles.trustItem}>
                <span className={styles.trustDot} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
