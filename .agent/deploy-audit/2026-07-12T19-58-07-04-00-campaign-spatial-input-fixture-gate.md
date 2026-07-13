# Campaign Spatial Input Fixture Gate

**Timestamp:** `2026-07-12T19-58-07-04-00`

## Summary

Existing checks are static token assertions. They cannot prove containment, pointer ownership, CRT projection, rectangle membership, zero-mutation rejection or deployed geometry parity.

## Plan ledger

**Goal:** require deterministic source, built-output and GitHub Pages evidence before campaign spatial-input work is considered complete.

- [x] Review current `npm run check` coverage.
- [x] Review static build inclusion.
- [x] Identify missing geometry and browser fixtures.
- [x] Define the required fixture matrix.
- [ ] Add executable fixtures after implementation.
- [ ] Run source, build and Pages gates.

## Existing checks can prove

```txt
game.html contains campaign canvas and module
campaign source contains authored/runtime/render tokens
CRT renderer contains expected symbols
static build copies source files
```

## Existing checks cannot prove

```txt
outside-source inputs mutate nothing
visible CRT point maps to the same logical point
pointer identity is preserved through a gesture
pointercancel and capture loss terminate safely
rectangle selection matches the visible marquee
point selection and order targeting reject stale revisions
camera pan and zoom use accepted source points
spatial results feed typed campaign actions
first visible frame acknowledges accepted results
source, dist and Pages behavior agree
```

## Required deterministic fixtures

```txt
fixture:campaign-source-containment
fixture:campaign-crt-inverse-projection
fixture:campaign-point-selection
fixture:campaign-drag-selection-four-directions
fixture:campaign-drag-selection-cancellation-ratios
fixture:campaign-order-target-admission
fixture:campaign-pointer-identity
fixture:campaign-pointer-cancel
fixture:campaign-camera-pan
fixture:campaign-wheel-anchor
fixture:campaign-stale-transform
fixture:campaign-stale-camera
fixture:campaign-stale-entity-set
fixture:campaign-zero-mutation-rejections
fixture:campaign-visible-spatial-frame
```

## Browser matrix

```txt
Chromium source route
Chromium built output
GitHub Pages route
CRT enabled and disabled
matching, wide and tall viewport aspect
mouse, pen and touch-capable pointer sequences
single and multi-pointer paths
minimum, default and maximum camera zoom
```

## Gate

```txt
npm run check
npm run build
headless geometry fixtures
browser source smoke
browser dist smoke
Pages spatial-input smoke
```

A passing static source check is not spatial-input proof.
