# Sprint 06 — Quotes + mark-to-market

## Goal
Get a current price into the public (unencrypted) DB for each asset the
user holds, and use it to show unrealized P&L in the portfolio view from
sprint 02. This is the smallest possible slice of the scraper — not the full
scraper/news/rankings phase.

## Why
Sprint 02 deliberately deferred unrealized P&L for lack of a live price.
This sprint closes that gap with the minimum needed (on-demand quote fetch),
without pulling the whole scraper/LLM-pipeline phase into the wallet
timeline.

## Functional scope

- A single, official-source quote fetch (B3 or an official IR page — check terms of use before implementing, per CLAUDE.md) for a given ticker, on user-triggered refresh (no cron scheduling yet — `packages/scraper`'s `node-cron` scheduling is out of scope here).
- Write the result into the **public** DB's `quotes` table (never into the wallet DB) via `openPublicDb`.
- Portfolio view (from sprint 02) reads the latest `quotes` row per held ticker and computes unrealized P&L: `(preço_médio - preço_atual) * qtd_atual` — using `decimal.js`, same as every other calc in this phase.
- No quote history retention beyond "latest" in v1 (matches the schema PR's note that `quotes` is latest-only; historical tracking is a future migration).

## Test requirements
- Unit test for the unrealized P&L formula itself (money/decimal correctness), independent of the scraping mechanics.
- Integration-level test or manual `verify` pass: trigger a refresh, confirm `quotes` gets written, confirm the portfolio view picks it up.
- Confirm scraping only touches the public DB — no wallet data is read/written by this code path (schema-level: the scraper code shouldn't import `openWalletDb` at all).

## Definition of done
- [ ] On-demand quote refresh working end-to-end for at least one real ticker from an official source
- [ ] Unrealized P&L showing correctly in the portfolio view
- [ ] No wallet DB access anywhere in the new scraper-facing code
- [ ] `/code-review` run before opening the PR
