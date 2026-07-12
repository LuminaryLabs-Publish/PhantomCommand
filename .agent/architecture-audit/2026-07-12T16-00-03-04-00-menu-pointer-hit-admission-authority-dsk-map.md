# PhantomCommand Menu Pointer-Hit Admission Authority DSK Map

**Timestamp:** `2026-07-12T16-00-03-04-00`

## Summary

The menu currently combines pointer projection, selection mutation and action dispatch inside event listeners. Hit-test failure is treated as “keep the old selection” rather than “reject the action.” This audit introduces a bounded authority that owns visible-geometry projection, hit evidence and typed action admission without moving menu meaning into a generic input framework.

## Plan ledger

**Goal:** compose the existing menu, CRT renderer and route owners under one pointer-hit authority that rejects misses before any selection, setting, panel or navigation mutation occurs.

- [x] Preserve `menu-route-kit`, `crt-renderer-kit`, `graveyard-art-kit` and current accessible controls.
- [x] Keep keyboard and accessibility activation as independent command sources.
- [x] Define immutable surface, layout, panel and transform generations.
- [x] Define typed containment, hit, command and action results.
- [x] Define stale-result and duplicate-sequence rejection.
- [x] Define observation, visible-frame and browser fixture boundaries.
- [ ] Implement through existing owners.

## Current ownership

```txt
src/menu/crt-renderer.js
  owns aspect containment, visible CRT curve and viewport-to-source projection

src/menu/graveyard-menu.js
  owns menu geometry, pointer listeners, selection, panels, action dispatch,
  transitions, keyboard activation and PhantomMenu

src/menu/graveyard-art.js
  owns visible menu and panel drawing

index.html
  owns hidden accessible buttons

scripts/check-menu.mjs
  owns current static proof
```

## Ownership defect

```txt
PointerEvent
  -> screenToSource
  -> optional selection update
  -> unconditional action dispatch
```

Projection, hit classification and action admission are not separate results. A failed hit leaves predecessor selection live, which the dispatcher then executes.

## Required parent domain

```txt
phantom-command-menu-pointer-hit-admission-authority-domain
```

This is a menu interaction domain. It is not a Core Input replacement and does not own campaign-world pointer semantics.

## Proposed composition

```txt
phantom-command-menu-pointer-hit-admission-authority-domain
  identity
    menu-input-source-kind-kit
    menu-pointer-sample-id-kit
    menu-pointer-sequence-kit
    menu-surface-generation-kit
    menu-control-layout-revision-kit
    menu-panel-generation-kit
    menu-control-id-kit

  pointer policy
    menu-pointer-button-policy-kit
    menu-pointer-primary-policy-kit
    menu-pointer-capture-kit

  geometry
    menu-viewport-transform-revision-kit
    menu-crt-inverse-projection-kit
    menu-containment-result-kit
    menu-hit-test-result-kit

  command/result
    menu-action-command-kit
    menu-action-admission-kit
    menu-action-result-kit
    stale-menu-pointer-rejection-kit
    duplicate-menu-action-rejection-kit

  presentation/observation
    menu-visible-frame-ack-kit
    menu-input-observation-kit
    menu-input-journal-kit

  proof
    menu-pointer-miss-fixture-kit
    menu-panel-miss-fixture-kit
    menu-crt-projection-fixture-kit
    menu-accessibility-parity-fixture-kit
    menu-pages-input-smoke-kit
```

## Service contracts

```txt
projectPointer(event, surfaceGeneration, transformRevision)
  -> PointerProjectionResult

classifyContainment(projection, sourceBounds)
  -> MenuContainmentResult

hitTest(projection, layoutRevision, panelGeneration)
  -> MenuHitTestResult

admitAction(hitResult, pointerPolicy, transitionRevision)
  -> MenuActionAdmissionResult

commitAction(command)
  -> MenuActionResult

ackVisibleActionFrame(actionResult, menuFrameRevision)
  -> MenuVisibleFrameAck
```

## Typed result minimums

```txt
MenuHitTestResult {
  status: Hit | Miss | OutsideSurface | StaleSurface | StalePanel | UnsupportedTransform
  pointerSampleId
  pointerSequenceId
  surfaceGeneration
  transformRevision
  layoutRevision
  panelGeneration
  controlId
  sourcePoint
  visiblePoint
  reason
}

MenuActionResult {
  status: Committed | RejectedMiss | RejectedPointerPolicy | RejectedStale | RejectedDuplicate | RejectedTransition
  commandId
  inputSource
  hitResultId
  actionId
  predecessorMenuRevision
  menuRevision
  transitionRevision
  firstFrameReceiptId
  reason
}
```

## Adoption order

```txt
1. Extract immutable main-menu and panel control descriptors.
2. Version the source/display transform used by rendering.
3. Add inverse CRT mapping or a shared display-space hit model.
4. Return typed containment and hit results without mutation.
5. Require Hit before constructing pointer-sourced actions.
6. Keep keyboard/accessibility command sources explicit.
7. Add sequence dedupe and transition fencing.
8. Correlate accepted result with the first visible frame.
9. Add local, built-output and Pages pointer fixtures.
```

## Non-goals

```txt
no campaign-world pointer implementation
no redesign of menu art
no change to keyboard navigation semantics
no replacement of the CRT renderer
no generic ECS/input framework
```

## Completion boundary

The authority is complete only when a pointer miss, letterbox click, non-primary pointer, stale panel result or unsupported transform produces a typed rejection and zero menu/settings/navigation mutation, while successful pointer, keyboard and accessibility actions each produce one terminal result and one visible-frame acknowledgement.