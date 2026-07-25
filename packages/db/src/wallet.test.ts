import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import sqlcipher from '@journeyapps/sqlcipher';
import { openWalletDb, quoteSqliteString } from './wallet.js';
import { all, exec, run, runMigrationsAsync } from './migrate-async.js';

const MIGRATIONS_DIR = join(dirname(fileURLToPath(import.meta.url)), '../migrations/wallet');

async function openRaw(dbPath: string, passphrase: string): Promise<sqlcipher.Database> {
  const db = new sqlcipher.Database(dbPath);
  await exec(db, `PRAGMA key = ${quoteSqliteString(passphrase)}`);
  return db;
}

describe('openWalletDb', () => {
  let dir: string;
  let dbPath: string;

  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), 'farol-wallet-db-'));
    dbPath = join(dir, 'wallet.sqlite');
  });

  afterEach(() => {
    rmSync(dir, { recursive: true, force: true });
  });

  it('applies migrations and records the schema version', async () => {
    const wallet = await openWalletDb(dbPath, 'test-passphrase');
    wallet.close();

    const raw = await openRaw(dbPath, 'test-passphrase');
    const rows = await all(raw, 'SELECT version, name FROM schema_migrations');
    expect(rows).toEqual([{ version: 1, name: 'init' }]);
    raw.close();
  });

  it('is idempotent when reopened', async () => {
    (await openWalletDb(dbPath, 'test-passphrase')).close();
    const wallet = await openWalletDb(dbPath, 'test-passphrase');
    wallet.close();

    const raw = await openRaw(dbPath, 'test-passphrase');
    const rows = await all(raw, 'SELECT version FROM schema_migrations');
    expect(rows).toHaveLength(1);
    raw.close();
  });

  it('rejects an invalid transaction type', async () => {
    const raw = await openRaw(dbPath, 'test-passphrase');
    await run(raw, 'PRAGMA foreign_keys = ON', []);
    await runMigrationsAsync(raw, MIGRATIONS_DIR);

    await run(
      raw,
      "INSERT INTO assets (ticker, asset_class, name) VALUES ('TEST3', 'stock', 'Test')",
      [],
    );

    await expect(
      run(
        raw,
        "INSERT INTO transactions (asset_ticker, type, event_date, quantity) VALUES ('TEST3', 'invalid', '2026-01-01', '10')",
        [],
      ),
    ).rejects.toThrow();

    raw.close();
  });

  it('rejects an empty passphrase', async () => {
    await expect(openWalletDb(dbPath, '')).rejects.toThrow(/passphrase/);
  });

  it('rejects a transaction referencing an unknown asset (foreign key)', async () => {
    const raw = await openRaw(dbPath, 'test-passphrase');
    await run(raw, 'PRAGMA foreign_keys = ON', []);
    await runMigrationsAsync(raw, MIGRATIONS_DIR);

    await expect(
      run(
        raw,
        "INSERT INTO transactions (asset_ticker, type, event_date, quantity) VALUES ('FAKE11', 'buy', '2026-01-01', '10')",
        [],
      ),
    ).rejects.toThrow();

    raw.close();
  });
});
