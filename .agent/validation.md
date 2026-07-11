# PhantomCommand Validation

**Timestamp:** `2026-07-11T11-51-06-04-00`

## Summary

This pass changed documentation only. Source inspection confirms an exact `1/60` simulation update, but browser callbacks mutate gameplay and camera state outside that boundary, wall-clock delta is silently capped at 50 ms, and no tick, replay or committed-frame receipts exist.

## Plan ledger

**Goal:** separate verified source facts from planned command-scheduling, clock, replay and frame proof.

- [x] Confirm the default branch is `main`.
- [x] Compare all ten accessible Publish repositories.
- [x] Confirm all nine eligible repositories have central and root `.agent` coverage.
- [x] Read campaign callbacks, accumulator loop, render path, `GameHost`, package scripts and current audits.
- [x] Verify simulation updates use exact `1/60` steps.
- [x] Verify command mutations occur outside fixed steps.
- [x] Verify delta above 50 ms is discarded without a receipt.
- [x] Verify no tick, command cursor, state fingerprint or frame receipt exists.
- [ ] Run behavioral validation after the authority boundary exists.

## Current scripts

```txt
npm run check
  -> node scripts/check-menu.mjs
  -> node scripts/check-campaign.mjs

npm run build
  -> node scripts/build-static.mjs
```

## This pass

```txt
runtime source changed: no
package scripts changed: no
dependencies changed: no
routes changed: no
gameplay changed: no
rendering changed: no
persistence changed: no
deployment workflow changed: no
branch created: no
pull request created: no
npm run check: not run
npm run build: not run
browser smoke: not run
```

## Verified by source inspection

```txt
simulation step: exactly 1/60
wall-clock delta clamp: 0.05 seconds
raw elapsed duration retained: no
clock overrun result: absent
visibility policy: absent
simulation tick ID: absent
command sequence: absent
target tick: absent
fixed-step command queue: absent
browser commands mutate immediately: yes
camera update outside fixed loop: yes
CRT time independent from simulation: yes
state fingerprint: absent
committed tick receipt: absent
render frame ID: absent
consumer acknowledgements: absent
GameHost direct mutation bypass: present
```

## Existing check limitation

`check-campaign.mjs` verifies source text such as `createCrtRenderer`, dimensions, archetype declarations, `camera.targetZoom` and `window.GameHost`. It does not execute the clock, command ordering, replay or frame-consumption behavior.

## Missing future gates

```txt
npm run fixture:candidate-resolver
npm run fixture:crt-projection-parity
npm run fixture:phase-admission
npm run fixture:fixed-step-cadence
npm run fixture:irregular-cadence
npm run fixture:stall-policy
npm run fixture:command-target-tick
npm run fixture:command-replay
npm run fixture:state-fingerprint
npm run fixture:frame-correlation
npm run fixture:lifecycle
npm run fixture:checkpoint
npm run smoke:pointer-browser
npm run smoke:cadence-browser
npm run smoke:resume
```

## Fixed-step fixture assertions

```txt
20, 30, 60 and 120 Hz schedules produce the same committed state
irregular frame schedules produce the same committed state
stalls follow one declared catch-up/drop/suspend policy
commands apply once in (targetTick, sequence) order
commands around RAF boundaries resolve identically
pause and terminal states reject forbidden commands
same command journal reproduces the same fingerprint
camera/projection revisions are recorded with the frame
world, HUD, minimap, overlay and CRT acknowledge one frame receipt
GameHost cannot mutate authoritative state outside the gateway
```

## Current claim boundary

```txt
repo inventory compared: yes
root .agent state confirmed: yes
documentation pushed to main: pending this run
runtime fixed-step implementation: partial simulation only
deterministic command scheduling: no
clock-overrun policy: no
replay fidelity: no
committed-frame proof: no
```