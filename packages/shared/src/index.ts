export type Ticker = string;

export interface AssetQuote {
  ticker: Ticker;
  priceCents: number;
  updatedAt: string;
}
