/** Tag de afiliado de Amazon España para OrganizaTuHogar. */
export const AMAZON_AFFILIATE_TAG = 'organizatuh08-21';

/**
 * Garantiza que una URL de Amazon lleva el tag de afiliado.
 * - Si ya trae un `tag`, lo reemplaza por el nuestro (evita filtrar tags ajenos).
 * - Si la URL no es válida, la devuelve tal cual (defensivo).
 */
export function withAffiliateTag(url: string, tag: string = AMAZON_AFFILIATE_TAG): string {
  try {
    const u = new URL(url);
    u.searchParams.set('tag', tag);
    return u.toString();
  } catch {
    return url;
  }
}

/**
 * URL de la página de reseñas de un producto en Amazon.es, con el tag de
 * afiliado ya incluido. Requiere un ASIN válido; el consumidor debe comprobar
 * que existe antes de llamar (sin ASIN no se renderiza el botón "Ver reseñas").
 */
export function reviewsUrl(asin: string, tag: string = AMAZON_AFFILIATE_TAG): string {
  return `https://www.amazon.es/product-reviews/${encodeURIComponent(asin)}?tag=${tag}`;
}
