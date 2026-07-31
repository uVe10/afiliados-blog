/**
 * Utilidades de slug/ancla. Centralizadas para que el ancla de un producto sea
 * IDÉNTICA en el artículo (índice interno, id de la card) y en el buscador
 * global de la home. Si esto divergiera, los enlaces "Ver detalle" del buscador
 * apuntarían a anclas inexistentes.
 */

/** Slug URL-safe: minúsculas, sin tildes, no alfanumérico -> guiones. */
export function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/** Id de ancla de un producto dentro de su artículo (#id). `index` es 0-based. */
export function productAnchor(nombre: string, index: number): string {
  return slugify(nombre) || `producto-${index + 1}`;
}
