# PhantomCommand Agent Start

**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Branch:** `main`  
**Last aligned:** `2026-07-13T11-41-10-04-00`  
**Status:** `fixed-step-frame-scheduler-authority-audited`

## Summary

PhantomCommand is a static pixel-isometric campaign with a procedural Canvas2D menu, mutable fixed-step combat, CRT WebGL presentation, browser persistence and public diagnostics. The current audit isolates Fixed-Step Frame Scheduler Authority: elapsed wall time is silently clamped, step drain has no receipt, camera and simulation use different temporal paths, rendering has no interpolation frame and visible output has no matching temporal acknowledgement.

## Plan ledger

**Goal:** establish one revisioned frame transaction from RAF wall time through fixed-step simulation, camera state, immutable presentation, CRT submission and visible proof.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Confirm all eligible repository heads match central documentation.
- [x] Select only PhantomCommand as the oldest eligible central entry.
- [x] Trace wall-time sampling, dt clamp, accumulator drain, camera integration, Canvas2D rendering and CRT submission.
- [x] Preserve all 20 implemented kits and offered services.
- [x] Define the scheduler authority and fixture gate.
- [x] Add the timestamped audit family.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Runtime implementation and executable scheduler fixtures remain future work.

## Read this first

```txt
.agent/trackers/2026-07-13T11-41-10-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-13T11-41-10-04-00.md
.agent/architecture-audit/2026-07-13T11-41-10-04-00-fixed-step-frame-scheduler-dsk-map.md
.agent/render-audit/2026-07-13T11-41-10-04-00-fixed-step-visible-frame-gap.md
.agent/gameplay-audit/2026-07-13T11-41-10-04-00-hitch-high-refresh-simulation-loop.md
.agent/interaction-audit/2026-07-13T11-41-10-04-00-frame-step-render-admission-map.md
.agent/scheduler-audit/2026-07-13T11-41-10-04-00-fixed-step-drain-presentation-contract.md
.agent/deploy-audit/2026-07-13T11-41-10-04-00-fixed-step-scheduler-fixture-gate.md
.agent/central-sync-audit/2026-07-13T11-41-10-04-00-repo-ledger-fixed-step-scheduler-reconciliation.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
```

The WebGL Context Lifecycle audit at `2026-07-13T05-59-03-04-00` remains retained.

## Current mismatch

```txt
RAF elapsed
  -> silently clamp to 50 ms
  -> variable-dt camera update
  -> zero to three fixed 1/60 simulation steps
  -> render latest mutable state without interpolation
  -> sample a second clock for CRT effects
  -> no scheduler result or matching visible-frame acknowledgement
```

## Required authority

```txt
phantom-command-fixed-step-frame-scheduler-authority-domain
```

Completion requires explicit step budgets, dropped-time results, scheduler/visibility generations, previous/current state pairs, interpolation frames, typed projection results, public readback and source/build/Pages cadence proof.