# PhantomCommand Agent Start

**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Last aligned:** `2026-07-11T19-48-09-04-00`

## Summary

PhantomCommand allocates both menu and campaign runtimes at module scope. Each page starts an untracked recursive RAF, installs anonymous listeners, publishes mutable globals and creates CRT WebGL resources without a dispose service; the menu can also own an AudioContext and delayed close timer. Navigation, reload and Escape rely on document replacement rather than an admitted teardown transaction, and no pagehide/pageshow or bfcache policy fences retained callbacks.

## Plan ledger

**Goal:** preserve the complete architecture map while routing implementation toward one session-fenced lifecycle that can stop, dispose, navigate and restart without leaked callbacks, WebGL resources, audio ownership or stale globals.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger and root `.agent` coverage.
- [x] Select only `PhantomCommand` as the oldest eligible repository.
- [x] Trace menu and campaign startup, RAF, listeners, audio, CRT resources, globals, navigation and restart.
- [x] Catalogue all domains, implemented kits and offered services.
- [x] Add the runtime-session lifecycle audit set.
- [x] Push documentation directly to `main` without a branch or pull request.
- [ ] Implement and fixture-gate the documented authority boundaries.

## Current implementation queue

```txt
1. Continue Capability Resolver
2. Campaign Action Result Authority
   2a. CRT Display/Input Projection Authority
   2b. Campaign Phase Admission Authority
   2c. Fixed-Step Command Scheduling, Replay and Committed Frame Authority
   2d. Combat Resolution and Entity Liveness Authority
   2e. Exclusive Terminal Outcome Transaction
3. Runtime Session Lifecycle Authority
   + Menu/Campaign Teardown, bfcache and Restart Leak Fixture Gate
4. Versioned Campaign Checkpoint Authority
```

## Current interaction loop

```txt
menu module evaluation
  -> create source canvas, graveyard art and CRT WebGL resources
  -> read settings and save presence
  -> install canvas, document and hidden-button listeners
  -> lazily create AudioContext, oscillators, buffer source and close timer
  -> schedule an untracked recursive RAF
  -> publish window.PhantomMenu

Begin or Continue
  -> set a fade target
  -> RAF repeatedly checks elapsed time
  -> assign window.location.href
  -> rely on browser navigation for cleanup

campaign module evaluation
  -> create source canvas and CRT WebGL resources
  -> construct map, camera, input and mutable state
  -> install canvas and window listeners
  -> schedule an untracked recursive RAF
  -> publish mutable window.GameHost

restart or exit
  -> location.reload() or location.href
  -> no typed stop, dispose, retirement receipt or generation fence
```

## Latest composed domain

```txt
phantom-command-runtime-session-lifecycle-authority-domain
  -> session and runtime generation identity
  -> lifecycle phase and command admission
  -> RAF, listener, timer, audio, CRT and global leases
  -> stale-callback fencing
  -> reverse-order retirement
  -> navigation and restart results
  -> first replacement-session frame
  -> lifecycle journal and fixtures
```

## Read first

```txt
.agent/trackers/2026-07-11T19-48-09-04-00/project-breakdown.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/turn-ledger/2026-07-11T19-48-09-04-00.md
.agent/architecture-audit/2026-07-11T19-48-09-04-00-runtime-session-lifecycle-dsk-map.md
.agent/render-audit/2026-07-11T19-48-09-04-00-crt-webgl-retirement-frame-gap.md
.agent/gameplay-audit/2026-07-11T19-48-09-04-00-menu-campaign-navigation-restart-loop.md
.agent/interaction-audit/2026-07-11T19-48-09-04-00-stop-dispose-navigate-restart-admission-map.md
.agent/runtime-lifecycle-audit/2026-07-11T19-48-09-04-00-resource-lease-retirement-contract.md
.agent/deploy-audit/2026-07-11T19-48-09-04-00-lifecycle-teardown-fixture-gate.md
```

## Guardrails

```txt
Push only to main.
Create no branches or pull requests.
Do not work on TheCavalryOfRome.
Do not add more global mutation surfaces.
Do not treat page navigation as proof of deterministic disposal.
Do not claim restart safety until lifecycle fixtures pass.
```
