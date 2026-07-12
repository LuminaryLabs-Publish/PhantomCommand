# PhantomCommand Agent Start

**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Branch:** `main`  
**Last aligned:** `2026-07-12T11-40-50-04-00`

## Summary

PhantomCommand is a static pixel-isometric campaign game with a procedural graveyard menu, CRT WebGL presentation, browser audio, direct controls, fixed-step combat, persistence and public diagnostics.

The current audit isolates **campaign world-pointer admission**. The CRT renderer calculates whether a pointer is inside the visible source frame, but campaign selection, orders, camera pan and wheel anchoring ignore that result. The visible shader also curves the sampled source while the CPU input path does not invert that curve.

## Plan ledger

**Goal:** require a current display-correct projection and camera-bound world result before any campaign pointer gesture can mutate gameplay or camera state.

- [x] Compare the complete Publish inventory with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Skip newer unsynchronized `IntoTheMeadow` work.
- [x] Select only `PhantomCommand` as the next-oldest synchronized repository.
- [x] Identify the full interaction loop, all active domains, all 20 implemented kits and their services.
- [x] Trace left, right, middle, drag and wheel input paths.
- [x] Define containment, inverse CRT projection, camera revision, gesture lease, command result and proof contracts.
- [x] Update documentation on `main`; create no branch or pull request.
- [ ] Runtime implementation and executable campaign-pointer fixtures remain future work.

## Read this first

```txt
.agent/trackers/2026-07-12T11-40-50-04-00/project-breakdown.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/architecture-audit/2026-07-12T11-40-50-04-00-campaign-world-pointer-admission-dsk-map.md
.agent/render-audit/2026-07-12T11-40-50-04-00-crt-visible-world-pointer-provenance-gap.md
.agent/gameplay-audit/2026-07-12T11-40-50-04-00-letterbox-pointer-mutates-campaign-loop.md
.agent/interaction-audit/2026-07-12T11-40-50-04-00-campaign-pointer-command-admission-map.md
.agent/campaign-input-audit/2026-07-12T11-40-50-04-00-containment-curve-camera-generation-contract.md
.agent/deploy-audit/2026-07-12T11-40-50-04-00-campaign-pointer-projection-fixture-gate.md
.agent/turn-ledger/2026-07-12T11-40-50-04-00.md
.agent/kit-registry.json
```

## Current interaction loop

```txt
menu
  -> graveyard source canvas and CRT renderer
  -> settings and save-presence read
  -> pointer/keyboard activation
  -> fade and route to campaign

campaign
  -> create 640x360 source world and CRT renderer
  -> install pointer, keyboard, wheel and blur handlers
  -> project client pointer to source coordinates
  -> selection, build, orders, pan and zoom
  -> fixed-step spawning, combat and rewards
  -> source-canvas world/HUD/minimap render
  -> CRT WebGL presentation
```

## Main findings

```txt
inside/outside classification: implemented
campaign containment admission: absent
CRT visible curve: implemented
CPU inverse CRT projection: absent
display generation: absent
camera revision binding: absent
gesture lease: absent
typed campaign pointer result: absent
command-to-frame receipt: absent
browser campaign-pointer fixtures: absent
```

## Domains and kit groups

```txt
menu and campaign route shells
menu state settings persistence audio and transition
CRT contain and curved display projection
pointer keyboard drag wheel focus and lifecycle
campaign selection build orders camera wave and restart
fixed-step simulation combat rewards and terminal state
procedural menu and campaign source rendering
WebGL and Web Audio resources
public host diagnostics
checks static build Pages and audit tracking
```

Implemented kit count: `20`. The current audit, tracker and machine registry contain the complete per-kit service inventory.

## Required parent domain

```txt
phantom-command-campaign-world-pointer-admission-authority-domain
```

It coordinates event/session identity, surface containment, inverse CRT projection, camera revision, gesture ownership, command admission, typed results, observations, journals and browser proof.

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
3. Runtime Session Lifecycle Authority
   3a. Menu Audio Activation and Lifecycle Authority
4. Versioned Full Campaign Checkpoint Capture Authority
```

Do not treat source coordinates as actionable merely because they were calculated. Require current visible-surface, display-transform and camera evidence.