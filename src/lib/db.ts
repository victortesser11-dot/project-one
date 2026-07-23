import { createClient } from '@supabase/supabase-js';
import type { Horarios, Tarifa, Aviso, ScheduleRow, FareRow, NoticeRow } from './types';
import { horariosSeed, tarifaSeed } from '../data/schedules';
import { avisosSeed } from '../data/avisos';
import { pontosSeed, type Ponto } from '../data/pontos';

/*
  Acesso a dados para as páginas públicas (executado no build / SSG).
  Se o Supabase estiver configurado, lê de lá; senão, usa o seed local.
  Toda função é tolerante a falha: qualquer erro cai no seed.
*/

const url = import.meta.env.PUBLIC_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY as string | undefined;

function leitor() {
  if (!url || !anonKey) return null;
  return createClient(url, anonKey, { auth: { persistSession: false } });
}

/** Origem dos dados nesta renderização — útil para avisos de UI. */
export const usandoSupabase = Boolean(url && anonKey);

export async function getHorarios(): Promise<Horarios> {
  const db = leitor();
  if (!db) return horariosSeed;
  try {
    const { data, error } = await db
      .from('schedules')
      .select('sentido, tipo_dia, hora, obs, ordem, ativo')
      .eq('ativo', true)
      .order('ordem', { ascending: true });
    if (error || !data) return horariosSeed;

    const vazio: Horarios = {
      ida: { util: [], sabado: [], domingo: [] },
      volta: { util: [], sabado: [], domingo: [] },
    };
    for (const r of data as ScheduleRow[]) {
      vazio[r.sentido][r.tipo_dia].push({ hora: r.hora, obs: r.obs ?? undefined });
    }
    // se veio vazio do banco, mantém o seed para não quebrar a demo
    const total = Object.values(vazio).flatMap((s) => Object.values(s)).flat().length;
    return total > 0 ? vazio : horariosSeed;
  } catch {
    return horariosSeed;
  }
}

export async function getTarifa(): Promise<Tarifa> {
  const db = leitor();
  if (!db) return tarifaSeed;
  try {
    const { data, error } = await db
      .from('fares')
      .select('valor, vigente_desde')
      .order('vigente_desde', { ascending: false })
      .limit(1)
      .maybeSingle();
    if (error || !data) return tarifaSeed;
    const f = data as Pick<FareRow, 'valor' | 'vigente_desde'>;
    return { valor: Number(f.valor), atualizadaEm: f.vigente_desde };
  } catch {
    return tarifaSeed;
  }
}

export async function getPontos(): Promise<Ponto[]> {
  const db = leitor();
  if (!db) return pontosSeed;
  try {
    // select('*') para tolerar a coluna `plataforma` existir ou não no banco
    const { data, error } = await db
      .from('stops')
      .select('*')
      .order('ordem', { ascending: true });
    if (error || !data || data.length === 0) return pontosSeed;
    return data as Ponto[];
  } catch {
    return pontosSeed;
  }
}

export async function getAvisos(): Promise<Aviso[]> {
  const db = leitor();
  if (!db) return avisosSeed;
  try {
    const hoje = new Date().toISOString();
    const { data, error } = await db
      .from('notices')
      .select('id, titulo, corpo, urgente, publicado_em, expira_em')
      .or(`expira_em.is.null,expira_em.gte.${hoje}`)
      .order('publicado_em', { ascending: false });
    if (error || !data) return avisosSeed;
    return (data as NoticeRow[]).map((n) => ({
      id: n.id,
      titulo: n.titulo,
      corpo: n.corpo,
      urgente: n.urgente,
      data: n.publicado_em,
    }));
  } catch {
    return avisosSeed;
  }
}
