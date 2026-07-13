# WebGL Context-Loss Fixture Gate

**Timestamp:** `2026-07-13T05-59-03-04-00`

## Summary

Current checks are static source-marker checks and the build copies static assets. Neither source, built output nor GitHub Pages is exercised under WebGL context loss, restoration or resource-rebuild failure.

## Plan ledger

**Goal:** require executable lifecycle proof before WebGL recovery is considered complete or deployable.

- [x] Record current static check/build boundary.
- [x] Define menu and campaign browser fixtures.
- [x] Define failed-rebuild and stale-event fixtures.
- [x] Define built-output and Pages parity gates.
- [ ] Wire and run fixtures after implementation.

## Required fixture matrix

```txt
source menu
  initial draw
  forced context loss
  fallback visible
  context restore
  resource rebuild
  first recovered frame

source campaign
  fixed-step state before loss
  loss without truth corruption
  bounded degraded state
  restore without duplicated simulation
  recovered frame matches current truth

failure cases
  shader compile failure during rebuild
  program link failure
  buffer allocation failure
  texture allocation/upload failure
  stale restore event
  duplicate loss event
  route disposal during restore

publication parity
  source server
  built output
  GitHub Pages
```

## Admission gate

Do not claim deployment readiness until all three publication surfaces produce the same typed results, fallback state, resource-generation transitions and recovered-frame acknowledgement.