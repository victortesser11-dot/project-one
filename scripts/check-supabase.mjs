/*
  Verificação rápida da conexão com o Supabase.
  Uso (Node 24+): npm run check:supabase
  Lê PUBLIC_SUPABASE_URL / PUBLIC_SUPABASE_ANON_KEY do .env.
*/
import { createClient } from '@supabase/supabase-js';

const url = process.env.PUBLIC_SUPABASE_URL;
const key = process.env.PUBLIC_SUPABASE_ANON_KEY;

if (!url || !key) {
  console.error('✗ Faltam variáveis. Crie o .env a partir do .env.example.');
  process.exit(1);
}

const db = createClient(url, key, { auth: { persistSession: false } });
const tabelas = ['schedules', 'fares', 'notices', 'stops'];

console.log(`\nConectando em ${url}\n`);

let ok = true;
for (const t of tabelas) {
  // count sem head para receber a mensagem de erro completa do PostgREST
  const { count, error } = await db.from(t).select('*', { count: 'exact' }).limit(0);
  if (error) {
    ok = false;
    const cod = error.code ? `[${error.code}] ` : '';
    console.log(`✗ ${t.padEnd(14)} — ${cod}${error.message || error.hint || '(sem mensagem)'}`);
  } else {
    console.log(`✓ ${t.padEnd(14)} — ${count} registro(s)`);
  }
}

// charter_leads: o RLS deve esconder as linhas do visitante (leitura só admin).
// Leitura como anon deve voltar VAZIA. Se vier alguma linha, o RLS falhou.
const { data: leadData, error: leadErr } = await db.from('charter_leads').select('*');
if (leadErr && (leadErr.code === '42P01' || leadErr.code === 'PGRST205')) {
  ok = false;
  console.log(`✗ charter_leads   — [${leadErr.code}] tabela não encontrada`);
} else if (leadData && leadData.length > 0) {
  ok = false;
  console.log(`⚠ charter_leads   — visitante consegue LER ${leadData.length} lead(s) — revisar RLS!`);
} else {
  console.log(`✓ charter_leads   — leads invisíveis ao público (RLS ok)`);
}

console.log(
  ok
    ? '\n✅ Tabelas acessíveis. Backend pronto — rode `npm run build`.\n'
    : '\n❌ Veja os códigos acima: 42P01/PGRST205 = tabela ausente ou cache do PostgREST desatualizado.\n',
);
process.exit(ok ? 0 : 1);
