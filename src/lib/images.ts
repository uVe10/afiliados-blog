import fs from 'node:fs';
import path from 'node:path';

const PUBLIC_DIR = path.resolve(process.cwd(), 'public');

/**
 * ¿Existe la imagen en /public? Se evalúa en build (frontmatter corre en Node).
 * Permite que los JSON apunten ya a las rutas .webp finales aunque la foto no
 * esté todavía: la card cae al marcador de posición del diseño sin romperse.
 */
export function imageExists(publicPath: string): boolean {
  if (!publicPath) return false;
  const rel = publicPath.replace(/^\//, '');
  try {
    return fs.existsSync(path.join(PUBLIC_DIR, rel));
  } catch {
    return false;
  }
}
