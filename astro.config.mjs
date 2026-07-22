// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://empresalouzada.com.br',
  // Adapter do Vercel com ISR: páginas marcadas com `prerender = false`
  // (horários, avisos, pontos, home) são servidas sob demanda e cacheadas
  // por 60s. Edições no /admin aparecem no ar em até ~1 min, sem novo deploy.
  adapter: vercel({ isr: { expiration: 60 } }),
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
