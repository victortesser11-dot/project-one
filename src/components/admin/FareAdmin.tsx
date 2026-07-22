import { useEffect, useState } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { FareRow } from '../../lib/types';
import { Card, Field, input, btnPrimary } from './ui';

export default function FareAdmin({ supabase }: { supabase: SupabaseClient }) {
  const [atual, setAtual] = useState<FareRow | null>(null);
  const [valor, setValor] = useState('');
  const [msg, setMsg] = useState('');

  async function carregar() {
    const { data } = await supabase
      .from('fares')
      .select('*')
      .order('vigente_desde', { ascending: false })
      .limit(1)
      .maybeSingle();
    setAtual((data as FareRow) ?? null);
  }

  useEffect(() => {
    carregar();
  }, []);

  async function salvar(e: React.FormEvent) {
    e.preventDefault();
    const v = Number(valor.replace(',', '.'));
    if (!Number.isFinite(v) || v < 0) { setMsg('Informe um valor válido.'); return; }
    const { error } = await supabase.from('fares').insert({ valor: v });
    if (error) { setMsg('Erro ao salvar.'); return; }
    setValor(''); setMsg('Tarifa atualizada.');
    carregar();
  }

  const fmt = (n: number) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <Card title="Tarifa">
      <p className="text-sm text-tinta-suave">
        Tarifa vigente:{' '}
        <strong className="tabular text-azul-700">{atual ? fmt(Number(atual.valor)) : '—'}</strong>
        {atual && (
          <span className="ml-2 text-xs">
            desde {new Date(atual.vigente_desde).toLocaleDateString('pt-BR')}
          </span>
        )}
      </p>

      <form onSubmit={salvar} className="mt-4 flex flex-wrap items-end gap-2">
        <Field label="Nova tarifa (R$)">
          <input className={input + ' w-32 tabular'} placeholder="12,30" value={valor} onChange={(e) => setValor(e.target.value)} />
        </Field>
        <button className={btnPrimary}>Atualizar tarifa</button>
      </form>
      {msg && <p className="mt-2 text-sm text-azul-700">{msg}</p>}
      <p className="mt-3 text-xs text-tinta-suave">
        Cada alteração cria um novo registro — o histórico de tarifas fica guardado.
      </p>
    </Card>
  );
}
