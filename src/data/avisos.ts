import type { Aviso } from '../lib/types';

// SEED LOCAL de avisos — fallback quando o Supabase não está configurado.
export const avisosSeed: Aviso[] = [
  {
    titulo: 'Grade de feriado neste feriado nacional',
    corpo:
      'Nos feriados, a linha opera com a grade de domingo. Confira a aba Domingo e feriados nos horários.',
    data: '2026-07-20',
    urgente: false,
  },
  {
    titulo: 'Obras na BR-290 podem atrasar viagens',
    corpo:
      'Trecho em obras próximo ao km 90. Recomendamos chegar ao ponto com antecedência.',
    data: '2026-07-15',
    urgente: true,
  },
];
