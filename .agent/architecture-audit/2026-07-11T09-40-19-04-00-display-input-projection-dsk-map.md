# Display/Input Projection DSK Map

**Timestamp:** `2026-07-11T09-40-19-04-00`

## Summary

The render and input paths currently share the source-canvas dimensions and containment math but not the CRT curve. Projection authority should be a small DSK family consumed by both renderer and interaction adapters, not a second renderer or gameplay framework.

## Plan ledger

**Goal:** define ownership and composition for deterministic display, source and world projection.

- [x] Map current rendering and input responsibilities.
- [x] Separate display containment, CRT curvature and isometric conversion.
- [x] Identify missing typed results, revisions and parity proof.
- [ ] Implement within existing CRT and campaign adapters.

## Current ownership

```txt
crt-renderer-kit
  WebGL program and resources
  containUv shader function
  curveUv shader function
  source upload and display draw
  contain-only screenToSource helper

menu-route-kit
  consumes source coordinates for hit tests

pixel-campaign-runtime-kit
  consumes source coordinates
  converts source to world
  performs click/order/wheel/drag behavior
```

## Proposed parent domain

```txt
phantom-command-presentation-projection-authority-domain
```

## Proposed DSKs

| DSK | Owns | Does not own |
|---|---|---|
| `presentation-transform-kit` | source/output dimensions, aspect mode, CRT flag, curve coefficient, revision | WebGL resources or gameplay |
| `contain-projection-kit` | output-to-contained UV mapping and boundary reasons | CRT curvature |
| `crt-curve-projection-kit` | radial source sampling transform shared by CPU proof and shader constants | hit tests |
| `display-to-source-kit` | typed client/display/source projection | world conversion or mutation |
| `pointer-projection-result-kit` | coordinates, inside flags, revision, reason and provenance | action admission |
| `source-to-world-projection-kit` | pure isometric inverse and forward transforms | selection policy |
| `screen-selection-volume-kit` | visual rectangle semantics and projected-entity inclusion | entity ownership |
| `wheel-anchor-projection-kit` | before/after visual anchor result | camera policy |
| `projection-revision-kit` | monotonic transform revision and stale rejection | frame rendering |
| `projection-observation-kit` | detached transform/result snapshots | mutable runtime owners |
| parity fixture kits | CPU/GLSL samples, pointer roundtrip and drag-selection proof | production behavior |

## Composition

```txt
CRT renderer
  -> publishes PresentationTransform
  -> renders with the same contain/curve constants

menu adapter
  -> displayToSource(pointer, transform)
  -> source-space hit test

campaign adapter
  -> displayToSource(pointer, transform)
  -> optional sourceToWorld(source, camera)
  -> typed CampaignCommand

render frame
  -> records transform revision
```

## Promotion rule

Keep these kits product-local until the projection descriptor and CPU/GLSL parity tests are stable. Promote only the renderer-agnostic containment, radial projection and typed-result contracts if another Nexus Engine product reuses the same pattern.