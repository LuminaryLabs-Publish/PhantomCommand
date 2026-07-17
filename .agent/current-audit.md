# Current Audit

**Timestamp:** `2026-07-16T23-59-01-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Status:** `isometric-middle-pan-anchor-convergence-authority-audited`

## Summary

The campaign's middle-button camera pan duplicates isometric inverse-transform math. Its vertical source-delta coefficient matches the canonical transform, but its horizontal coefficient is twice the canonical value. The world point apparently grabbed at pointer-down therefore drifts away from the pointer during horizontal and diagonal pan gestures.

## Plan ledger

**Goal:** define one middle-pan authority that binds pointer, viewport and camera generations, resolves camera displacement with the canonical inverse transform, and acknowledges the matching converged frame.

- [x] Reconcile the current Publish inventory and central repo ledger.
- [x] Select PhantomCommand by the oldest documented-selection rule.
- [x] Inspect `game.html`, `src/campaign/campaign-scene.js`, `src/menu/crt-renderer.js`, package/build surfaces and retained audits.
- [x] Identify the interaction loop, domains, all 20 implemented kits and their services.
- [x] Define 19 middle-pan anchor authority surfaces.
- [x] Add the timestamped audit family.
- [ ] Implement and execute screen/source/world anchor fixtures.

## Source-backed path

```txt
pointerdown(button=1)
  -> store source x/y

pointermove while middle
  -> calculate source dx/dy
  -> mutate camera x/z with duplicated coefficients

next RAF
  -> apply keyboard camera velocity
  -> clamp camera
  -> advance fixed-step simulation
  -> render the camera projection
```

## Transform comparison

```txt
canonical horizontal term: deltaX / (zoom * 1.44)
active horizontal term:    deltaX / (zoom * 0.72)
active/canonical ratio:     2.0

canonical vertical term:   deltaY / (zoom * 0.72)
active vertical term:      deltaY / (zoom * 0.72)
```

The active path can consume the same source coordinate system as `screenToWorld`, but does not reuse its inverse-transform authority.

## Main gaps

```txt
canonical source-delta inverse-transform service
grabbed world-anchor snapshot
route, viewport, pointer and camera revision binding
keyboard-pan versus middle-pan arbitration
camera-boundary settlement result
stale and cancelled gesture rejection
MiddlePanResult
FirstMiddlePanFrameAck
PanAnchorConvergenceAck
browser, artifact and Pages fixtures
```

## Required authority

`phantom-command-isometric-middle-pan-anchor-convergence-authority-domain`

## Inventory summary

```txt
implemented kits: 20
planned middle-pan surfaces: 19
```

The full kit-by-kit services and source evidence are in `.agent/trackers/2026-07-16T23-59-01-04-00/project-breakdown.md`.

## Validation boundary

Documentation changed. Runtime JavaScript, HTML, CSS, gameplay, simulation, input behavior, camera behavior, rendering behavior, persistence, dependencies, tests, workflows, build and deployment did not change. No corrected pan coefficient, anchor convergence or production-readiness claim is made.