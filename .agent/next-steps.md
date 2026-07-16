# Next Steps

**Generated:** `2026-07-16T17-40-04-04-00`  
**Status:** `isometric-marquee-selection-geometry-authority-audited`

## Plan ledger

**Goal:** replace the two-corner world-box shortcut with one camera-bound marquee transaction whose accepted unit membership exactly matches the visible source-space rectangle.

- [ ] Allocate one drag generation on accepted primary-pointer down.
- [ ] Bind route, canvas, source viewport, camera and selection revisions.
- [ ] Reject starts and completions outside the playable source viewport.
- [ ] Normalize drag direction into one source-space rectangle.
- [ ] Freeze the camera snapshot used for the gesture, or explicitly reproject the start point when the camera changes.
- [ ] Project each eligible allied unit into source space and test point membership against the visible rectangle.
- [ ] Alternatively, inverse-transform all four corners and use a convex world-polygon membership test.
- [ ] Preserve click selection through a declared distance threshold.
- [ ] Define replace, additive and toggle policy for Shift-modified gestures.
- [ ] Reject pointer-up evidence from retired drag, route or camera generations.
- [ ] Publish `MarqueeSelectionResult` with candidate, accepted and rejected unit IDs.
- [ ] Commit selected state exactly once.
- [ ] Publish `FirstMarqueeSelectionFrameAck` for the first frame drawing the accepted selected set.
- [ ] Add left-to-right and right-to-left fixtures.
- [ ] Add top-to-bottom and bottom-to-top fixtures.
- [ ] Add rectangles crossing both isometric axes.
- [ ] Add units near all four screen edges and exact-boundary cases.
- [ ] Add camera pan/zoom-during-drag policy fixtures.
- [ ] Run `npm run check`, `npm run build`, built-output smoke and Pages-origin fixtures.

## Required first vertical slice

```txt
drag rectangle crossing the isometric z axis
  -> MarqueeSelectionCommand
  -> accepted camera and viewport revisions
  -> source-space candidate projection
  -> exact rectangle membership
  -> MarqueeSelectionResult
  -> selected-state commit
  -> rendered matching selection rings
  -> FirstMarqueeSelectionFrameAck
```

## Keep separate

Wheel zoom, pointer capture, camera pan, fixed-step simulation, orders, building, pause, route retirement, WebGL recovery and deployment remain separate authorities composed through route, camera, selection and frame revisions.
