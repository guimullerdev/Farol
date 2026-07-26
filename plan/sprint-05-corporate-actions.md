# Sprint 05 — Corporate actions: split, bonus, grouping

## Goal
Let the user register stock splits (desdobramento), bonus shares
(bonificação), and reverse splits (grupamento), and confirm they correctly
adjust quantity and average price in the sprint 02 calc.

## Why
The schema's `transactions.type` already includes `split`/`bonus`/`grouping`
(sprint 01 deliberately left them without UI); this sprint is a small,
contained slice specifically to exercise the two edge cases the
financial-calc-validation skill calls out that sprint 02 doesn't otherwise
cover.

## Functional scope

- Register a split: asset, date, split ratio (e.g. 1:10) — creates a `split` transaction; quantity held multiplies by the ratio, average price divides proportionally.
- Register a bonus: asset, date, bonus ratio or absolute quantity, cost basis (zero-cost by default, or a specified cost if the bonus wasn't free) — creates a `bonus` transaction; new quantity dilutes average price per the skill's formula.
- Register a grouping (reverse split): symmetric to split, ratio < 1.
- All three feed into the same chronological `transactions` walk sprint 02's calc already does — this sprint should not need to change that calc's core loop, only add handling for these three `type` values within it.

## Mandatory tests (from the skill)
1. Split: quantity multiplies, average price divides proportionally — verify against a manual example
2. Bonus: new quantity at zero cost dilutes average price correctly
3. A sell happening after a split correctly uses the post-split average price, not the pre-split one (ordering regression test)

## Definition of done
- [ ] Split/bonus/grouping entry working end-to-end
- [ ] All 3 tests above passing, run against the same calc module as sprint 02 (no parallel/duplicate calc path for corporate actions)
- [ ] `/code-review` run before opening the PR
