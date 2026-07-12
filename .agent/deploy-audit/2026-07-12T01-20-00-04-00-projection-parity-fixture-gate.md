# PhantomCommand Projection Parity Fixture Gate

**Timestamp:** `2026-07-12T01-20-00-04-00`

## Summary

The current `npm run check` scripts confirm source tokens and route structure. They do not execute CRT projection math, compare CPU and shader adapters, inspect visible pixels or prove that pointer commands target displayed objects.

## Plan ledger

**Goal:** block projection-correctness claims until pure parity fixtures and browser pixel-pick smokes pass for menu and campaign surfaces.

- [x] Inspect package scripts.
- [x] Inspect menu and campaign static checks.
- [x] Identify current proof limits.
- [x] Define pure and browser fixture gates.
- [ ] Implement and run the gates.

## Current validation

```txt
npm run check
  -> scripts/check-menu.mjs
  -> scripts/check-campaign.mjs

current CRT checks:
  curveUv token exists
  scanline token exists
  uAberration token exists
  texSubImage2D token exists
```

These checks do not prove coordinate parity.

## Required pure fixtures

```txt
projection descriptor validation
contain mapping across wide, tall and equal aspect ratios
curvature mapping against canonical reference values
CRT-disabled CPU/GLSL parity
CRT-enabled CPU/GLSL parity
post-curve black-region classification
non-finite and zero-area rejection
settings and surface revision invalidation
```

## Required browser fixtures

```txt
menu visible marker click parity with CRT on
menu visible marker click parity with CRT off
settings-panel edge-item parity
campaign ally selection at center and edge
campaign pad selection/build target parity
campaign right-click order target parity
campaign drag-selection parity
campaign wheel-anchor parity
letterbox/pillarbox command rejection
curved-black-region command rejection
resize-before-click stale-result rejection
first frame after projection revision receipt
```

## Suggested scripts

```txt
tests/projection-reference.fixture.mjs
tests/projection-parity.fixture.mjs
tests/projection-revision.fixture.mjs
scripts/smoke-menu-projection.mjs
scripts/smoke-campaign-projection.mjs
```

Target package gate:

```txt
npm run check
  -> existing static checks
  -> pure projection fixtures
  -> browser projection smokes when browser tooling is available
```

## Deployment claim boundary

GitHub Pages deployment can prove artifact delivery, not semantic pixel/input parity. A successful build or Pages run must not be reported as projection correctness.

## Validation

```txt
npm run check: not run
npm run build: not run
browser smoke: not run
CPU/GLSL parity fixture: unavailable
black-border fixture: unavailable
menu pixel-pick fixture: unavailable
campaign pixel-pick fixture: unavailable
projection/frame receipt fixture: unavailable
```

No projection, pointer-target or visible-frame correctness claim is made.