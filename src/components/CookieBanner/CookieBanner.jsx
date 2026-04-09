import { useState } from 'react'
import { PrivacyModal } from '../LegalModals/LegalModals'
import styles from './CookieBanner.module.css'

const STORAGE_KEY = 'ipsar_cookies_accepted'

export default function CookieBanner() {
  const [visible, setVisible] = useState(() => !localStorage.getItem(STORAGE_KEY))
  const [showPrivacy, setShowPrivacy] = useState(false)

  const handleAccept = () => {
    localStorage.setItem(STORAGE_KEY, '1')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <>
      <div className={styles.banner}>
        <p className={styles.text}>
          На этом сайте используются файлы cookies. Оставаясь на&nbsp;
          <span className={styles.site}>ipsar.smtgroup.ru</span>,
          вы соглашаетесь с&nbsp;
          <button className={styles.link} onClick={() => setShowPrivacy(true)}>
            политикой обработки персональных данных
          </button>
        </p>
        <button className={styles.btn} onClick={handleAccept}>
          Подтвердить
        </button>
      </div>

      {showPrivacy && <PrivacyModal onClose={() => setShowPrivacy(false)} />}
    </>
  )
}
