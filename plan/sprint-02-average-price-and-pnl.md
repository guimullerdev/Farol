# Sprint 02 — Average price + realized/unrealized P&L

## Goal
Compute weighted average price and P&L per asset from the transaction
history entered in sprint 01, and show a portfolio position view (holdings,
avg price, quantity held, realized P&L to date).

## Why
This is the first real financial calculation in the app — must follow
`.claude/skills/financial-calc-validation/SKILL.md` exactly, including its
mandatory edge-case tests, before it touches a real number a user could act
on.

## Functional scope

**Calc logic** (new, likely `packages/shared` or a new `packages/calc` —
decide during implementation; add `decimal.js` as a dependency here, per the
schema PR's note that it wasn't needed until calc logic existed)
- Weighted average price: recalculated on every `buy`, unchanged on `sell` (formula already documented in the skill).
- Realized P&L on each `sell`: `(preço_venda - preço_médio) * qtd_vendida`.
- Unrealized P&L: `(preço_médio - preço_atual) * qtd_atual` — but v1 has no live quotes yet (that's sprint 06), so unrealized P&L either waits until sprint 06 or the UI shows "—" until a quote exists. Confirm with user which before starting this sprint if it's ambiguous.
- Full sell → re-buy: average price must reset to the new buy's price, not inherit the old one.
- Reinvested dividends (per the README decision) are read as ordinary `buy` rows via `reinvest_transaction_id` — the avg-price calc doesn't need special-case code for them, it just walks `transactions` chronologically.

**Portfolio view (data, not visual design)**
- Per-asset: ticker, quantity held, average price, total cost, realized P&L to date.
- Aggregate: total cost, total realized P&L across the wallet.

## Mandatory tests (from the skill — do not skip any)
1. Single buy, then partial sell (avg price unchanged)
2. Multiple buys at different prices (weighted avg correct)
3. Full sell then re-buy (avg price resets, doesn't inherit)
4. Fractional share quantities (stocks) and whole FII quotas — rounding behavior
5. Manual comparison of at least one calc result against a spreadsheet/calculator, not just the test written for the code
6. No `number`/float used for any money value in the calc path — `decimal.js` end to end from the `TEXT` quantity/`INTEGER` cents columns

## Definition of done
- [ ] Average price and realized P&L calc implemented and unit-tested against all 5 cases above
- [ ] Portfolio position view working end-to-end in the app (data correctness, not visual polish)
- [ ] `decimal.js` added where the calc logic lives, no float arithmetic on money anywhere in the diff
- [ ] `/code-review` run before opening the PR (flag this sprint for extra scrutiny — it's the first calc code in the repo)
