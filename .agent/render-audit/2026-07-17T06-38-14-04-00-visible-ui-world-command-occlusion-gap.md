# Visible UI / World Command Occlusion Gap

**Timestamp:** `2026-07-17T06-38-14-04-00`

## Summary

The Canvas2D source frame paints world content first and then paints HUD panels, tower controls, the minimap and terminal overlays on top. Pointer command admission does not consume the same visible z-order, so presentation and interaction can disagree about the topmost target.

## Visible regions

```txt
status HUD: 8,8 to 268,64
tower controls: 8,312 to 338,352
minimap: 536,8 to 632,78
terminal overlay: full 640x360 when paused/won/lost
world: full source surface beneath those regions
```

## Gap

```txt
render topmost target: HUD/control/minimap/modal
interaction target: world point from screenToWorld
source inside flag: recorded, not enforced
visible region revision: absent
frame-bound interaction acknowledgement: absent
```

A point visibly covered by UI can still enter selection, marquee or order handling. Letterboxed/pillarboxed evidence mapped with `inside:false` also has no explicit rejection contract in campaign handlers.

## Required proof

- Every source point resolves to one topmost visible region.
- World commands require a world-region decision from the matching frame generation.
- Modal overlays suspend world command admission.
- Passive minimap and HUD regions reject world mutation.
- The first resulting frame publishes `FirstRegionBoundCommandFrameAck`.

## Boundary

No visual or interaction defect was reproduced in a browser. This audit records a source-backed projection/admission mismatch; it does not claim rendering, CRT mapping or simulation is otherwise incorrect.