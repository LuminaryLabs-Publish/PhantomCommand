# PhantomCommand CRT Visible/Semantic Coordinate Gap

**Timestamp:** `2026-07-12T01-20-00-04-00`

## Summary

The rendered image and interaction system do not use the same projection. The fragment shader applies containment followed by CRT curvature; the CPU pointer mapper applies containment only. No visible-frame receipt identifies the projection used by a given interaction.

## Plan ledger

**Goal:** make every semantic source coordinate describe the exact source texel visibly presented beneath the pointer.

- [x] Trace fragment-shader sampling.
- [x] Trace CPU screen-to-source mapping.
- [x] Compare CRT-enabled and disabled behavior.
- [x] Trace menu and campaign consumers.
- [x] Define render evidence and fixture requirements.
- [ ] Implement physical pixel/readback proof.

## Visible path

```txt
vUv
  -> containUv(vUv)
  -> frameUv retained for vignette
  -> curveUv(uv) when uCrtEnabled > 0.5
  -> reject post-curve UV outside [0,1]
  -> sample center/green plus offset red and blue channels
```

## Semantic path

```txt
clientX/clientY
  -> canvas CSS rect normalization
  -> contain-only aspect correction
  -> sourceCanvas pixel coordinate
  -> inside flag from pre-curve coordinate
```

## Mismatch classes

```txt
radial displacement:
  displayed source texel differs increasingly toward edges

curved black border:
  shader can reject post-curve UV while CPU reports inside

settings divergence:
  menu CRT toggle changes visible projection only

campaign permanence:
  campaign always renders with CRT enabled

aberration ambiguity:
  visible red/green/blue channels sample different positions without a semantic-channel policy

frame ambiguity:
  no projection revision or frame receipt identifies which geometry was visible
```

## Required render result

```txt
ProjectionFrameReceipt {
  routeId
  runtimeSessionId
  frameId
  outputSurfaceRevision
  sourceSurfaceRevision
  projectionId
  projectionRevision
  crtEnabled
  curveStrength
  semanticSamplePolicy
  adapterFingerprint
}
```

## Required proof

```txt
CPU and shader mapping agree at center, edges and corners
CRT disabled produces contain-only parity
CRT enabled produces contain-plus-curve parity
post-curve black regions are rejected by interaction
menu setting changes advance projection revision
campaign visible marker and semantic pick agree
resize produces a new correlated frame before new mappings commit
```

## Boundary

No renderer, shader, input or visual output was changed. The current static checks only confirm shader tokens and do not prove projection parity.