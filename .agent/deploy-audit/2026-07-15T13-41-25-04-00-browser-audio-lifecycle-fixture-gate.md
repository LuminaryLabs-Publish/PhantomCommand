# Browser Audio Lifecycle Fixture Gate

**Timestamp:** `2026-07-15T13-41-25-04-00`

## Summary

Static marker checks do not prove browser audio unlock, resume, settlement or retirement. Source, built output and Pages need the same executable lifecycle matrix.

## Plan ledger

**Goal:** prevent audio-lifecycle claims until browser fixtures prove the accepted graph and route settlement on every shipped surface.

- [x] Identify missing browser proof.
- [x] Define source/build/Pages fixture rows.
- [ ] Implement and run the matrix.

## Required fixture rows

```txt
supported browser accepted gesture creates one context generation
suspended context resumes after accepted gesture
ambience disabled creates no persistent sources
ambience re-enabled creates one successor generation
repeated UI cue does not duplicate command settlement
hidden document follows declared suspend or silence policy
visible document resumes only the accepted generation
route transition produces FirstSilentRouteTransitionAck
pagehide stops disconnects and closes exactly once
stale close timeout cannot retire a successor generation
source and built output produce equivalent results
Pages deployment produces equivalent results
```

## Completion gate

```txt
npm run check
npm run build
source browser fixture
built-output browser fixture
Pages browser fixture
resource and callback trace
no unsupported production-readiness claim
```

No fixture was available or run during this documentation-only audit.