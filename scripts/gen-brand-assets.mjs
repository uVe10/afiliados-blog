/**
 * Genera los assets de marca por código (sin depender de subir archivos):
 *   - public/images/logo.png       (wordmark, para Schema.org publisher.logo)
 *   - public/images/og-default.png (1200x630, imagen social por defecto)
 *
 * Reproduce en SVG los elementos firma del diseño (flecha mostaza de la marca
 * y etiqueta "Dymo" del PriceTag) y usa una fuente estática del sistema
 * (DejaVu) para que el render con librsvg/sharp sea fiable y offline.
 *
 * Uso: node scripts/gen-brand-assets.mjs
 */
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const OUT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../public/images');

// Paleta del sistema de diseño (global.css)
const C = {
  cream: '#FAF7F2',
  ink: '#2B2620',
  inkMuted: '#635E56',
  mustard: '#C08A3E',
  sage: '#6B7860',
  sageDark: '#556450',
  divider: '#D9D2C7',
};

const WORD_FONT = 'DejaVu Sans';
const MONO_FONT = 'DejaVu Sans Mono';

/** Flecha de marca (misma forma que .brand-mark: pentágono que apunta a la izq.). */
function brandMark(x, y, s, fill = C.mustard) {
  const p = [
    [x + 0.3 * s, y],
    [x + s, y],
    [x + s, y + s],
    [x + 0.3 * s, y + s],
    [x, y + 0.5 * s],
  ]
    .map((pt) => pt.map((n) => n.toFixed(1)).join(','))
    .join(' ');
  return `<polygon points="${p}" fill="${fill}"/>`;
}

/** Etiqueta "Dymo" variante A (arrow tag mostaza con agujero), rotada. */
function dymoTag(cx, cy, w, h, text, rot = -3) {
  const x0 = cx - w / 2;
  const x1 = cx + w / 2;
  const y0 = cy - h / 2;
  const y1 = cy + h / 2;
  const ym = cy;
  const pts = [
    [x0 + 16, y0],
    [x1, y0],
    [x1, y1],
    [x0 + 16, y1],
    [x0, ym],
  ]
    .map((pt) => pt.map((n) => n.toFixed(1)).join(','))
    .join(' ');
  const textX = (x0 + 16 + x1) / 2 + 6;
  return `
    <g transform="rotate(${rot} ${cx} ${cy})">
      <polygon points="${pts}" fill="${C.mustard}"/>
      <circle cx="${x0 + 12}" cy="${ym}" r="4" fill="${C.cream}" stroke="${C.ink}" stroke-width="1"/>
      <text x="${textX}" y="${ym}" text-anchor="middle" dominant-baseline="central"
            font-family="${MONO_FONT}" font-weight="bold" font-size="${h * 0.42}"
            letter-spacing="1.5" fill="${C.ink}">${text}</text>
    </g>`;
}

/** Wordmark "OrganizaTuHogar" con "Hogar" en mostaza. */
function wordmark(x, y, size, anchor = 'start') {
  return `<text x="${x}" y="${y}" text-anchor="${anchor}"
      font-family="${WORD_FONT}" font-weight="bold" font-size="${size}" letter-spacing="0.5">
      <tspan fill="${C.ink}">OrganizaTu</tspan><tspan fill="${C.mustard}">Hogar</tspan>
    </text>`;
}

// ---------- 1) logo.png (600x160) ----------
const LOGO_W = 600;
const LOGO_H = 160;
const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${LOGO_W}" height="${LOGO_H}" viewBox="0 0 ${LOGO_W} ${LOGO_H}">
  <rect width="${LOGO_W}" height="${LOGO_H}" fill="${C.cream}"/>
  ${brandMark(44, 48, 64)}
  ${wordmark(128, 98, 46)}
</svg>`;

// ---------- 2) og-default.png (1200x630) ----------
const OG_W = 1200;
const OG_H = 630;
const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${OG_W}" height="${OG_H}" viewBox="0 0 ${OG_W} ${OG_H}">
  <defs>
    <pattern id="stripes" width="20" height="20" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
      <rect width="20" height="20" fill="${C.sage}"/>
      <rect width="10" height="20" fill="${C.sageDark}"/>
    </pattern>
  </defs>
  <rect width="${OG_W}" height="${OG_H}" fill="${C.cream}"/>

  <!-- Acentos diagonales (patrón de los pines/portadas) -->
  <rect x="0" y="0" width="${OG_W}" height="12" fill="${C.sage}"/>
  <rect x="0" y="560" width="${OG_W}" height="70" fill="url(#stripes)"/>
  <rect x="0" y="552" width="${OG_W}" height="8" fill="${C.mustard}"/>

  <!-- Marca -->
  ${brandMark(555, 92, 92)}

  <!-- Wordmark centrado -->
  <text x="600" y="315" text-anchor="middle" font-family="${WORD_FONT}" font-weight="bold"
        font-size="92" letter-spacing="1">
    <tspan fill="${C.ink}">OrganizaTu</tspan><tspan fill="${C.mustard}">Hogar</tspan>
  </text>

  <!-- Tagline -->
  <text x="600" y="378" text-anchor="middle" font-family="${WORD_FONT}"
        font-size="32" fill="${C.inkMuted}">Comparativas honestas de organización del hogar</text>

  <!-- Etiqueta Dymo decorativa -->
  ${dymoTag(600, 470, 300, 60, 'COMPARATIVAS')}
</svg>`;

async function render(svg, file, extra = {}) {
  const out = path.join(OUT, file);
  await sharp(Buffer.from(svg), { density: 200 })
    .resize({ ...extra })
    .png({ compressionLevel: 9 })
    .toFile(out);
  const meta = await sharp(out).metadata();
  console.log(`✓ ${file} — ${meta.width}x${meta.height}px`);
}

await render(logoSvg, 'logo.png', { width: LOGO_W, height: LOGO_H });
await render(ogSvg, 'og-default.png', { width: OG_W, height: OG_H });
console.log('Listo.');
