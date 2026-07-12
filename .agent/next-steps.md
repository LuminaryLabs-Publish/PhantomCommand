# PhantomCommand Next Steps

**Timestamp:** `2026-07-12T11-40-50-04-00`

## Goal

Implement one campaign world-pointer admission authority so selection, orders, pan and wheel zoom require a current visible-surface projection bound to the active CRT display and camera revisions.

## Plan ledger

- [ ] Introduce input-session, display-generation, camera-revision, pointer-event and gesture identities.
- [ ] Normalize DOM pointer and wheel events into immutable envelopes.
- [ ] Preserve contain-letterbox classification as an explicit typed result.
- [ ] Add inverse CRT curve projection matching the shader transform.
- [ ] Return a typed source-coordinate result rather than mutable raw coordinates.
- [ ] Bind source-to-world projection to a specific camera revision.
- [ ] Make `OutsideSurface` a zero-mutation terminal result.
- [ ] Convert point selection, rectangle selection, orders, pan and zoom into typed commands.
- [ ] Add drag and pan leases with explicit begin, update, end and cancellation.
- [ ] Reject stale display, camera and gesture generations.
- [ ] Publish bounded observations, a journal and frame receipts.
- [ ] Add deterministic projection fixtures and browser/Pages campaign-pointer smokes.
- [ ] Run `npm run check` and `npm run build` after fixture wiring.

## Existing owners to update

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

## Projection contract

```txt
CampaignPointerProjectionResult
  status: Projected | OutsideSurface | InvalidCurveInverse | StaleDisplay | StaleCamera
  pointerEventId
  displayGeneration
  sourceFrameRevision
  crtSettingsRevision
  cameraRevision
  clientX/clientY
  sourceX/sourceY
  worldX/worldZ
  insideSurface
  errorTolerancePx
  reason
```

## Command contract

```txt
CampaignPointerCommand
  commandId
  commandKind
  inputSessionId
  pointerEventId
  gestureId
  displayGeneration
  cameraRevision
  campaignStateRevision
  projection
  modifiers
  requestedAtMs
```

## Result contract

```txt
CampaignPointerCommandResult
  status: Applied | OutsideSurface | RejectedStale | RejectedInvalidProjection | RejectedPhase | Cancelled
  commandId
  commandKind
  pointerEventId
  gestureId
  displayGeneration
  cameraRevisionBefore/After
  stateRevisionBefore/After
  frameReceiptId
  reason
```

## Fixture gate

```txt
letterbox point selection is inert
letterbox rectangle drag is inert or explicitly cancelled
letterbox right-click order is inert
letterbox middle-pan is inert
letterbox wheel zoom is inert
CRT-disabled projection round-trips
CRT-enabled curve/inverse-curve round-trips
world projection rejects stale camera revision
gesture cancels on blur, route exit and display-generation change
one applied command correlates with one state/camera revision and frame receipt
```

## Dependency order

```txt
Campaign World-Pointer Admission Authority
  -> CRT Display/Input Projection Authority
  -> Campaign Phase Admission Authority
  -> Runtime Session Lifecycle Authority
  -> Public Host and Committed Read Model Authorities
```

Do not call `screenToWorld()` for an event until visible-surface and display-transform admission succeeds.