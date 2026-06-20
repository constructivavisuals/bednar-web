# Kickoff prompt pro Claude Code — web Václav Bednář ART

> Zkopíruj celé do Claude Code jako úvodní zadání. Doplňující detail je v `vaclav-bednar-web-brief.md`, anglické texty v `content-en.md`.

---

Stavíme prezentační/portfolio web pro českého výtvarníka Václava Bednáře. Cíl: **mimořádně pěkný, rychlý, plně responzivní web s vkusnými animacemi**, kde dominuje dílo (malba na kalené sklo). Postupuj po krocích níže; po každém kroku se zastav a ukaž výsledek.

## Stack
- **Astro** (statický výstup), **TypeScript**.
- **Tailwind CSS** pro layout + malá vrstva custom CSS pro bespoke typografii a motion.
- **Astro View Transitions** — plynulé přechody mezi stránkami (aby vícestránkový web působil jako jeden celek).
- **Lenis** — smooth scroll (jen na zařízeních bez `prefers-reduced-motion`).
- **GSAP + ScrollTrigger** — scroll-reveal animace, parallax pozadí, staggered nástupy. Drž lehké.
- **PhotoSwipe** — lightbox galerií.
- Obrázky přes `astro:assets` (responsive, moderní formáty, lazy-load, blur-up placeholder).
- Hosting: **Cloudflare Pages** (statika).

## Vizuální směr (art direction)
- **Tmavá galerijní „výztuž"** (téměř černé pozadí ~`#0a0a0b`), ať barvy obrazů svítí. Hodně negativního prostoru, klid, žádný vizuální balast.
- **Typografie:** wordmark „VÁCLAV BEDNÁŘ ART" fontem z letáku (lokální `woff2` — dodá Václav, do té doby placeholder). Nadpisy: výrazný moderní grotesk. Dlouhé texty (bio, esej, rozhovor): **serif** (lepší čtení, katalogový pocit). Max 3 řezy celkem.
- Velké editorial měřítko, jemná akcentní barva vytažená z hero obrazu (modrá).
- Každá sekce = celoplošné pozadí (obraz/foto) s tmavým gradientovým scrimem pro čitelnost textu.

## Pohyb / animace (vkusně, ne cirkus)
- **Page transitions:** křížový fade / jemný posun mezi stránkami (View Transitions).
- **Scroll-reveal:** texty a obrázky se nasouvají fade + lehký posun nahoru, staggered.
- **Parallax** na celoplošných pozadích (pozadí jede pomaleji než obsah → hloubka).
- **Hero:** aftermovie hraje přes modrý obraz (autoplay, muted, loop, `playsinline`, poster = modrý obraz). Nadpis nastoupí fade-up. Jemný scroll cue.
- **Galerie:** justified/masonry grid, lehké scale na hover, klik → PhotoSwipe se smooth zoomem.
- **Vše jen `transform`/`opacity`** (GPU). Respektuj `prefers-reduced-motion` → vypni heavy motion. Žádný layout thrash.

## Struktura & i18n
- Vícestránkový web. Locale routing: `/cs/...` (default) a `/en/...`. Architektura připravená i pro `de`, `ja`, `fr`, `ru` (zatím prázdné).
- Texty drž v `src/content/` per locale, ne natvrdo v šablonách.
- **Jazyky teď: CS (kompletní) + EN.** EN texty viz `content-en.md`. Ostatní 4 jazyky později.
- Přepínač jazyků: malá řada vlaječek v rohu nahoře, aktivní stav, přepíná na ekvivalentní stránku.

## Stránky (každá vlastní route)
1. **Home `/`** — hero: modrý obraz + aftermovie + wordmark; nav + vlaječky.
2. **BIO `/bio`** — rozmazané pozadí (`bio-bg`), text bio, vlaječky v rohu, dole vpravo „více o autorovi". *(BIO = O mně.)*
3. **REFERENCE `/reference`** — pozadí obraz; esej „Fraktály pohybu" + rozhovor (OL 4YOU); odkazy na externí rozhovory.
4. **SKLO `/glass`** — hlavní galerie (Abstract on Glass) + sloupec textu vlevo; pozadí obraz nebo plocha (potvrdit odstín).
5. **OUT OF CONTROL `/out-of-control`** — příběh značky + galerie (klik = velký formát).
6. **ATELIÉR `/studio`** — pozadí `studio-bg`; galerie ořezaných fotek ateliéru.
7. **AKTUÁLNĚ `/news`** — pozadí Myslbek; text výstavy Sound of Colors; postav ať se snadno aktualizuje.
8. **KONTAKT `/contact`** — pozadí `contact-bg`; e-mail, Instagram, Facebook, telefon; ikony pod sebou.

## Assety
- Zatím použij **placeholdery** (barevné bloky / volné fotky) se sémantickými názvy: `hero-blue`, `hero-aftermovie`, `bio-bg`, `reference-bg`, `glass-01…`, `ooc-01…`, `studio-bg`, `studio-01…`, `news-myslbek`, `contact-bg`. Reálné soubory dodá Václav, jen je vyměníme.
- Fonty do `public/fonts/`, obrázky `src/assets/images/`, video `public/video/`.

## Pořadí stavby
1. Scaffold Astro + Tailwind + TS + View Transitions; základní layout, tmavé téma, typografie, tokeny.
2. Nav + LangSwitcher + i18n routing (cs/en), prázdné stránky.
3. Reusable komponenty: `Hero`, `SectionBg` (parallax + scrim), `Gallery` + `Lightbox` (PhotoSwipe), `Reveal` (scroll animace).
4. Naplnit stránky obsahem (CS + EN).
5. Hero video + animace nadpisu.
6. Smooth scroll (Lenis) + jemné parallax/reveal, vždy s reduced-motion fallbackem.
7. Optimalizace: obrázky, lazy-load, Lighthouse, responsivita 360–1920 px.
8. Deploy na Cloudflare Pages.

## Akceptační kritéria
- Lighthouse mobil: Performance ≥ 90, Accessibility ≥ 95.
- Plynulé na mobilu i desktopu; `prefers-reduced-motion` plně respektováno.
- Žádný horizontální scroll, žádné CLS skoky; galerie a video lazy.
- Snadná výměna placeholderů za reálné assety a doplnění dalších jazyků.
