import type { Articulo } from '../types';

// Carga tipada de todos los artículos JSON de /src/data.
// `eager` => se resuelven en build; el tipo se valida contra `Articulo`.
const modules = import.meta.glob<{ default: Articulo }>('../data/*.json', {
  eager: true,
});

/** Todos los artículos, ordenados por fecha de publicación (más reciente primero). */
export const articles: Articulo[] = Object.values(modules)
  .map((m) => m.default)
  .sort((a, b) => b.fecha_publicacion.localeCompare(a.fecha_publicacion));

/** Devuelve un artículo por su slug, o undefined. */
export function getArticle(slug: string): Articulo | undefined {
  return articles.find((a) => a.slug === slug);
}

/** Formatea una fecha ISO (YYYY-MM-DD) al castellano: "12 de julio de 2026". */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  const date = new Date(Date.UTC(y, (m ?? 1) - 1, d ?? 1));
  return new Intl.DateTimeFormat('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}
