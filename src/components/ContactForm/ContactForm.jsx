import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { CONTACTS } from '../../content'
import { ymGoal } from '../../hooks/useYandexMetrika'
import { Icon } from '../Icons/Icons'
import { PrivacyModal, ConsentModal } from '../LegalModals/LegalModals'
import styles from './ContactForm.module.css'

const EMAILJS_SERVICE  = 'service_xo807ko'
const EMAILJS_TEMPLATE = 'template_gvkbsim'
const EMAILJS_KEY      = 'eb9x1T_OPZ90V2vsE'

const INITIAL = { name: '', org: '', phone: '', email: '', comment: '' }

/* Форматирует строку цифр в +7 (XXX) XXX-XX-XX */
function formatPhone(digits) {
  const d = digits.replace(/\D/g, '').slice(0, 11)
  if (!d) return ''
  let result = '+7'
  if (d.length > 1) result += ' (' + d.slice(1, 4)
  if (d.length >= 4) result += ') ' + d.slice(4, 7)
  if (d.length >= 7) result += '-' + d.slice(7, 9)
  if (d.length >= 9) result += '-' + d.slice(9, 11)
  return result
}

export default function ContactForm() {
  const [form, setForm] = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState('')
  const [showPrivacy, setShowPrivacy] = useState(false)
  const [showConsent, setShowConsent] = useState(false)

  const validateField = (name, value) => {
    if (name === 'name') return value.trim() ? '' : 'Укажите имя'

    if (name === 'phone') {
      const digits = value.replace(/\D/g, '')
      if (!digits) return 'Укажите телефон'
      if (digits.length < 11) return 'Введите полный номер телефона'
      return ''
    }
    if (name === 'email' && value.trim()) {
      if (!value.includes('@')) return 'Укажите корректный email (должен содержать @)'
      const parts = value.split('@')
      if (!parts[1] || !parts[1].includes('.')) return 'Укажите корректный email (например, user@domain.ru)'
      return ''
    }
    return ''
  }

  const handleChange = (e) => {
    let { name, value } = e.target
    if (name === 'phone') {
      const digits = value.replace(/\D/g, '')
      const normalized = digits.startsWith('8') ? '7' + digits.slice(1) : digits.startsWith('7') ? digits : '7' + digits
      value = formatPhone(normalized)
    }
    if (name === 'email') value = value.replace(/\s/g, '')
    setForm((prev) => ({ ...prev, [name]: value }))
    if (touched[name]) setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }))
  }

  const handleFocus = (e) => {
    const { name } = e.target
    if (name === 'phone' && !form.phone) {
      setForm((prev) => ({ ...prev, phone: '+7 (' }))
    }
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }))
  }

  const validate = () => {
    const e = {}
    const fields = ['name', 'phone', 'email']
    fields.forEach((f) => {
      const err = validateField(f, form[f])
      if (err) e[f] = err
    })
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const e2 = validate()
    setTouched({ name: true, phone: true, email: true })
    if (Object.keys(e2).length) {
      setErrors(e2)
      return
    }

    setSending(true)
    setSendError('')

    emailjs.send(
      EMAILJS_SERVICE,
      EMAILJS_TEMPLATE,
      {
        name:    form.name,
        org:     form.org,
        phone:   form.phone,
        email:   form.email,
        comment: form.comment || '—',
      },
      EMAILJS_KEY
    )
      .then(() => {
        ymGoal('form_submit')
        setSubmitted(true)
        setForm(INITIAL)
        setTouched({})
      })
      .catch((err) => {
        console.error('EmailJS error:', err)
        setSendError('Не удалось отправить заявку. Попробуйте ещё раз или позвоните нам.')
      })
      .finally(() => setSending(false))
  }

  if (submitted) {
    return (
      <>
        <section className={styles.section} id="contact" />
        <div className={styles.success}>
          <span className={styles.successIcon}><Icon name="check" size={28} color="#fff" /></span>
          <h2>Заявка отправлена!</h2>
          <p>Специалист свяжется с вами в течение рабочего дня.</p>
          <button className="btn btn-primary" onClick={() => setSubmitted(false)}>
            Отправить ещё одну заявку
          </button>
          <button
            className="btn btn-outline"
            onClick={() => {
              setSubmitted(false)
              const scrollEl = document.getElementById('page-scroll')
              if (scrollEl) scrollEl.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            Вернуться на сайт
          </button>
        </div>
      </>
    )
  }

  return (
    <section className={styles.section} id="contact">
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.formWrap}>
            <h2 className="section-title">Получите консультацию или коммерческое предложение</h2>
            <p className={styles.subtitle}>
              Оставьте заявку — специалист свяжется с вами в течение рабочего дня и поможет подобрать оптимальное решение.
            </p>

            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="name">Имя *</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Иван Петров"
                    className={`${styles.input} ${errors.name ? styles.inputError : form.name ? styles.inputFilled : ''}`}
                  />
                  {errors.name && <span className={styles.error}>{errors.name}</span>}
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="org">Организация</label>
                  <input
                    id="org"
                    name="org"
                    type="text"
                    value={form.org}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="ФГБУ Клинический центр"
                    className={`${styles.input} ${errors.org ? styles.inputError : form.org ? styles.inputFilled : ''}`}
                  />
                  {errors.org && <span className={styles.error}>{errors.org}</span>}
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="phone">Телефон *</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder="+7 (999) 000-00-00"
                    className={`${styles.input} ${errors.phone ? styles.inputError : form.phone.replace(/\D/g,'').length === 11 ? styles.inputFilled : ''}`}
                  />
                  {errors.phone && <span className={styles.error}>{errors.phone}</span>}
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="text"
                    value={form.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="email@clinic.ru"
                    className={`${styles.input} ${errors.email ? styles.inputError : form.email && !errors.email ? styles.inputFilled : ''}`}
                  />
                  {errors.email && <span className={styles.error}>{errors.email}</span>}
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="comment">Комментарий</label>
                <textarea
                  id="comment"
                  name="comment"
                  value={form.comment}
                  onChange={handleChange}
                  placeholder="Опишите ваши задачи или вопросы..."
                  rows={4}
                  className={styles.textarea}
                />
              </div>

              <button type="submit" className={`btn btn-primary ${styles.submit}`} disabled={sending}>
                {sending ? 'Отправляем...' : 'Оставить заявку'}
              </button>
              {sendError && <p className={styles.sendError}>{sendError}</p>}

              <p className={styles.privacy}>
                Нажимая кнопку, вы соглашаетесь с{' '}
                <button className={styles.privacyLink} onClick={() => setShowPrivacy(true)}>
                  политикой обработки персональных данных
                </button>
                {' '}и{' '}
                <button className={styles.privacyLink} onClick={() => setShowConsent(true)}>
                  согласием на обработку персональных данных
                </button>
              </p>
            </form>
          </div>

          <div className={styles.contacts}>
            <h3 className={styles.contactsTitle}>Контакты</h3>
            <p className={styles.contactCompany}>{CONTACTS.company}</p>
            <div className={styles.contactsList}>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}><Icon name="phone" size={18} color="rgba(255,255,255,0.5)" /></span>
                <div>
                  <span className={styles.contactLabel}>Телефон</span>
                  <a href={`tel:${CONTACTS.phone.replace(/\s/g, '')}`} className={styles.contactValue}>
                    {CONTACTS.phone}
                  </a>
                </div>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}><Icon name="mail" size={18} color="rgba(255,255,255,0.5)" /></span>
                <div>
                  <span className={styles.contactLabel}>Email</span>
                  <a href={`mailto:${CONTACTS.email}`} className={styles.contactValue}>
                    {CONTACTS.email}
                  </a>
                </div>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}><Icon name="headphones" size={18} color="rgba(255,255,255,0.5)" /></span>
                <div>
                  <span className={styles.contactLabel}>Техподдержка {CONTACTS.support}</span>
                  <span className={styles.contactValue}>Раб. <a href="tel:+74957373322">+7 (495) 737-33-22</a><br/><span className={styles.contactTime}>(9:00–17:00 МСК)</span></span>
                  <span className={styles.contactValue}>Моб. <a href="tel:+79160747906">+7 (916) 074-79-06</a><br/><span className={styles.contactTime}>(17:00–09:00 МСК)</span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showPrivacy && <PrivacyModal onClose={() => setShowPrivacy(false)} />}
      {showConsent && <ConsentModal onClose={() => setShowConsent(false)} />}
    </section>
  )
}
