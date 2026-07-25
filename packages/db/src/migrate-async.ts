import type { Database } from '@journeyapps/sqlcipher';
import { pendingMigrations, readMigrationDir, SCHEMA_MIGRATIONS_TABLE_SQL } from './migrations.js';

export function exec(db: Database, sql: string): Promise<void> {
  return new Promise((resolve, reject) => {
    db.exec(sql, (err) => (err ? reject(err) : resolve()));
  });
}

export function all(db: Database, sql: string): Promise<Array<{ version: number }>> {
  return new Promise((resolve, reject) => {
    db.all(sql, (err, rows) => (err ? reject(err) : resolve(rows as Array<{ version: number }>)));
  });
}

export function run(db: Database, sql: string, params: unknown[]): Promise<void> {
  return new Promise((resolve, reject) => {
    db.run(sql, params, (err) => (err ? reject(err) : resolve()));
  });
}

/** Applies all pending migrations from `migrationsDir` to `db`, in order, each in its own transaction. */
export async function runMigrationsAsync(db: Database, migrationsDir: string): Promise<void> {
  await exec(db, SCHEMA_MIGRATIONS_TABLE_SQL);

  const applied = new Set(
    (await all(db, 'SELECT version FROM schema_migrations')).map((row) => row.version),
  );

  for (const migration of pendingMigrations(readMigrationDir(migrationsDir), applied)) {
    await exec(db, 'BEGIN');
    try {
      await exec(db, migration.sql);
      await run(db, 'INSERT INTO schema_migrations (version, name) VALUES (?, ?)', [
        migration.version,
        migration.name,
      ]);
      await exec(db, 'COMMIT');
    } catch (err) {
      // Best-effort rollback: a failure here (e.g. the connection already
      // dropped) must not shadow the original migration error.
      await exec(db, 'ROLLBACK').catch(() => undefined);
      throw err;
    }
  }
}
