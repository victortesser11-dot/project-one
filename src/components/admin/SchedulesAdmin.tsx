import { useEffect, useState } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { ScheduleRow, Sentido, TipoDia } from '../../lib/types';
import { Card, Field, input, btnPrimary, btnGhost } from './ui';

const SENTIDOS: { id: Sentido; label: string }[] = [
  { id: 'ida', label: 'Arroio → POA' },
  { id: 'volta', label: 'POA → Arroio' },
];
const DIAS: { id: TipoDia; label: string }[] = [
  { id: 'util', label: 'Dias úteis' },
  { id: 'sabado', label: 'Sábado' },
  { id: 'domingo', label: 'Domingo/feriados' },
];

export default function SchedulesAdmin({ supabase }: { supabase: SupabaseClient }) {
  const [sentido, setSentido] = useState<Sentido>('ida');
  const [tipoDia, setTipoDia] = useState<TipoDia>('util');
  const [rows, setRows] = useState<ScheduleRow[]>([]);
  const [novaHora, setNovaHora] = useState('');
  const [novaObs, setNovaObs] = useState('');
  const [msg, setMsg] = useState('');

  async function carregar() {
    const { data } = await supabase
      .from('schedules')
      .select('*')
      .eq('sentido', sentido)
      .eq('tipo_dia', tipoDia)
      .order('ordem', { ascending: true });
    setRows((data as ScheduleRow[]) ?? []);
  }

  useEffect(() => {
    carregar();
  }, [sentido, tipoDia]);

  async function adicionar(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[0-2]\d:[0-5]\d$/.test(novaHora)) {
      setMsg('Use o formato HH:MM (ex.: 07:30).');
      return;
    }
    const ordem = (rows[rows.length - 1]?.ordem ?? 0) + 1;
    const { error } = await supabase.from('schedules').insert({
      sentido, tipo_dia: tipoDia, hora: novaHora, obs: novaObs || null, ordem,
    });
    if (error) { setMsg('Erro ao salvar.'); return; }
    setNovaHora(''); setNovaObs(''); setMsg('');
    carregar();
  }

  async function atualizar(id: string, campos: Partial<ScheduleRow>) {
    await supabase.from('schedules').update(campos).eq('id', id);
    carregar();
  }

  async function remover(id: string) {
    if (!confirm('Remover este horário?')) return;
    await supabase.from('schedules').delete().eq('id', id);
    carregar();
  }

  return (
    <Card title="Horários">
      <div className="mb-4 flex flex-wrap gap-2">
        {SENTIDOS.map((s) => (
          <button key={s.id} onClick={() => setSentido(s.id)}
            className={'rounded-lg px-3 py-1.5 text-sm font-semibold ' + (sentido === s.id ? 'bg-azul-700 text-white' : 'bg-cinza-100 text-tinta-suave')}>
            {s.label}
          </button>
        ))}
        <span className="mx-1 w-px bg-cinza-300" />
        {DIAS.map((d) => (
          <button key={d.id} onClick={() => setTipoDia(d.id)}
            className={'rounded-lg px-3 py-1.5 text-sm font-semibold ' + (tipoDia === d.id ? 'bg-vermelho-500 text-white' : 'bg-cinza-100 text-tinta-suave')}>
            {d.label}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {rows.length === 0 && <p className="text-sm text-tinta-suave">Nenhum horário neste dia.</p>}
        {rows.map((r) => (
          <div key={r.id} className="flex flex-wrap items-center gap-2 rounded-lg bg-cinza-50 p-2 ring-1 ring-cinza-200">
            <input className={input + ' w-24 tabular'} defaultValue={r.hora}
              onBlur={(e) => e.target.value !== r.hora && atualizar(r.id, { hora: e.target.value })} />
            <input className={input + ' flex-1 min-w-[8rem]'} placeholder="observação" defaultValue={r.obs ?? ''}
              onBlur={(e) => e.target.value !== (r.obs ?? '') && atualizar(r.id, { obs: e.target.value || null })} />
            <button className={btnGhost} onClick={() => atualizar(r.id, { ativo: !r.ativo })}>
              {r.ativo ? 'Ativo' : 'Inativo'}
            </button>
            <button className="rounded-lg px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50" onClick={() => remover(r.id)}>
              Remover
            </button>
          </div>
        ))}
      </div>

      <form onSubmit={adicionar} className="mt-4 flex flex-wrap items-end gap-2 border-t border-cinza-200 pt-4">
        <Field label="Nova partida (HH:MM)">
          <input className={input + ' w-28 tabular'} placeholder="07:30" value={novaHora} onChange={(e) => setNovaHora(e.target.value)} />
        </Field>
        <Field label="Observação (opcional)">
          <input className={input} placeholder="via PUC" value={novaObs} onChange={(e) => setNovaObs(e.target.value)} />
        </Field>
        <button className={btnPrimary}>Adicionar</button>
        {msg && <p className="w-full text-sm text-red-600">{msg}</p>}
      </form>
    </Card>
  );
}
