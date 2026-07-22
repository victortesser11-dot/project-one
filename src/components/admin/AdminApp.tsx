import { useEffect, useState } from 'react';
import type { Session, SupabaseClient } from '@supabase/supabase-js';
import { getSupabase, supabaseConfigurado } from '../../lib/supabase';
import { input, btnPrimary, btnGhost } from './ui';
import SchedulesAdmin from './SchedulesAdmin';
import FareAdmin from './FareAdmin';
import NoticesAdmin from './NoticesAdmin';
import LeadsAdmin from './LeadsAdmin';

type Aba = 'horarios' | 'tarifa' | 'avisos' | 'fretamento';

const ABAS: { id: Aba; label: string }[] = [
  { id: 'horarios', label: 'Horários' },
  { id: 'tarifa', label: 'Tarifa' },
  { id: 'avisos', label: 'Avisos' },
  { id: 'fretamento', label: 'Fretamento' },
];

export default function AdminApp() {
  const supabase = getSupabase();
  const [session, setSession] = useState<Session | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [aba, setAba] = useState<Aba>('horarios');

  useEffect(() => {
    if (!supabase) {
      setCarregando(false);
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setCarregando(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  if (!supabaseConfigurado || !supabase) return <SemConfig />;
  if (carregando) return <Centro>Carregando…</Centro>;
  if (!session) return <Login supabase={supabase} />;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-azul-700">Painel Louzada</h1>
          <p className="text-xs text-tinta-suave">{session.user.email}</p>
        </div>
        <button className={btnGhost} onClick={() => supabase.auth.signOut()}>
          Sair
        </button>
      </header>

      <nav className="mb-6 flex flex-wrap gap-2">
        {ABAS.map((a) => (
          <button
            key={a.id}
            onClick={() => setAba(a.id)}
            className={
              'rounded-xl px-4 py-2 text-sm font-bold transition ' +
              (aba === a.id ? 'bg-azul-700 text-white' : 'bg-white text-tinta-suave ring-1 ring-cinza-300')
            }
          >
            {a.label}
          </button>
        ))}
      </nav>

      {aba === 'horarios' && <SchedulesAdmin supabase={supabase} />}
      {aba === 'tarifa' && <FareAdmin supabase={supabase} />}
      {aba === 'avisos' && <NoticesAdmin supabase={supabase} />}
      {aba === 'fretamento' && <LeadsAdmin supabase={supabase} />}
    </div>
  );
}

function Login({ supabase }: { supabase: SupabaseClient }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [enviando, setEnviando] = useState(false);

  async function entrar(e: React.FormEvent) {
    e.preventDefault();
    setErro('');
    setEnviando(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password: senha });
    if (error) setErro('E-mail ou senha inválidos.');
    setEnviando(false);
  }

  return (
    <Centro>
      <form onSubmit={entrar} className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-md ring-1 ring-cinza-200">
        <h1 className="text-xl font-extrabold text-azul-700">Painel Louzada</h1>
        <p className="mb-5 mt-1 text-sm text-tinta-suave">Acesso restrito à equipe.</p>
        <div className="space-y-3">
          <input className={input} type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input className={input} type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />
          {erro && <p className="text-sm text-red-600">{erro}</p>}
          <button className={btnPrimary + ' w-full'} disabled={enviando}>
            {enviando ? 'Entrando…' : 'Entrar'}
          </button>
        </div>
      </form>
    </Centro>
  );
}

function SemConfig() {
  return (
    <Centro>
      <div className="max-w-md rounded-2xl bg-white p-6 text-center shadow-md ring-1 ring-cinza-200">
        <h1 className="text-lg font-bold text-azul-700">Supabase não configurado</h1>
        <p className="mt-2 text-sm text-tinta-suave">
          Defina <code className="rounded bg-cinza-100 px-1">PUBLIC_SUPABASE_URL</code> e{' '}
          <code className="rounded bg-cinza-100 px-1">PUBLIC_SUPABASE_ANON_KEY</code> no arquivo{' '}
          <code className="rounded bg-cinza-100 px-1">.env</code> e rode o build novamente.
        </p>
      </div>
    </Centro>
  );
}

function Centro({ children }: { children: React.ReactNode }) {
  return <div className="flex min-h-screen items-center justify-center px-4">{children}</div>;
}
