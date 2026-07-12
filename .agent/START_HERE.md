# PhantomCommand Agent Start

**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Branch:** `main`  
**Last aligned:** `2026-07-12T11-48-43-04-00`

## Summary

PhantomCommand is a static pixel-isometric campaign game with a procedural graveyard menu, CRT WebGL presentation, browser audio, direct controls, fixed-step combat, persistence and public diagnostics.

The current audit isolates **runtime-session and resource lifecycle ownership**. Menu and campaign routes allocate recursive RAF loops, anonymous listeners, WebGL resources, optional Web Audio resources and public hosts without a session generation, aggregate resource ledger, context-loss recovery or idempotent retirement result.

## Plan ledger

**Goal:** make startup, active callbacks, route transitions, WebGL context recovery and teardown part of one explicit runtime-session transaction.

- [x] Compare the complete Publish inventory with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `PhantomCommand` because repo-local audit state was newer than central tracking.
- [x] Identify the full interaction loop, all active domains, all 20 implemented kits and their services.
- [x] Trace menu/campaign RAF, listeners, timers, WebGL, audio, navigation and public-host ownership.
- [x] Define lifecycle phases, resource leases, retirement results, context generations and browser proof.
- [x] Update documentation on `main`; create no branch or pull request.
- [ ] Runtime implementation and executable lifecycle fixtures remain future work.

## Read this first

```txt
.agent/trackers/2026-07-12T11-48-43-04-00/project-breakdown.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/architecture-audit/2026-07-12T11-48-43-04-00-runtime-session-resource-lifecycle-dsk-map.md
.agent/render-audit/2026-07-12T11-48-43-04-00-webgl-resource-retirement-context-gap.md
.agent/gameplay-audit/2026-07-12T11-48-43-04-00-menu-campaign-raf-lifecycle-loop.md
.agent/interaction-audit/2026-07-12T11-48-43-04-00-session-retirement-admission-map.md
.agent/runtime-lifecycle-audit/2026-07-12T11-48-43-04-00-raf-listener-webgl-audio-resource-contract.md
.agent/deploy-audit/2026-07-12T11-48-43-04-00-runtime-lifecycle-browser-fixture-gate.md
.agent/turn-ledger/2026-07-12T11-48-43-04-00.md
.agent/kit-registry.json
```

## Current interaction loop

```txt
menu boot
  -> source canvas and graveyard art
  -> CRT WebGL allocation
  -> settings/save reads and listeners
  -> optional AudioContext graph
  -> recursive RAF
  -> PhantomMenu publication

menu transition
  -> fade while RAF/audio continue
  -> location navigation
  -> browser destruction is implicit teardown

campaign boot
  -> source canvas and CRT WebGL allocation
  -> campaign, camera and input state
  -> global/canvas listeners
  -> recursive fixed-step RAF
  -> GameHost publication

campaign frame
  -> input and camera
  -> fixed-step simulation
  -> world/HUD/minimap source draw
  -> CRT upload and presentation
  -> successor RAF
```

## Main findings

```txt
runtime session identity: absent
lifecycle phase/generation: absent
RAF cancellation lease: absent
listener and timer registries: absent
WebGL resource inventory/dispose: absent
context loss/restoration handling: absent
AudioContext retirement receipt: absent
public host revocation: absent
stale callback rejection: absent
repeated-session browser fixtures: absent
```

## Domains and kit groups

```txt
menu and campaign route shells
runtime-session startup active failure transition and retirement
RAF timer listener pointer keyboard wheel focus and page lifecycle
CRT source/display projection and WebGL resources
Web Audio resource ownership
campaign state commands simulation and rendering
public hosts diagnostics validation build Pages and audit tracking
```

Implemented kit count: `20`. The current audit, tracker and machine registry contain the complete per-kit service inventory.

## Required parent domain

```txt
phantom-command-runtime-session-resource-lifecycle-authority-domain
```

It coordinates session identity, phases, RAF/listener/timer leases, WebGL context generations and inventories, audio ownership, route retirement, host revocation, typed results, observations, journals and browser proof.

## Ordered architecture queue

```txt
1. Campaign Bootstrap and Continue Resume Authority
2. Campaign Action Result Authority
   2a. Menu Pointer-Hit Admission Authority
   2b. Campaign World-Pointer Admission Authority
   2c. Public Host Owner Quarantine and Typed Command Admission
   2d. CRT Display/Input Projection Authority
   2e. Campaign Phase Admission Authority
   2f. Fixed-Step Scheduling, Replay and Committed Frames
   2g. Public Host Committed Read Model
   2h. Combat and Exclusive Terminal Authorities
3. Runtime Session Resource Lifecycle Authority
   3a. Menu Audio Activation and Lifecycle Authority
4. Versioned Full Campaign Checkpoint Capture Authority
```

Do not treat browser navigation as a sufficient lifecycle contract. Completion requires explicit callback, WebGL, audio and public-host retirement with real-browser evidence.