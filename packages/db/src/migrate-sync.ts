import type Database from 'better-sqlite3';
import { pendingMigrations, readMigrationDir, SCHEMA_MIGRATIONS_TABLE_SQL } from './migrations.js';

/** Applies all pending migrations from `migrationsDir` to `db`, in order, each in its own transaction. */
export function runMigrationsSync(db: Database.Database, migrationsDir: string): void {
  db.exec(SCHEMA_MIGRATIONS_TABLE_SQL);

  const applied = new Set(
    db
      .prepare('SELECT version FROM schema_migrations')
      .all()
      .map((row) => (row as { version: number }).version),
  );

  const insertVersion = db.prepare('INSERT INTO schema_migrations (version, name) VALUES (?, ?)');

  for (const migration of pendingMigrations(readMigrationDir(migrationsDir), applied)) {
    db.transaction(() => {
      db.exec(migration.sql);
      insertVersion.run(migration.version, migration.name);
    })();
  }
}
