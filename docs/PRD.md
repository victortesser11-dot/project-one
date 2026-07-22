# PRD — Site Empresa Louzada

**Produto:** Site institucional e de horários da Empresa Louzada de Transportes
**Versão:** 1.0 (proposta)
**Data:** 21/07/2026
**Status:** Rascunho para apresentação à empresa

> ⚠️ **Natureza do projeto:** este é um projeto-proposta, construído por iniciativa própria para ser apresentado à Empresa Louzada. Todo o conteúdo inicial (horários, tarifas, contatos) vem de fontes públicas e deverá ser validado oficialmente pela empresa antes de qualquer publicação como site oficial.

---

## 1. Visão geral

A **Empresa Louzada de Transportes Ltda** (CNPJ 88.363.007/0001-19), fundada em **30/01/1974**, opera há mais de 50 anos o transporte coletivo de passageiros entre **Arroio dos Ratos e Porto Alegre, via BR-290** (linhas L681/L682 do sistema Metroplan, ~65 km), além de serviços de **fretamento** intermunicipal, interestadual e internacional. Sede: Rua João Cândido de Souza, 50, Centro, Arroio dos Ratos/RS.

Hoje a presença digital da empresa se resume a uma página no Facebook e um site fora do ar que, quando funcionava, era essencialmente uma planilha de horários. Quem depende da linha — estudantes, trabalhadores que se deslocam diariamente a POA, pacientes com consultas na capital — não tem um lugar confiável para responder a pergunta mais básica: **"que horas passa o próximo ônibus?"**

### Proposta de valor

Um site **simples, bonito e rápido**, mobile-first, que responde a pergunta do próximo ônibus em menos de 5 segundos, funciona **offline no ponto de ônibus** (PWA) e dá à empresa uma vitrine digna dos seus 50 anos de estrada — incluindo o serviço de fretamento, que hoje não tem canal de divulgação.

Filosofia do produto: **o básico muito bem feito.** Poucas funcionalidades, todas impecáveis.

---

## 2. Problema e oportunidade

| Problema | Consequência |
|---|---|
| Site atual fora do ar / era só uma planilha | Passageiro não encontra horários; liga para a empresa ou desiste |
| Informação espalhada (Moovit, sites de terceiros, Facebook) | Dados divergentes e desatualizados; a empresa não controla a própria informação |
| Fretamento sem divulgação | Receita potencial perdida; orçamentos só chegam por indicação boca-a-boca |
| Sem canal de avisos | Mudanças de horário, feriados e bloqueios na BR-290 não chegam ao passageiro |

**Oportunidade:** ser a fonte oficial e definitiva de informação da linha, com custo de operação próximo de zero e manutenção que qualquer pessoa da empresa consegue fazer.

---

## 3. Objetivos e métricas de sucesso

### Objetivos

1. Ser a referência nº 1 para consulta de horários da linha (acima de Moovit/terceiros no Google para "horário ônibus Arroio dos Ratos Porto Alegre").
2. Reduzir ligações telefônicas de consulta de horário.
3. Gerar leads de fretamento via formulário/WhatsApp.
4. Permitir que a própria empresa atualize horários, tarifas e avisos **sem depender de desenvolvedor**.

### Métricas (após 3 meses no ar)

- Tempo até a informação: usuário vê o próximo horário em **≤ 5 s / ≤ 2 toques** a partir da home.
- Lighthouse: Performance ≥ 90 (mobile), Acessibilidade ≥ 95.
- ≥ 1 pedido de orçamento de fretamento por mês via site/WhatsApp.
- Horários atualizados pela empresa (não por dev) após o treinamento.

---

## 4. Público-alvo

| Persona | Contexto | Necessidade principal |
|---|---|---|
| **Passageiro frequente** (trabalhador/estudante) | Pega o ônibus todo dia, consulta no celular, às vezes sem sinal no ponto | Próxima partida em destaque, offline, rápido |
| **Passageiro eventual** (consulta médica, compras em POA) | Não conhece a linha; quer saber horário, onde pega, quanto custa, quanto demora | Horários completos, mapa de paradas, tarifa |
| **Contratante de fretamento** (empresa, escola, excursão, time) | Procura transporte para grupo | Entender o serviço e pedir orçamento fácil |
| **A própria Louzada** (admin) | Pessoa do escritório, sem perfil técnico | Editar horário/tarifa/aviso em uma tela simples |

---

## 5. Escopo do MVP

### 5.1 Home

- **Hero** com identidade da empresa e o widget **"Próximo ônibus"**: detecta dia/hora atual e mostra a próxima partida nos dois sentidos (Arroio → POA e POA → Arroio), com contagem ("sai em 25 min").
- Atalhos: Horários completos · Fretamento · Avisos · Onde pega (mapa).
- Aviso ativo mais recente em banner destacado (quando houver).
- Bloco institucional curto: "Desde 1974 ligando Arroio dos Ratos a Porto Alegre".
- Rodapé com contatos completos, endereço, redes sociais e mapa da sede.

**Critérios de aceite**
- [ ] Próxima partida correta para dia útil / sábado / domingo-feriado, incluindo virada de dia (última partida já saiu → mostra a primeira do dia seguinte).
- [ ] Home carrega em < 2 s em 4G; widget funciona offline com dados cacheados.

### 5.2 Horários (página principal de consulta)

- Seletor de **sentido** (Arroio → POA / POA → Arroio) e **dia** (útil / sábado / domingo-feriado), pré-selecionados no contexto atual.
- Lista completa de partidas com destaque visual na próxima; horários já passados atenuados.
- **Tarifa em destaque** no topo da página (valor vigente, editável pelo admin, com data da última atualização).
- Observações por horário quando necessário (ex.: "via PUC", "não circula em feriados").
- Botão "Baixar horários" (imagem/PDF gerado) — o público de interior compartilha print no WhatsApp; vamos abraçar esse hábito com um cartão bonito e com a marca da empresa.

**Critérios de aceite**
- [ ] Dados vêm do Supabase e refletem edição do admin sem deploy.
- [ ] Funciona offline com a última versão sincronizada (indicador discreto de "atualizado em …").
- [ ] Legível em tela pequena (min. 360 px) sem zoom.

### 5.3 Fretamento

- Página vitrine: tipos de serviço (excursões, empresas, escolas, eventos; intermunicipal/interestadual/internacional), fotos da frota, diferenciais (50 anos de experiência).
- **Formulário de orçamento**: nome, telefone/WhatsApp, data, origem/destino, nº de passageiros, mensagem. Envio registra o lead no Supabase e dispara o pedido para a empresa (e-mail e/ou notificação).
- Alternativa de 1 toque: botão "Pedir orçamento no WhatsApp" com mensagem pré-preenchida.

**Critérios de aceite**
- [ ] Lead salvo no banco + empresa notificada; usuário vê confirmação clara.
- [ ] Formulário com validação amigável e proteção anti-spam (honeypot/rate limit).

### 5.4 Avisos e notícias

- Mural em ordem cronológica: mudanças de horário, feriados, interdições na BR-290, comunicados.
- Aviso pode ser marcado como **urgente** → vira banner na home e na página de horários até expirar.
- Cada aviso tem título, texto, data de publicação e data de expiração opcional.

### 5.5 Mapa da linha e paradas

- Mapa (Google Maps embed/JS API) com o traçado Arroio dos Ratos ⇄ Porto Alegre pela BR-290 e os **principais pontos de embarque** (sede/garagem em Arroio dos Ratos, Rodoviária de POA, região da PUC e demais pontos validados com a empresa).
- Cada ponto com nome, referência ("em frente ao mercado X") e link "como chegar".
- Fallback estático (imagem do mapa) para o modo offline.

### 5.6 Institucional (seção "A Louzada")

- História resumida (1974 → hoje), fotos, valores. Conteúdo enxuto — uma seção na home ou página simples, não um "quem somos" burocrático.

---

## 6. Painel administrativo

Área restrita (`/admin`), login via Supabase Auth (e-mail/senha), pensada para **uma pessoa não técnica**:

| Módulo | O que faz |
|---|---|
| **Horários** | Adicionar/editar/remover partidas por sentido e tipo de dia; campo de observação |
| **Tarifas** | Editar valor vigente (registro do histórico automático) |
| **Avisos** | Criar/editar/expirar avisos; flag "urgente" |
| **Fretamento** | Ver leads recebidos, marcar como atendido |
| **Paradas** | Editar nome/referência/coordenadas dos pontos |

Princípios: no máximo 2 cliques para qualquer edição; confirmação antes de excluir; textos de interface em português simples; funciona bem em celular (o admin pode editar do próprio telefone).

---

## 7. Integrações

| Integração | Detalhe |
|---|---|
| **WhatsApp** | Botão flutuante global → (51) 3656-1353 com mensagens pré-preenchidas por contexto (dúvida de horário na pág. de horários, orçamento na pág. de fretamento) |
| **Google Maps** | Mapa da linha/paradas e mapa da sede no rodapé |
| **Facebook/Instagram** | Links destacados no rodapé e na home; avisos com botão "compartilhar" |
| **PWA / offline** | Instalável ("Adicionar à tela inicial"), horários/tarifa/paradas cacheados via service worker, atualização em segundo plano |

---

## 8. Design e identidade visual

**Direção: nova identidade moderna** — a empresa não tem marca digital consolidada; vamos criar uma identidade limpa que transmita **confiança, simplicidade e os 50 anos de estrada**, sem parecer corporativo frio nem amador.

Diretrizes:

- **Mobile-first radical**: 90%+ dos acessos serão de celular; desktop é adaptação, não o contrário.
- **Paleta**: inspiração na sinalização rodoviária brasileira — **verde-rodovia profundo** como cor primária (confiança, estrada), **âmbar/amarelo** como acento (destaque de próxima partida e CTAs), neutros quentes de fundo. Tokens finais definidos na fase de design, com contraste AA garantido.
- **Tipografia**: sans-serif legível e generosa (horários são números — tabular figures para alinhamento perfeito).
- **Tom de voz**: próximo e direto, "de gente do interior", sem juridiquês. Ex.: "Próximo ônibus sai às 15h" e não "Consulte a grade horária vigente".
- **Fotografia real** da frota e da região quando a empresa fornecer; até lá, ilustração/composição neutra (nunca banco de imagens genérico de ônibus estrangeiro).
- Modo claro e escuro (escuro herda do sistema; útil para consulta noturna no ponto).

---

## 9. Requisitos não funcionais

- **Performance:** Lighthouse mobile ≥ 90; LCP < 2,5 s em 4G; peso da home < 300 KB inicial.
- **Acessibilidade:** WCAG 2.1 AA; navegável por teclado/leitor de tela; alvos de toque ≥ 44 px.
- **SEO:** metadados e dados estruturados (LocalBusiness + BusTrip/Schedule quando aplicável); conteúdo dos horários renderizado no HTML (não só client-side) para indexação de "horário ônibus arroio dos ratos porto alegre".
- **Idioma:** somente português (pt-BR).
- **Privacidade/LGPD:** formulário de fretamento coleta o mínimo necessário, com aviso de finalidade; sem cookies de rastreamento além de analytics leve e anônimo (ex.: Plausible/Umami ou GA4 com consentimento).
- **Custo de operação:** meta R$ 0/mês em infra no MVP (tiers gratuitos), apenas domínio.

---

## 10. Arquitetura técnica

- **Frontend:** projeto próprio neste repositório. Framework sugerido: **Next.js** (App Router) ou **Astro + ilhas React** — decisão final no kickoff técnico; requisitos que a escolha deve atender: SSG/ISR para SEO dos horários, PWA, deploy simples (Vercel/Netlify).
- **Backend:** **Supabase** em **conta nova e dedicada ao projeto** (⚠️ *não* usar a conta Supabase atualmente conectada a este ambiente). Uso: Postgres (dados), Auth (admin), Row Level Security (leitura pública dos horários, escrita só autenticada), Edge Function para notificação de leads.
- **Hospedagem:** Vercel ou Netlify (tier gratuito), domínio a definir com a empresa (idealmente reativar `empresalouzada.com.br`).

### Modelo de dados (inicial)

```
routes        (id, nome, sentido, ativo)                      -- L681/L682, 2 sentidos
schedules     (id, route_id, tipo_dia [util|sabado|dom_fer],
               horario, observacao, ativo)
fares         (id, valor, vigente_desde, criado_em)           -- histórico de tarifas
notices       (id, titulo, corpo, urgente, publicado_em, expira_em)
stops         (id, nome, referencia, lat, lng, cidade, ordem)
charter_leads (id, nome, telefone, data_viagem, origem,
               destino, passageiros, mensagem, status, criado_em)
```

---

## 11. Fora de escopo (v1)

- ❌ Venda de passagens online / reserva de assento (linha metropolitana com pagamento no embarque; avaliar em versão futura só se a empresa quiser).
- ❌ Rastreamento do ônibus em tempo real (GPS) — candidato forte para v2, alto valor mas exige hardware/integração.
- ❌ Múltiplos idiomas, blog, área do passageiro com login.
- ❌ App nativo (o PWA cobre a necessidade).

---

## 12. Fases

| Fase | Entrega | Estimativa |
|---|---|---|
| **1. Design** | Identidade visual, protótipo das telas-chave (home, horários, fretamento) | 1–2 semanas |
| **2. MVP núcleo** | Home + horários interativos + tarifa + PWA offline + WhatsApp, dados via Supabase | 2–3 semanas |
| **3. Complementos** | Fretamento + leads, avisos, mapa de paradas, institucional | 1–2 semanas |
| **4. Admin** | Painel completo + treinamento de quem vai operar | 1–2 semanas |
| **5. Apresentação** | Demo à Louzada com dados públicos; se aprovado: validação oficial dos dados, fotos reais, domínio e go-live | — |

---

## 13. Riscos e mitigações

| Risco | Mitigação |
|---|---|
| Empresa não aprovar a proposta | Custo afundado mínimo (tiers gratuitos); o projeto serve de portfólio |
| Horários públicos desatualizados na demo | Disclaimer visível na versão de demonstração; validação oficial antes do go-live |
| Ninguém na empresa assumir a atualização | Admin extremamente simples + treinamento; fallback: planilha Google como fonte (plano B já mapeado) |
| Tarifa/horários mudarem por decisão da Metroplan | Edição pelo admin em < 1 min; aviso urgente na home |
| Site confundido com oficial antes da aprovação | Não indexar/publicar em domínio público até o aval da empresa |

---

## 14. Premissas e dependências

- Projeto é **proposta por iniciativa própria**; nenhum dado sensível da empresa será usado sem autorização.
- Dados iniciais de fontes públicas (Moovit, Tô no Ponto, cadastros públicos de CNPJ, Facebook da empresa) — a validar.
- Supabase: **criar conta/organização nova dedicada** antes da Fase 2.
- Fotos reais da frota/região dependem da aprovação da empresa.

## 15. Referências

- Facebook da empresa: https://www.facebook.com/p/Empresa-Louzada-100094885863616/
- Horários públicos: Moovit (linha L681) e Tô no Ponto (L681/L682 via BR-290)
- Dados cadastrais: CNPJ 88.363.007/0001-19 (Econodata/cnpj.biz)
- Contatos públicos: (51) 3656-1353 (WhatsApp), (51) 3656-1144, (51) 3656-1098 — Rua João Cândido de Souza, 50, Centro, Arroio dos Ratos/RS
