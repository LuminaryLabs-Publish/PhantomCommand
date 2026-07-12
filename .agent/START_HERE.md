# PhantomCommand Agent Start

**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Last aligned:** `2026-07-12T03-00-46-04-00`

## Summary

PhantomCommand models campaign lifecycle through independent booleans such as `paused`, `waveActive`, `won`, and `lost`, but gameplay actions do not consume an authoritative phase. Pausing stops fixed-step simulation only: Space can still queue a wave, pointer input can still select or order, and building can still spend Souls. After victory or defeat, selection, orders, construction, tower-type changes, camera commands, and public `GameHost` mutations remain reachable.

## Plan ledger

**Goal:** establish one campaign-phase authority that admits or rejects every gameplay action against a revisioned phase and makes terminal state mutation-closed.

- [x] Compare the complete Publish inventory with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have ledger and root `.agent` coverage.
- [x] Select only `PhantomCommand` as the oldest eligible repository.
- [x] Trace pause, wave, build, selection, order, camera, terminal, keyboard, pointer, RAF, render and `GameHost` paths.
- [x] Identify the interaction loop, all domains, implemented kits and offered services.
- [x] Confirm pause fences simulation but not command mutation.
- [x] Confirm terminal state does not fence construction, orders, selection or host mutation.
- [x] Add the campaign-phase admission authority audit set.
- [x] Preserve Continue, host, projection, clock, combat, terminal, lifecycle and checkpoint dependencies.
- [ ] Implement typed phase admission and execute paused/terminal mutation fixtures.

## Current implementation queue

```txt
1. Continue Capability and Checkpoint Admission Authority
   + Save Candidate Precedence, Legacy Summary and First Resumed Frame Fixtures

2. Campaign Action Result Authority
   2a. Public Host Owner Quarantine and Command Admission
   2b. CRT Display/Input Projection Authority
   2c. Campaign Phase Admission Authority
   2d. Fixed-Step Command Scheduling, Replay and Committed Frame Authority
   2e. Public Host Committed Read Model and Frame Provenance
   2f. Combat Resolution and Entity Liveness Authority
   2g. Exclusive Terminal Outcome Transaction

3. Runtime Session Lifecycle Authority
   + Menu/Campaign Teardown, bfcache and Restart Leak Fixtures

4. Versioned Campaign Checkpoint Capture Authority
   + Stable Boundary Capture, Atomic Resume and Migration Fixtures
```

## Current interaction loop

```txt
campaign startup
  -> construct mutable state with paused/waveActive/won/lost booleans
  -> attach keyboard, pointer, wheel and public GameHost mutators
  -> start fixed-step RAF

frame
  -> camera consumes held keys even while gameplay is paused or terminal
  -> accumulator calls update(1/60)
  -> update exits when paused, won or lost
  -> render consumes the same live mutable owners

commands
  -> Space calls startWave directly
  -> pointer selects, builds or orders directly
  -> number keys replace tower type directly
  -> P toggles paused directly
  -> GameHost exposes startWave, build and mutable state/camera
  -> no command obtains a phase snapshot or typed admission result
```

## Latest finding

```txt
pause behavior:
  simulation update: fenced
  startWave: reachable and mutating
  select/build/order: reachable and mutating
  tower-type changes: reachable and mutating
  camera pan/zoom: reachable

terminal behavior:
  update: fenced
  build/order/select: reachable and mutating
  public owner mutation: reachable
  terminal frame identity: absent
```

Concrete consequences:

```txt
Space while paused can populate spawn[], set waveActive and replace the message
building while paused can spend Souls and create a tower
orders while paused can replace unit targets/move destinations and add effects
building and ordering remain reachable after won/lost
paused + won or paused + lost combinations are representable
rendering cannot identify which phase revision admitted the visible mutations
```

## Latest composed domain

```txt
phantom-command-campaign-phase-admission-authority-domain
  -> phase schema, identity, revision and derivation
  -> action kind, envelope, identity and policy matrix
  -> phase snapshot and admission
  -> typed action result
  -> paused and terminal mutation fences
  -> wave/build/order/selection/camera adapters
  -> phase transition commit
  -> stale-result rejection
  -> render observation, journal and fixtures
```

## Read first

```txt
.agent/trackers/2026-07-12T03-00-46-04-00/project-breakdown.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/turn-ledger/2026-07-12T03-00-46-04-00.md
.agent/architecture-audit/2026-07-12T03-00-46-04-00-campaign-phase-admission-authority-dsk-map.md
.agent/render-audit/2026-07-12T03-00-46-04-00-phase-terminal-visible-frame-gap.md
.agent/gameplay-audit/2026-07-12T03-00-46-04-00-paused-terminal-command-mutation-loop.md
.agent/interaction-audit/2026-07-12T03-00-46-04-00-action-phase-admission-result-map.md
.agent/phase-admission-audit/2026-07-12T03-00-46-04-00-pause-wave-terminal-mutation-contract.md
.agent/deploy-audit/2026-07-12T03-00-46-04-00-phase-admission-fixture-gate.md
```

## Guardrails

```txt
Push only to main.
Create no branches or pull requests.
Do not work on TheCavalryOfRome.
Do not derive phase independently in each input handler.
Do not treat paused as a render-only state.
Do not permit terminal gameplay mutation without an explicit post-terminal policy.
Do not call an action accepted without a typed result tied to phaseRevision.
Do not call a visible phase coherent without a committed-frame receipt.
```