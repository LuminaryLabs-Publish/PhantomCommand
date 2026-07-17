# Visible Region / World Command Gameplay Loop

**Timestamp:** `2026-07-17T06-38-14-04-00`

## Interaction loop

```txt
pointer evidence
  -> CRT browser/source mapping
  -> source x/y/inside snapshot
  -> no topmost visible-region decision
  -> click selects unit or pad
  -> drag replaces selected unit set
  -> RMB issues move or attack order
  -> fixed-step simulation consumes mutated state
  -> world and UI render the result
```

## Gameplay ownership gap

World-command functions accept only a world point and modifier state. They do not receive route, frame, overlay, minimap, HUD or source-inside evidence. As a result, the gameplay layer cannot distinguish an intentional world command from a pointer gesture that visibly targeted a presentation region.

## Required gameplay contract

```txt
WorldCommandAdmissionResult
  commandKind: select | marquee | order
  gestureId
  sourcePoint
  sourceRegionId
  regionManifestRevision
  routeRevision
  frameRevision
  accepted
  rejectionReason
  settledGameplayRevision
```

## Preserved behavior

- click selection radius and additive selection
- marquee replacement behavior
- right-click move/attack orders
- fixed-step simulation
- unit/tower combat and rewards
- pause, win and loss state
- source resolution and render appearance

## Boundary

No gameplay code changed. Region-aware command admission and executable interaction fixtures remain proposed.