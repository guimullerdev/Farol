import sqlcipher from '@journeyapps/sqlcipher';

export interface WalletDb {
  close(): void;
}

/**
 * User wallet database (assets, transactions, dividends/proceeds), always
 * encrypted with SQLCipher. `passphrase` must never be logged or persisted
 * in plaintext.
 */
export function openWalletDb(filePath: string, passphrase: string): WalletDb {
  const db = new sqlcipher.Database(filePath);
  db.run('PRAGMA key = ?', [passphrase]);
  return {
    close: () => db.close(),
  };
}
