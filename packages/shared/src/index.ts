export type Ticker = string;

export interface AssetQuote {
  ticker: Ticker;
  priceCents: number;
  updatedAt: string;
}

export type AssetClass = 'stock' | 'fii' | 'etf' | 'bdr';

export interface Asset {
  ticker: Ticker;
  assetClass: AssetClass;
  name: string;
}

export interface RankingEntry {
  rank: number;
  ticker: Ticker;
  changePercentBp: number;
}
