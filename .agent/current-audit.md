# Current Audit

**Timestamp:** `2026-07-16T17-40-04-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Status:** `isometric-marquee-selection-geometry-authority-audited`

## Summary

The campaign draws a source-space drag rectangle but resolves selection by inverse-transforming only its top-left and bottom-right corners. Because isometric world z depends on both screen y and negative screen x, those two corners are not the z extrema. The selected unit set can therefore omit units visibly inside the rectangle or include units outside it.

## Plan ledger

**Goal:** define one marquee-selection authority that binds the drag gesture to an exact camera snapshot, resolves membership against the visible source-space rectangle, and acknowledges the matching selected-state frame.

- [x] Reconcile the current Publish inventory and central repo ledger.
- [x] Select PhantomCommand by the oldest synchronized timestamp.
- [x] Inspect `game.html`, `src/campaign/campaign-scene.js`, `src/menu/crt-renderer.js`, package scripts and retained audits.
- [x] Identify the interaction loop, domains, all 20 implemented kits and their services.
- [x] Define 19 marquee-selection authority surfaces.
- [x] Add the timestamped audit family.
- [ ] Implement and execute screen/world membership fixtures.

## Source-backed path

```txt
pointerdown
  -> store source-space drag origin

pointermove
  -> update source-space pointer
  -> draw the visible rectangle from origin to current pointer

pointerup
  -> normalize screen min/max
  -> inverse-transform top-left as A
  -> inverse-transform bottom-right as B
  -> derive world x/z min/max from A and B only
  -> filter allied units against that world box
```

For the current inverse transform:

```txt
worldX = cameraX + screenY/0.72 + screenX/1.44
worldZ = cameraZ + screenY/0.72 - screenX/1.44
```

Top-left and bottom-right contain world-x extrema, but world-z extrema occur at top-right and bottom-left. The current two-corner box is therefore not equivalent to the visible drag rectangle.

## Main gaps

```txt
camera snapshot bound to drag generation
four-corner world polygon
or direct screen-space membership evaluation
viewport-inside admission
drag direction normalization result
replace/add selection policy result
stale camera/route rejection
MarqueeSelectionResult
FirstMarqueeSelectionFrameAck
browser artifact and Pages geometry fixtures
```

## Required authority

`phantom-command-isometric-marquee-selection-geometry-authority-domain`

## Inventory summary

```txt
implemented kits: 20
planned marquee-selection surfaces: 19
```

The full kit-by-kit services and source evidence are in `.agent/trackers/2026-07-16T17-40-04-04-00/project-breakdown.md`.

## Validation boundary

Documentation changed. Runtime JavaScript, HTML, CSS, gameplay, simulation, input behavior, camera behavior, rendering behavior, persistence, dependencies, tests, workflows, build and deployment did not change. No corrected marquee membership, selected-frame convergence or production-readiness claim is made.
