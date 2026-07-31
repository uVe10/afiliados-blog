import { articles, navArticles } from './articles';
import { imageExists } from './images';
import { withBase } from './url';
import { productAnchor } from './slug';

/**
 * Producto aplanado para el buscador global de la home. Se agregan en BUILD
 * todos los productos de todos los artículos (mismo `import.meta.glob` que usa
 * `articles.ts`) y se serializan al cliente, que filtra en JS (sitio estático).
 *
 * `href` ya lleva `withBase()` aplicado (enlace final); `imagen` va en crudo
 * porque `QuickView` le aplica `withBase()` al renderizar. `precio_texto`/
 * `rating_texto` son SOLO presentación; los `*_valor`/`num_valoraciones` son
 * SOLO para filtrar (nunca Schema.org).
 */
export interface SearchProduct {
  nombre: string;
  /** `nombre` normalizado (minúsculas, sin tildes) para búsqueda insensible. */
  nombre_norm: string;
  imagen: string;
  hasImage: boolean;
  alt_text: string;
  precio_texto: string;
  precio_valor: number;
  rating_texto: string;
  rating_valor: number;
  num_valoraciones: number;
  categoria: string;
  /** Enlace directo al producto dentro de su artículo: /articulos/{slug}#{id}. */
  href: string;
}

/** Minúsculas + sin diacríticos, para comparación de texto tolerante a tildes. */
export function normalizeText(s: string): string {
  return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
}

/** Todos los productos de todos los artículos, aplanados para el buscador. */
export const searchProducts: SearchProduct[] = articles.flatMap((art) =>
  art.productos.map((p, i) => ({
    nombre: p.nombre,
    nombre_norm: normalizeText(p.nombre),
    imagen: p.imagen,
    hasImage: imageExists(p.imagen),
    alt_text: p.alt_text,
    precio_texto: p.precio_texto,
    precio_valor: p.precio_valor,
    rating_texto: p.rating_texto,
    rating_valor: p.rating_valor,
    num_valoraciones: p.num_valoraciones,
    categoria: art.categoria,
    href: `${withBase(`/articulos/${art.slug}`)}#${productAnchor(p.nombre, i)}`,
  })),
);

/**
 * Categorías disponibles, en el mismo orden de navegación que el resto de la
 * home (navArticles) y sin duplicados. Nada hardcodeado.
 */
export const searchCategories: string[] = [
  ...new Set(navArticles.map((a) => a.categoria)),
];
