// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Deploy en GitHub Pages con dominio propio (public/CNAME) => se sirve en la
// raíz del dominio, por eso `base` es '/'. `site` es el dominio final, usado
// para canonical/OG/sitemap absolutos. `withBase()` es no-op con base '/'.
// Si se volviera a servir desde usuario.github.io/repo, poner base '/repo/',
// site al dominio de github.io y borrar public/CNAME.
export default defineConfig({
  site: 'https://organizatuhogar.net',
  base: '/',
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
