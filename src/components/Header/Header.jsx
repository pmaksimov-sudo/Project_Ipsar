import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { NAV_LINKS } from '../../content'
import { ymGoal } from '../../hooks/useYandexMetrika'
import { AboutModal } from '../Footer/Footer'
import styles from './Header.module.css'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [showAbout, setShowAbout] = useState(false)

  useEffect(() => {
    const container = document.getElementById('page-scroll')
    const target = container || window
    const getScroll = () => container ? container.scrollTop : window.scrollY
    const onScroll = () => setScrolled(getScroll() > 40)
    target.addEventListener('scroll', onScroll, { passive: true })
    return () => target.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (href) => {
    const target = document.querySelector(href)
    const container = document.getElementById('page-scroll')
    if (!target) return
    if (container) {
      container.scrollTo({ top: target.offsetTop - 68, behavior: 'smooth' })
    } else {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    scrollTo(href)
  }

  const handleKpClick = () => {
    ymGoal('header_kp')
    scrollTo('#contact')
  }

  return (
    <>
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <a href="/" className={styles.logo} aria-label="IPSAR — главная">
          <img src="/logo_text.svg" alt="IPSAR" className={styles.logoImg} />
        </a>

        <nav className={`${styles.nav} ${menuOpen ? styles.open : ''}`} aria-label="Основная навигация">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={styles.navLink}
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
          <button className={styles.navLinkBtn} onClick={() => { setMenuOpen(false); setShowAbout(true) }}>
            О нас
          </button>
          <button className={`btn btn-primary ${styles.ctaMobile}`} onClick={handleKpClick}>
            Получить КП
          </button>
        </nav>

        <button className={styles.aboutBtn} onClick={() => setShowAbout(true)}>
          О нас
        </button>

        <button
          className={`btn btn-primary ${styles.ctaDesktop}`}
          onClick={handleKpClick}
        >
          Получить КП
        </button>

        <button
          className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
    {showAbout && createPortal(<AboutModal onClose={() => setShowAbout(false)} />, document.body)}
    </>
  )
}
