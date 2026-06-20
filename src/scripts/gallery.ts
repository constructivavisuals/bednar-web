// PhotoSwipe lightbox pro všechny galerie na stránce ([data-gallery]).
// Smooth zoom; re-inicializace po View Transitions, úklid před výměnou.
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';

const reduce = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let lightboxes: PhotoSwipeLightbox[] = [];

function destroy() {
  lightboxes.forEach((lb) => lb.destroy());
  lightboxes = [];
}

function init() {
  destroy();
  document.querySelectorAll<HTMLElement>('[data-gallery]').forEach((el) => {
    const lb = new PhotoSwipeLightbox({
      gallery: el,
      children: 'a',
      showHideAnimationType: reduce() ? 'none' : 'zoom',
      // Pozadí řešíme CSS (rozmazaná stránka, ne černá) → necháme vrstvu plně viditelnou.
      bgOpacity: 1,
      // Jeden obrázek, ne galerie — žádné přepínání na další.
      allowPanToNext: false,
      // Odsazení, ať je kolem zvětšeného obrázku vidět rozmazané pozadí.
      paddingFn: (viewportSize) => {
        const p = Math.round(Math.min(viewportSize.x, viewportSize.y) * 0.06);
        return { top: p, bottom: p, left: p, right: p };
      },
      pswpModule: () => import('photoswipe'),
    });
    lb.init();
    lightboxes.push(lb);
  });
}

document.addEventListener('astro:page-load', init);
document.addEventListener('astro:before-swap', destroy);
