# PhantomCommand Known Gaps

**Timestamp:** `2026-07-15T18-39-30-04-00`

## Summary

The campaign hides the native pointer and has no equivalent precommit cursor, reticle, hover target, selection preview, build preview or order preview tied to accepted input and render revisions.

## Plan ledger

**Goal:** keep unresolved pointer visibility, candidate, lifecycle and proof gaps explicit.

- [x] Record source-backed pointer-feedback gaps.
- [x] Separate precommit feedback from existing post-commit effects.
- [x] Separate source evidence from unexecuted browser claims.
- [ ] Close each gap with implementation and executable proof.

## Gaps

```txt
campaign pointer feedback policy revision: absent
input surface generation: absent
pointer sample revision: absent
pointer presence result: absent
pointer visibility mode: implicit cursor:none
replacement cursor or reticle: absent
hover query result: absent
hovered ally preview: absent
hovered enemy preview: absent
hovered build-pad preview: absent
build availability preview: absent
order ground-anchor preview: absent
drag candidate membership preview: absent
outside-source feedback: absent
no-candidate feedback: absent
cursor contrast policy: absent
overlay feedback policy: absent
pointerleave settlement: absent
pointercancel settlement: absent
route-retirement settlement: absent
stale feedback rejection: absent
PointerFeedbackResult: absent
PointerFeedbackFrameResult: absent
FirstPointerFeedbackFrameAck: absent
candidate-to-command continuity proof: absent
browser pointer-feedback fixture: absent
source/build/Pages pointer-feedback parity: absent
```

## Source-backed mismatch

```txt
present:
  cursor:none on the campaign canvas
  pointer source x y and inside state
  ally and pad point hit tests
  enemy and ground order resolution
  drag rectangle while dragging
  selected-unit rings after commit
  selected-pad state after commit
  transient order effect after commit

missing:
  ordinary pointer location projection
  precommit candidate identity
  explicit outside or miss result
  revision-bound feedback frame
  feedback-to-command continuity
  browser proof
```

The render path uses `input.pointer` for drag geometry and event-side projection, but no ordinary pointer mark or hover descriptor is drawn. Selection and order target resolution occur during the committing event.

## Retained gaps

Earlier menu-audio, public-capability, device-control, render-order, pause, terminal-outcome, startup, settings, save, route-lifecycle, scheduler, WebGL, accessibility, spatial-input, keyboard-input and combat-modifier gaps remain active until implemented and proven.