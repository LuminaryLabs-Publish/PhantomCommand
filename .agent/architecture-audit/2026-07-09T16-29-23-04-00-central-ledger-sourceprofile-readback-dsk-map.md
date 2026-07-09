# PhantomCommand Architecture Audit

**Timestamp:** `2026-07-09T16-29-23-04-00`

## Summary

`PhantomCommand` is a static browser game where most runtime authority still lives in `game.html`. The useful next DSK boundary is source-profile authority for `smooth-ring-handoff-v6`, not renderer extraction.

## Current architecture

```txt
index.html
  -> route menu
  -> game.html
  -> inline Three.js runtime
  -> inline construct profile constants
  -> inline ring and piece descriptor math
  -> inline construct timeline
  -> inline geometry/material/render/HUD/input/camera logic
  -> legacy window.GameHost diagnostics
```

## Implemented source-backed DSKs

```txt
construct-spiral-intro-kit
  domain: n:sequence:construct:spiral-intro
  services: piece id creation, schedule creation, kit creation, install, reset, update, snapshot, piece state readback
```

## Inline DSKs that need extraction

```txt
legacy-inline-smooth-ring-handoff-profile
legacy-inline-ring-descriptor-runtime
legacy-inline-piece-descriptor-runtime
legacy-inline-timeline-runtime
legacy-inline-gamehost-diagnostics
```

## Required next DSK split

```txt
phantom-command-smooth-handoff-profile-kit
phantom-command-ring-descriptor-kit
phantom-command-piece-descriptor-kit
phantom-command-handoff-timeline-contract-kit
phantom-command-source-profile-fingerprint-kit
phantom-command-source-profile-snapshot-kit
phantom-command-profile-parity-report-kit
phantom-command-gamehost-source-diagnostics-kit
phantom-command-sourceprofile-fixture-kit
phantom-command-build-fixture-gate-kit
central-ledger-readback-kit
```

## Architecture finding

Do not make `game.html` thinner by extracting the renderer first. The current live behavior must be preserved while the source-profile authority becomes pure, fixture-readable, and centrally tracked.
