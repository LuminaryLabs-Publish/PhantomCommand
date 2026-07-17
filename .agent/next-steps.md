# Next Steps

**Generated:** `2026-07-17T11-39-49-04-00`  
**Status:** `campaign-camera-coverage-bounds-authority-audited`

## Intent

Replace the implicit square camera clamp with one explicit, zoom-aware camera-coverage policy shared by every camera producer.

## Checklist

### Phase 1: Manifest and policy

- [ ] Publish arena center, outer radius and authored overscan.
- [ ] Publish source viewport, projection origin and isometric coefficients.
- [ ] Choose explicit invariants for camera center, sanctum, selection and minimum arena coverage.
- [ ] Version the arena, viewport, projection, zoom and policy inputs.

### Phase 2: Visible footprint

- [ ] Inverse-project all four source corners at the requested zoom.
- [ ] Represent the visible world footprint as a deterministic quadrilateral.
- [ ] Compile a zoom-aware admissible camera envelope.
- [ ] Define behavior when the requested invariant is impossible at a given zoom.

### Phase 3: Camera admission and settlement

- [ ] Normalize keyboard pan, middle pan, wheel-anchor zoom, focus and public-host mutations.
- [ ] Reject stale route, viewport, projection, zoom and camera revisions.
- [ ] Preserve requested anchors where compatible with coverage policy.
- [ ] Publish `CameraCoverageResult` with requested and accepted values.
- [ ] Commit the accepted generation before rendering.
- [ ] Publish `FirstCameraBoundsFrameAck`.

### Phase 4: Fixtures

- [ ] Cardinal and diagonal keyboard boundary fixtures.
- [ ] Middle-pan edge and corner fixtures.
- [ ] Wheel-anchor fixtures at center and all source corners.
- [ ] Minimum/default/maximum zoom coverage fixtures.
- [ ] Focus-to-selection and focus-to-sanctum fixtures.
- [ ] Public-host out-of-envelope mutation fixture.
- [ ] Resize/DPR stale-envelope rejection fixture.
- [ ] Source, built-artifact and Pages parity fixtures.

## Recommended file cut

```txt
src/campaign/campaign-scene.js
src/campaign/camera-coverage-policy.js
src/campaign/camera-coverage-authority.js
tests/browser/campaign-camera-bounds.html
```

## Compatibility constraints

Preserve the 640×360 source surface, isometric transforms, CRT presentation, current camera control feel, zoom range, campaign simulation, selection, orders, saves, audio and deployment unless an explicit camera-policy change requires otherwise.

## Claim boundary

Do not claim camera-boundary correctness until source, artifact and Pages fixtures prove one deterministic result and one matching rendered frame for every camera producer.