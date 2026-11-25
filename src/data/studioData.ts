export type ServiceCategoryId = 'sites' | 'design-dev' | 'bots' | 'marketing-seo';

export type AddonId =
  | 'yandex-direct'
  | 'basic-seo'
  | 'domain-hosting-rf'
  | 'layout-content'
  | 'monthly-support';

export interface ServiceOption {
  id: string;
  category: ServiceCategoryId;
  title: string;
  price: number;
  priceLabel: string;
  minDays: number;
  maxDays: number;
  turnaround: string;
  kind: 'primary' | 'addon';
  addonId?: AddonId;
  alsoAddAddonId?: AddonId;
}

export interface AddonOption {
  id: AddonId;
  title: string;
  price: number;
  extraDays: number;
  timingNote: string;
}

export const CRIMEA_CITIES = [
  'Саки',
  'Симферополь',
  'Севастополь',
  'Ялта',
  'Евпатория',
  'Другой город Крыма',
] as const;

export const SERVICE_TABS: {id: ServiceCategoryId; label: string}[] = [
  {id: 'sites', label: 'Сайты под ключ'},
  {id: 'design-dev', label: 'Дизайн и доработка'},
  {id: 'bots', label: 'Telegram-боты'},
  {id: 'marketing-seo', label: 'Реклама и SEO'},
];

export const SERVICE_CATALOG: ServiceOption[] = [
  // Сайты под ключ
  {
    id: 'srv-visitka',
    category: 'sites',
    title: 'Сайт-визитка',
    price: 6000,
    priceLabel: 'от 6 000 ₽',
    minDays: 1,
    maxDays: 2,
    turnaround: '1–2 дня',
    kind: 'primary',
  },
  {
    id: 'srv-quiz',
    category: 'sites',
    title: 'Квиз-сайт',
    price: 7000,
    priceLabel: 'от 7 000 ₽',
    minDays: 1,
    maxDays: 2,
    turnaround: '1–2 дня',
    kind: 'primary',
  },
  {
    id: 'srv-landing',
    category: 'sites',
    title: 'Лендинг',
    price: 15000,
    priceLabel: 'от 15 000 ₽',
    minDays: 2,
    maxDays: 3,
    turnaround: '2–3 дня',
    kind: 'primary',
  },
  {
    id: 'srv-onepage',
    category: 'sites',
    title: 'Одностраничный сайт',
    price: 15000,
    priceLabel: 'от 15 000 ₽',
    minDays: 2,
    maxDays: 3,
    turnaround: '2–3 дня',
    kind: 'primary',
  },
  {
    id: 'srv-turnkey',
    category: 'sites',
    title: 'Разработка сайта под ключ',
    price: 15000,
    priceLabel: 'от 15 000 ₽',
    minDays: 2,
    maxDays: 4,
    turnaround: '2–4 дня',
    kind: 'primary',
    alsoAddAddonId: 'domain-hosting-rf',
  },
  {
    id: 'srv-corporate',
    category: 'sites',
    title: 'Корпоративный сайт',
    price: 22000,
    priceLabel: 'от 22 000 ₽',
    minDays: 3,
    maxDays: 5,
    turnaround: '3–5 дней',
    kind: 'primary',
  },
  {
    id: 'srv-shop',
    category: 'sites',
    title: 'Интернет-магазин / каталог',
    price: 25000,
    priceLabel: 'от 25 000 ₽',
    minDays: 4,
    maxDays: 7,
    turnaround: '4–7 дней',
    kind: 'primary',
  },

  // Дизайн и доработка
  {
    id: 'srv-figma',
    category: 'design-dev',
    title: 'Дизайн в Figma',
    price: 5000,
    priceLabel: 'от 5 000 ₽',
    minDays: 1,
    maxDays: 2,
    turnaround: '1–2 дня',
    kind: 'primary',
  },
  {
    id: 'srv-webdesign',
    category: 'design-dev',
    title: 'Создание дизайна сайта',
    price: 5000,
    priceLabel: 'от 5 000 ₽',
    minDays: 1,
    maxDays: 2,
    turnaround: '1–2 дня',
    kind: 'primary',
  },
  {
    id: 'srv-redesign',
    category: 'design-dev',
    title: 'Редизайн сайта',
    price: 5000,
    priceLabel: 'от 5 000 ₽',
    minDays: 1,
    maxDays: 3,
    turnaround: '1–3 дня',
    kind: 'primary',
  },
  {
    id: 'srv-layout',
    category: 'design-dev',
    title: 'Адаптивная вёрстка',
    price: 8000,
    priceLabel: 'от 8 000 ₽',
    minDays: 1,
    maxDays: 3,
    turnaround: '1–3 дня',
    kind: 'primary',
  },
  {
    id: 'srv-fix',
    category: 'design-dev',
    title: 'Доработка сайта',
    price: 2500,
    priceLabel: 'от 2 500 ₽',
    minDays: 1,
    maxDays: 1,
    turnaround: 'в день обращения',
    kind: 'primary',
  },
  {
    id: 'srv-content',
    category: 'design-dev',
    title: 'Наполнение сайта',
    price: 2500,
    priceLabel: 'от 2 500 ₽',
    minDays: 1,
    maxDays: 2,
    turnaround: '1–2 дня',
    kind: 'addon',
    addonId: 'layout-content',
  },

  // Telegram-боты
  {
    id: 'srv-tgbot',
    category: 'bots',
    title: 'Telegram-бот под ключ',
    price: 7000,
    priceLabel: 'от 7 000 ₽',
    minDays: 1,
    maxDays: 2,
    turnaround: '1–2 дня',
    kind: 'primary',
  },

  // Реклама и SEO
  {
    id: 'srv-direct',
    category: 'marketing-seo',
    title: 'Настройка Яндекс Директ',
    price: 6000,
    priceLabel: 'от 6 000 ₽',
    minDays: 1,
    maxDays: 2,
    turnaround: '1–2 дня',
    kind: 'addon',
    addonId: 'yandex-direct',
  },
  {
    id: 'srv-context',
    category: 'marketing-seo',
    title: 'Настройка контекста (РСЯ)',
    price: 6000,
    priceLabel: 'от 6 000 ₽',
    minDays: 1,
    maxDays: 2,
    turnaround: '1–2 дня',
    kind: 'addon',
    addonId: 'yandex-direct',
  },
  {
    id: 'srv-seo',
    category: 'marketing-seo',
    title: 'SEO продвижение сайтов',
    price: 7000,
    priceLabel: 'от 7 000 ₽',
    minDays: 2,
    maxDays: 3,
    turnaround: '2–3 дня',
    kind: 'addon',
    addonId: 'basic-seo',
  },
  {
    id: 'srv-domain',
    category: 'marketing-seo',
    title: 'Домен (.ru / .рф)',
    price: 1000,
    priceLabel: 'от 1 000 ₽',
    minDays: 1,
    maxDays: 1,
    turnaround: '1 час',
    kind: 'addon',
    addonId: 'domain-hosting-rf',
  },
  {
    id: 'srv-hosting',
    category: 'marketing-seo',
    title: 'Хостинг РФ без VPN',
    price: 1500,
    priceLabel: 'от 1 500 ₽',
    minDays: 1,
    maxDays: 1,
    turnaround: '1 час',
    kind: 'addon',
    addonId: 'domain-hosting-rf',
  },
  {
    id: 'srv-support',
    category: 'marketing-seo',
    title: 'Сопровождение сайта',
    price: 3000,
    priceLabel: 'от 3 000 ₽/мес',
    minDays: 1,
    maxDays: 1,
    turnaround: 'постоянно',
    kind: 'addon',
    addonId: 'monthly-support',
  },
];

export const ADDON_OPTIONS: AddonOption[] = [
  {
    id: 'yandex-direct',
    title: 'Настройка Яндекс Директ',
    price: 6000,
    extraDays: 1,
    timingNote: '+1 день',
  },
  {
    id: 'basic-seo',
    title: 'Базовое SEO',
    price: 7000,
    extraDays: 1,
    timingNote: '+1 день',
  },
  {
    id: 'domain-hosting-rf',
    title: 'Домен + РФ-хостинг',
    price: 2500,
    extraDays: 0,
    timingNote: 'в день старта',
  },
  {
    id: 'layout-content',
    title: 'Наполнение контентом',
    price: 2500,
    extraDays: 1,
    timingNote: '+1 день',
  },
  {
    id: 'monthly-support',
    title: 'Сопровождение 1 мес',
    price: 3000,
    extraDays: 0,
    timingNote: '1 месяц',
  },
];

export const PROCESS_STEPS = [
  {
    number: '01.',
    title: 'Задача за 15 минут',
    description: 'Обсуждаем ваш бизнес в Telegram, MAX или чате Авито.',
  },
  {
    number: '02.',
    title: 'Бесплатный прототип за 24 часа (0 ₽)',
    description: 'Показываем готовый первый экран до предоплаты.',
  },
  {
    number: '03.',
    title: 'Запуск под ключ за 1–3 дня',
    description: 'Подключаем приём заявок, домен/хостинг РФ и передаём все доступы.',
  },
] as const;
