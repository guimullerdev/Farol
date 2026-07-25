import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { pendingMigrations, readMigrationDir } from './migrations.js';

describe('readMigrationDir', () => {
  let dir: string;

  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), 'farol-migrations-'));
  });

  afterEach(() => {
    rmSync(dir, { recursive: true, force: true });
  });

  it('parses and sorts migrations by version ascending', () => {
    writeFileSync(join(dir, '0002_second.sql'), 'SELECT 2;');
    writeFileSync(join(dir, '0001_first.sql'), 'SELECT 1;');

    const migrations = readMigrationDir(dir);

    expect(migrations.map((m) => m.version)).toEqual([1, 2]);
    expect(migrations[0]).toMatchObject({ version: 1, name: 'first', sql: 'SELECT 1;' });
  });

  it('throws on a filename that does not match NNNN_name.sql', () => {
    writeFileSync(join(dir, 'init.sql'), 'SELECT 1;');

    expect(() => readMigrationDir(dir)).toThrow(/doesn't match/);
  });
});

describe('pendingMigrations', () => {
  it('excludes already-applied versions', () => {
    const all = [
      { version: 1, name: 'a', sql: '' },
      { version: 2, name: 'b', sql: '' },
    ];

    expect(pendingMigrations(all, new Set([1]))).toEqual([{ version: 2, name: 'b', sql: '' }]);
  });
});
