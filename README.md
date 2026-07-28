# OrganizaTuHogar

Blog de afiliados de Amazon.es sobre organización del hogar. Sitio estático
en **Astro + TypeScript**, desplegado en **GitHub Pages** con dominio
`organizatuhogar.net`.

Diseño importado de Claude Design (`OrganizaTuHogar.dc.html` + `PriceTag.dc.html`).

## Puesta en marcha

```bash
npm install
npm run dev      # servidor local en http://localhost:4321
npm run build    # genera /dist (lo que se publica)
npm run preview  # sirve /dist para revisarlo
npm run check    # type-check de Astro/TypeScript
```

## Estructura

```
src/
  types.ts                 Modelo tipado: Articulo y Producto
  data/*.json              Un JSON por comparativa (una por categoría)
  lib/
    articles.ts            Carga tipada + orden + formato de fechas
    amazon.ts              withAffiliateTag() → garantiza tag=organizatuh08-21
    images.ts              imageExists() → placeholder si falta la foto
  components/
    PriceTag.astro         Etiqueta de precio firma (variantes A/B/C)
    ProductCard.astro      Card de producto
    CategoryCard.astro     Tarjeta de categoría (home)
    Header / Footer        Cabecera con nav + pie con divulgación de afiliados
    BaseHead.astro         Meta, Open Graph, canonical y Schema.org
  layouts/BaseLayout.astro
  pages/
    index.astro            Home
    articulos/[slug].astro Artículo comparativa
public/
  robots.txt  CNAME  .nojekyll  images/
scripts/convert-images.mjs  JPG/PNG → WebP (npm run images)
```

## Añadir o editar un artículo

1. Crea/edita un archivo en `src/data/`, tipado como `Articulo` (ver
   `src/types.ts`). El `slug` define la URL `/articulos/{slug}`.
2. Las rutas de `imagen` / `imagen_portada` apuntan a `/public/images/...`
   (WebP). Si la foto aún no existe, la card muestra el marcador de posición
   del diseño automáticamente — el sitio sigue compilando.
3. `enlace_amazon` puede ser una URL de producto o de búsqueda de Amazon.es;
   el tag de afiliado se añade solo.

## Imágenes

- **Nunca** URLs externas (Leonardo/Discord caducan). Todo en `/public/images`.
- Flujo: mete los originales en `assets-src/` y ejecuta `npm run images` para
  generar los `.webp` en `public/images/` (necesita `npm install -D sharp`).

## Decisiones de SEO

- Schema.org `BlogPosting` sí (headline, fechas, autor, editor, imagen).
- **Precio y valoración solo como texto visible. NUNCA** en datos
  estructurados (`Offer` / `AggregateRating`): a este volumen no se pueden
  mantener al día y el marcado obsoleto penaliza.
- Sitemap (`@astrojs/sitemap`), `robots.txt`, meta tags y Open Graph incluidos.

## Despliegue (GitHub Pages)

- `.github/workflows/deploy.yml` compila y publica en cada push a `main`.
- En el repo: Settings → Pages → Source = **GitHub Actions**.
- `public/CNAME` fija el dominio `organizatuhogar.net`. Configura el DNS en
  Cloudflare cuando compres el dominio. `.nojekyll` evita el procesado Jekyll.

## Notas

- Fijado a **Astro 5** por compatibilidad con Node 20 (Astro 7 exige Node 22).
- El aviso de `npm audit` (esbuild) es del servidor de desarrollo en Windows;
  no afecta a la salida estática de producción.
