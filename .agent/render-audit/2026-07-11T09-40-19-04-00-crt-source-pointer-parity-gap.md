# CRT Source/Pointer Parity Gap

**Timestamp:** `2026-07-11T09-40-19-04-00`

## Summary

The displayed source point is computed by `curveUv(containUv(vUv))` when CRT is enabled. The pointer source point is computed by containment only. Rendered geometry and interaction geometry therefore diverge.

## Plan ledger

**Goal:** make the source point visually sampled by the CRT renderer identical to the source point reported to menu and campaign interaction.

- [x] Trace shader source sampling.
- [x] Trace CPU pointer projection.
- [x] Compare aspect containment and CRT curvature.
- [x] Identify missing render/input revision correlation.
- [ ] Add shared projection authority and parity fixtures.

## Render path

```txt
output fragment UV
  -> containUv
  -> frameUv retained for vignette
  -> curveUv when CRT enabled
  -> reject outside source UV
  -> sample source texture
```

## Input path

```txt
client coordinate
  -> canvas CSS rectangle
  -> normalize
  -> undo letterbox or pillarbox
  -> multiply by source dimensions
  -> return inside flag
```

## Gap

`screenToSource()` does not apply the radial curve coefficient used by the shader. It also has no transform revision tying a pointer result to the resize and CRT settings active for the rendered frame.

## Required render contract

```txt
CommittedPresentationTransform {
  transformRevision,
  outputCssRect,
  outputPixelSize,
  sourceSize,
  containMode,
  crtEnabled,
  curveCoefficient
}
```

The shader uniforms and CPU display-to-source mapper must be derived from the same descriptor.

## Required proof

- CPU samples equal shader source sampling within tolerance.
- Pointer results reference the transform revision shown on screen.
- Outside contain bars and curved-out source regions have stable rejection reasons.
- CRT off remains an identity after containment.
- Resize and settings changes invalidate stale pointer projections.
- Render observation records transform and frame identity together.