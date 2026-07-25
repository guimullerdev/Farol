import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

export interface Migration {
  version: number;
  name: string;
  sql: string;
}

const FILENAME_PATTERN = /^(\d{4})_(.+)\.sql$/;

/**
 * Reads and parses all `NNNN_name.sql` migration files in `dir`, sorted by
 * version ascending. Throws if a filename doesn't match the convention, so a
 * typo'd migration file fails loudly instead of being silently skipped.
 */
export function readMigrationDir(dir: string): Migration[] {
  const files = readdirSync(dir).filter((file) => file.endsWith('.sql'));

  return files
    .map((file) => {
      const match = FILENAME_PATTERN.exec(file);
      if (!match) {
        throw new Error(`Migration filename "${file}" doesn't match NNNN_name.sql`);
      }
      return {
        version: Number.parseInt(match[1]!, 10),
        name: match[2]!,
        sql: readFileSync(join(dir, file), 'utf-8'),
      };
    })
    .sort((a, b) => a.version - b.version);
}

/** Migrations not yet present in `appliedVersions`, in ascending order. */
export function pendingMigrations(
  all: Migration[],
  appliedVersions: ReadonlySet<number>,
): Migration[] {
  return all.filter((migration) => !appliedVersions.has(migration.version));
}

export const SCHEMA_MIGRATIONS_TABLE_SQL = `
CREATE TABLE IF NOT EXISTS schema_migrations (
  version    INTEGER PRIMARY KEY,
  name       TEXT NOT NULL,
  applied_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
);
`;
