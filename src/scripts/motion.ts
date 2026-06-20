// ──────────────────────────────────────────────
// Globální motion: Lenis smooth scroll + GSAP ScrollTrigger.
// Reveal (fade + posun, stagger), parallax pozadí, hero intro.
// Výhradně transform/opacity. Plný fallback pro prefers-reduced-motion:
// žádný Lenis, žádný parallax, žádné posuny — obsah je rovnou viditelný.
// Re-inicializace po View Transitions přechodech.
// ──────────────────────────────────────────────
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
const reduce = () => mq.matches;

let lenis: Lenis | null = null;
let tickerFn: ((time: number) => void) | null = null;
// Tweeny bez ScrollTriggeru (hero intro) si držíme, ať je umíme cíleně zabít.
let looseTweens: gsap.core.Tween[] = [];

function teardown() {
  ScrollTrigger.getAll().forEach((t) => t.kill());
  looseTweens.forEach((t) => t.kill());
  looseTweens = [];
  if (tickerFn) {
    gsap.ticker.remove(tickerFn);
    tickerFn = null;
  }
  if (lenis) {
    lenis.destroy();
    lenis = null;
  }
}

function initLenis() {
  lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  tickerFn = (time: number) => lenis?.raf(time * 1000);
  gsap.ticker.add(tickerFn);
  gsap.ticker.lagSmoothing(0);
}

function initReveal() {
  // Skupiny se staggerem
  document.querySelectorAll<HTMLElement>('[data-reveal-group]').forEach((group) => {
    const items = group.querySelectorAll<HTMLElement>('[data-reveal]');
    if (!items.length) return;
    gsap.set(items, { opacity: 0, y: 24 });
    gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.12,
      scrollTrigger: { trigger: group, start: 'top 82%', once: true },
    });
  });

  // Samostatné reveals (mimo skupinu)
  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    if (el.closest('[data-reveal-group]')) return;
    gsap.set(el, { opacity: 0, y: 24 });
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
  });
}

function initParallax() {
  document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
    const depth = parseFloat(el.getAttribute('data-parallax') || '0.2');
    const scope = el.closest<HTMLElement>('[data-parallax-scope]') || el;
    const shift = depth * 100; // procenta výšky média
    gsap.fromTo(
      el,
      { yPercent: -shift / 2 },
      {
        yPercent: shift / 2,
        ease: 'none',
        scrollTrigger: { trigger: scope, start: 'top bottom', end: 'bottom top', scrub: true },
      }
    );
  });
}

function initHeroIntro() {
  const title = document.querySelector<HTMLElement>('[data-hero-title]');
  const sub = document.querySelectorAll<HTMLElement>('[data-hero-fade]');
  // fromTo (ne from): CSS .has-motion drží opacity:0, takže explicitně animujeme DO opacity:1.
  if (title) {
    looseTweens.push(
      gsap.fromTo(title, { y: 32, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out', delay: 0.15 })
    );
  }
  if (sub.length) {
    looseTweens.push(
      gsap.fromTo(sub, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.5, stagger: 0.12 })
    );
  }
}

// Vlastní tvorba animací — běží až po vykreslení nové stránky (viz setup).
function build() {
  initLenis();
  initReveal();
  initParallax();
  initHeroIntro();
  ScrollTrigger.refresh();
}

function setup() {
  teardown();

  if (reduce()) {
    // Reduced motion: nic nehýbeme. Reveal prvky musí být viditelné.
    document.documentElement.classList.remove('has-motion');
    gsap.set('[data-reveal]', { clearProps: 'all', opacity: 1, y: 0 });
    return;
  }

  // .has-motion (nastaveno inline skriptem v <head>) drží reveal prvky skryté přes CSS,
  // takže nebliknou. Vlastní animace odložíme o 2 snímky, ať se nová stránka nejdřív
  // vykreslí — klik na navigaci tím není blokovaný těžkým ScrollTrigger.refresh().
  document.documentElement.classList.add('has-motion');
  requestAnimationFrame(() => requestAnimationFrame(build));
}

// Inicializace + re-init po přechodech; úklid před výměnou stránky.
document.addEventListener('astro:page-load', setup);
document.addEventListener('astro:before-swap', teardown);
// Změna preference za běhu
mq.addEventListener('change', setup);
