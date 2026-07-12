# Render Audit: CRT Visible World Pointer Provenance Gap

**Timestamp:** `2026-07-12T11-40-50-04-00`

## Summary

The visible frame and the CPU pointer projection do not share one transform receipt. WebGL contains the source frame and then applies CRT curvature before sampling. `screenToSource()` performs containment only. Campaign interactions therefore cannot prove that their source/world point corresponds to the pixel visibly under the pointer.

## Plan ledger

**Goal:** bind pointer projection to the exact display transform, source size, camera revision and visible frame used for interaction.

- [x] Inspect shader contain and curve transforms.
- [x] Inspect CPU source-coordinate projection.
- [x] Inspect campaign camera/world projection.
- [x] Identify missing transform provenance.
- [x] Define render and input correlation requirements.
- [ ] Implement inverse projection and visible-frame receipts.

## Current render path

```txt
640x360 campaign source canvas
  -> texSubImage2D
  -> containUv(vUv)
  -> optional curveUv(uv)
  -> sample source texture
  -> grain, scanline, vignette and fade
  -> visible WebGL frame
```

## Current input path

```txt
client coordinates
  -> canvas bounding rectangle
  -> contain-only source coordinates
  -> screenToWorld using current camera object
  -> immediate gameplay or camera mutation
```

## Missing evidence

```txt
render surface generation
source texture generation
CRT enabled and curve coefficient revision
inverse curve result
camera revision
source-to-world projection receipt
visible frame ID
command-to-frame correlation
```

## Required render receipt

```txt
CampaignDisplayFrameReceipt
  frameId
  displayGeneration
  sourceWidth
  sourceHeight
  outputWidth
  outputHeight
  fitMode
  crtEnabled
  curveCoefficient
  cameraRevision
  stateRevision
  presentedAtMs
```

## Acceptance conditions

```txt
letterbox pixels never map to actionable source coordinates
CRT-disabled projection round-trips within tolerance
CRT-enabled projection round-trips through curve/inverse-curve within tolerance
world projection uses the same camera revision as the frame receipt
stale frame or display generation rejects the command
first post-command frame cites the committed result
```

No render or input behavior changed.