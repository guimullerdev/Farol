import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { openPublicDb } from './public.js';

describe('openPublicDb', () => {
  let dir: string;
  let dbPath: string;

  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), 'farol-public-db-'));
    dbPath = join(dir, 'public.sqlite');
  });

  afterEach(() => {
    rmSync(dir, { recursive: true, force: true });
  });

  it('applies migrations and records the schema version', () => {
    const db = openPublicDb(dbPath);

    const rows = db.prepare('SELECT version, name FROM schema_migrations').all();
    expect(rows).toEqual([{ version: 1, name: 'init' }]);

    db.close();
  });

  it('is idempotent when reopened', () => {
    openPublicDb(dbPath).close();
    const db = openPublicDb(dbPath);

    const rows = db.prepare('SELECT version FROM schema_migrations').all();
    expect(rows).toHaveLength(1);

    db.close();
  });

  it('rejects an invalid asset_class', () => {
    const db = openPublicDb(dbPath);

    expect(() =>
      db
        .prepare('INSERT INTO assets (ticker, asset_class, name) VALUES (?, ?, ?)')
        .run('TEST3', 'crypto', 'Test'),
    ).toThrow();

    db.close();
  });

  it('rejects a quote for an unknown ticker (foreign key)', () => {
    const db = openPublicDb(dbPath);

    expect(() =>
      db
        .prepare('INSERT INTO quotes (ticker, price_cents, updated_at) VALUES (?, ?, ?)')
        .run('FAKE11', 1000, new Date().toISOString()),
    ).toThrow();

    db.close();
  });
});
