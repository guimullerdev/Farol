CREATE TABLE IF NOT EXISTS assets (
  ticker      TEXT PRIMARY KEY,
  asset_class TEXT NOT NULL CHECK (asset_class IN ('stock','fii','etf','bdr')),
  name        TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS quotes (
  ticker      TEXT NOT NULL REFERENCES assets(ticker),
  price_cents INTEGER NOT NULL,
  updated_at  TEXT NOT NULL,
  PRIMARY KEY (ticker)
);

CREATE TABLE IF NOT EXISTS news (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  ticker       TEXT REFERENCES assets(ticker),
  title        TEXT NOT NULL,
  url          TEXT NOT NULL,
  source       TEXT NOT NULL,
  published_at TEXT NOT NULL,
  summary      TEXT
);
CREATE INDEX IF NOT EXISTS idx_news_ticker_published ON news(ticker, published_at);

CREATE TABLE IF NOT EXISTS ranking_snapshots (
  id       INTEGER PRIMARY KEY AUTOINCREMENT,
  kind     TEXT NOT NULL CHECK (kind IN ('gainers','losers')),
  taken_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS ranking_entries (
  snapshot_id       INTEGER NOT NULL REFERENCES ranking_snapshots(id),
  rank              INTEGER NOT NULL,
  ticker            TEXT NOT NULL REFERENCES assets(ticker),
  change_percent_bp INTEGER NOT NULL,
  PRIMARY KEY (snapshot_id, rank)
);
