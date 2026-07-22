import { useEffect, useState } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { CharterLeadRow, LeadStatus } from '../../lib/types';
import { Card, input } from './ui';

const STATUS: { id: LeadStatus; label: string }[] = [
  { id: 'novo', label: 'Novo' },
  { id: 'em_contato', label: 'Em contato' },
  { id: 'atendido', label: 'Atendido' },
  { id: 'descartado', label: 'Descartado' },
];

const corStatus: Record<LeadStatus, string> = {
  novo: 'bg-vermelho-100 text-vermelho-700',
  em_contato: 'bg-blue-100 text-blue-700',
  atendido: 'bg-azul-100 text-azul-700',
  descartado: 'bg-cinza-200 text-tinta-suave',
};

export default function LeadsAdmin({ supabase }: { supabase: SupabaseClient }) {
  const [rows, setRows] = useState<CharterLeadRow[]>([]);

  async function carregar() {
    const { data } = await supabase
      .from('charter_leads')
      .select('*')
      .order('criado_em', { ascending: false });
    setRows((data as CharterLeadRow[]) ?? []);
  }

  useEffect(() => {
    carregar();
  }, []);

  async function mudarStatus(id: string, status: LeadStatus) {
    await supabase.from('charter_leads').update({ status }).eq('id', id);
    carregar();
  }

  async function remover(id: string) {
    if (!confirm('Remover este pedido?')) return;
    await supabase.from('charter_leads').delete().eq('id', id);
    carregar();
  }

  return (
    <Card title={`Pedidos de fretamento (${rows.length})`}>
      <div className="space-y-3">
        {rows.length === 0 && <p className="text-sm text-tinta-suave">Nenhum pedido ainda.</p>}
        {rows.map((l) => (
          <div key={l.id} className="rounded-lg bg-cinza-50 p-3 ring-1 ring-cinza-200">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-semibold text-azul-700">{l.nome}</p>
              <span className={'rounded-full px-2 py-0.5 text-xs font-semibold ' + corStatus[l.status]}>
                {STATUS.find((s) => s.id === l.status)?.label}
              </span>
            </div>
            <p className="mt-1 text-sm text-tinta-suave">
              📞 <a className="underline" href={`https://wa.me/${l.telefone.replace(/\D/g, '')}`} target="_blank" rel="noopener">{l.telefone}</a>
              {l.passageiros ? ` · ${l.passageiros} passageiros` : ''}
              {l.data_viagem ? ` · ${new Date(l.data_viagem).toLocaleDateString('pt-BR')}` : ''}
            </p>
            {l.trajeto && <p className="text-sm text-tinta-suave">🚌 {l.trajeto}</p>}
            {l.mensagem && <p className="mt-1 text-sm text-tinta">{l.mensagem}</p>}
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <select
                className={input + ' w-auto'}
                value={l.status}
                onChange={(e) => mudarStatus(l.id, e.target.value as LeadStatus)}
              >
                {STATUS.map((s) => (
                  <option key={s.id} value={s.id}>{s.label}</option>
                ))}
              </select>
              <span className="text-xs text-tinta-suave">
                recebido {new Date(l.criado_em).toLocaleString('pt-BR')}
              </span>
              <button className="ml-auto rounded-lg px-3 py-1.5 text-sm font-semibold text-red-600 hover:bg-red-50" onClick={() => remover(l.id)}>
                Remover
              </button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
