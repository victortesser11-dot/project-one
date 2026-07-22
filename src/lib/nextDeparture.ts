import type { Horarios, Sentido, TipoDia, Partida } from './types';

/** Tipo de dia para uma data (feriados: tratados como domingo — a refinar). */
export function tipoDiaDe(data: Date): TipoDia {
  const dia = data.getDay(); // 0 = domingo, 6 = sábado
  if (dia === 0) return 'domingo';
  if (dia === 6) return 'sabado';
  return 'util';
}

function horaParaMinutos(hora: string): number {
  const [h, m] = hora.split(':').map(Number);
  return h * 60 + m;
}

export interface ProximaPartida {
  partida: Partida;
  tipoDia: TipoDia;
  amanha: boolean;
  minutosAte: number;
}

/**
 * Próxima partida a partir de `agora` para um sentido.
 * Se a última do dia já saiu, avança para o próximo dia com serviço.
 */
export function proximaPartida(
  horarios: Horarios,
  sentido: Sentido,
  agora: Date,
): ProximaPartida | null {
  const minutosAgora = agora.getHours() * 60 + agora.getMinutes();

  const hojeTipo = tipoDiaDe(agora);
  const partidasHoje = horarios[sentido][hojeTipo];
  const proxHoje = partidasHoje.find((p) => horaParaMinutos(p.hora) > minutosAgora);
  if (proxHoje) {
    return {
      partida: proxHoje,
      tipoDia: hojeTipo,
      amanha: false,
      minutosAte: horaParaMinutos(proxHoje.hora) - minutosAgora,
    };
  }

  for (let i = 1; i <= 7; i++) {
    const data = new Date(agora);
    data.setDate(agora.getDate() + i);
    const tipo = tipoDiaDe(data);
    const partidas = horarios[sentido][tipo];
    if (partidas.length > 0) {
      const primeira = partidas[0];
      const minutosAte =
        24 * 60 - minutosAgora + (i - 1) * 24 * 60 + horaParaMinutos(primeira.hora);
      return { partida: primeira, tipoDia: tipo, amanha: true, minutosAte };
    }
  }

  return null;
}

/** Formata "sai em X" de forma amigável. */
export function formatarEspera(minutos: number): string {
  if (minutos < 1) return 'saindo agora';
  if (minutos < 60) return `sai em ${minutos} min`;
  const h = Math.floor(minutos / 60);
  const m = minutos % 60;
  if (h < 24) return m > 0 ? `sai em ${h}h${String(m).padStart(2, '0')}` : `sai em ${h}h`;
  const dias = Math.floor(h / 24);
  return dias === 1 ? 'amanhã' : `em ${dias} dias`;
}
