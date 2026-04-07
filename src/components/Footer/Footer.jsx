import { useState } from 'react'
import { NAV_LINKS, CONTACTS } from '../../content'
import { PrivacyModal, ConsentModal } from '../LegalModals/LegalModals'
import styles from './Footer.module.css'

const COMPANY = {
  name: 'ООО «МНПФ СПЕЦМЕДТЕХНИКА»',
  ogrn: '1027739605629',
  inn: '7713128976',
  kpp: '773001001',
}

/* ───── Реквизиты ───── */
function RequisitesModal({ onClose }) {
  const [copied, setCopied] = useState(false)
  const text = `${COMPANY.name}\nОГРН ${COMPANY.ogrn}\nИНН ${COMPANY.inn}\nКПП ${COMPANY.kpp}`

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.modalClose} onClick={onClose} aria-label="Закрыть">✕</button>
        <p className={styles.modalTitle}>Реквизиты компании</p>
        <div className={styles.requisites}>
          <div className={styles.reqRow}><span className={styles.reqLabel}>Компания</span><span className={styles.reqValue}>{COMPANY.name}</span></div>
          <div className={styles.reqRow}><span className={styles.reqLabel}>ОГРН</span><span className={styles.reqValue}>{COMPANY.ogrn}</span></div>
          <div className={styles.reqRow}><span className={styles.reqLabel}>ИНН</span><span className={styles.reqValue}>{COMPANY.inn}</span></div>
          <div className={styles.reqRow}><span className={styles.reqLabel}>КПП</span><span className={styles.reqValue}>{COMPANY.kpp}</span></div>
        </div>
        <button className={styles.copyBtn} onClick={handleCopy}>
          {copied ? '✓ Скопировано' : 'Копировать реквизиты'}
        </button>
      </div>
    </div>
  )
}

/* ───── О нас ───── */
export function AboutModal({ onClose }) {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={`${styles.modal} ${styles.modalWide}`} onClick={e => e.stopPropagation()}>
        <div className={styles.privacyHeader}>
          <div>
            <p className={styles.modalTitle}>О компании</p>
            <p className={styles.privacyMeta}>ООО «МНПФ СПЕЦМЕДТЕХНИКА»</p>
          </div>
          <button className={styles.modalClose} onClick={onClose} aria-label="Закрыть">✕</button>
        </div>
        <div className={styles.privacyBody}>
          <div className={styles.privacySection}>
            <p className={styles.privacySectionTitle}>О нас</p>
            <p className={styles.privacySectionText}>
              Компания ООО «Медицинская научно-производственная фирма СпецМедтехника» является российским производителем установок очистки воды IPSAR.
            </p>
            <p className={styles.privacySectionText}>
              С 1997 года компания специализируется на техническом обслуживании и ремонте медицинского оборудования, имея лицензии на работу со всеми видами техники.
            </p>
            <p className={styles.privacySectionText}>
              В 2021 году компания представила систему водоподготовки экспертного класса IPSAR. Оборудование подтвердило высокие эксплуатационные и технические характеристики в ведущих медицинских учреждениях и исследовательских лабораториях.
            </p>
          </div>
          <div className={styles.privacySection}>
            <p className={styles.privacySectionTitle}>Направления деятельности</p>
            <p className={styles.privacySectionText}>
              — Производство систем водоочистки для клинико-диагностических лабораторий и научно-исследовательских центров, где требуется высокая степень очистки воды, включая полное сервисное сопровождение: монтаж, обучение, плановое обслуживание, поставка расходных материалов.
            </p>
            <p className={styles.privacySectionText}>
              — Предоставление услуг по монтажу, техническому обслуживанию и ремонту медицинского оборудования и аппаратуры по всем направлениям.
            </p>
            <p className={styles.privacySectionText}>
              Узнайте больше о наших возможностях: полный каталог продукции и услуг группы компаний размещён на сайте ООО Группа Компаний СМТ{' '}
              <a href="https://smtgroup.ru" target="_blank" rel="noopener noreferrer" style={{color: 'var(--color-accent)'}}>smtgroup.ru</a>
            </p>
          </div>
          <div className={styles.privacySection}>
            <p className={styles.privacySectionTitle}>Реквизиты</p>
            <p className={styles.privacySectionText}>
              ОГРН 1027739605629<br />
              ИНН 7713128976<br />
              КПП 773001001
            </p>
          </div>
          <div className={styles.privacySection}>
            <p className={styles.privacySectionTitle}>Контакты</p>
            <p className={styles.privacySectionText}>г. Москва, ул. Кастанаевская, д. 14</p>
            <p className={styles.privacySectionText}>Телефон: <a href="tel:+74957373322" style={{color: 'var(--color-accent)'}}>+7 (495) 737-33-22</a></p>
            <p className={styles.privacySectionText}>Email: <a href="mailto:info@smtgroup.ru" style={{color: 'var(--color-accent)'}}>info@smtgroup.ru</a></p>
          </div>
          <div className={styles.privacySection} id="about-support">
            <p className={styles.privacySectionTitle}>Техподдержка 24/7</p>
            <p className={styles.privacySectionText}>
              Раб. <a href="tel:+74957373322" style={{color: 'var(--color-accent)'}}>+7 (495) 737-33-22</a><br /><span style={{opacity: 0.6}}>(9:00–17:00 МСК)</span><br /><br />
              Моб. <a href="tel:+79160747906" style={{color: 'var(--color-accent)'}}>+7 (916) 074-79-06</a><br /><span style={{opacity: 0.6}}>(17:00–09:00 МСК)</span>
            </p>
          </div>
          <div className={styles.privacySection}>
            <p className={styles.privacySectionTitle}>График работы</p>
            <p className={styles.privacySectionText}>
              Пн–Чт 9:00–17:00 МСК<br />
              Пт 9:00–16:00 МСК
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ───── Footer ───── */
export default function Footer() {
  const [showRequisites, setShowRequisites] = useState(false)
  const [showPrivacy, setShowPrivacy] = useState(false)
  const [showConsent, setShowConsent] = useState(false)
  const [showAbout, setShowAbout] = useState(false)

  const handleNavClick = (e, href) => {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brand}>
            <span className={styles.logo}>IPSAR</span>
            <p className={styles.tagline}>
              Автоматизированные лабораторные системы водоочистки – вода I и II типа.
            </p>
            <div className={styles.brandLinks}>
              <button className={styles.brandBtn} onClick={() => setShowAbout(true)}>О нас</button>
            </div>
            <p className={styles.brandCompany}>{CONTACTS.company}</p>
            <p className={styles.brandAddress}>г. Москва, ул. Кастанаевская, д. 14</p>
          </div>

          <nav className={styles.nav} aria-label="Навигация в подвале">
            <p className={styles.navTitle}>Разделы</p>
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
          </nav>

          <div className={styles.contactsCol}>
            <p className={styles.navTitle}>Контакты</p>
            <a href="tel:+74957373322" className={styles.contact}>+7 (495) 737-33-22</a>
            <a href={`mailto:${CONTACTS.email}`} className={styles.contact}>
              {CONTACTS.email}
            </a>
            <button
              className={styles.supportBtn}
              onClick={() => {
                setShowAbout(true)
                setTimeout(() => {
                  document.getElementById('about-support')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                }, 100)
              }}
            >
              Техподдержка {CONTACTS.support}
            </button>
            <span className={styles.contactMuted}>Раб. <a href="tel:+74957373322" className={styles.phoneLink}>+7 (495) 737-33-22</a><br/><span className={styles.contactTime}>(9:00–17:00 МСК)</span></span>
            <span className={styles.contactMuted}>Моб. <a href="tel:+79160747906" className={styles.phoneLink}>+7 (916) 074-79-06</a><br/><span className={styles.contactTime}>(17:00–09:00 МСК)</span></span>
          </div>

          <div className={styles.docsCol}>
            <p className={styles.navTitle}>Документы</p>
            <button className={styles.reqBtn} onClick={() => setShowPrivacy(true)}>
              Политика обработки персональных данных
            </button>
            <button className={styles.reqBtn} onClick={() => setShowConsent(true)}>
              Согласие на обработку персональных данных
            </button>
            <a href="/ru-ipsar.pdf" className={styles.navLink} target="_blank" rel="noopener noreferrer">
              Регистрационное удостоверение
            </a>
            <a href="/trademark-ipsar.pdf" className={styles.navLink} target="_blank" rel="noopener noreferrer">
              Свидетельство на товарный знак
            </a>
            <button className={styles.reqBtn} onClick={() => setShowRequisites(true)}>
              Реквизиты компании
            </button>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copy}>
            © {new Date().getFullYear()} IPSAR. Все права защищены.
          </p>
          <p className={styles.copy}>
            Российское производство · Регистрационное удостоверение Росздравнадзора
          </p>
        </div>
      </div>

      {showRequisites && <RequisitesModal onClose={() => setShowRequisites(false)} />}
      {showPrivacy && <PrivacyModal onClose={() => setShowPrivacy(false)} />}
      {showConsent && <ConsentModal onClose={() => setShowConsent(false)} />}
      {showAbout && <AboutModal onClose={() => setShowAbout(false)} />}
    </footer>
  )
}
