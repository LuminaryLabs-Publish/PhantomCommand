# Deploy audit: campaign session fixture check/build gate

Timestamp: `2026-07-10T15-38-40-04-00`

## Current gate

`package.json` currently exposes:

```txt
npm run check
  -> node scripts/check-menu.mjs
  -> node scripts/check-campaign.mjs

npm run build
  -> node scripts/build-static.mjs
```

`check-campaign.mjs` verifies source patterns: campaign canvas presence, module path, 640 x 360 dimensions, seven-ring declaration, lane/archetype/tower/wave declarations, animation frame logic, zoom state, GameHost presence, CRT upload symbols, and static-copy inclusion.

It does not execute campaign behavior, session parsing, save validation, save hydration, command results, deterministic replay, render readback, or GameHost compatibility.

## Required fixture gate

Add a DOM-free fixture before static artifact copying that proves:

```txt
new session creation
continue intent parsing
valid save hydration
legacy victory-summary classification
invalid save rejection
fallback policy
58 deterministic build pads
6 starter allies for a new session
accepted and rejected build commands
accepted and rejected order commands
accepted and rejected wave-start commands
bounded ordered command journal
fixed-step frame correlation
deterministic replay final fingerprint
render-frame readback shape
legacy GameHost surface compatibility
immutable additive session diagnostics
```

## Proposed scripts

```txt
node tests/phantom-command-session-fixture.mjs
node tests/phantom-command-campaign-fixture.mjs
node tests/construct-spiral-intro-kit-smoke.mjs
npm run check
npm run build
```

`npm run build` should depend on the session and campaign fixtures only after those files exist and pass independently.

## Validation for this docs-only pass

```txt
runtime source changed: no
package scripts changed: no
deploy workflow changed: no
branch created: no
pull request created: no
npm run check: not run
npm run build: not run
browser smoke: not run
session fixture: not run because it does not exist yet
local clone validation: blocked by container DNS resolution for github.com
pushed to main: yes
```
