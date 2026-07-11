# Action Fixture Build Gate

**Timestamp:** `2026-07-10T20-19-35-04-00`

## Current validation path

```txt
npm run check
  -> node scripts/check-menu.mjs
  -> node scripts/check-campaign.mjs

npm run build
  -> node scripts/build-static.mjs

Pages workflow
  -> node --check source modules
  -> run menu source-pattern check
  -> run campaign source-pattern check
  -> build static artifact
  -> verify expected files and source strings
  -> upload and deploy dist
```

## Current proof strength

The checks confirm entrypoints, source canvas constants, rings, lanes, descriptors, camera fields, `window.GameHost`, CRT shader tokens, and copied artifact files. They do not execute campaign actions or simulation ticks.

Current deployment can pass while any of the following are broken:

```txt
- a valid build is rejected
- an invalid build mutates souls
- an occupied pad receives another tower
- an order silently disappears
- a wave starts twice
- a rejected request has no reason
- browser and GameHost calls use different admission paths
- action timing changes across frame cadence
- a rendered frame does not match the committed simulation state
- GameHost readback refers to a different state than the visible frame
```

## Required additive fixtures

```txt
tests/phantom-command-candidate-resolver-fixture.mjs
tests/phantom-command-action-result-fixture.mjs
tests/phantom-command-fixed-step-command-fixture.mjs
tests/phantom-command-frame-consumption-fixture.mjs
```

## Action-result fixture cases

```txt
build accepted
build rejected / no-selected-pad
build rejected / pad-occupied
build rejected / insufficient-souls
order accepted / move
order accepted / attack
order rejected / no-selected-units
wave accepted
wave rejected / wave-already-active
wave rejected / campaign-won
wave rejected / campaign-lost
wave rejected / no-wave-remaining
```

## Fixed-step fixture cases

```txt
same commands + same target ticks -> same results
same commands + same target ticks -> same state fingerprints
rejected command -> unchanged state fingerprint
multiple commands in one tick -> stable sequence order
zero-command tick -> stable tick and frame progression
```

## Render-consumption fixture cases

```txt
committed frame has frameId and tickId
world, HUD, minimap, modal, and CRT rows share frameId
render row stateFingerprint equals committed-frame fingerprint
GameHost observation reports the same committed frame
one render after several ticks preserves the consumed tick and command range
one render after zero ticks reports snapshot reuse explicitly
```

## Recommended package gating

Only after the fixtures pass independently:

```json
{
  "scripts": {
    "check": "node scripts/check-menu.mjs && node scripts/check-campaign.mjs && node tests/phantom-command-candidate-resolver-fixture.mjs && node tests/phantom-command-action-result-fixture.mjs && node tests/phantom-command-fixed-step-command-fixture.mjs && node tests/phantom-command-frame-consumption-fixture.mjs"
  }
}
```

## Workflow rule

The existing Pages workflow already runs validation before the artifact build. Extend `npm run check` rather than duplicating fixture commands inside the workflow. Preserve deployment from `main`, artifact structure, Pages permissions, and current file assertions.

## Current validation status

```txt
candidate resolver fixture: absent
campaign action-result fixture: absent
fixed-step command fixture: absent
frame-consumption fixture: absent
npm run check: not run in this documentation pass
npm run build: not run in this documentation pass
browser smoke: not run in this documentation pass
Pages deployment: not checked in this documentation pass
```
