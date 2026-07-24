---
name: commit-message
description: >
  Writes commit messages for this project's conventions (Conventional Commits, English,
  one logical change per commit). Use whenever staging changes and writing a commit
  message, or when asked to "write a commit message", "commit this", or similar —
  even if the request doesn't say "Farol" or "Conventional Commits" explicitly.
---

Write the commit message, don't just describe what one would look like. Follow the
staging/commit process already defined in the base git instructions (status, diff, log
first; new commit, never amend unless asked; never `--no-verify`).

## Format

```
<type>(<optional scope>): <summary, imperative mood, lowercase, no period>

<optional body: why, not what — the diff already shows what>
```

Allowed `type`: `feat`, `fix`, `test`, `refactor`, `chore`, `docs`, `perf`, `build`, `ci`.
Pick the scope from the touched package/app when it disambiguates: `db`, `scraper`,
`llm-pipeline`, `shared`, `desktop`. Skip the scope if the change spans several.

## Rules specific to this repo

- Message text in English — see the Language convention in `CLAUDE.md`.
- Summary describes *why*, not a changelog of file names. "why" comes from the actual
  motivation (bug being fixed, feature requested), not from guessing.
- If the diff touches average-price/P&L/yield/tax calculations, confirm the
  `financial-calc-validation` skill's required tests are present before writing `feat`/`fix` —
  otherwise flag it instead of committing.
- If the diff touches the DB schema or the SQLCipher/encryption layer, the summary must
  say so plainly (e.g. `feat(db): add wallet migration for split events`) — never bury a
  schema change inside an unrelated-sounding message.
- Never stage or reference `.env`, API keys, or real wallet data — if any show up in
  `git status`, stop and warn instead of committing them.
- One commit per logical change. Don't bundle an unrelated refactor into a `fix:` commit;
  split into separate commits instead.

## Examples

```
feat(scraper): add B3 quarterly earnings calendar job

fix(db): correct average price rounding on partial sells

test(llm-pipeline): cover Ollama timeout fallback path

refactor(desktop): extract wallet unlock modal from App
```
