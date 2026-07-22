// Pequenos blocos de UI reutilizados no painel (mantém o visual consistente).
import type { ReactNode } from 'react';

export const input =
  'w-full rounded-lg border border-cinza-300 bg-white px-3 py-2 text-sm outline-none focus:border-azul-500 focus:ring-2 focus:ring-azul-200';

export const btnPrimary =
  'rounded-lg bg-azul-700 px-4 py-2 text-sm font-bold text-white transition hover:bg-azul-600 disabled:opacity-50';

export const btnGhost =
  'rounded-lg bg-white px-3 py-2 text-sm font-semibold text-tinta-suave ring-1 ring-cinza-300 transition hover:bg-cinza-50';

export function Card({ title, children, actions }: { title: string; children: ReactNode; actions?: ReactNode }) {
  return (
    <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-cinza-200">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-lg font-bold text-azul-700">{title}</h2>
        {actions}
      </div>
      {children}
    </section>
  );
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-1 text-xs font-semibold text-tinta-suave">
      {label}
      {children}
    </label>
  );
}
