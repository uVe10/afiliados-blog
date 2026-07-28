/**
 * Modelo de datos del blog OrganizaTuHogar.
 *
 * IMPORTANTE (SEO): `precio_texto` y `rating_texto` son SÓLO texto visible.
 * NUNCA se emiten como datos estructurados Schema.org (Offer / AggregateRating):
 * a este volumen no podemos mantenerlos al día y datos desactualizados en el
 * marcado son motivo de penalización. Ver `src/components/BaseHead.astro`.
 */

/** Una card de producto dentro de una comparativa. */
export interface Producto {
  /** Nombre comercial del producto tal como se muestra en el H2 de la card. */
  nombre: string;
  /**
   * Ruta local de la imagen dentro de /public, p. ej.
   * "/images/cocina/botes-hermeticos.webp". Nunca URLs externas
   * (Leonardo/Discord caducan). Si el archivo no existe todavía, la card
   * muestra el marcador de posición del diseño automáticamente.
   */
  imagen: string;
  /** Texto alternativo descriptivo de la imagen (accesibilidad + SEO). */
  alt_text: string;
  /** Precio como texto visible, p. ej. "19,99€". Solo presentación. */
  precio_texto: string;
  /** Valoración como texto visible, p. ej. "4,6 · 2.139 valoraciones". Solo presentación. */
  rating_texto: string;
  /** Párrafo introductorio / opinión de la card. */
  descripcion: string;
  /** Lista de ventajas ("+") mostradas en la card. */
  pros: string[];
  /**
   * Enlace de afiliado a Amazon.es. Puede ser una URL de producto o de
   * búsqueda; el tag de afiliado (organizatuh08-21) se garantiza en
   * `withAffiliateTag()` — no hace falta incluirlo aquí.
   */
  enlace_amazon: string;
}

/** Un artículo tipo "comparativa" (uno por categoría / tablero de Pinterest). */
export interface Articulo {
  /** Identificador de URL: /articulos/{slug}. */
  slug: string;
  /** Categoría / etiqueta que se muestra como badge y en la navegación. */
  categoria: string;
  /** Ancla usada en la navegación de la home (#cocina, #armario...). */
  ancla: string;
  /** Título H1 visible del artículo. */
  titulo_articulo: string;
  /** Título para <title> y og:title (puede diferir del H1). */
  meta_titulo: string;
  /** Descripción para <meta description> y og:description. */
  meta_descripcion: string;
  /** Fecha ISO (YYYY-MM-DD) de publicación. */
  fecha_publicacion: string;
  /** Fecha ISO (YYYY-MM-DD) de última modificación. */
  fecha_modificacion: string;
  /** Ruta local de la imagen de portada / og:image. */
  imagen_portada: string;
  /** Texto alternativo de la portada. */
  portada_alt: string;
  /** Párrafo(s) de introducción bajo el H1. */
  intro: string;
  /** Cards de producto de la comparativa. */
  productos: Producto[];
  /** Cierre "En resumen" (opcional). */
  resumen?: string;
}

/** Estilo de la etiqueta de precio firma (Dymo). Ver `PriceTag.astro`. */
export type PriceTagVariant = 'A' | 'B' | 'C';
