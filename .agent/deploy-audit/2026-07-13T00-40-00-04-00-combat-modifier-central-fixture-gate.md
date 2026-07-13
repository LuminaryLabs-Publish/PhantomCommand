# Combat Modifier Fixture Gate

**Timestamp:** `2026-07-13T00-40-00-04-00`

## Summary

Current source-marker checks cannot prove that the Grave Ward changes movement. Release readiness requires deterministic simulation fixtures, browser-visible evidence and source/build/Pages parity.

## Plan ledger

**Goal:** block combat-modifier claims until the same effect semantics and results are proven in headless, browser, built and deployed surfaces.

- [x] Identify existing static-check limits.
- [x] Define deterministic effect fixtures.
- [x] Define visible-frame and deployed parity fixtures.
- [x] Preserve documentation-only non-claims.
- [ ] Wire and execute the fixture gate after implementation.

## Deterministic gate

```txt
fixture:grave-ward-single-slow
fixture:grave-ward-distance-comparison
fixture:grave-ward-duration-expiry
fixture:grave-ward-refresh
fixture:grave-ward-stacking-cap
fixture:grave-ward-resistance
fixture:grave-ward-stale-projectile
fixture:grave-ward-duplicate-impact
fixture:grave-ward-target-retirement
fixture:grave-ward-run-restart
```

## Browser-visible gate

```txt
build one Grave Ward
observe one accepted modifier result
compare target travel to an unslowed control over equal fixed steps
observe persistent modifier indicator
observe exact expiry
observe first world/HUD/minimap/CRT frame citing the modifier revision
```

## Delivery parity gate

```txt
source route
npm run check
npm run build
built dist route
GitHub Pages route
identical effect spec fingerprint
identical deterministic movement result
identical terminal modifier result
identical visible-frame receipt shape
```

## Failure policy

```txt
missing fixture -> no modifier claim
static token only -> no gameplay claim
projectile color only -> no simulation claim
source/build mismatch -> deployment blocked
missing visible receipt -> presentation parity unproven
```

## Current validation state

```txt
npm run check: not run
npm run build: not run
browser combat smoke: not run
Pages combat smoke: not run
modifier fixtures available: no
runtime source changed: no
deployment changed: no
```

## Claim boundary

This file specifies a future gate. No build, browser or Pages validation was executed.