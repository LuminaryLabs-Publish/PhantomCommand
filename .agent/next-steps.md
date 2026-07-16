# Next Steps

## Plan ledger

**Goal:** settle selection-drag and camera-pan gestures exactly once and bind their accepted result to the next visible campaign frame.

- [ ] Allocate a `PointerGestureGeneration` on accepted primary or middle `pointerdown`.
- [ ] Call `setPointerCapture(pointerId)` and publish an admission result.
- [ ] Bind move and release evidence to pointer id, button and gesture generation.
- [ ] Settle through `pointerup`, `pointercancel`, `lostpointercapture`, blur, visibility loss and route retirement.
- [ ] Release pointer capture exactly once when still owned.
- [ ] Clear drag/pan state and reject stale events from retired generations.
- [ ] Publish typed completed, cancelled, interrupted, stale and unsupported results.
- [ ] Acknowledge the first matching drag-selection or camera-pan frame.
- [ ] Add browser fixtures for release outside, cancellation, multi-pointer input, blur and route exit.
- [ ] Verify source, built output and Pages behavior.
