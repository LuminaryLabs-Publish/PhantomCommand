# Selection Geometry Audit — Screen Rectangle and Isometric Membership Contract

**Timestamp:** `2026-07-16T17-40-04-04-00`  
**Status:** `isometric-marquee-selection-geometry-authority-audited`

## Plan ledger

**Goal:** make source-space rectangle membership exact under the current isometric camera.

- [x] Record the forward and inverse transforms.
- [x] Identify the omitted corner extrema.
- [x] Define valid membership strategies.
- [ ] Implement and verify one strategy.

## Current transform

```txt
screenX = centerX + (worldX - worldZ) * 0.72 * zoom
screenY = centerY + 30 + (worldX + worldZ) * 0.36 * zoom
worldX = cameraX + inverseY / 0.72 + inverseX / 1.44
worldZ = cameraZ + inverseY / 0.72 - inverseX / 1.44
```

For a normalized source rectangle, top-left and bottom-right are the world-x extrema. Top-right and bottom-left are the world-z extrema. Using only top-left and bottom-right cannot describe the full inverse rectangle.

## Preferred membership

Project each eligible allied unit through `worldToScreen` using the accepted camera revision, then test its source x/y position against the same normalized rectangle that is rendered.

## Alternative membership

Inverse-transform all four source corners into one convex world polygon, then test each eligible unit against that polygon.

## Invariants

```txt
all drag directions normalize to the same rectangle
same camera rectangle and units produce the same selected IDs
edge inclusion follows one declared policy
camera revision cannot change silently during evaluation
empty membership settles explicitly
first committed frame matches the result
```

## Validation boundary

No transform, membership implementation or tolerance was changed or calibrated.
