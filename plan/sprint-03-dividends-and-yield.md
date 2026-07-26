# Sprint 03 — Dividends, reinvestment, yield on cost

## Goal
Let the user register dividend/JCP/rendimento payments, mark them as
reinvested (linking to a buy transaction), and see yield on cost per asset.

## Why
The `dividends` table already exists in the wallet schema with exactly the
columns this needs (`kind`, `amount_cents`, `reinvested`,
`reinvest_transaction_id`) — this sprint is the first thing to actually use
it.

## Functional scope

**Dividend CRUD**
- Register a dividend payment: asset, kind (`dividend` | `jcp` | `rendimento`), payment date, amount in cents.
- Mark as reinvested: when checked, require linking (or creating inline) a `buy` transaction on the same or a nearby date — per the README decision, this is what the sprint 02 avg-price calc actually reads, so the link must be real, not just a flag.
- List dividends per asset and in aggregate (last 12 months, for yield on cost).

**Yield on cost**
- Formula per the skill: `proventos_recebidos_12m / (preço_médio * qtd_atual)`.
- Explicitly distinct from dividend yield (which uses current price) — do not let the UI or any variable/function name conflate the two, per the skill's own warning.

## Test requirements
- Unit tests for yield-on-cost calc: verify it uses average price (from sprint 02's calc), not current market price.
- Test the reinvestment link: registering a reinvested dividend creates/links a `buy` row, and sprint 02's average-price calc picks it up correctly (regression test against sprint 02's suite, not just new isolated tests).
- Edge case: dividend received on an asset with zero current quantity (fully sold) — decide and test the expected behavior (yield on cost undefined/zero, not a division-by-zero crash).

## Definition of done
- [ ] Dividend CRUD working end-to-end
- [ ] Reinvestment linking working and covered by a regression test against the average-price calc
- [ ] Yield on cost implemented, tested, and named distinctly from dividend yield everywhere in code
- [ ] `/code-review` run before opening the PR
