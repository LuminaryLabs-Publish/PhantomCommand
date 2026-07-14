# Durable Save and Resume Fixture Gate

**Timestamp:** `2026-07-13T21-02-54-04-00`

## Summary

Existing static checks assert source markers. They do not execute browser storage, outcome commit, candidate validation, Continue projection, resume reconstruction or source/build/Pages parity.

## Plan ledger

**Goal:** define the minimum executable evidence required before durable campaign persistence is considered complete.

- [x] Identify missing source and browser fixtures.
- [x] Include failure, corruption, migration and quota paths.
- [x] Include production build and deployed-origin parity.
- [ ] Implement and run later.

## Required fixtures

```txt
victory with successful durable promotion
victory with localStorage unavailable
victory with quota or security rejection
staging write succeeds but readback differs
promotion interrupted with staging record retained
malformed canonical save
unknown schema version
out-of-range and missing campaign fields
legacy marker-only save
Continue disabled for rejected candidates
Continue enabled for admitted candidates
resume reconstructs identical checkpoint state
new campaign ignores predecessor save by policy
save generation stale or duplicated
first durable outcome frame correlation
first resumed frame correlation
source, built-output and GitHub Pages parity
```

## Current evidence

```txt
npm run check: not run in this documentation pass
npm run build: not run in this documentation pass
browser persistence fixtures: unavailable
built-output persistence smoke: not run
Pages persistence smoke: not run
```

No deployment behavior changed.