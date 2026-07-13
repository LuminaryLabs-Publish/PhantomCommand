# Campaign Resume Fixture Gate

**Timestamp:** `2026-07-12T22-15-00-04-00`

## Summary

Existing checks inspect source markers and static output. They do not execute New, Continue, storage parsing, checkpoint roundtrip, hydration rejection or first-frame provenance.

## Plan ledger

**Goal:** require deterministic source/build/Pages proof before claiming Continue works.

- [x] Record the existing proof boundary.
- [x] Define required fixtures.
- [ ] Implement and run later.

## Required fixtures

```txt
fresh New preset
valid Continue roundtrip
missing checkpoint
malformed JSON
unsupported schema version
checksum failure
migration success and failure
partial participant checkpoint
broken pad/tower reference
ID-counter collision
atomic rollback
New never hydrates predecessor
Continue never silently starts New
source/build/Pages parity
first visible restored-frame acknowledgement
```

## Validation boundary

```txt
npm run check: not run
npm run build: not run
browser resume smoke: not run
Pages resume smoke: not run
checkpoint fixtures available: no
runtime or deployment changed: no
```
