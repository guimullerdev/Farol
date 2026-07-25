CREATE TABLE IF NOT EXISTS assets (
  ticker      TEXT PRIMARY KEY,
  asset_class TEXT NOT NULL CHECK (asset_class IN ('stock','fii','etf','bdr')),
  name        TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS transactions (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  asset_ticker TEXT NOT NULL REFERENCES assets(ticker),
  type         TEXT NOT NULL CHECK (type IN ('buy','sell','split','bonus','grouping')),
  event_date   TEXT NOT NULL,
  quantity     TEXT NOT NULL,
  price_cents  INTEGER,
  is_day_trade INTEGER NOT NULL DEFAULT 0 CHECK (is_day_trade IN (0,1)),
  notes        TEXT,
  created_at   TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
);
CREATE INDEX IF NOT EXISTS idx_transactions_asset_date ON transactions(asset_ticker, event_date);

CREATE TABLE IF NOT EXISTS dividends (
  id                      INTEGER PRIMARY KEY AUTOINCREMENT,
  asset_ticker            TEXT NOT NULL REFERENCES assets(ticker),
  kind                    TEXT NOT NULL CHECK (kind IN ('dividend','jcp','rendimento')),
  payment_date            TEXT NOT NULL,
  amount_cents            INTEGER NOT NULL,
  reinvested              INTEGER NOT NULL DEFAULT 0 CHECK (reinvested IN (0,1)),
  reinvest_transaction_id INTEGER REFERENCES transactions(id),
  created_at              TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
);
CREATE INDEX IF NOT EXISTS idx_dividends_asset_date ON dividends(asset_ticker, payment_date);
