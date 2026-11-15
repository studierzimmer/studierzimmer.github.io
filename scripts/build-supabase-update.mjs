// Mechanical packaging only: no connection, secrets, CLI migration or server.
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const fragments = ['001_schema.sql', '002_security.sql', '003_report.sql'];
const header = `-- STUDIER ZIMMER — AGGIORNAMENTO COMPLETO DEL PROGETTO ESISTENTE
-- Generato da scripts/build-supabase-update.mjs; non modificare questa copia a mano.
-- Dashboard del progetto originale > SQL Editor > New query > incollare TUTTO > Run.
-- Prima: backup verificato del database E dei file Storage. Non e' un backup.
-- Confrontare il Project URL con VITE_SUPABASE_URL: config.toml potrebbe puntare altrove.
-- Nessun reset, DROP TABLE, cancellazione dati, modifica utenti, password o assegnazione admin.
-- Prerequisiti: books/book_pages/models_3d e is_admin() originali. Se mancano, si ferma.
-- Modifiche in unica transazione: se falliscono sono annullate (ROLLBACK).
-- In fondo un report in sola lettura, dopo il commit.
-- Non registra migrazioni nella history Supabase e non pubblica il frontend.
-- site-assets/book-pages sono pubblici: un file noto puo' essere letto anche se la
-- relativa scheda e' una bozza. NON caricarvi originali riservati, segreti o CAD.
-- models-3d/characters-3d diventano/restano privati; lettura pubblica solo via
-- signed URL per anteprime/HDRI/figure pubblicate, non per sorgenti STEP/CAD.
-- Nuovi controlli non correggono silenziosamente righe vecchie non conformi:
-- leggere WARNING e risultati finali. Non equivale a un audit di tutta Supabase.

begin;
set local lock_timeout = '5s';
set local statement_timeout = '120s';
select pg_advisory_xact_lock(193701, 20261115);
`;
const parts = await Promise.all(fragments.map(async name => {
  const text = await readFile(new URL(`../supabase/maintenance/${name}`, import.meta.url), 'utf8');
  if (/^\s*(?:begin|commit|rollback)\s*;/im.test(text)) throw new Error(`Nested transaction in ${name}`);
  return `\n-- ===== ${name} =====\n${text.trim()}\n`;
}));
const output = `${header}${parts.slice(0, 2).join('')}\nnotify pgrst, 'reload schema';\ncommit;\n${parts[2]}`;
const target = new URL('../supabase/sql/update_studierzimmer_complete.sql', import.meta.url);
if (process.argv.includes('--check')) {
  if (await readFile(target, 'utf8') !== output) throw new Error('Combined SQL is stale; run node scripts/build-supabase-update.mjs');
  console.log('PASS: combined Supabase SQL matches its sources; one transaction, no network.');
} else {
  await writeFile(target, output);
  console.log(`Prepared ${fileURLToPath(target)} (no database connection).`);
}
