# Render Audit — Visible Rectangle and Selected Set Gap

**Timestamp:** `2026-07-16T17-40-04-04-00`  
**Status:** `isometric-marquee-selection-geometry-authority-audited`

## Plan ledger

**Goal:** ensure the units receiving visible selection rings are exactly the units whose projected anchors lie inside the visible marquee rectangle.

- [x] Trace source-space rectangle drawing.
- [x] Trace selected-state ring rendering.
- [x] Compare visible geometry with membership geometry.
- [x] Define required frame evidence.
- [ ] Execute rendered comparison fixtures.

## Current visible path

```txt
input.drag + input.pointer
  -> normalize min x/y and absolute width/height
  -> stroke source-space rectangle

state.selected
  -> drawEntity for each unit
  -> draw selection ellipse when ID is selected

CRT
  -> upload the completed source canvas
  -> present the frame
```

The visible rectangle and selection rings are rendered from different geometry decisions. The rectangle uses source-space bounds. The selected set uses a two-corner world box. No shared `MarqueeSelectionResult` binds them.

## Required frame invariant

```txt
for every eligible allied unit U:
  U.id is selected
  if and only if
  projectToSource(U.position, acceptedCameraRevision)
  lies within acceptedSourceRectangle
```

Boundary policy must declare whether edges are inclusive. The first frame using the committed selection revision must publish `FirstMarqueeSelectionFrameAck`.

## Fixture views

```txt
wide horizontal rectangle
tall vertical rectangle
rectangle crossing world z extrema
reverse drag directions
camera zoom minimum and maximum
camera near world bounds
units exactly on each rectangle edge
units just inside and just outside each edge
```

## Validation boundary

No rendered fixture, pixel comparison, artifact smoke or Pages smoke was executed.
