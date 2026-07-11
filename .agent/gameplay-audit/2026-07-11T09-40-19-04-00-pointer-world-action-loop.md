# Pointer/World Action Loop

**Timestamp:** `2026-07-11T09-40-19-04-00`

## Summary

Campaign pointer actions derive world targets from a source coordinate that does not match the curved CRT display. Selection, building, orders and wheel zoom can therefore act on a different location than the player perceives.

## Plan ledger

**Goal:** define one observable chain from visible pointer position to world action result.

- [x] Trace click selection and build activation.
- [x] Trace right-click order targeting.
- [x] Trace wheel zoom anchoring.
- [x] Trace drag-selection geometry.
- [ ] Route all paths through typed projection and command results.

## Current loop

```txt
client pointer
  -> screenToSource
  -> screenToWorld
  -> nearest ally/pad/enemy
  -> direct mutation
```

## Affected actions

- Click selection can choose a nearby ally or pad offset from the visible pointer.
- A second pad click can build on the wrong visually adjacent pad.
- Right-click orders can resolve to a different ground or enemy target.
- Wheel zoom can preserve the wrong world anchor.
- Drag selection uses a world AABB that does not match the drawn source-screen rectangle.

## Required action envelope

```txt
CampaignCommand {
  commandId,
  source,
  sessionId,
  runId,
  transformRevision,
  sourcePoint,
  worldPoint,
  observedPhase,
  targetTick
}
```

Projection failure or staleness must reject before gameplay preflight and before any state mutation.

## Drag rule

For each selectable ally:

```txt
worldToSource(ally position, committed camera)
  -> point inside visual drag rectangle?
  -> include or exclude
```

This preserves the player's source-screen selection semantics and avoids approximating a screen parallelogram as a world AABB.