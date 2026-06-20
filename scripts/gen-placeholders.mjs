// Generátor placeholder obrázků (sharp). Reálné fotky dodá Václav — jen vyměníme.
// Spuštění: node scripts/gen-placeholders.mjs
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const outDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'assets', 'images', 'placeholders');
await mkdir(outDir, { recursive: true });

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

function svg({ w, h, from, to, label }) {
  const angle = 135;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
    <defs>
      <linearGradient id="g" gradientTransform="rotate(${angle - 90}, 0.5, 0.5)">
        <stop offset="0%" stop-color="${from}"/>
        <stop offset="100%" stop-color="${to}"/>
      </linearGradient>
      <radialGradient id="v" cx="50%" cy="42%" r="75%">
        <stop offset="60%" stop-color="#000" stop-opacity="0"/>
        <stop offset="100%" stop-color="#000" stop-opacity="0.45"/>
      </radialGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#g)"/>
    <rect width="${w}" height="${h}" fill="url(#v)"/>
    <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle"
      font-family="Georgia, serif" font-size="${Math.round(Math.min(w, h) * 0.07)}"
      fill="#ffffff" fill-opacity="0.82" letter-spacing="2">${esc(label)}</text>
    <text x="50%" y="${h - Math.round(h * 0.06)}" text-anchor="middle"
      font-family="monospace" font-size="${Math.round(Math.min(w, h) * 0.035)}"
      fill="#ffffff" fill-opacity="0.4">${w}×${h} · placeholder</text>
  </svg>`;
}

async function make(name, opts) {
  const buf = Buffer.from(svg(opts));
  await sharp(buf).jpeg({ quality: 82, mozjpeg: true }).toFile(join(outDir, `${name}.jpg`));
  console.log('✓', name);
}

// Hero poster + celoplošná pozadí
const tiles = [
  ['hero-blue', { w: 1920, h: 1080, from: '#0c1b3a', to: '#3f74d6', label: 'HERO · modrý obraz' }],
  ['demo-bg', { w: 1920, h: 1280, from: '#0a0a0b', to: '#2a1d3a', label: 'SectionBg · pozadí' }],
  // Galerie — různé poměry stran pro justified/masonry
  ['g-01', { w: 1200, h: 1500, from: '#10243f', to: '#2f6fb0', label: 'Sklo 01' }],
  ['g-02', { w: 1600, h: 1067, from: '#3a1024', to: '#c0476f', label: 'Sklo 02' }],
  ['g-03', { w: 1200, h: 1200, from: '#0f2a23', to: '#3ba17a', label: 'Sklo 03' }],
  ['g-04', { w: 1067, h: 1600, from: '#2a230f', to: '#c39a3b', label: 'Sklo 04' }],
  ['g-05', { w: 1600, h: 1000, from: '#1a0f2a', to: '#7b54c6', label: 'Sklo 05' }],
  ['g-06', { w: 1400, h: 1050, from: '#2a0f12', to: '#c64a4a', label: 'Sklo 06' }],
];

for (const [name, opts] of tiles) await make(name, opts);
console.log('Hotovo →', outDir);
