# IPSAR — Лендинг систем лабораторной водоочистки

Одностраничный лендинг (SPA) для российского производителя систем лабораторной водоочистки IPSAR. Продукт — автоматические системы получения воды тип I и тип II для лабораторий: КДЛ, НИИ, университетов, медицинских центров.

**Прод:** https://fanciful-taffy-dda13f.netlify.app

---

## Стек

- **React 19** + **Vite 8**
- **CSS Modules** — без UI-библиотек
- **CSS-переменные** — единая дизайн-система
- Без TypeScript

---

## Структура проекта

```
ipsar-landing/
├── index.html                  # SEO meta-теги, Яндекс.Метрика, шрифты
├── vite.config.js
├── package.json
├── public/
│   └── favicon.svg
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
        ├── Configurations/     # 3 карточки-тарифа
        ├── Documents/          # Документы и сертификаты
        ├── Cases/              # Типы организаций-клиентов
        ├── Service/            # 5 направлений сервиса
        ├── ContactForm/        # Форма с валидацией + контакты
        └── Footer/             # Подвал
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

## Деплой на Netlify

Авторизация (один раз):
```bash
npx netlify login
```

Первый деплой (создаёт новый сайт):
```bash
npm run build
npx netlify deploy --create-site --dir dist --prod
```

Повторный деплой (сайт уже привязан):
```bash
npm run build
npx netlify deploy --dir dist --prod
```

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

Адаптивные брейкпоинты: **1200px** (десктоп) · **768px** (планшет) · **375px** (мобильный)

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
| `CONFIGURATIONS` | 3 конфигурации системы |
| `DOCUMENTS` | 4 документа/сертификата |
| `CASES_TYPES` | Типы организаций |
| `SERVICE_ITEMS` | 5 направлений сервиса |
| `NAV_LINKS` | Ссылки навигации |

---

## Яндекс.Метрика

ID счётчика — placeholder `XXXXXXXX`. Заменить в двух местах перед деплоем:

1. `index.html` — строки инициализации счётчика
2. `src/hooks/useYandexMetrika.js` — константа `YM_ID`

Реализованные цели:

| goalName | Событие |
|---|---|
| `hero_consultation` | Клик «Запросить консультацию» в Hero |
| `hero_kp` | Клик «Получить КП» в Hero |
| `hero_catalog` | Клик «Скачать каталог» в Hero |
| `header_kp` | Клик кнопки в шапке |
| `form_submit` | Отправка контактной формы |
| `form_consultation` | Тип обращения «консультация» |
| `form_kp` | Тип обращения «коммерческое предложение» |
| `config_card_click` | Клик по карточке комплектации |
| `cases_request` | Клик «Запросить кейс» |

---

## Контактные данные (заглушки)

Заменить реальными данными IPSAR в `src/content.js`, константа `CONTACTS`:

```js
export const CONTACTS = {
  phone: '+7 (XXX) XXX-XX-XX',
  email: 'info@ipsar.ru',
  hours: 'Пн–Пт, 9:00–18:00 МСК',
  support: '24/7',
}
```

---

## SEO

- `<title>` и `<meta>` — в `index.html`
- H1 — в компоненте `Hero`
- H2 в каждой секции содержат ключевые слова естественно
- Семантика: `<main>`, `<section>`, `<nav>`, `<footer>`, `<header>`
- Целевой поисковик: Яндекс (Россия)
