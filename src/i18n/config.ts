// ──────────────────────────────────────────────
// i18n — jediný zdroj pravdy pro jazyky a sekce.
// cs = default (kořen `/`), en = `/en/...`.
// Přidání jazyka (de/ja/fr/ru): rozšiř `locales`, doplň `label` do sekcí
// a vytvoř odpovídající stránky. Routing a LangSwitcher se přizpůsobí samy.
// ──────────────────────────────────────────────

export const locales = ['cs', 'en', 'de', 'ja', 'fr', 'ru'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'cs';

// Vlaječky + čitelný název jazyka pro LangSwitcher.
export const localeMeta: Record<Locale, { flag: string; name: string }> = {
  cs: { flag: '🇨🇿', name: 'Čeština' },
  en: { flag: '🇬🇧', name: 'English' },
  de: { flag: '🇩🇪', name: 'Deutsch' },
  ja: { flag: '🇯🇵', name: '日本語' },
  fr: { flag: '🇫🇷', name: 'Français' },
  ru: { flag: '🇷🇺', name: 'Русский' },
};

// Klíče sekcí v pořadí navigace. `home` je wordmark, v nav se nezobrazuje.
export const sectionKeys = [
  'home',
  'bio',
  'reference',
  'glass',
  'ooc',
  'studio',
  'news',
  'contact',
] as const;
export type SectionKey = (typeof sectionKeys)[number];

interface Section {
  key: SectionKey;
  /** slug bez locale prefixu; '' = kořen (home) */
  slug: string;
  /** popisek v navigaci per locale */
  label: Record<Locale, string>;
  /** zobrazit v hlavní navigaci? (home = false, je to wordmark) */
  inNav: boolean;
}

export const sections: Section[] = [
  { key: 'home', slug: '', inNav: false,
    label: { cs: 'Domů', en: 'Home', de: 'Start', ja: 'ホーム', fr: 'Accueil', ru: 'Главная' } },
  { key: 'bio', slug: 'bio', inNav: true,
    label: { cs: 'Bio', en: 'Bio', de: 'Bio', ja: 'バイオ', fr: 'Bio', ru: 'Био' } },
  { key: 'reference', slug: 'reference', inNav: true,
    label: { cs: 'Reference', en: 'Reference', de: 'Referenzen', ja: 'レビュー', fr: 'Références', ru: 'Рецензии' } },
  { key: 'glass', slug: 'glass', inNav: true,
    label: { cs: 'Sklo', en: 'Glass', de: 'Glas', ja: 'ガラス', fr: 'Verre', ru: 'Стекло' } },
  { key: 'ooc', slug: 'out-of-control', inNav: true,
    label: { cs: 'Out of Control', en: 'Out of Control', de: 'Out of Control', ja: 'Out of Control', fr: 'Out of Control', ru: 'Out of Control' } },
  { key: 'studio', slug: 'studio', inNav: true,
    label: { cs: 'Ateliér', en: 'Studio', de: 'Atelier', ja: 'アトリエ', fr: 'Atelier', ru: 'Мастерская' } },
  { key: 'news', slug: 'news', inNav: true,
    label: { cs: 'Aktuálně', en: 'News', de: 'Aktuelles', ja: 'ニュース', fr: 'Actualités', ru: 'Новости' } },
  { key: 'contact', slug: 'contact', inNav: true,
    label: { cs: 'Kontakt', en: 'Contact', de: 'Kontakt', ja: '連絡先', fr: 'Contact', ru: 'Контакты' } },
];

const sectionByKey = new Map(sections.map((s) => [s.key, s]));

/** URL dané sekce v daném jazyce. cs → `/slug`, en → `/en/slug`. */
export function localizedPath(key: SectionKey, locale: Locale): string {
  const section = sectionByKey.get(key);
  const slug = section ? section.slug : '';
  const prefix = locale === defaultLocale ? '' : `/${locale}`;
  if (!slug) return prefix === '' ? '/' : `${prefix}/`;
  return `${prefix}/${slug}`;
}

/** Z URL odvodí aktuální jazyk. */
export function getLocaleFromPath(pathname: string): Locale {
  const seg = pathname.split('/').filter(Boolean)[0];
  return (locales as readonly string[]).includes(seg as string) ? (seg as Locale) : defaultLocale;
}

/** Lokalizovaný popisek sekce. */
export function navLabel(key: SectionKey, locale: Locale): string {
  return sectionByKey.get(key)?.label[locale] ?? key;
}
