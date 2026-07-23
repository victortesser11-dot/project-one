# Site Empresa Louzada

Site institucional e de horários da **Empresa Louzada de Transportes** — linha
Arroio dos Ratos ⇄ Porto Alegre pela BR-290, além de fretamento.

> ⚠️ **Proposta em desenvolvimento.** Horários, tarifas e contatos vêm de fontes
> públicas e ainda **não foram validados oficialmente** pela empresa. Veja
> [`docs/PRD.md`](docs/PRD.md) para o documento de produto completo.

## Stack

- **[Astro](https://astro.build)** — site estático, rápido e ótimo para SEO
- **Tailwind CSS v4** — estilo via tokens de identidade (`src/styles/global.css`)
- Interatividade em ilhas de JS leve (widget "próximo ônibus", seletor de horários)
- Backend planejado (Fase 2): **Supabase** — *em conta nova, dedicada ao projeto*

## Rodando localmente

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # gera dist/
npm run preview  # serve o build
```

## Estrutura

```
src/
  data/         empresa.ts, schedules.ts  (dados — migram para Supabase na Fase 2)
  lib/          nextDeparture.ts          (lógica da próxima partida)
  components/   Header, Footer, NextBus, ScheduleTable, WhatsAppButton, DemoBanner
  layouts/      Base.astro                (SEO, PWA, fonte, dados estruturados)
  pages/        index, horarios, fretamento, avisos
  styles/       global.css                (identidade visual / tokens)
public/         manifest, favicon, robots.txt
docs/PRD.md     documento de requisitos do produto
```

## Identidade visual

Cores da empresa: **azul, vermelho e cinza**.

- **Azul** (`--color-azul-700` #164a88) — primária (marca, links, títulos)
- **Vermelho** (`--color-vermelho-500` #db2828) — acento e CTAs (`.btn-cta`), faixa de pista
- **Cinza** (`--color-cinza-*`) — neutros de fundo e bordas
- **Asfalto** (`--color-asfalto-900`) — base escura do hero e da barra utilitária
- Números tabulares (`.tabular`) para alinhar horários

## Status

**Fase 1 — concluída**
- [x] Fundação Astro + Tailwind + identidade visual
- [x] Home com widget "próximo ônibus" (ao vivo, offline-friendly)
- [x] Página de horários (seletor sentido/dia + tarifa)
- [x] Página de fretamento (vitrine + formulário)
- [x] Avisos, PWA manifest, SEO, botão WhatsApp global

**Fase 2 — concluída (código pronto; requer projeto Supabase novo)**
- [x] Schema do banco + RLS + seed → `supabase/migrations/`
- [x] Camada de dados com fallback (site funciona sem Supabase configurado)
- [x] Painel admin em `/admin` (login + CRUD de horários, tarifa, avisos e leads)
- [x] Formulário de fretamento grava lead no Supabase (+ WhatsApp garantido)
- [ ] Criar o projeto Supabase e conectar → ver [`docs/SETUP-SUPABASE.md`](docs/SETUP-SUPABASE.md)

## Painel admin (`/admin`)

Área restrita (login por e-mail/senha via Supabase Auth) para a equipe editar:
horários, tarifa, avisos e ver os pedidos de fretamento. Roda 100% no cliente,
direto contra o Supabase — sem servidor próprio. Setup em
[`docs/SETUP-SUPABASE.md`](docs/SETUP-SUPABASE.md).

**Fase 3 — em andamento**
- [x] Dados ao vivo sem rebuild (adapter Vercel + ISR 60s) → ver [`docs/DEPLOY-VERCEL.md`](docs/DEPLOY-VERCEL.md)
- [x] Página de pontos de embarque + mapa (OpenStreetMap/Leaflet, custo zero)
- [x] Box/plataforma de embarque nos pontos (ex.: rodoviária de POA)
- [x] Menu mobile em grade (sem rolagem horizontal)

## Próximos passos

- **Ícones PNG maskable** do PWA (192/512) — pendente (favicon SVG já ativo)
- **Service worker** para cache offline completo
- **Acabamento de lançamento:** imagem de compartilhamento (OG), 404, sitemap, analytics
- Validação oficial dos dados + fotos reais + domínio → go-live