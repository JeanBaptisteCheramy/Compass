// @ts-check
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://JeanBaptisteCheramy.github.io',
  base: '/Compass',
  integrations: [tailwind()],

  // Securite : empeche Astro d'inliner les petits scripts dans le HTML.
  // Tout le JavaScript est ainsi servi depuis des fichiers externes, ce qui
  // rend possible la directive stricte `script-src 'self'` de la CSP definie
  // dans BaseLayout.astro, sans recourir a 'unsafe-inline'.
  vite: {
    build: {
      assetsInlineLimit: 0,
    },
  },
});
