// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://bednart.cz',
  // Prefetch cílů odkazů (hover/tap) → navigace je okamžitá, klik nečeká na stažení.
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
  // i18n: cs = default (kořen `/`), en = `/en/...`.
  // Připraveno na de/ja/fr/ru — stačí přidat do `locales` a doplnit stránky.
  i18n: {
    defaultLocale: 'cs',
    locales: ['cs', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
