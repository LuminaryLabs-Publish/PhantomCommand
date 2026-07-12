# PhantomCommand CPU/GLSL Projection Parity Contract

**Timestamp:** `2026-07-12T01-20-00-04-00`

## Summary

This contract makes the visible CRT projection and semantic pointer projection two adapters over one immutable descriptor. It forbids independent constants, implicit settings and uncorrelated input results.

## Plan ledger

**Goal:** guarantee that CPU mapping and GLSL sampling resolve the same canonical source coordinate for the same output coordinate and projection revision.

- [x] Define descriptor fields.
- [x] Define adapter outputs.
- [x] Define parity tolerances and rejection behavior.
- [x] Define lifecycle and frame correlation.
- [x] Define required fixtures.
- [ ] Implement the contract.

## Projection descriptor

```txt
ProjectionDescriptor {
  projectionId
  revision
  routeId
  runtimeSessionId
  outputCssWidth
  outputCssHeight
  outputPhysicalWidth
  outputPhysicalHeight
  sourceWidth
  sourceHeight
  fitMode: CONTAIN
  crtEnabled
  curveStrength
  semanticSamplePolicy: CENTER_GREEN
  settingsRevision
  surfaceRevision
}
```

## Canonical mapping order

```txt
1. normalize client coordinate inside the current output CSS rect
2. apply contain transform
3. when CRT is enabled, apply radial curve transform
4. classify post-transform coordinate against visible source bounds
5. convert accepted UV to source pixels
6. return a detached typed result with descriptor identity
```

The shader adapter must use the same order and coefficients. Chromatic aberration remains visual; semantic picking uses the declared center/green sample unless a later policy version explicitly changes it.

## Mapping result

```txt
PointerMappingResult {
  mappingResultId
  pointerSampleId
  projectionId
  projectionRevision
  surfaceRevision
  settingsRevision
  frameId
  status
  outputPoint
  containedUv
  curvedUv
  sourcePoint
  semanticSamplePolicy
}
```

## Parity rule

For representative output points, the CPU adapter's accepted source UV must match the shader adapter's canonical center/green sample UV within one source texel. Rejection classification must match exactly for letterbox, pillarbox and post-curve black regions.

## Lifecycle rules

```txt
resize advances surface and projection revision
CRT toggle advances settings and projection revision
route replacement retires the prior descriptor
old mapping results are rejected after revision change
first frame using a new descriptor publishes a frame receipt
commands cite a mapping result and compatible frame receipt
```

## Required fixtures

```txt
contain-only parity at multiple aspect ratios
curved parity at center, quadrants, edges and corners
black-region classification parity
menu CRT toggle revision and parity
campaign selection and order pixel-pick parity
wheel-anchor parity
resize-storm stale-result rejection
finite/bounded coordinate policy
first-frame projection receipt
```

## Non-goals

This contract does not redesign game controls, campaign camera policy, visual CRT art direction or accessibility controls. It only makes visible and semantic geometry agree.

## Boundary

No implementation or executable fixture was added.