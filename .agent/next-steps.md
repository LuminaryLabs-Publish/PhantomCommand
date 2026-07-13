# PhantomCommand Next Steps

**Timestamp:** `2026-07-12T22-00-46-04-00`

## Summary

Implement campaign keyboard admission before treating global shortcuts as reliable commands. Keep continuous movement state separate from one-shot actions, bind both to current route/focus/lifecycle generations, and route accepted one-shot commands through Campaign Action Result Authority.

## Plan ledger

**Goal:** create one deterministic keyboard transaction from DOM evidence through held-state or one-shot admission, consumer results and first-visible-frame proof.

### Route, surface and focus

- [ ] Add campaign keyboard surface identity.
- [ ] Add keyboard-session and focus generations.
- [ ] Require the active campaign route and current input-surface capability.
- [ ] Define canvas/document focus policy.
- [ ] Reject text inputs, textareas, selects, contenteditable regions and non-delegating controls.
- [ ] Remove listeners during route retirement.

### Event and repeat admission

- [ ] Wrap events in a typed envelope with source ID and monotonic sequence.
- [ ] Define physical-code versus logical-key mapping.
- [ ] Classify held-state and one-shot keys before mutation.
- [ ] Reject `event.repeat` for Space, 1, 2, 3, P, F, R and Escape.
- [ ] Normalize repeated held movement to an idempotent held-state result.
- [ ] Add command IDs and duplicate rejection.
- [ ] Reject stale keyboard and focus generations.

### Held movement lifecycle

- [ ] Store held state under the current keyboard generation.
- [ ] Publish typed key-down, key-up and clear results.
- [ ] Retire the current generation on blur and visibility loss.
- [ ] Add pagehide teardown and pageshow successor-generation behavior.
- [ ] Reject predecessor-generation keyup events.
- [ ] Publish camera-input consumption receipts.

### One-shot commands

- [ ] Convert Space, tower selection, pause, focus, reload and menu exit into typed commands.
- [ ] Route gameplay/phase commands through Campaign Action Result Authority.
- [ ] Route camera focus through a typed camera command result.
- [ ] Route reload and menu exit through typed navigation results.
- [ ] Require exactly one terminal result per command ID.
- [ ] Prove zero mutation for rejected evidence.

### Diagnostics and presentation

- [ ] Add bounded keyboard observations and a journal.
- [ ] Add accepted/repeat/stale/editable-target counters.
- [ ] Remove raw event and mutable Set exposure from diagnostics.
- [ ] Bind render snapshots to keyboard and consumer results.
- [ ] Add first-visible-keyboard-result frame acknowledgement.

### Proof

- [ ] Add pause auto-repeat fixture.
- [ ] Add repeat rejection for wave/tower/focus/navigation commands.
- [ ] Add editable-target and inactive-route zero-mutation fixtures.
- [ ] Add blur, visibility, pagehide and pageshow generation fixtures.
- [ ] Add stale keyup and duplicate command fixtures.
- [ ] Add held movement release and listener-retirement fixtures.
- [ ] Add source, built-output and GitHub Pages keyboard parity fixtures.
- [ ] Run `npm run check` and `npm run build` after fixture wiring.

## Existing owners to update

```txt
src/campaign/campaign-scene.js
pixel-campaign-runtime-kit
fixed-step-campaign-simulation-kit
pixel-campaign-render-kit
legacy-gamehost-diagnostics-kit
campaign-static-check-kit
scripts/check-campaign.mjs
package.json
game.html
```

## Required command shape

```txt
CampaignKeyboardCommand {
  commandId
  sequence
  routeId
  surfaceId
  keyboardSessionGeneration
  focusGeneration
  sourceEventId
  physicalCode
  logicalKey
  commandKind
  repeat
  expectedCampaignRevision?
  expectedCameraRevision?
  issuedAt
}
```

## Required result shape

```txt
CampaignKeyboardResult {
  commandId
  status
  reason?
  commandKind
  predecessorKeyboardGeneration
  successorHeldStateRevision?
  campaignActionResultId?
  cameraConsumptionReceiptId?
  navigationResultId?
  firstVisibleFrameAckId?
}
```

## Minimal correction sequence

```txt
1. Fence global keyboard ingress behind one route-owned dispatcher.
2. Add surface, focus and keyboard-session generations.
3. Exclude editable targets.
4. Separate held transitions from one-shot commands.
5. Add repeat, duplicate and stale rejection.
6. Add lifecycle generation retirement and typed clear.
7. Route one-shot commands through existing action/camera/navigation owners.
8. Publish one terminal keyboard result and consumer receipts.
9. Prove zero mutation for every rejection.
10. Acknowledge the first visible successor frame.
```

## Dependency order

```txt
Runtime Session Resource Lifecycle Authority
  -> Campaign Keyboard Command Admission Authority
  -> Campaign Action Result Authority
  -> Campaign Phase / Camera / Navigation owners
  -> Public Host Committed Read Model
  -> visible frame proof
```

Do not patch only `event.repeat`. The correction requires route/focus ownership, editable-target exclusion, lifecycle generations, typed commands/results, consumer receipts and visible-frame proof.