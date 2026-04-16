# IPSAR — Лендинг систем лабораторной водоочистки

Одностраничный лендинг (SPA) для российского производителя систем лабораторной водоочистки IPSAR. Продукт — автоматические системы получения воды тип I и тип II для лабораторий: КДЛ, НИИ, университетов, медицинских центров.

**Прод (Netlify):** https://fanciful-taffy-dda13f.netlify.app  
**Прод (основной):** https://ipsar.smtgroup.ru

---

## Стек

- **React 19** + **Vite 8**
- **CSS Modules** — без UI-библиотек
- **CSS-переменные** — единая дизайн-система
- **EmailJS** — отправка форм без бэкенда
- **Яндекс.Метрика** — счётчик `108486565`
- Без TypeScript

---

## Структура проекта

```
ipsar-landing/
├── index.html                  # SEO meta-теги, Яндекс.Метрика, шрифты
├── vite.config.js
├── package.json
├── public/
│   ├── brochure-ipsar.pdf      # Брошюра продукта
│   ├── patent-ipsar.pdf
│   ├── ru-ipsar.pdf
│   ├── software-cert-ipsar.pdf
│   ├── trademark-ipsar.pdf
│   ├── robots.txt
│   ├── sitemap.xml
│   └── *.jpg / *.svg           # Изображения и иконки
└── src/
    ├── main.jsx                # Точка входа
    ├── App.jsx                 # Корневой компонент, сборка секций
    ├── content.js              # Весь контент (тексты, данные) — менять здесь
    ├── styles/
    │   ├── global.css          # CSS-переменные, сброс, типографика, кнопки
    │   └── animations.css      # IntersectionObserver анимации
    ├── hooks/
    │   └── useYandexMetrika.js # Хук ymGoal() для отправки целей
    └── components/
        ├── Header/             # Фиксированная шапка, бургер-меню
        ├── Hero/               # Главный экран с анимированными показателями
        ├── Problems/           # 6 карточек проблем лаборатории
        ├── Solution/           # Описание решения + схема процесса
        ├── Advantages/         # 8 ключевых преимуществ
        ├── WaterTypes/         # Тип I / Тип II + таблица параметров
        ├── Technology/         # 5 функций ПО
        ├── Configurations/     # 3 карточки-комплектации
        ├── Documents/          # Документы и сертификаты
        ├── Cases/              # Типы организаций-клиентов
        ├── Service/            # 5 направлений сервиса
        ├── ContactForm/        # Форма с валидацией + контакты
        ├── CookieBanner/       # Баннер согласия с куки
        ├── LegalModals/        # Модалки: политика и согласие на обработку ПД
        └── Footer/             # Подвал + модалка «О нас»
```

---

## Команды

```bash
# Установка зависимостей
npm install

# Локальная разработка
npm run dev

# Продакшн сборка
npm run build

# Предпросмотр сборки
npm run preview
```

> **Node.js** установлен через nvm. Перед командами активировать:
> ```bash
> export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh"
> ```

---

## Деплой

Сайт деплоится вручную через Netlify CLI.

```bash
# Сборка + деплой на прод (одной командой)
npm run build && npx netlify deploy --prod --dir=dist
```

Сайт привязан к аккаунту `pmaksimov@emd.one` (pmaksimov's team).  
Site ID: `48348861-2c31-414c-90a2-d0317c0673be`

---

## Дизайн-система

Все переменные в `src/styles/global.css`:

| Переменная | Значение | Назначение |
|---|---|---|
| `--color-primary` | `#0B1C3D` | Основной тёмно-синий |
| `--color-accent` | `#1A8CFF` | Акцентный голубой |
| `--color-accent-hover` | `#0070e0` | Hover-состояние акцента |
| `--color-white` | `#FFFFFF` | Белый |
| `--color-bg-light` | `#F4F7FB` | Фон секций-подложек |
| `--color-text-muted` | `#6b7a99` | Приглушённый текст |
| `--font-heading` | `Manrope` | Заголовки (700, 800) |
| `--font-body` | `Inter` | Тело текста (400, 500) |
| `--max-width` | `1200px` | Максимальная ширина контейнера |

Адаптивные брейкпоинты: **1200px** (десктоп) · **900px** (планшет) · **600px** (мобильный)

---

## Контент

Весь текстовый контент вынесен в `src/content.js`. При замене текстов заказчиком — редактировать только этот файл.

Структура экспортов:

| Константа | Содержимое |
|---|---|
| `META` | SEO заголовок, описание, ключевые слова |
| `CONTACTS` | Телефон, email, режим работы |
| `TRUST_LINE` | Строка доверия под Hero |
| `HERO_STATS` | Показатели воды тип I |
| `PROBLEMS` | 6 карточек проблем |
| `CONSEQUENCES` | 4 последствия |
| `SOLUTION_FEATURES` | 4 характеристики решения |
| `PROCESS_STEPS` | Этапы схемы водоочистки |
| `ADVANTAGES` | 8 преимуществ |
| `WATER_TYPE_I` / `WATER_TYPE_II` | Параметры и применение воды |
| `WATER_TABLE` | Таблица сравнения параметров |
| `TECH_FEATURES` | 5 функций ПО |
| `CONFIGURATIONS` | 3 комплектации системы |
| `DOCUMENTS` | 4 документа/сертификата |
| `CASES_TYPES` | Типы организаций |
| `SERVICE_ITEMS` | 5 направлений сервиса |
| `NAV_LINKS` | Ссылки навигации |

---

## Яндекс.Метрика

ID счётчика: **`108486565`**

Реализованные цели:

| goalName | Событие |
|---|---|
| `hero_consultation` | Клик «Запросить консультацию» в Hero |
| `hero_kp` | Клик «Получить КП» в Hero |
| `hero_catalog` | Клик «Скачать каталог» в Hero |
| `header_kp` | Клик кнопки в шапке |
| `form_submit` | Отправка контактной формы |
| `config_card_click` | Клик по карточке комплектации |

---

## EmailJS

Отправка форм через EmailJS (без бэкенда):

| Параметр | Значение |
|---|---|
| Service ID | `service_xo807ko` |
| Template ID | `template_gvkbsim` |
| Public Key | `eb9x1T_OPZ90V2vsE` |

Поля формы: `name`, `org` (необязательное), `phone`, `email`, `comment`

---

## Контактная форма — особенности

- Поле **Организация** — необязательное
- После успешной отправки показывается inline success-экран (без overlay)
- Кнопка «Вернуться на сайт» перезагружает страницу (`window.location.href = window.location.pathname`) — надёжно работает на iOS и Android
- Размер шрифта инпутов — `16px` (предотвращает авто-зум на iOS Safari)

---

## SEO

- `<title>` и `<meta>` — в `index.html`
- H1 — в компоненте `Hero`
- H2 в каждой секции содержат ключевые слова
- Семантика: `<main>`, `<section>`, `<nav>`, `<footer>`, `<header>`
- `robots.txt` и `sitemap.xml` — в `public/`
- Целевой поисковик: Яндекс (Россия)
