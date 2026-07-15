# Pointer Feedback Browser Fixture Gate

**Timestamp:** `2026-07-15T18-39-30-04-00`

## Summary

Static source checks cannot prove that a hidden cursor has an equivalent rendered affordance or that the visible candidate matches the command that commits. Browser fixtures must cover source, built output and the deployed Pages origin.

## Plan ledger

**Goal:** define the minimum executable evidence required before claiming pointer-feedback correctness.

- [x] Identify unsupported claims in the current checks.
- [x] Define source-browser fixtures.
- [x] Define build and deployed-origin parity fixtures.
- [ ] Implement the fixture harness.
- [ ] Execute and retain artifacts.

## Required fixtures

```txt
pointer-presence
  enter canvas
  move across source bounds
  prove one visible reticle or native cursor under the selected policy

containment
  move through letterbox and source regions
  prove outside samples cannot show an actionable target

ally-hover
  hover a known allied unit
  prove the preview identity matches the subsequent selection result

pad-hover
  hover empty occupied affordable and unaffordable pads
  prove the visual class and build result agree

enemy-order
  hover a known enemy and right-click
  prove preview identity matches the order result

ground-order
  hover empty ground and right-click
  prove the displayed anchor matches the accepted destination

drag-selection
  drag across known units
  prove preview membership matches committed selection

camera-gesture
  zoom and middle-pan
  prove feedback uses the accepted camera and pointer revisions

overlay-lifecycle
  pause win lose blur pointerleave pointercancel and route exit
  prove feedback settles according to policy

contrast
  capture reticle and candidate marks over representative world and UI backgrounds

artifact-parity
  repeat critical fixtures against dist output

deployed-parity
  repeat critical fixtures against the GitHub Pages origin
```

## Artifact requirements

```txt
browser and viewport identity
DPR and zoom
source commit
build artifact identity
route and surface generation
pointer sample and feedback revisions
command result revisions
screenshots before feedback after feedback and after commit
console and uncaught-error log
```

## Existing validation boundary

`npm run check` is source-marker validation. It does not create pointer events, inspect frames or test the deployed origin. It remains useful but is not pointer-feedback proof.