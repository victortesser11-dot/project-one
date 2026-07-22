-- ─────────────────────────────────────────────────────────────
-- Adiciona coordenadas aos pontos de embarque já cadastrados.
-- Rode UMA vez no SQL Editor se você já tinha rodado o 0002_seed.sql
-- (que na versão anterior inseria os pontos sem lat/lng).
-- Coordenadas aproximadas — a validar com a empresa.
-- ─────────────────────────────────────────────────────────────

update stops set lat = -30.081,  lng = -51.729  where nome = 'Garagem Louzada';
update stops set lat = -30.0246, lng = -51.2178 where nome = 'Rodoviária de Porto Alegre';
update stops set lat = -30.0592, lng = -51.173  where nome = 'Região da PUC';
