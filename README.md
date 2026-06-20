# Václav Bednář ART

Prezentační/portfolio web českého výtvarníka Václava Bednáře — malba na kalené sklo,
abstrakce, značka Out of Control. Tmavý galerijní design, vkusné animace, plně responzivní.

## Stack

- **Astro 5** (statický výstup) + **TypeScript**
- **Tailwind CSS v4** (`@tailwindcss/vite`) + vrstva custom CSS pro typografii a motion
- **Astro View Transitions** — plynulé přechody mezi stránkami
- **i18n**: `cs` (default, kořen `/`) + `en` (`/en/...`), připraveno pro de/ja/fr/ru
- Fonty self-hosted (Fontsource): Space Grotesk, Cormorant Garamond
- Plánováno: Lenis (smooth scroll), GSAP + ScrollTrigger, PhotoSwipe (lightbox)
- Hosting: **Cloudflare Pages** (statika)

## Vývoj

```bash
npm install      # instalace závislostí
npm run dev      # dev server na http://localhost:4321
npm run build    # produkční build do dist/
npm run preview  # náhled buildu
```

## Struktura

```
src/
  layouts/   # Base layout (téma, SEO, View Transitions)
  pages/     # routy (cs v kořeni, en v /en)
  styles/    # global.css — design tokeny a typografie
  content/   # texty per locale (cs/en)
public/
  fonts/     # lokální woff2 (wordmark dodá autor)
  video/     # hero aftermovie
```

## Assety

Zatím se používají **placeholdery** se sémantickými názvy (`hero-blue`, `bio-bg`,
`glass-01`…). Reálné soubory dodá autor — jen se vymění.
