-- ─────────────────────────────────────────────────────────────
-- Box/plataforma de embarque nos pontos (ex.: de onde a Louzada sai
-- na Rodoviária de Porto Alegre). Rode UMA vez no SQL Editor.
-- ─────────────────────────────────────────────────────────────

alter table stops add column if not exists plataforma text;

-- ⚠️ Troque 'Box 20' pelo número/plataforma REAL (confirme com a empresa).
update stops set plataforma = 'Box 20' where nome = 'Rodoviária de Porto Alegre';
