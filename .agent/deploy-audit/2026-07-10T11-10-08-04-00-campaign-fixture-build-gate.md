# Deploy Audit — Campaign Fixture Build Gate

**Timestamp:** `2026-07-10T11-10-08-04-00`

## Current scripts

```txt
npm run check -> node scripts/check-menu.mjs && node scripts/check-campaign.mjs
npm run build -> node scripts/build-static.mjs
```

## Current gap

The checks prove static route shape, but no DOM-free campaign source/action/render fixture exists yet. `npm run build` does not prove campaign rows before copying artifacts.

## Required next gate

```txt
node tests/phantom-command-campaign-fixture.mjs
node tests/construct-spiral-intro-kit-smoke.mjs
npm run check
npm run build
```

## Fixture expectations

```txt
source route/module/canvas dimensions
ring/lane/pad descriptor counts
tower and unit archetype catalogs
wave queue shape
select/build/order/start-wave action results
accepted and rejected rows
simulation frame summaries
render readback summaries
legacy GameHost compatibility
additive GameHost campaign diagnostics
```

## Validation status for this pass

Docs-only.

```txt
runtime source changed: no
branch created: no
pull request created: no
npm run check: not run
npm run build: not run
campaign fixture: not run because proof files do not exist yet
browser smoke: not run
```
