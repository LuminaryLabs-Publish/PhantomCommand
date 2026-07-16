# Current Audit

**Timestamp:** `2026-07-16T10-38-36-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Status:** `wheel-zoom-delta-anchor-convergence-authority-audited`

## Summary

The campaign wheel handler multiplies raw `deltaY` by a fixed scalar without consulting `deltaMode`. It then calculates both pointer-anchor world positions with the unchanged current camera zoom, so the attempted camera correction is zero. The RAF changes zoom later, allowing the world point beneath the pointer to drift.

## Plan ledger

**Goal:** define one wheel-zoom authority that normalizes device evidence, preserves the selected world anchor through eased zoom, and binds the accepted command to the visible camera frame.

- [x] Reconcile the current Publish inventory and central repo ledger.
- [x] Select PhantomCommand by the oldest synchronized timestamp.
- [x] Inspect `game.html`, `src/campaign/campaign-scene.js`, `src/menu/crt-renderer.js`, package scripts and retained audits.
- [x] Identify the interaction loop, domains, all 20 implemented kits and their services.
- [x] Define 19 wheel-zoom authority surfaces.
- [x] Add the timestamped audit family.
- [ ] Implement and execute cross-device wheel and anchor-convergence fixtures.

## Source-backed path

```txt
canvas wheel event
  -> prevent default
  -> map pointer to source coordinates
  -> before = screenToWorld(pointer) using camera.zoom
  -> targetZoom *= exp(-deltaY * 0.0012)
  -> after = screenToWorld(pointer) using the same camera.zoom
  -> before - after equals zero
  -> no effective camera anchor correction

later RAF
  -> camera.zoom eases toward targetZoom
  -> world projection changes around camera center
  -> world point beneath pointer moves
```

## Main gaps

```txt
WheelEvent.deltaMode normalization
pixel line and page unit policy
trackpad burst and momentum coalescing
accepted wheel-command identity
camera zoom revision
world-anchor snapshot
anchor-preserving camera solve
stale route and camera revision rejection
WheelZoomResult
FirstWheelZoomFrameAck
ZoomAnchorConvergenceAck
browser artifact and Pages cross-device fixtures
```

## Required authority

`phantom-command-wheel-zoom-delta-anchor-convergence-authority-domain`

## Inventory summary

```txt
implemented kits: 20
planned wheel-zoom surfaces: 19
```

The full kit-by-kit services and source evidence are in `.agent/trackers/2026-07-16T10-38-36-04-00/project-breakdown.md`.

## Validation boundary

Documentation changed. Runtime JavaScript, HTML, CSS, gameplay, simulation, rendering behavior, camera behavior, persistence, dependencies, tests, workflows, build and deployment did not change. No cross-device zoom correctness, pointer-anchor convergence or production-readiness claim is made.