-- ─────────────────────────────────────────────────────────────
-- Seed de EXEMPLO — a validar com a Empresa Louzada.
-- Rode depois de 0001_init.sql. Seguro rodar mais de uma vez? Não:
-- limpa as tabelas antes de inserir (idempotente para ambiente de demo).
-- ─────────────────────────────────────────────────────────────

truncate schedules, notices, stops restart identity;
delete from fares;

-- Horários ------------------------------------------------------
insert into schedules (sentido, tipo_dia, hora, obs, ordem) values
  -- Arroio → POA (ida)
  ('ida','util','05:00',null,1),
  ('ida','util','06:00',null,2),
  ('ida','util','07:00',null,3),
  ('ida','util','08:30',null,4),
  ('ida','util','10:00',null,5),
  ('ida','util','12:30',null,6),
  ('ida','util','15:00',null,7),
  ('ida','util','17:30',null,8),
  ('ida','util','19:00',null,9),
  ('ida','util','21:15',null,10),
  ('ida','sabado','06:00',null,1),
  ('ida','sabado','09:00',null,2),
  ('ida','sabado','12:00',null,3),
  ('ida','sabado','15:00',null,4),
  ('ida','sabado','18:00',null,5),
  ('ida','sabado','21:30',null,6),
  ('ida','domingo','06:00',null,1),
  ('ida','domingo','15:00',null,2),
  ('ida','domingo','18:00',null,3),
  ('ida','domingo','21:30',null,4),
  -- POA → Arroio (volta)
  ('volta','util','06:30',null,1),
  ('volta','util','08:00',null,2),
  ('volta','util','09:30',null,3),
  ('volta','util','11:00',null,4),
  ('volta','util','13:00',null,5),
  ('volta','util','15:00','via PUC',6),
  ('volta','util','18:00',null,7),
  ('volta','util','20:30',null,8),
  ('volta','util','22:00',null,9),
  ('volta','util','23:00',null,10),
  ('volta','sabado','09:00',null,1),
  ('volta','sabado','12:00',null,2),
  ('volta','sabado','15:00',null,3),
  ('volta','sabado','18:00',null,4),
  ('volta','sabado','21:00',null,5),
  ('volta','domingo','09:00',null,1),
  ('volta','domingo','18:00',null,2),
  ('volta','domingo','21:00',null,3);

-- Tarifa --------------------------------------------------------
insert into fares (valor, vigente_desde) values (12.30, '2026-07-01');

-- Avisos --------------------------------------------------------
insert into notices (titulo, corpo, urgente, publicado_em) values
  ('Grade de feriado neste feriado nacional',
   'Nos feriados, a linha opera com a grade de domingo. Confira a aba Domingo e feriados nos horários.',
   false, '2026-07-20'),
  ('Obras na BR-290 podem atrasar viagens',
   'Trecho em obras próximo ao km 90. Recomendamos chegar ao ponto com antecedência.',
   true, '2026-07-15');

-- Paradas -------------------------------------------------------
insert into stops (nome, referencia, cidade, lat, lng, ordem) values
  ('Garagem Louzada', 'Rua João Cândido de Souza, 50 — Centro', 'Arroio dos Ratos', -30.081, -51.729, 1),
  ('Rodoviária de Porto Alegre', 'Estação Rodoviária — Largo Vespasiano Julio Veppo', 'Porto Alegre', -30.0246, -51.2178, 2),
  ('Região da PUC', 'Av. Ipiranga, 6681', 'Porto Alegre', -30.0592, -51.173, 3);
