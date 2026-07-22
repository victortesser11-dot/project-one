/*
  Dados institucionais da Empresa Louzada.
  Fontes públicas — a validar oficialmente com a empresa.
*/
export const empresa = {
  nome: 'Empresa Louzada',
  nomeCompleto: 'Empresa Louzada de Transportes',
  desde: 1974,
  cnpj: '88.363.007/0001-19',
  endereco: 'Rua João Cândido de Souza, 50 — Centro, Arroio dos Ratos/RS',
  whatsapp: '555136561353', // formato internacional para wa.me
  whatsappExibicao: '(51) 3656-1353',
  telefones: ['(51) 3656-1353', '(51) 3656-1144', '(51) 3656-1098'],
  facebook: 'https://www.facebook.com/p/Empresa-Louzada-100094885863616/',
  instagram: '', // a confirmar com a empresa
  linha: 'BR-290 · Linha L681 / L682 (Metroplan)',
};

/** Monta um link wa.me com mensagem pré-preenchida. */
export function linkWhatsApp(mensagem: string): string {
  return `https://wa.me/${empresa.whatsapp}?text=${encodeURIComponent(mensagem)}`;
}
