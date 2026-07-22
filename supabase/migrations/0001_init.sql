-- ─────────────────────────────────────────────────────────────
-- Empresa Louzada — schema inicial (Fase 2)
-- Rode este arquivo no SQL Editor do seu projeto Supabase (conta nova).
-- Regras: leitura pública dos dados do site; escrita só autenticada;
-- leads de fretamento só o admin lê, mas qualquer visitante pode enviar.
-- ─────────────────────────────────────────────────────────────

-- Tipos ------------------------------------------------------------
do $$ begin
  create type sentido as enum ('ida', 'volta');
exception when duplicate_object then null; end $$;

do $$ begin
  create type tipo_dia as enum ('util', 'sabado', 'domingo');
exception when duplicate_object then null; end $$;

do $$ begin
  create type lead_status as enum ('novo', 'em_contato', 'atendido', 'descartado');
exception when duplicate_object then null; end $$;

-- Tabelas ----------------------------------------------------------
create table if not exists schedules (
  id         uuid primary key default gen_random_uuid(),
  sentido    sentido   not null,
  tipo_dia   tipo_dia  not null,
  hora       text      not null check (hora ~ '^[0-2][0-9]:[0-5][0-9]$'),
  obs        text,
  ordem      int       not null default 0,
  ativo      boolean   not null default true,
  criado_em  timestamptz not null default now()
);
create index if not exists schedules_lookup on schedules (sentido, tipo_dia, ativo);

create table if not exists fares (
  id            uuid primary key default gen_random_uuid(),
  valor         numeric(10,2) not null check (valor >= 0),
  vigente_desde date not null default current_date,
  criado_em     timestamptz not null default now()
);

create table if not exists notices (
  id           uuid primary key default gen_random_uuid(),
  titulo       text not null,
  corpo        text not null,
  urgente      boolean not null default false,
  publicado_em timestamptz not null default now(),
  expira_em    timestamptz
);

create table if not exists stops (
  id         uuid primary key default gen_random_uuid(),
  nome       text not null,
  referencia text,
  cidade     text,
  lat        double precision,
  lng        double precision,
  ordem      int not null default 0
);

create table if not exists charter_leads (
  id           uuid primary key default gen_random_uuid(),
  nome         text not null,
  telefone     text not null,
  data_viagem  date,
  trajeto      text,
  passageiros  int check (passageiros is null or passageiros > 0),
  mensagem     text,
  status       lead_status not null default 'novo',
  criado_em    timestamptz not null default now()
);

-- Row Level Security ----------------------------------------------
alter table schedules     enable row level security;
alter table fares         enable row level security;
alter table notices       enable row level security;
alter table stops         enable row level security;
alter table charter_leads enable row level security;

-- Leitura pública (dados exibidos no site)
create policy "leitura publica schedules" on schedules for select using (true);
create policy "leitura publica fares"     on fares     for select using (true);
create policy "leitura publica notices"   on notices   for select using (true);
create policy "leitura publica stops"     on stops     for select using (true);

-- Escrita só para usuários autenticados (admin)
create policy "admin escreve schedules" on schedules for all
  to authenticated using (true) with check (true);
create policy "admin escreve fares" on fares for all
  to authenticated using (true) with check (true);
create policy "admin escreve notices" on notices for all
  to authenticated using (true) with check (true);
create policy "admin escreve stops" on stops for all
  to authenticated using (true) with check (true);

-- Leads: visitante pode ENVIAR (insert), mas só o admin lê/edita
create policy "visitante envia lead" on charter_leads for insert
  to anon, authenticated with check (true);
create policy "admin le leads" on charter_leads for select
  to authenticated using (true);
create policy "admin edita leads" on charter_leads for update
  to authenticated using (true) with check (true);
create policy "admin apaga leads" on charter_leads for delete
  to authenticated using (true);
