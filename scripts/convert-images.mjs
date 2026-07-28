#!/usr/bin/env node
/**
 * Convierte imágenes de origen (JPG/PNG) a WebP optimizado.
 *
 *   Origen:  ./assets-src/**  (lo que descargues de Leonardo, fotos, etc.)
 *   Destino: ./public/images/** (misma ruta relativa, extensión .webp)
 *
 * Uso:  npm run images
 *
 * Requiere `sharp` (devDependency). Si aún no está instalado:
 *   npm install -D sharp
 *
 * Recuerda: en producción NO se usan URLs externas (Leonardo/Discord caducan).
 * Guarda siempre el .webp resultante en /public/images y referencia esa ruta
 * local en los JSON de /src/data.
 */
import { readdir, mkdir, stat } from 'node:fs/promises';
import path from 'node:path';

const SRC_DIR = path.resolve('assets-src');
const OUT_DIR = path.resolve('public/images');
const MAX_WIDTH = 1200; // suficiente para portadas; las cards usan menos
const QUALITY = 80;

let sharp;
try {
  sharp = (await import('sharp')).default;
} catch {
  console.error('Falta la dependencia "sharp". Instálala con:  npm install -D sharp');
  process.exit(1);
}

async function* walk(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(full);
    else yield full;
  }
}

const isImage = (f) => /\.(jpe?g|png|webp|tiff?)$/i.test(f);

async function run() {
  try {
    await stat(SRC_DIR);
  } catch {
    console.error(`No existe la carpeta de origen: ${SRC_DIR}`);
    console.error('Crea ./assets-src y mete ahí las imágenes a convertir.');
    process.exit(1);
  }

  let count = 0;
  for await (const file of walk(SRC_DIR)) {
    if (!isImage(file)) continue;
    const rel = path.relative(SRC_DIR, file);
    const out = path.join(OUT_DIR, rel).replace(/\.[^.]+$/, '.webp');
    await mkdir(path.dirname(out), { recursive: true });
    await sharp(file)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(out);
    console.log(`✓ ${rel} → ${path.relative(process.cwd(), out)}`);
    count++;
  }
  console.log(count ? `\nListo: ${count} imagen(es) convertida(s).` : 'No se encontraron imágenes en assets-src.');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
