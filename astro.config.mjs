// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://empresalouzada.com.br',
  // Adapter do Vercel com ISR: páginas marcadas com `prerender = false`
  // (horários, avisos, pontos, home) são servidas sob demanda e cacheadas
  // por 60s. Edições no /admin aparecem no ar em até ~1 min, sem novo deploy.
  adapter: vercel({ isr: { expiration: 60 } }),
  integrations: [
    react(),
    sitemap({
      // fora do sitemap: painel e páginas utilitárias
      filter: (page) => !page.includes('/admin') && !page.includes('/offline'),
      // páginas dinâmicas (ISR) não entram no auto-sitemap; incluímos à mão
      customPages: [
        'https://empresalouzada.com.br/',
        'https://empresalouzada.com.br/horarios',
        'https://empresalouzada.com.br/pontos',
        'https://empresalouzada.com.br/avisos',
      ],
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
