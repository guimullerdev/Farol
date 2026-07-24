# Farol — CLAUDE.md

Desktop investing assistant for beginners in the Brazilian market.

## Stack
- Electron + Vite (electron-vite) + React + TypeScript
- Tests: Vitest (unit) + Playwright (E2E)
- Database: better-sqlite3 for public data + SQLCipher for the user's wallet (encrypted)
- Scraping: headless Playwright, scheduled via node-cron, official sources only
- Local LLM: Ollama (news classification and summarization)
- Paid LLM: Anthropic API (only for analyses that require heavier reasoning)

## Repo structure
- `apps/desktop/` — Electron + React (main, renderer, preload)
- `packages/scraper/` — headless scraping + scheduling
- `packages/llm-pipeline/` — Ollama + paid API orchestration
- `packages/db/` — schema, migrations, access layer (SQLite/SQLCipher)
- `packages/shared/` — shared TypeScript types

## Commands
- `yarn dev` — run the app in dev mode
- `yarn test` — Vitest (unit)
- `yarn test:e2e` — Playwright
- `yarn typecheck` — `tsc --build`
- `yarn lint` — ESLint + Prettier (check)
- `yarn build` — production build + electron-builder

## Language
- Code, identifiers, comments, commit messages, tests (names and descriptions), and docs live in **English**. This includes this file.
- User-facing UI copy (strings rendered in the app) may stay in Portuguese for now, since the initial audience is Brazilian retail investors — this is the one deliberate exception.
- Don't hardcode Portuguese strings outside UI components in a way that blocks future i18n (e.g. no user-facing copy baked into shared/db/scraper logic). We don't have an i18n layer yet; when we add one, all UI copy moves into it.

## Conventions
- Strict TypeScript (`strict: true`); no `any` without a comment justifying it
- Conventional Commits (`feat:`, `fix:`, `test:`, `refactor:`...)
- One PR per backlog item, always with a test covering the change
- Never commit `.env`, API keys, or real wallet data in fixtures

## Security rules
- Every personal wallet table (assets, transactions, dividends/proceeds) lives only in the encrypted database (SQLCipher). Never write that data as plaintext to logs, cache, or temp files.
- Public data (quotes, news, gainers/losers rankings) lives in a separate, unencrypted database.
- The session auto-locks after inactivity — never remove that check "to test faster" without reverting it afterwards.

## Financial calculations
Any code that computes average price, profit/loss, yield, or income tax must follow the `financial-calc-validation` skill (`.claude/skills/financial-calc-validation/SKILL.md`). It defines the mandatory edge cases and minimum tests required before merge.

## Skills to use on this project
- `dataviz` — use before building any chart/visualization (quotes, gainers/losers rankings, yield/P&L charts). Keeps colors, shapes, and light/dark theming consistent.
- `run` — launch and drive the Electron app to see a renderer/UI change actually working, not just typecheck/tests.
- `verify` — after a non-trivial change to the renderer or main process, exercise the affected flow end-to-end before calling it done.
- `code-review` / `simplify` — run on the diff before opening a PR: correctness review and reuse/simplification cleanup.
- `commit-message` — use when staging changes and writing the commit message (`.claude/skills/commit-message/SKILL.md`).

## GitHub
`gh` CLI is fine to use for repo actions on this project — opening/reviewing PRs, filing issues, checking CI runs, reading past PR discussion for context. Still confirm before anything visible to others (opening a PR, commenting, pushing) per the base git safety rules; `gh` being allowed doesn't waive that.

## What NOT to do
- Don't use `number`/float for monetary values — use integer cents or `decimal.js`
- Don't call the paid LLM for tasks the local one can handle (classification, summarization, ticker extraction)
- Don't skip plan mode for changes touching the DB schema or the encryption layer
- Don't scrape sources that aren't official (B3, CVM, investor relations pages) without first checking the terms of use allow it
