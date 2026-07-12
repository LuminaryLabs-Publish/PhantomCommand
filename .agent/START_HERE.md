# PhantomCommand Agent Start

**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Branch:** `main`  
**Last aligned:** `2026-07-12T09-28-05-04-00`

## Summary

PhantomCommand is a static pixel-isometric campaign game with a procedural graveyard menu, CRT WebGL presentation, browser audio, direct controls, fixed-step combat, persistence and public diagnostics.

The current audit isolates **menu pointer-hit admission**. A canvas `pointerdown` always activates the currently selected menu item when no panel is open, even when the pointer misses every menu row or lands in a letterbox margin. In the settings panel, every pointerdown activates the currently selected row even when no row was hit.

## Plan ledger

**Goal:** require a current, explicit hit-test result before a pointer event can execute a menu or settings action, while preserving keyboard selection and activation as a separate admitted path.

- [x] Compare all ten accessible Publish repositories with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger and root `.agent` coverage.
- [x] Select only `PhantomCommand` as the oldest eligible repository.
- [x] Inspect canvas containment, source-coordinate projection, menu and panel hit tests, pointer movement, pointer activation and hidden-button activation.
- [x] Identify the complete interaction loop, all active domains, all 20 implemented kits and their services.
- [x] Define hit identity, target generation, activation admission, typed miss results, observations and browser fixtures.
- [x] Update documentation on `main`; create no branch or pull request.
- [ ] Runtime implementation and executable pointer-target fixtures remain future work.

## Read this first

```txt
.agent/trackers/2026-07-12T09-28-05-04-00/project-breakdown.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/architecture-audit/2026-07-12T09-28-05-04-00-menu-pointer-hit-admission-dsk-map.md
.agent/render-audit/2026-07-12T09-28-05-04-00-letterbox-pointer-visible-target-gap.md
.agent/gameplay-audit/2026-07-12T09-28-05-04-00-background-click-begin-campaign-loop.md
.agent/interaction-audit/2026-07-12T09-28-05-04-00-pointer-hit-command-admission-map.md
.agent/pointer-input-audit/2026-07-12T09-28-05-04-00-hit-result-target-generation-contract.md
.agent/deploy-audit/2026-07-12T09-28-05-04-00-pointer-target-browser-fixture-gate.md
.agent/turn-ledger/2026-07-12T09-28-05-04-00.md
.agent/kit-registry.json
```

## Current interaction loop

```txt
page boot
  -> create 480x270 source canvas, graveyard art and CRT renderer
  -> read settings and save presence
  -> install pointer and keyboard handlers
  -> start recursive RAF

pointer move
  -> project viewport coordinates into source coordinates
  -> update hover selection only when a menu or settings row is hit

pointer down with no panel
  -> project coordinates
  -> optionally update selection when a row is hit
  -> unconditionally activate the currently selected item

pointer down with settings panel
  -> optionally update selected row when a row is hit
  -> unconditionally activate the currently selected row

keyboard
  -> move selection explicitly
  -> Enter or Space activates the selected command
```

## Main findings

```txt
menu pointer miss rejection: absent
letterbox miss rejection: absent
settings-panel miss rejection: absent
hit target identity: absent
menu/panel generation identity: absent
selection revision fence: absent
pointer activation command ID: absent
typed hit/miss result: absent
pointer-to-action journal: absent
browser pointer-target fixtures: absent
```

## Domains and kit groups

```txt
menu and campaign route shells
menu selection, panels, settings, persistence and transition
viewport-to-source coordinate projection and contain letterboxing
menu and panel hit testing
pointer and keyboard command admission
procedural graveyard and CRT WebGL presentation
Web Audio activation and lifecycle
campaign content, fixed-step simulation, combat and rendering
public menu and campaign host capabilities
validation, static build, Pages and audit tracking
```

Implemented kit count: `20`. The tracker and machine registry contain the complete per-kit service inventory.

## Required parent domain

```txt
phantom-command-menu-pointer-hit-admission-authority-domain
```

It coordinates source-coordinate projection, hit-test identity, target generation, selection revision, pointer-command admission, typed miss results, observations, journals and browser fixtures.

## Ordered architecture queue

```txt
1. Campaign Bootstrap and Continue Resume Authority
2. Campaign Action Result Authority
   2a. Menu Pointer-Hit Admission Authority
   2b. Public Host Owner Quarantine and Typed Command Admission
   2c. CRT Display/Input Projection Authority
   2d. Campaign Phase Admission Authority
   2e. Fixed-Step Scheduling, Replay and Committed Frames
   2f. Public Host Committed Read Model
   2g. Combat and Exclusive Terminal Authorities
3. Runtime Session Lifecycle Authority
   3a. Menu Audio Activation and Lifecycle Authority
4. Versioned Full Campaign Checkpoint Capture Authority
```

Do not treat the current visual selection as proof that a pointer event targeted that selection.