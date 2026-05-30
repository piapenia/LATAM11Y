import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://piapenia.github.io',
  base: '/LATAM11Y',
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
