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
      bgOpacity: 0.96,
      pswpModule: () => import('photoswipe'),
    });
    lb.init();
    lightboxes.push(lb);
  });
}

document.addEventListener('astro:page-load', init);
document.addEventListener('astro:before-swap', destroy);
