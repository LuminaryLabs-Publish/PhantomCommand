# CRT and Drag-Selection Contract

**Timestamp:** `2026-07-11T09-40-19-04-00`

## Summary

This contract defines the exact visible-space semantics required for CRT pointer mapping and campaign drag selection.

## Plan ledger

**Goal:** make every pointer action resolve against the source point and visual rectangle actually presented to the player.

- [x] Define the display-to-source equation.
- [x] Define revision and boundary behavior.
- [x] Define drag-selection semantics.
- [x] Define fixture tolerances and samples.
- [ ] Implement and validate.

## Display-to-source equation

For normalized display UV `d`:

```txt
c = contain(d, outputAspect, sourceAspect)

when CRT is disabled:
  s = c

when CRT is enabled:
  p = c * 2 - 1
  p = p * (1 + dot(p, p) * curve)
  s = p * 0.5 + 0.5
```

`displayToSource()` must return `s * sourceResolution`, plus contained/source boundary flags and the transform revision.

## Revision rules

Advance `transformRevision` when any of these change:

```txt
canvas CSS rectangle
output pixel dimensions
source dimensions
contain mode or aspect
CRT enabled state
curve coefficient
```

Pointer results from an older revision reject before command construction.

## Drag-selection semantics

The rectangle drawn on the source canvas is authoritative. Normalize the drag endpoints into a source-space rectangle. Project each candidate entity through `worldToScreen()` using the committed camera and include it only when the projected point is inside that rectangle.

Do not inverse-project two corners and compare against a world AABB.

## Fixture matrix

```txt
aspect ratios: 16:9, 4:3, 21:9, 9:16
CRT: enabled and disabled
samples: center, axes, corners, outer menu bounds, outer campaign rings
curve: 0 and production 0.035
pointer sources: move, click, right-click, wheel, drag
```

## Tolerance

CPU and shader-source UV samples should agree within one source pixel, with tighter floating-point unit tests before pixel quantization.

## Guarantees

```txt
visible menu item receives the click
visible ally/pad/enemy receives the campaign action
wheel zoom preserves the visible anchor
drag box membership matches projected source positions
stale transforms never mutate gameplay
```