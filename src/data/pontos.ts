export interface Ponto {
  id?: string;
  nome: string;
  referencia?: string | null;
  cidade: string;
  lat: number | null;
  lng: number | null;
  plataforma?: string | null; // box/plataforma de embarque (ex.: rodoviária de POA)
  ordem: number;
}

// SEED LOCAL — fallback quando o Supabase não está configurado.
// Coordenadas aproximadas, a validar com a empresa.
export const pontosSeed: Ponto[] = [
  {
    nome: 'Garagem Louzada',
    referencia: 'Rua João Cândido de Souza, 50 — Centro',
    cidade: 'Arroio dos Ratos',
    lat: -30.081,
    lng: -51.729,
    ordem: 1,
  },
  {
    nome: 'Rodoviária de Porto Alegre',
    referencia: 'Estação Rodoviária — Largo Vespasiano Julio Veppo',
    cidade: 'Porto Alegre',
    lat: -30.0246,
    lng: -51.2178,
    plataforma: 'Box 20', // exemplo — a confirmar com a empresa
    ordem: 2,
  },
  {
    nome: 'Região da PUC',
    referencia: 'Av. Ipiranga, 6681',
    cidade: 'Porto Alegre',
    lat: -30.0592,
    lng: -51.173,
    ordem: 3,
  },
];
