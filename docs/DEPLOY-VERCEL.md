# Deploy no Vercel

O site usa o adapter `@astrojs/vercel` com **ISR**: as páginas de dados (home,
horários, avisos, pontos) são servidas sob demanda e cacheadas por 60s. Assim,
edições no `/admin` aparecem no site em até ~1 min **sem novo deploy**. Tudo no
plano gratuito.

## Passo a passo

1. **Suba o repositório no GitHub** (se ainda não estiver).
2. Em [vercel.com](https://vercel.com), **New Project → Import** do repositório.
3. O Vercel detecta Astro automaticamente (não precisa mexer em build command).
4. **Adicione as variáveis de ambiente** (Settings → Environment Variables), as
   mesmas do `.env`:
   - `PUBLIC_SUPABASE_URL`
   - `PUBLIC_SUPABASE_ANON_KEY`

   > Importante: elas precisam estar lá **antes do build**, porque são embutidas
   > no bundle na hora da compilação. Se adicionar depois, faça um redeploy.
5. **Deploy.** Pronto.

## Antes de virar site oficial

- `public/robots.txt` hoje **bloqueia indexação** (é uma proposta). Quando a
  empresa aprovar, troque o conteúdo por `Allow: /` para o Google indexar.
- Remova o `DemoBanner` (aviso de demonstração) das páginas.
- Valide horários, tarifa e pontos oficiais com a empresa.

## Domínio

Quando tiver o domínio (idealmente reativar `empresalouzada.com.br`), é só
apontar no Vercel em Settings → Domains. Grátis (você paga só o registro do
domínio, à parte).
