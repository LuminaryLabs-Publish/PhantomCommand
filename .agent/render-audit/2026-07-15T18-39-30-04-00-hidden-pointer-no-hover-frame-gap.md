# Hidden Pointer and Missing Hover Frame Gap

**Timestamp:** `2026-07-15T18-39-30-04-00`

## Summary

The public campaign canvas suppresses the system cursor, but the Canvas2D and CRT frame path does not render a replacement pointer or normal hover affordance. Only an active drag draws a rectangular pointer-related mark.

## Plan ledger

**Goal:** make the visible frame identify the admitted pointer location and the candidate action target without changing campaign truth.

- [x] Trace CSS cursor policy.
- [x] Trace pointer state into the renderer.
- [x] Enumerate current pointer-related marks.
- [x] Separate post-commit state from precommit feedback.
- [ ] Add a revision-bound pointer-feedback frame plan.
- [ ] Execute screenshot and pixel-diff fixtures.

## Current render path

```txt
Canvas CSS
  -> cursor:none

PointerEvent
  -> crt.screenToSource
  -> input.pointer = { x y inside }

render
  -> drawWorld
  -> drawUI
  -> draw minimap
  -> draw pause or terminal overlay
  -> draw drag rectangle only when input.drag exists
  -> upload source canvas to WebGL
  -> draw CRT frame
```

## Visible feedback matrix

```txt
ordinary pointer position: absent
inside/outside source indication: absent
hovered allied unit: absent
hovered enemy: absent
hovered build pad: absent
order ground anchor: absent
wheel zoom anchor: absent
middle-pan anchor: absent
selection candidates during drag: absent
drag rectangle while dragging: present
selected-unit rings after commit: present
selected-pad fill after commit: present
order effect after commit: present
```

## Frame-coherence gap

The renderer has no `PointerFeedbackRevision`, no immutable feedback descriptor, no link from a hover query to the frame that displayed it, and no acknowledgement proving that the next committed command used the same pointer/camera/entity revisions as the visible candidate.

## Required frame contract

```txt
accepted PointerFeedbackResult
  -> prepare reticle and semantic preview descriptors
  -> cite source world camera CRT entity and pad revisions
  -> draw feedback above world content and below blocking overlays
  -> preserve contrast against all authored terrain and UI regions
  -> suppress or replace feedback under pause terminal or route retirement policy
  -> publish PointerFeedbackFrameResult
  -> publish FirstPointerFeedbackFrameAck
```

## Validation boundary

No frame was captured. No cursor visibility, hover correctness, contrast, latency or visual defect was reproduced in a browser.