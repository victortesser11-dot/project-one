# Setup do Supabase (Fase 2)

Passo a passo para conectar o site ao banco. Use uma **conta/projeto Supabase
novo, dedicado a este projeto** — não a conta que está conectada ao ambiente de
desenvolvimento.

## 1. Criar o projeto

1. Acesse [supabase.com](https://supabase.com) e crie um projeto novo (plano free serve).
2. Guarde a senha do banco (usada só no painel deles).
3. Escolha a região mais próxima (ex.: São Paulo).

## 2. Criar as tabelas

No painel do Supabase → **SQL Editor** → New query, cole e rode, em ordem:

1. `supabase/migrations/0001_init.sql` — cria tabelas, tipos e as políticas de segurança (RLS).
2. `supabase/migrations/0002_seed.sql` — insere os dados de exemplo (opcional; pode pular e cadastrar tudo pelo painel admin).

## 3. Pegar as chaves

Painel → **Project Settings → API**. Copie:

- **Project URL** → `PUBLIC_SUPABASE_URL`
- **anon public** key → `PUBLIC_SUPABASE_ANON_KEY`

## 4. Configurar o site

```bash
cp .env.example .env
# edite .env com a URL e a chave anon
npm run build   # agora o site lê os dados do Supabase
npm run dev     # ou rode em desenvolvimento
```

Sem `.env`, o site funciona normalmente com os dados de exemplo (seed local).

## 5. Criar o usuário do admin

O painel `/admin` usa login por e-mail e senha. Para criar o acesso da equipe:

Painel Supabase → **Authentication → Users → Add user** → informe e-mail e senha.
Pronto — esse usuário já consegue entrar em `/admin` e editar tudo.

> As políticas de RLS liberam escrita apenas para usuários **autenticados**.
> Qualquer visitante consegue *enviar* um pedido de fretamento, mas só o admin
> logado consegue *ler* os pedidos.

## 6. (Opcional) Ver os dados no site sem novo deploy

As páginas públicas são geradas no build (ótimo para SEO e velocidade). Ao editar
pelo admin, os dados mudam no banco na hora, mas o **HTML público** só reflete a
mudança no próximo build. Opções para atualizar sem esperar:

- **Rebuild automático:** configurar um Deploy Hook (Vercel/Netlify) e chamá-lo
  após edições — ou um rebuild agendado (ex.: 1x/dia).
- **Leitura ao vivo (Fase 2.1):** adicionar um adapter de SSR e marcar as páginas
  de dados como dinâmicas, lendo do Supabase a cada requisição.

Para a demonstração inicial, o rebuild manual/agendado é suficiente.

## Estrutura no banco

| Tabela | Conteúdo | Leitura | Escrita |
|---|---|---|---|
| `schedules` | Horários por sentido/dia | pública | admin |
| `fares` | Histórico de tarifas | pública | admin |
| `notices` | Avisos | pública | admin |
| `stops` | Paradas | pública | admin |
| `charter_leads` | Pedidos de fretamento | admin | qualquer um insere |
