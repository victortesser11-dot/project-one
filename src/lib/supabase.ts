import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const url = import.meta.env.PUBLIC_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY as string | undefined;

/** true quando as variáveis de ambiente do Supabase estão configuradas. */
export const supabaseConfigurado = Boolean(url && anonKey);

let _client: SupabaseClient | null = null;

/**
 * Cliente Supabase (browser). Retorna null se as env vars não estiverem
 * configuradas — o site cai no seed local nesse caso.
 * A chave anon é pública por design; a segurança vem do RLS no banco.
 */
export function getSupabase(): SupabaseClient | null {
  if (!supabaseConfigurado) return null;
  if (!_client) {
    _client = createClient(url!, anonKey!, {
      auth: { persistSession: true, autoRefreshToken: true },
    });
  }
  return _client;
}
