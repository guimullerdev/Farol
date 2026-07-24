import Database from 'better-sqlite3';

/**
 * Public data database (quotes, news, rankings). Contains no user wallet
 * data, so it isn't encrypted.
 */
export function openPublicDb(filePath: string): Database.Database {
  const db = new Database(filePath);
  db.pragma('journal_mode = WAL');
  return db;
}
