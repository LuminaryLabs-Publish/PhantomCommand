# Cursor, Hover and Reticle Contract

**Timestamp:** `2026-07-15T18-39-30-04-00`

## Summary

A hidden native cursor is valid only when the active route supplies an equivalent rendered pointer affordance with explicit visibility, contrast, lifecycle and command-continuity rules.

## Plan ledger

**Goal:** define a minimal pointer-feedback contract that works with mouse, pen, touch-pointer and future gamepad cursor producers.

- [x] Define pointer visibility modes.
- [x] Define hover and reticle descriptors.
- [x] Define overlay and lifecycle behavior.
- [x] Define revision and proof requirements.
- [ ] Implement the contract.
- [ ] Validate across supported device profiles.

## Visibility modes

```txt
native-cursor
  browser cursor remains visible
  rendered reticle is optional and must not conflict

rendered-reticle
  native cursor may be hidden
  every admitted in-bounds pointer sample produces a visible reticle

hybrid
  native cursor remains visible
  semantic candidate highlighting augments it

touch-direct
  no persistent hover required before contact
  contact and drag feedback must appear immediately after admission

gamepad-virtual-pointer
  rendered reticle and focus ownership are mandatory
```

## Reticle descriptor

```txt
PointerReticleDescriptor
  mode
  sourcePoint
  worldPoint
  inside
  commandClass
  candidateKind
  candidateId
  acceptedColorRole
  outlineRole
  scale
  occlusionPolicy
  overlayPolicy
  sampleRevision
  projectionRevision
```

## Candidate policy

```txt
ally -> selection ring preview
empty build pad -> build-pad preview
occupied pad -> unavailable preview
enemy -> attack/order preview
ground -> move anchor
outside -> no gameplay target and explicit boundary policy
miss -> neutral reticle with typed no-candidate status
drag -> candidate membership preview plus drag polygon
```

## Lifecycle policy

```txt
pointerleave -> settle presence and hide or park feedback
pointercancel -> retire the active pointer sequence
blur -> clear feedback and gesture ownership
pause -> apply explicit strict or tactical feedback policy
terminal state -> suppress gameplay candidates
route exit -> retire the surface generation
context recovery -> recreate feedback resources against the successor render generation
```

## Contrast policy

Reticle and candidate marks require a two-layer or otherwise contrast-safe form that remains legible over authored dark ground, bright effects, cyan allies, red enemies, gold UI and CRT grain. Exact colors are a product decision; the authority owns semantic color roles and validation evidence.

## Proof

```txt
FirstPointerFeedbackFrameAck
  cites PointerFeedbackRevision
  cites RenderFrameRevision
  cites InputSurfaceGeneration
  confirms the expected feedback descriptor was present
```

No visual contrast claim is made until browser screenshots and pixel analysis exist.