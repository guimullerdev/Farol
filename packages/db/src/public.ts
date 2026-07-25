import Database from 'better-sqlite3';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { runMigrationsSync } from './migrate-sync.js';

const MIGRATIONS_DIR = join(dirname(fileURLToPath(import.meta.url)), '../migrations/public');

/**
 * Public data database (quotes, news, rankings). Contains no user wallet
 * data, so it isn't encrypted.
 */
export function openPublicDb(filePath: string): Database.Database {
  const db = new Database(filePath);
  try {
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');
    runMigrationsSync(db, MIGRATIONS_DIR);
  } catch (err) {
    db.close();
    throw err;
  }
  return db;
}
