# Architecture Audit: Campaign World Pointer Admission DSK Map

**Timestamp:** `2026-07-12T11-40-50-04-00`

## Summary

Campaign input currently crosses display projection, camera mapping and gameplay mutation without one owner. The renderer emits `inside`, but campaign handlers ignore it. The shader curves visible coordinates, while CPU projection does not invert that curve.

## Plan ledger

**Goal:** define a composed authority that converts one browser pointer event into one current, display-correct, generation-bound campaign command result.

- [x] Identify existing projection, camera and command owners.
- [x] Separate event capture, display inversion, world projection and mutation admission.
- [x] Define stale-generation and outside-surface rejection.
- [x] Define typed results, observations and fixtures.
- [ ] Implement and prove the domain.

## Parent domain

```txt
phantom-command-campaign-world-pointer-admission-authority-domain
```

## DSK composition

```txt
input identity
  campaign-input-session-kit
  campaign-pointer-event-envelope-kit
  campaign-pointer-gesture-kit
  campaign-drag-lease-kit

display identity and projection
  campaign-display-generation-kit
  campaign-pointer-containment-kit
  campaign-crt-inverse-projection-kit
  campaign-source-coordinate-result-kit

camera and world projection
  campaign-camera-revision-kit
  campaign-world-ray-result-kit

command admission
  campaign-pointer-command-kit
  campaign-pointer-command-admission-kit
  campaign-stale-pointer-rejection-kit

results and evidence
  campaign-pointer-command-result-kit
  campaign-camera-command-result-kit
  campaign-pointer-observation-kit
  campaign-pointer-journal-kit

proof
  campaign-letterbox-noop-fixture-kit
  campaign-crt-projection-parity-fixture-kit
  campaign-drag-boundary-fixture-kit
  campaign-pointer-browser-smoke-kit
```

## Command categories

```txt
SelectPoint
SelectRectangle
IssueOrder
BeginPan
UpdatePan
EndPan
ZoomAtPoint
CancelGesture
```

## Admission inputs

```txt
commandId
inputSessionId
pointerEventId
displayGeneration
cameraRevision
gestureId
button
modifiers
client coordinates
source projection
world projection
requestedAtMs
```

## Terminal result

```txt
CampaignPointerCommandResult
  status: Applied | OutsideSurface | RejectedStale | RejectedInvalidProjection | RejectedPhase | Cancelled
  commandId
  pointerEventId
  gestureId
  commandKind
  displayGeneration
  cameraRevisionBefore
  cameraRevisionAfter
  stateRevisionBefore
  stateRevisionAfter
  frameReceiptId
  reason
```

## Invariants

```txt
OutsideSurface produces zero campaign and camera mutation.
Visible CRT pixels and CPU input use inverse-compatible transforms.
A drag begins, updates and ends under one gesture lease.
A world projection cites the camera revision used to derive it.
Stale display, camera or gesture generations are rejected.
One browser event can commit at most one terminal command result.
A result is observable with the first frame that displays its mutation.
```

## Existing owners to update later

```txt
src/menu/crt-renderer.js
src/campaign/campaign-scene.js
crt-renderer-kit
pixel-campaign-runtime-kit
pixel-campaign-render-kit
window.GameHost diagnostics
scripts/check-campaign.mjs
package.json
```

This audit changes documentation only.