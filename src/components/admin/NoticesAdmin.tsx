import { useEffect, useState } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { NoticeRow } from '../../lib/types';
import { Card, Field, input, btnPrimary } from './ui';

export default function NoticesAdmin({ supabase }: { supabase: SupabaseClient }) {
  const [rows, setRows] = useState<NoticeRow[]>([]);
  const [titulo, setTitulo] = useState('');
  const [corpo, setCorpo] = useState('');
  const [urgente, setUrgente] = useState(false);
  const [expira, setExpira] = useState('');
  const [msg, setMsg] = useState('');

  async function carregar() {
    const { data } = await supabase
      .from('notices')
      .select('*')
      .order('publicado_em', { ascending: false });
    setRows((data as NoticeRow[]) ?? []);
  }

  useEffect(() => {
    carregar();
  }, []);

  async function publicar(e: React.FormEvent) {
    e.preventDefault();
    if (!titulo.trim() || !corpo.trim()) { setMsg('Preencha título e texto.'); return; }
    const { error } = await supabase.from('notices').insert({
      titulo, corpo, urgente, expira_em: expira ? new Date(expira).toISOString() : null,
    });
    if (error) { setMsg('Erro ao publicar.'); return; }
    setTitulo(''); setCorpo(''); setUrgente(false); setExpira(''); setMsg('Aviso publicado.');
    carregar();
  }

  async function remover(id: string) {
    if (!confirm('Remover este aviso?')) return;
    await supabase.from('notices').delete().eq('id', id);
    carregar();
  }

  return (
    <div className="space-y-6">
      <Card title="Novo aviso">
        <form onSubmit={publicar} className="space-y-3">
          <Field label="Título">
            <input className={input} value={titulo} onChange={(e) => setTitulo(e.target.value)} />
          </Field>
          <Field label="Texto">
            <textarea className={input} rows={3} value={corpo} onChange={(e) => setCorpo(e.target.value)} />
          </Field>
          <div className="flex flex-wrap items-end gap-4">
            <label className="flex items-center gap-2 text-sm font-semibold text-tinta-suave">
              <input type="checkbox" checked={urgente} onChange={(e) => setUrgente(e.target.checked)} />
              Urgente (vira banner no site)
            </label>
            <Field label="Expira em (opcional)">
              <input className={input} type="date" value={expira} onChange={(e) => setExpira(e.target.value)} />
            </Field>
            <button className={btnPrimary}>Publicar</button>
          </div>
          {msg && <p className="text-sm text-azul-700">{msg}</p>}
        </form>
      </Card>

      <Card title="Avisos publicados">
        <div className="space-y-2">
          {rows.length === 0 && <p className="text-sm text-tinta-suave">Nenhum aviso.</p>}
          {rows.map((n) => (
            <div key={n.id} className="flex items-start justify-between gap-3 rounded-lg bg-cinza-50 p-3 ring-1 ring-cinza-200">
              <div>
                <p className="font-semibold text-azul-700">
                  {n.urgente && <span className="mr-2 rounded bg-vermelho-100 px-1.5 py-0.5 text-xs text-vermelho-700">Urgente</span>}
                  {n.titulo}
                </p>
                <p className="text-sm text-tinta-suave">{n.corpo}</p>
                <p className="mt-1 text-xs text-tinta-suave">
                  {new Date(n.publicado_em).toLocaleDateString('pt-BR')}
                  {n.expira_em && ` · expira ${new Date(n.expira_em).toLocaleDateString('pt-BR')}`}
                </p>
              </div>
              <button className="rounded-lg px-3 py-1.5 text-sm font-semibold text-red-600 hover:bg-red-50" onClick={() => remover(n.id)}>
                Remover
              </button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
