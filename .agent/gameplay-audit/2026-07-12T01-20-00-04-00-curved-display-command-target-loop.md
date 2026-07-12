# PhantomCommand Curved Display Command Target Loop

**Timestamp:** `2026-07-12T01-20-00-04-00`

## Summary

Campaign selection, drag selection, orders, middle-button pan and wheel zoom all derive semantic coordinates from the contain-only CPU mapper while the player sees a contain-plus-curve image. The discrepancy changes command targets and can admit commands from visually black regions.

## Plan ledger

**Goal:** require every gameplay command target to originate from an admitted projection result correlated with the visible frame.

- [x] Trace pointer move, down, up and wheel handlers.
- [x] Trace `screenToSource()` into `screenToWorld()`.
- [x] Trace selection, order, pan and zoom effects.
- [x] Identify outside-region admission.
- [x] Define gameplay parity fixtures.
- [ ] Implement command-target correlation.

## Current loop

```txt
pointer event
  -> contain-only source coordinate
  -> campaign ignores inside flag
  -> screenToWorld using current camera
  -> selectAt, order, drag bounds, pan delta or zoom anchor
  -> direct mutation of campaign/camera owners
  -> later CPU source render
  -> CRT curve moves the visible result again
```

## Gameplay effects

```txt
single selection:
  nearest ally or pad is resolved from a world point different from the visible cursor

drag selection:
  rectangle corners use mismatched source coordinates and can select an unexpected set

right-click order:
  move/attack destination differs from the displayed target point

middle drag:
  pan delta is measured in uncurved source space while visible motion is curved

wheel zoom:
  before/after world anchors preserve the wrong semantic source point

outside region:
  pillarbox, letterbox or post-curve black coordinates can still mutate selection, orders or camera
```

## Required gameplay command envelope

```txt
ProjectedCampaignCommand {
  commandId
  runtimeSessionId
  runEpoch
  frameId
  projectionRevision
  pointerSampleId
  mappingResultId
  commandType
  sourcePoint or sourceRegion
  cameraRevision
}
```

## Admission rules

```txt
mapping status must be INSIDE_VISIBLE_SOURCE
projection revision must match the cited visible frame
camera revision must match target derivation
source coordinates must be finite and bounded
stale resize/settings results perform zero mutation
drag start and end must share a compatible projection policy
```

## Required fixtures

```txt
visible marker click selects the marked ally at center and edge
visible pad click selects/builds the marked pad
right-click marker produces the marked world destination
curved black border produces zero command
letterbox/pillarbox produces zero command
wheel zoom preserves the visible marker
resize during drag rejects or explicitly rebases the command
```

## Boundary

No gameplay behavior changed. Command-target correctness remains unproved.