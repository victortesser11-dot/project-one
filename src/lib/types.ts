export type Sentido = 'ida' | 'volta';
export type TipoDia = 'util' | 'sabado' | 'domingo';
export type LeadStatus = 'novo' | 'em_contato' | 'atendido' | 'descartado';

export interface Partida {
  hora: string; // "HH:MM"
  obs?: string;
}

/** Estrutura aninhada usada na renderização: horarios[sentido][tipoDia] = Partida[] */
export type Horarios = Record<Sentido, Record<TipoDia, Partida[]>>;

export interface Tarifa {
  valor: number;
  atualizadaEm: string; // ISO date
}

export interface Aviso {
  id?: string;
  titulo: string;
  corpo: string;
  urgente: boolean;
  data: string; // ISO date (publicado_em)
}

// Linhas do banco (Supabase)
export interface ScheduleRow {
  id: string;
  sentido: Sentido;
  tipo_dia: TipoDia;
  hora: string;
  obs: string | null;
  ordem: number;
  ativo: boolean;
}

export interface FareRow {
  id: string;
  valor: number;
  vigente_desde: string;
  criado_em: string;
}

export interface NoticeRow {
  id: string;
  titulo: string;
  corpo: string;
  urgente: boolean;
  publicado_em: string;
  expira_em: string | null;
}

export interface CharterLeadRow {
  id: string;
  nome: string;
  telefone: string;
  data_viagem: string | null;
  trajeto: string | null;
  passageiros: number | null;
  mensagem: string | null;
  status: LeadStatus;
  criado_em: string;
}
