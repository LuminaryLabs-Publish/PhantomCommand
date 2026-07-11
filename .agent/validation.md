# PhantomCommand Validation

**Timestamp:** `2026-07-11T07-38-25-04-00`

## Summary

This pass changed documentation only. The repository still has source-pattern checks and a static build, but no executable campaign-phase fixture proving that pause and terminal overlays correspond to immutable authoritative state.

## Plan ledger

**Goal:** separate verified repository facts from planned phase-admission, command, lifecycle and resume proof.

- [x] Confirm default branch is `main`.
- [x] Confirm no branch or pull request was created.
- [x] Read campaign callbacks, fixed-step update, render, package and current `.agent` state.
- [x] Verify direct paused and terminal mutation paths.
- [x] Record current scripts and missing fixtures.
- [ ] Run behavioral validation after phase authority exists.

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
fixed simulation step: 1/60
update() early return: paused || won || lost
pointer selection path checks phase: no
build() checks paused/won/lost: no
order() checks paused/won/lost: no
startWave() checks paused: no
camera RAF checks paused/won/lost: no
GameHost shared phase admission: no
overlay committed-frame identity: absent
```

## Missing future gates

```txt
npm run fixture:candidate-resolver
npm run fixture:action-authority
npm run fixture:phase-admission
npm run fixture:phase-source-parity
npm run fixture:phase-frame
npm run fixture:lifecycle
npm run fixture:checkpoint
npm run smoke:phase-browser
npm run smoke:resume
```

## Phase fixture assertions

```txt
canonical phase transitions are legal and monotonic
select/build/order/start-wave reject outside ACTIVE
rejected commands preserve authoritative fingerprint
pause/terminal entry retires held keys, drag and middle-pan
pointer, keyboard and GameHost receive equivalent result semantics
stale session/run/observed-phase commands reject
terminal state remains immutable
camera policy outside ACTIVE is explicit
```

## Frame assertions

```txt
world, HUD, minimap and overlay consume one frame ID
overlay phaseSequence matches committed phase
CRT upload/draw acknowledges the same frame
rejected paused/terminal commands do not alter the next state fingerprint
no stale pre-transition callback renders under a new phase sequence
```

## Browser smoke

```txt
start campaign
pause
attempt select, double-click build, right-click order and Space wave
verify no gameplay mutation
resume and verify valid actions work
force win and loss
repeat mutation attempts and verify terminal immutability
verify typed restart/exit and teardown
```

## Current claim boundary

```txt
repo inventory compared: yes
root .agent state confirmed: yes
documentation pushed to main: yes
runtime phase implementation: no
pause authoritative freeze: no
terminal immutability: no
phase/frame proof: no
```