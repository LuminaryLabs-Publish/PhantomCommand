# PhantomCommand Current Audit

**Timestamp:** `2026-07-15T18-39-30-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Status:** `campaign-pointer-feedback-projection-authority-audited`

## Summary

The campaign suppresses the browser cursor and tracks projected pointer coordinates, but the ordinary render path supplies no replacement cursor, hover reticle, candidate unit, candidate pad, enemy target or move anchor. Dragging draws a rectangle, while selection rings and order effects appear only after state mutates.

## Plan ledger

**Goal:** turn pointer feedback into an immutable projection that precedes and matches the command result.

- [x] Trace CSS cursor policy and pointer storage.
- [x] Trace point selection, pad selection, orders, drag selection, pan and zoom.
- [x] Trace Canvas2D and CRT frame submission.
- [x] Separate precommit feedback from post-commit state.
- [x] Define policy, candidate, frame-plan, result and acknowledgement surfaces.
- [ ] Implement the authority.
- [ ] Add pointer, hover, candidate continuity, contrast and lifecycle fixtures.
- [ ] Prove source, build and Pages parity.

## Current source path

```txt
game.html
  -> canvas cursor:none

pointermove
  -> crt.screenToSource
  -> store source x y and inside

render
  -> world
  -> HUD and minimap
  -> pause or terminal overlay
  -> drag rectangle only while input.drag exists
  -> CRT presentation

left click
  -> resolve ally or pad candidate
  -> mutate selection or selectedPad

right click
  -> resolve enemy or ground point
  -> mutate unit order
  -> emit post-commit effect
```

## Required authority

```txt
phantom-command-campaign-pointer-feedback-projection-authority-domain
```

## Validation boundary

Documentation only. No HTML, CSS, JavaScript, input, gameplay, Canvas2D, WebGL, tests, build or deployment behavior changed.