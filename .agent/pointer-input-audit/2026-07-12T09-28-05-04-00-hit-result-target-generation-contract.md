# Hit Result and Target Generation Contract

**Timestamp:** `2026-07-12T09-28-05-04-00`

## Summary

A hit result must identify the exact surface, panel and target generation used for the current pointer event. Integer row indexes alone cannot prevent stale or miss-derived activation.

## Plan ledger

**Goal:** define the typed pointer contracts required for current-target admission and stale-result rejection.

- [x] Define event envelope.
- [x] Define projection result.
- [x] Define hit result.
- [x] Define activation result.
- [x] Define generation and revision fences.
- [x] Define idempotency and no-op semantics.
- [ ] Implement and test later.

## Event envelope

```txt
PointerEventEnvelope
  pointerEventId
  inputSessionId
  eventType
  clientX
  clientY
  buttons
  isPrimary
  trusted
  observedAtMs
```

## Projection result

```txt
SourceProjectionResult
  pointerEventId
  surfaceGeneration
  sourceX
  sourceY
  insideSource
  visibleSourceBounds
  fitMode
  status: Inside | Outside | Invalid
```

## Hit result

```txt
MenuHitTestResult
  pointerEventId
  surfaceGeneration
  panelGeneration
  selectionRevision
  status: Hit | Miss | Disabled | Stale
  targetKind
  targetId
  targetIndex
```

## Activation result

```txt
MenuActionResult
  commandId
  pointerEventId
  status: Applied | Miss | RejectedDisabled | RejectedStale | RejectedTransitioning
  targetId
  routeTarget
  settingsRevision
  committedAtMs
```

## Fences

```txt
surfaceGeneration changes on resize or render-surface recreation
panelGeneration changes on open, close or panel replacement
selectionRevision changes on selection mutation
inputSessionId changes on page/runtime replacement
```

## Rules

```txt
one pointer event produces one terminal hit result
one Hit may produce at most one action result
Miss and Outside never fall back to selected target
stale generations perform zero mutation
duplicate command IDs return the prior result
keyboard commands do not reuse pointer hit results
```