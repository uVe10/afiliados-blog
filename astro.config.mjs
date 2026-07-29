// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Deploy en GitHub Pages como repo de proyecto => se sirve bajo la subruta
// https://uve10.github.io/afiliados-blog/. Por eso `base` lleva el nombre del
// repo y `site` es el dominio de github.io (para canonical/OG/sitemap absolutos).
// Si algún día se activa el dominio propio en la raíz, poner base '/', site al
// dominio y volver a crear public/CNAME.
export default defineConfig({
  site: 'https://uve10.github.io',
  base: '/afiliados-blog/',
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
  },
  integrations: [
    sitemap({
      // Excluimos nada por ahora; todas las páginas son indexables.
      changefreq: 'monthly',
      priority: 0.7,
    }),
  ],
});
