# Sprint 04 — Capital gains tax (IR) apuration

## Goal
Monthly capital-gains tax report per the Brazilian rules already documented
in the financial-calc-validation skill: stocks (R$20k/month exemption, 15%
above), FIIs (20% flat, no exemption).

## Why
This is the most legally/financially sensitive calc in the app — a wrong
number here is a wrong tax filing, not a cosmetic bug. It's deliberately
scoped to its own sprint, after sprint 02's basic P&L is already correct and
tested, per the README decision.

## Functional scope

- Monthly aggregation of sale proceeds and realized results, grouped by asset class (`stock` vs `fii`), reusing sprint 02's realized-P&L-per-sale data (query pattern already documented in the schema PR's migration comments — `GROUP BY strftime('%Y-%m', event_date)`).
- Stocks: if total monthly stock sale proceeds ≤ R$20,000, the month's stock gains are exempt; above that threshold, 15% on the **entire month's** gain (not just the excess) — the exemption is void for the whole month, not prorated.
- FIIs: 20% flat on any gain, every month, no exemption.
- Day trade: `is_day_trade` transactions are excluded from the above and, per the skill, treated as a separate category (20%, no exemption) — confirm with the user whether day trade support is actually needed in v1 before implementing it here, or whether it can be deferred (the `is_day_trade` column already exists in the schema either way).
- Output: a per-month summary (taxable base, rate applied, tax due) the user can read off manually for their DARF — generating/filing the DARF itself is out of scope.

## Mandatory tests (from the skill — do not skip)
1. Exact R$20.000,00 boundary (exempt) vs R$20.000,01 (taxed on the full month's gain)
2. FII sale with any profit — always taxed, confirm no exemption path exists in the code
3. Mixed month: some stock sales, some FII sales — confirm they're taxed independently, not combined into one threshold check
4. Manual comparison against a reference spreadsheet/calculator, not just the test written for the code

## Definition of done
- [ ] Day-trade-in-v1 question resolved with the user before implementation starts
- [ ] Monthly tax calc implemented and tested against all 4 cases above, including the exact-boundary test
- [ ] Report view working end-to-end (data correctness, not visual polish)
- [ ] `/code-review` run before opening the PR — flag for extra scrutiny given the legal/financial sensitivity
