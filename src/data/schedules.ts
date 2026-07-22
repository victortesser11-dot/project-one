/*
  SEED LOCAL — usado como fallback quando o Supabase não está configurado
  (ou como dado inicial na demo). Em produção os dados vêm do Supabase.
  Ver src/lib/db.ts. Fontes públicas — a validar com a empresa.
*/
import type { Horarios, Sentido, TipoDia, Tarifa } from '../lib/types';

export type { Sentido, TipoDia, Partida } from '../lib/types';

export const SENTIDOS: Record<Sentido, { origem: string; destino: string; curto: string }> = {
  ida: { origem: 'Arroio dos Ratos', destino: 'Porto Alegre', curto: 'Arroio → POA' },
  volta: { origem: 'Porto Alegre', destino: 'Arroio dos Ratos', curto: 'POA → Arroio' },
};

export const TIPOS_DIA: Record<TipoDia, string> = {
  util: 'Dias úteis',
  sabado: 'Sábado',
  domingo: 'Domingo e feriados',
};

export const horariosSeed: Horarios = {
  ida: {
    util: [
      { hora: '05:00' }, { hora: '06:00' }, { hora: '07:00' }, { hora: '08:30' },
      { hora: '10:00' }, { hora: '12:30' }, { hora: '15:00' }, { hora: '17:30' },
      { hora: '19:00' }, { hora: '21:15' },
    ],
    sabado: [
      { hora: '06:00' }, { hora: '09:00' }, { hora: '12:00' },
      { hora: '15:00' }, { hora: '18:00' }, { hora: '21:30' },
    ],
    domingo: [
      { hora: '06:00' }, { hora: '15:00' }, { hora: '18:00' }, { hora: '21:30' },
    ],
  },
  volta: {
    util: [
      { hora: '06:30' }, { hora: '08:00' }, { hora: '09:30' }, { hora: '11:00' },
      { hora: '13:00' }, { hora: '15:00', obs: 'via PUC' }, { hora: '18:00' },
      { hora: '20:30' }, { hora: '22:00' }, { hora: '23:00' },
    ],
    sabado: [
      { hora: '09:00' }, { hora: '12:00' }, { hora: '15:00' },
      { hora: '18:00' }, { hora: '21:00' },
    ],
    domingo: [
      { hora: '09:00' }, { hora: '18:00' }, { hora: '21:00' },
    ],
  },
};

export const tarifaSeed: Tarifa = {
  valor: 12.30,
  atualizadaEm: '2026-07-01',
};
