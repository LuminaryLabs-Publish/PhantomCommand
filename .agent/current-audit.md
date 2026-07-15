# PhantomCommand Current Audit

**Timestamp:** `2026-07-15T03-24-35-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Status:** `device-control-action-coverage-authority-audited`

## Summary

The campaign input model is not device neutral. Primary-pointer selection is touch reachable, but wave start, unit order, tower selection, full camera navigation, pause, restart, exit and focus are bound to keyboard, secondary/middle mouse buttons or the wheel. The campaign route exposes no visible touch control layer.

## Plan ledger

**Goal:** admit only control profiles that cover every required campaign action and prove both the visible controls and their simulation/presentation effects.

- [x] Trace keyboard, pointer-button, wheel and touch-pointer producers.
- [x] Trace every campaign and camera action they mutate.
- [x] Identify touch-only coverage and progression gaps.
- [x] Define device profile, action manifest, command result and frame evidence surfaces.
- [ ] Implement the authority.
- [ ] Add touch-only, keyboard/mouse and hybrid fixtures.
- [ ] Prove source, build and Pages parity.

## Current source path

```txt
campaign boot
  -> one full-screen canvas
  -> direct keyboard, pointer and wheel listeners
  -> primary touch pointer can select
  -> no touch action map or visible control profile
  -> Space remains the normal wave-start path
  -> right click remains the normal unit-order path
  -> first wave and complete command loop are unavailable to touch-only users
```

## Required authority

```txt
phantom-command-device-control-action-coverage-authority-domain
```

## Validation boundary

Documentation only. No product source, input behavior, gameplay, rendering, tests, build or deployment changed.