# PhantomCommand Current Audit

**Timestamp:** `2026-07-15T08-41-37-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Status:** `public-diagnostic-capability-frame-admission-authority-audited`

## Summary

`window.GameHost` publishes the same mutable campaign state and camera objects consumed by fixed-step simulation and rendering. It also publishes direct `startWave`, `build` and `setZoom` functions. External callers can therefore change simulation or presentation truth outside normal input ownership without a versioned capability set, caller lease, expected revision, idempotency key, typed result, retirement receipt or matching Canvas2D/CRT frame acknowledgement.

## Plan ledger

**Goal:** publish only immutable diagnostic readback by default and require explicit, allowlisted, versioned settlement for any public mutation.

- [x] Trace `GameHost` publication into campaign and camera owners.
- [x] Trace direct host mutations into the next fixed-step and render frame.
- [x] Inspect the campaign static check and confirm it only requires the marker.
- [x] Define capability, command, result, retirement and frame-evidence surfaces.
- [ ] Implement the authority.
- [ ] Add read, write, stale, duplicate, retirement and visible-frame fixtures.
- [ ] Prove source, build and Pages parity.

## Current source path

```txt
campaign boot
  -> create mutable state and camera owners
  -> attach player input and fixed-step RAF
  -> publish window.GameHost with state camera startWave build getState setZoom

external caller
  -> mutate live state or camera
  -> or call a direct function
  -> no expected revision or typed settlement
  -> next update/render consumes changed values
  -> no matching source-frame or presented-frame acknowledgement
```

## Required authority

```txt
phantom-command-public-diagnostic-capability-frame-admission-authority-domain
```

## Validation boundary

Documentation only. No public API, product source, gameplay, rendering, persistence, tests, build or deployment behavior changed.