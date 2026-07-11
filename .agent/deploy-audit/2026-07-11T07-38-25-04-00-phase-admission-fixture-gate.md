# Phase Admission Fixture Gate

**Timestamp:** `2026-07-11T07-38-25-04-00`

## Summary

Current checks assert source structure only. Deployment has no executable proof that paused, terminal, transitioning or disposed campaigns reject gameplay mutation and render the matching phase.

## Plan ledger

**Goal:** add deterministic Node fixtures and a browser smoke before phase-admission changes may publish.

- [x] Record existing scripts.
- [x] Define a DOM-free phase matrix fixture.
- [x] Define source-parity and frame-correlation fixtures.
- [x] Define browser smoke requirements.
- [ ] Implement fixture scripts.
- [ ] Wire the gate into `npm run check` and Pages deployment.

## Current gate

```txt
npm run check
  -> node scripts/check-menu.mjs
  -> node scripts/check-campaign.mjs

npm run build
  -> node scripts/build-static.mjs
```

These are source-pattern checks. They do not execute the campaign phase/command matrix.

## Required scripts

```txt
npm run fixture:phase-admission
npm run fixture:phase-source-parity
npm run fixture:phase-frame
npm run smoke:phase-browser
```

## Phase-admission fixture

For every phase and command kind:

```txt
construct canonical state
capture authoritative fingerprint
submit typed command
assert accepted/rejected/idempotent result
assert reason code
assert expected phase sequence
assert expected applied tick
assert rejected cases preserve fingerprint
assert bounded journal row
```

Mandatory cases:

```txt
PAUSED x select/build/order/startWave
WON x select/build/order/startWave
LOST x select/build/order/startWave
TRANSITIONING x all gameplay commands
DISPOSED x all commands
ACTIVE x valid and invalid gameplay commands
duplicate Pause and Resume
stale session/run/observed-phase commands
```

## Source-parity fixture

```txt
pointer BuildTower
keyboard StartWave
GameHost BuildTower/StartWave
  -> normalize to the same command shapes
  -> pass through the same phase admission
  -> produce equivalent result semantics
```

## Frame fixture

```txt
commit Pause transition sequence N
render one frame
assert world/HUD/minimap/overlay/CRT acknowledge N
submit rejected build while paused
assert state fingerprint unchanged
render next frame
assert overlay remains PAUSED and no tower/economy mutation appears
```

Repeat for WON and LOST.

## Browser smoke

```txt
start campaign
pause
attempt pad selection, double-click build, right-click order and Space wave
verify no authoritative mutation
resume and verify admitted actions work
force win and loss scenarios
attempt the same mutations
verify terminal state remains immutable
restart/exit through typed lifecycle commands
verify no stale callback mutates the replaced session
```

## Deployment rule

```txt
npm run check
npm run fixture:phase-admission
npm run fixture:phase-source-parity
npm run fixture:phase-frame
npm run build
browser phase smoke
publish main only when all pass
```

## Current validation

```txt
phase fixture exists: no
source-parity fixture exists: no
frame-correlation fixture exists: no
browser phase smoke exists: no
run in this documentation pass: no
```