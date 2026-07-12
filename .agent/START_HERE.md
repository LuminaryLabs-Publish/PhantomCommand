# PhantomCommand Agent Start

**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Last aligned:** `2026-07-11T23-28-29-04-00`

## Summary

PhantomCommand publishes live campaign owners through `window.GameHost`. The public object exposes the mutable `state` and `camera` objects plus `startWave`, `build` and `setZoom`. A same-page script or automation can therefore bypass input, phase, fixed-step, combat, terminal and frame authority, then make `getState()` report values that have not reached the visible canvas. The latest audit defines raw-owner quarantine, a capability-scoped command gateway and an immutable committed read model.

## Plan ledger

**Goal:** stop public diagnostics from being an alternate gameplay authority while preserving safe observation and explicit automation capabilities.

- [x] Compare the complete Publish organization inventory with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have ledger and root `.agent` coverage.
- [x] Select only `PhantomCommand` as the oldest eligible repository.
- [x] Trace `window.PhantomMenu`, `window.GameHost`, mutable owner exposure and public mutators.
- [x] Identify the interaction loop, domains, implemented kits and offered services.
- [x] Add the public-host capability authority audit set.
- [x] Preserve Continue, command, combat, terminal, lifecycle and checkpoint dependencies.
- [ ] Implement owner quarantine, typed command admission and committed-frame readback.

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
menu startup
  -> creates mutable menu/settings/audio state
  -> publishes window.PhantomMenu
  -> public activate(action) can initiate navigation or panels

campaign startup
  -> creates mutable campaign state and camera owners
  -> starts fixed-step update and render RAF
  -> publishes window.GameHost with raw state and camera references

normal play
  -> browser input mutates selection, orders, waves, pause and camera
  -> fixed-step update mutates combat, economy and terminal state
  -> render projects world, HUD, minimap and terminal overlay

public host path
  -> external code directly mutates GameHost.state or GameHost.camera
  -> or calls startWave, build or setZoom outside typed admission
  -> getState independently samples the mutable owners
  -> the visible canvas may still represent the previous RAF
```

## Latest finding

```txt
window.GameHost.state = live gameplay owner
window.GameHost.camera = live camera owner
window.GameHost.startWave/build/setZoom = untyped mutators

external mutation
  -> bypasses input and fixed-step command ordering
  -> bypasses phase, terminal and run-epoch checks
  -> can advance observable state ahead of the rendered frame
```

Concrete examples:

```txt
GameHost.state.won = true
  -> next update is suppressed
  -> next render shows victory without terminal arbitration or save admission

GameHost.setZoom(NaN)
  -> clamp returns NaN
  -> targetZoom and then zoom become NaN
  -> world projection loses finite coordinates

GameHost.state.souls = 999
  -> getState reports 999 immediately
  -> current canvas can still show the previous soul count until the next RAF
```

## Latest composed domain

```txt
phantom-command-public-host-capability-authority-domain
  -> host identity and capability descriptors
  -> raw owner-handle quarantine
  -> immutable committed read model
  -> frame and run provenance
  -> typed command envelope and admission
  -> run, phase and revision fences
  -> bounded command results and journal
  -> compatibility adapter and isolation fixtures
```

## Read first

```txt
.agent/trackers/2026-07-11T23-28-29-04-00/project-breakdown.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/turn-ledger/2026-07-11T23-28-29-04-00.md
.agent/architecture-audit/2026-07-11T23-28-29-04-00-public-host-capability-authority-dsk-map.md
.agent/render-audit/2026-07-11T23-28-29-04-00-uncommitted-host-state-frame-gap.md
.agent/gameplay-audit/2026-07-11T23-28-29-04-00-public-owner-bypass-loop.md
.agent/interaction-audit/2026-07-11T23-28-29-04-00-window-gamehost-command-admission-map.md
.agent/host-capability-audit/2026-07-11T23-28-29-04-00-owner-quarantine-read-model-command-contract.md
.agent/deploy-audit/2026-07-11T23-28-29-04-00-public-host-isolation-fixture-gate.md
```

## Guardrails

```txt
Push only to main.
Create no branches or pull requests.
Do not work on TheCavalryOfRome.
Do not expose mutable runtime owner references through public diagnostics.
Do not report command success without a typed result.
Do not call sampled mutable state a committed frame.
Do not claim host isolation or read-model coherence until fixtures pass.
```
