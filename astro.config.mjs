// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Dominio final comprado en Cloudflare. Deploy en GitHub Pages con dominio
// personalizado => base '/' (no subruta). Si algún día se sirviera desde
// usuario.github.io/repo, cambiar `base` a '/repo/'.
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
