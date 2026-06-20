// Centrální registr obrázků. Placeholdery žijí v images/placeholders/.
// Reálné assety: nahraď soubor stejného jména (např. bio-bg.jpg) — kód se nemění.
import type { ImageMetadata } from 'astro';

const modules = import.meta.glob<{ default: ImageMetadata }>(
  './images/placeholders/*.{jpg,jpeg,png,webp,avif}',
  { eager: true }
);

const map: Record<string, ImageMetadata> = {};
for (const path in modules) {
  const name = path.split('/').pop()!.replace(/\.[^.]+$/, '');
  map[name] = modules[path].default;
}

/** Jeden obrázek podle sémantického názvu (bez přípony). */
export function img(name: string): ImageMetadata {
  const m = map[name];
  if (!m) throw new Error(`Obrázek '${name}' nenalezen ve src/assets/images/placeholders/.`);
  return m;
}

/** Série galerie podle prefixu, číselně seřazená: imgSeries('glass') → glass-01..NN. */
export function imgSeries(prefix: string): ImageMetadata[] {
  return Object.keys(map)
    .filter((n) => new RegExp(`^${prefix}-\\d+$`).test(n))
    .sort()
    .map((n) => map[n]);
}
