# Current Audit

**Timestamp:** `2026-07-15T23-38-46-04-00`  
**Status:** `pointer-gesture-capture-cancel-authority-audited`

## Summary

Campaign pointer gestures are canvas-local rather than lifecycle-owned. Primary-button drag and middle-button pan begin in `pointerdown`, but the canvas does not call `setPointerCapture()`. Completion is recognized only by canvas `pointerup`; no `pointercancel`, `lostpointercapture`, `pointerleave`, visibility or page-retirement result settles the active gesture.

## Source-backed finding

- `pointerdown` creates `input.drag` or sets `input.middle=true`.
- `pointerup` clears those values only when the release reaches the canvas.
- `pointermove` continues panning while `input.middle` is true.
- rendering continues drawing the drag rectangle while `input.drag` exists.
- blur clears both states, but blur is not guaranteed when a pointer leaves and releases outside the canvas.

No stuck gesture was reproduced in a browser; this is a source-permitted lifecycle gap.

## Required authority

`phantom-command-pointer-gesture-capture-cancel-authority-domain`
