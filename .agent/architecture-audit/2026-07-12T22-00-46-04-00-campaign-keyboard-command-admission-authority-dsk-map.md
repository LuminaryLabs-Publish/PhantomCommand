# Campaign Keyboard Command Admission Authority DSK Map

**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Timestamp:** `2026-07-12T22-00-46-04-00`

## Summary

The campaign keyboard path currently combines browser event ownership, held-state tracking, one-shot actions, campaign mutation, camera mutation and navigation in one global handler. This map separates admission from action semantics and gives lifecycle, duplicate, stale and visible-frame results explicit owners.

## Plan ledger

**Goal:** define a bounded DSK composition that admits current keyboard evidence once, routes held and one-shot commands to existing owners, and proves the visible successor frame.

- [x] Keep browser event adaptation separate from campaign action semantics.
- [x] Keep continuous camera movement separate from one-shot phase/navigation commands.
- [x] Add route, surface, focus and lifecycle generations.
- [x] Add repeat, duplicate and stale rejection.
- [x] Add typed results, receipts, observations and frame proof.
- [ ] Implement the proposed kits later.

## Parent domain

```txt
phantom-command-campaign-keyboard-command-admission-authority-domain
```

## Ownership boundary

```txt
owns:
  campaign keyboard surface and session identity
  focus and lifecycle generations
  key event envelopes and monotonic sequences
  editable-target and repeat admission
  held-state transitions and generation-fenced clear
  one-shot command identity
  stale and duplicate rejection
  terminal keyboard results
  bounded observations and first visible keyboard-result frame ack

does not own:
  campaign action semantics
  fixed-step combat
  camera integration math
  menu pointer input
  CRT projection
  browser persistence
```

## Proposed composition

### Identity and admission

```txt
campaign-keyboard-surface-id-kit
campaign-keyboard-session-generation-kit
campaign-keyboard-focus-generation-kit
campaign-key-event-envelope-kit
campaign-key-sequence-kit
campaign-editable-target-exclusion-kit
campaign-key-repeat-policy-kit
campaign-key-command-map-kit
```

### Held and one-shot state

```txt
campaign-held-input-state-kit
campaign-one-shot-command-kit
campaign-key-command-id-kit
campaign-key-lifecycle-fence-kit
campaign-key-clear-result-kit
```

### Rejection and result

```txt
duplicate-key-command-rejection-kit
stale-key-generation-rejection-kit
campaign-key-command-result-kit
campaign-camera-input-consumption-receipt-kit
campaign-phase-command-consumption-receipt-kit
campaign-navigation-command-result-kit
```

### Observation and proof

```txt
campaign-keyboard-observation-kit
campaign-keyboard-journal-kit
campaign-keyboard-visible-frame-ack-kit
key-repeat-pause-fixture-kit
editable-target-key-fixture-kit
blur-visibility-generation-fixture-kit
held-movement-release-fixture-kit
duplicate-one-shot-fixture-kit
browser-pages-keyboard-smoke-kit
```

## Required command model

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

## Required result model

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

## Admission invariants

```txt
inactive route or retired surface -> zero mutation
editable target -> zero campaign shortcut mutation
one-shot command + repeat=true -> duplicate/repeat rejection
held key transition bound to one keyboard generation
blur/visibility/page teardown retires current generation exactly once
predecessor-generation keyup cannot alter current held state
one command ID commits at most one terminal result
accepted one-shot result must cite Campaign Action Result Authority
visible frame proof cites keyboard result and consumer receipt
```

## Coordination order

```txt
Runtime Session Resource Lifecycle Authority
  -> Campaign Keyboard Command Admission Authority
  -> Campaign Action Result Authority
  -> Campaign Phase / Camera / Navigation owners
  -> Pixel Campaign Render owner
  -> first visible keyboard-result frame acknowledgement
```

## Completion boundary

A changed pause flag, tower type, camera position or route is not admission proof. Completion requires current focus and lifecycle evidence, repeat/duplicate/stale classification, one terminal result, consumer receipts and a visible successor frame.