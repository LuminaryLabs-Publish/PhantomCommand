# PhantomCommand Validation

**Timestamp:** `2026-07-11T13-28-37-04-00`

## Summary

This pass changed documentation only. Source inspection confirms a reachable same-tick path that sets both `lost` and `won`, presents victory and writes a success save after core health reaches zero. No executable fixture currently proves terminal exclusivity, persistence admission, replay convergence or terminal-frame correlation.

## Plan ledger

**Goal:** separate verified source facts from planned terminal-outcome authority and executable proof.

- [x] Confirm the default branch is `main`.
- [x] Compare all ten accessible Publish repositories.
- [x] Confirm all nine eligible repositories have central and root `.agent` coverage.
- [x] Skip the active same-window `HorrorCorridor` documentation sequence.
- [x] Read campaign core damage, unit deletion, wave completion, save, overlay, restart and `GameHost` source.
- [x] Verify defeat can be admitted inside unit iteration.
- [x] Verify the parent update continues after defeat evidence.
- [x] Verify final-wave completion can then admit victory and write a save.
- [x] Verify overlay priority resolves conflicting state as victory.
- [x] Define the missing terminal arbitration and fixture boundary.
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
state has independent won and lost booleans: yes
core breach can set lost inside updateUnit: yes
breaching enemy is deleted: yes
parent update continues after lost is set: yes
wave-clear evaluation runs later in same update: yes
final-wave clear can set won: yes
victory save can run after lost was set in the same tick: yes
overlay checks won before lost: yes
GameHost exposes won and lost independently: yes
R restart uses location.reload: yes
exclusive outcome enum: absent
terminal arbitration policy: absent
terminal latch: absent
terminal result ID: absent
terminal persistence decision: absent
terminal frame receipt: absent
```

## Source-backed failure fixture

The minimal deterministic fixture should construct:

```txt
wave = waves.length - 1
waveActive = true
spawn = []
core = 1
one enemy at breach distance
no other enemies
```

Then one fixed `update(1/60)` should currently allow:

```txt
core = 0
lost = true
won = true
```

The future authority must instead commit:

```txt
terminalOutcome = DEFEAT
won compatibility projection = false
lost compatibility projection = true
victory persistence decision = rejected
```

## Existing check limitation

`check-campaign.mjs` verifies source text and expected declarations. It does not instantiate campaign state, run fixed updates, inspect terminal ordering, intercept storage writes, replay a journal or correlate the terminal frame.

## Missing future gates

```txt
npm run fixture:candidate-resolver
npm run fixture:crt-projection-parity
npm run fixture:phase-admission
npm run fixture:fixed-step-cadence
npm run fixture:command-replay
npm run fixture:terminal-outcome
npm run fixture:terminal-persistence
npm run fixture:terminal-frame
npm run fixture:lifecycle
npm run fixture:checkpoint
npm run smoke:terminal-browser
npm run smoke:restart-browser
npm run smoke:resume
```

## Terminal fixture assertions

```txt
core breach commits defeat only
final-wave clear with positive core commits victory only
simultaneous breach and clear resolves through declared priority
no committed state contains both outcomes
terminal outcome is monotonic for one run epoch
success persistence requires committed victory
success persistence rejects defeat evidence
terminal result and state fingerprint replay identically
world, HUD, minimap, overlay, CRT and GameHost consume one terminal result
restart advances run epoch and cannot retain predecessor terminal identity
```

## Current claim boundary

```txt
repo inventory compared: yes
root .agent state confirmed: yes
documentation pushed to main: pending final run synchronization
runtime terminal implementation: conflicting Boolean mutations
exclusive terminal arbitration: no
terminal persistence safety: no
terminal replay fidelity: no
terminal frame proof: no
```