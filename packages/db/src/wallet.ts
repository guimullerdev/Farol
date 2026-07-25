import sqlcipher from '@journeyapps/sqlcipher';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { exec, runMigrationsAsync } from './migrate-async.js';

const MIGRATIONS_DIR = join(dirname(fileURLToPath(import.meta.url)), '../migrations/wallet');

export interface WalletDb {
  close(): void;
}

// SQLite's PRAGMA grammar doesn't accept bound (`?`) parameters, so the
// passphrase must be inlined as a quoted string literal instead.
export function quoteSqliteString(value: string): string {
  return `'${value.replace(/'/g, "''")}'`;
}

/**
 * User wallet database (assets, transactions, dividends/proceeds), always
 * encrypted with SQLCipher. `passphrase` must never be logged or persisted
 * in plaintext.
 */
export async function openWalletDb(filePath: string, passphrase: string): Promise<WalletDb> {
  if (passphrase.length === 0) {
    throw new Error('openWalletDb: passphrase must not be empty');
  }

  const db = new sqlcipher.Database(filePath);
  try {
    await exec(db, `PRAGMA key = ${quoteSqliteString(passphrase)}`);
    await exec(db, 'PRAGMA foreign_keys = ON');
    await runMigrationsAsync(db, MIGRATIONS_DIR);
  } catch (err) {
    db.close();
    throw err;
  }

  return {
    close: () => db.close(),
  };
}
