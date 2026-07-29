/**
 * Prefija una ruta interna (enlace o imagen de /public) con la base del sitio
 * (`import.meta.env.BASE_URL`). Así las URLs funcionan tanto en local con
 * `base: '/'` como desplegadas bajo la subruta de GitHub Pages
 * (`base: '/afiliados-blog/'`), sin generar `//` dobles.
 *
 * Uso: `withBase('/images/x.webp')` -> `/afiliados-blog/images/x.webp`.
 * Nota: para `imageExists()` (comprobación en disco de /public) NO se usa esto;
 * ese chequeo trabaja siempre con la ruta original del JSON.
 */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL;
  const normBase = base.endsWith('/') ? base : `${base}/`;
  return normBase + path.replace(/^\/+/, '');
}
