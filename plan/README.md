# Farol — sprint plan (wallet phase)

Feature-only planning. No visual/UI design decisions here — those are handled
separately (Claude Design). Each sprint doc describes functional scope, data
flow, and test requirements only.

## Decisions locked in for this phase

- **First vertical slice**: wallet CRUD + P&L, not the scraper. The wallet is
  the core value prop and doesn't depend on external data sources.
- **Cadence**: 1-week sprints, 6 planned now (re-plan after sprint 6 once the
  wallet phase is done and the scraper/LLM-pipeline phase starts).
- **Asset classes in v1**: stocks (`stock`) and FIIs (`fii`) only. ETFs/BDRs
  stay in the schema's CHECK constraint but get no dedicated UI/calc work yet.
- **Data entry**: manual only in v1 (no CSV / nota de corretagem import).
- **Reinvested dividends**: count as a new buy for cost-basis purposes. A
  reinvestment is recorded as a `dividends` row with `reinvested = 1`, linked
  via `reinvest_transaction_id` to a normal `buy` row in `transactions` — the
  buy row is what the average-price calc reads, same as any other purchase.
- **Capital gains tax (IR)**: its own sprint (04), after basic average
  price/P&L lands in sprint 02. Keeps the mandatory edge-case testing from
  `financial-calc-validation` scoped and reviewable per sprint instead of
  bundled into one large PR.
- **Wallet unlock**: a real create-passphrase / unlock / auto-lock flow ships
  in sprint 01, not a hardcoded dev passphrase — CLAUDE.md's security rule
  against disabling auto-lock "to test faster" makes a throwaway shortcut here
  risky to leave in by accident.

## Sprint index

1. [Wallet unlock + asset/transaction CRUD](sprint-01-wallet-unlock-and-crud.md)
2. [Average price + realized/unrealized P&L](sprint-02-average-price-and-pnl.md)
3. [Dividends, reinvestment, yield on cost](sprint-03-dividends-and-yield.md)
4. [Capital gains tax (IR) apuration](sprint-04-capital-gains-tax.md)
5. [Corporate actions: split, bonus, grouping](sprint-05-corporate-actions.md)
6. [Quotes + mark-to-market](sprint-06-quotes-and-mark-to-market.md)

## Out of scope for this phase (revisit after sprint 6)

- Scraper scheduling beyond a manual/on-demand quote refresh (sprint 06 keeps
  it minimal — full B3/CVM scraping + news + rankings is its own phase)
- LLM pipeline (news classification/summarization)
- CSV / nota de corretagem import
- ETFs, BDRs, fixed income, day trade as a distinct tax category
- Any visual/UI design system work
