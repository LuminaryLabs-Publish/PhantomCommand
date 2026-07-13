# Combat Modifier Fixture Gate

**Timestamp:** `2026-07-13T00-31-09-04-00`

## Summary

The existing campaign check confirms source tokens but does not execute tower fire, projectile impact, movement comparison, modifier expiry or visible-frame correlation.

## Plan ledger

**Goal:** require deterministic source, built-output and deployed-origin proof before claiming the Grave Ward slows enemies.

- [x] Inspect current campaign static check.
- [x] Record its proof boundary.
- [x] Define deterministic combat-effect fixtures.
- [x] Define browser and Pages parity gates.
- [ ] Implement and run later.

## Existing check coverage

```txt
game canvas and campaign module references
campaign source dimensions
rings, lanes, archetypes, towerTypes and waves tokens
unit animation token
camera target zoom token
window.GameHost token
CRT texture upload and source resolution tokens
static build src-copy token
```

## Existing checks do not prove

```txt
Ward projectile applies slow
magnitude interpretation
duration and fixed-step expiry
stacking or refresh policy
resistance or immunity
stale and duplicate impact rejection
target-death cleanup
movement-speed derivation
visible slow-state frame provenance
source/build/Pages parity
```

## Required deterministic fixtures

```txt
fixture:grave-ward-single-slow
fixture:grave-ward-speed-distance-comparison
fixture:grave-ward-duration-expiry
fixture:grave-ward-refresh
fixture:grave-ward-stacking-policy
fixture:grave-ward-resistance
fixture:grave-ward-target-retirement
fixture:grave-ward-stale-projectile
fixture:grave-ward-duplicate-impact
fixture:grave-ward-visible-frame
```

## Browser matrix

```txt
source route
built dist route
GitHub Pages route
60 Hz and throttled frame cadence
one Ward and one moving enemy
multiple Wards against one enemy
target death before expiry
restart with active modifier
first visible modifier frame
```

## Validation boundary

```txt
npm run check: not run
npm run build: not run
browser combat smoke: not run
Pages combat smoke: not run
modifier fixtures available: no
runtime or deployment changed: no
```
