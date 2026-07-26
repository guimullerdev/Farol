# Sprint 01 — Wallet unlock + asset/transaction CRUD

## Goal
A user can create a wallet passphrase, unlock the wallet, and manually
register assets and buy/sell transactions. No P&L or calc yet — this sprint
is purely data entry + retrieval, on top of the schema/migrations already
merged.

## Why
Nothing in `apps/desktop` consumes `@farol/db` yet. Every later sprint
(P&L, dividends, tax, corporate actions) needs a working unlock session and
CRUD layer to build on.

## Functional scope

**Wallet session**
- Create a new wallet: prompt for a passphrase, call `openWalletDb(path, passphrase)`, persist nothing but the encrypted file itself (passphrase never touches disk/logs).
- Unlock an existing wallet: same call: a wrong passphrase must produce a clear, catchable error the UI can show (the current `openWalletDb` already closes the handle and rethrows on failure — reuse that).
- Auto-lock: session times out after inactivity and re-locks (closes the `WalletDb` handle, requires passphrase again). This check must not be bypassed even temporarily during development, per CLAUDE.md.
- Empty passphrase is already rejected by `openWalletDb` (added in the schema PR) — the UI must surface that error, not just avoid triggering it.

**Asset CRUD**
- Register an asset: ticker, asset class (`stock` | `fii` only for v1 — enforce in the UI even though the DB CHECK allows `etf`/`bdr` too), name.
- List registered assets.
- No asset deletion in v1 (an asset with transactions can't be safely deleted without cascading decisions — defer).

**Transaction CRUD**
- Register a `buy` or `sell` transaction: asset, date, quantity (decimal string — accept fractional input for stocks, whole-number input for FIIs), unit price in cents, optional notes, `is_day_trade` flag (stored now, not used by calc until a later phase).
- List transactions for an asset, chronologically.
- Edit/delete a transaction (needed for fixing entry mistakes) — allowed in v1 since no calc/tax report depends on immutability yet.
- `split`/`bonus`/`grouping` transaction types exist in the schema but get no UI in this sprint — sprint 05 owns that.

## Data flow (main ↔ renderer)
- All `@farol/db` calls happen in the Electron **main** process (SQLCipher handle must never cross into the renderer).
- Define IPC channels for: `wallet:create`, `wallet:unlock`, `wallet:lock`, `asset:create`, `asset:list`, `transaction:create`, `transaction:list`, `transaction:update`, `transaction:delete`.
- Preload exposes a typed bridge (no raw `ipcRenderer.invoke` strings in renderer code) — define the contract in `packages/shared` so main/preload/renderer share one type.

## Test requirements
- Unit tests (Vitest) for any new `packages/db` query helpers: insert/list/update/delete for assets and transactions, including the FK/CHECK constraint tests already established in `public.test.ts`/`wallet.test.ts` as the pattern to follow.
- No financial-calc-validation edge cases apply yet (no average price/P&L computed this sprint) — but do verify quantity is stored/read as the exact decimal string entered (no float round-trip through the UI layer).
- `verify` skill: exercise create-wallet → unlock → add asset → add transaction → list end-to-end in the running app before calling the sprint done.

## Definition of done
- [ ] Wallet create/unlock/lock/auto-lock working end-to-end in the app
- [ ] Asset and transaction CRUD working end-to-end in the app
- [ ] IPC contract typed in `packages/shared`, no `any` on the bridge
- [ ] Tests passing, `yarn typecheck` and `yarn lint` clean
- [ ] `/code-review` run on the diff before opening the PR
