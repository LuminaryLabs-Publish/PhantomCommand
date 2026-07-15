# PhantomCommand Agent Start

**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Branch:** `main`  
**Last aligned:** `2026-07-15T18-39-30-04-00`  
**Status:** `campaign-pointer-feedback-projection-authority-audited`

## Summary

PhantomCommand is a static pixel-isometric campaign with procedural Canvas2D menu art, browser audio, fixed-step combat, Canvas2D world/HUD/minimap rendering and WebGL CRT presentation. The current audit isolates campaign pointer feedback: `game.html` hides the native cursor, while the normal campaign frame renders no replacement cursor, hover reticle, selection candidate, order anchor or build-pad hover state.

## Plan ledger

**Goal:** give every admitted pointer sample one visible, revision-bound candidate before selection, build, order, pan or zoom commits.

- [x] Compare all 11 Publish repositories with ten eligible central ledgers and root `.agent` states.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm no new, missing, undocumented or runtime-ahead eligible repository.
- [x] Select only PhantomCommand through the oldest synchronized rule.
- [x] Identify the full interaction loop, domains, all 20 implemented kits and their services.
- [x] Define the 19-surface pointer-feedback authority family.
- [x] Add the timestamped audit family and refresh root agent state.
- [ ] Implement pointer-feedback projection and executable browser fixtures.

## Read this first

```txt
.agent/trackers/2026-07-15T18-39-30-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-15T18-39-30-04-00.md
.agent/architecture-audit/2026-07-15T18-39-30-04-00-campaign-pointer-feedback-projection-dsk-map.md
.agent/render-audit/2026-07-15T18-39-30-04-00-hidden-pointer-no-hover-frame-gap.md
.agent/gameplay-audit/2026-07-15T18-39-30-04-00-targeting-without-visible-pointer-loop.md
.agent/interaction-audit/2026-07-15T18-39-30-04-00-pointer-affordance-command-result-map.md
.agent/pointer-feedback-audit/2026-07-15T18-39-30-04-00-cursor-hover-reticle-contract.md
.agent/deploy-audit/2026-07-15T18-39-30-04-00-pointer-feedback-browser-fixture-gate.md
.agent/central-sync-audit/2026-07-15T18-39-30-04-00-oldest-selection-pointer-feedback-reconciliation.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
```

The menu-audio audit at `2026-07-15T13-41-25-04-00`, public-capability audit at `2026-07-15T08-41-37-04-00`, device-control audit at `2026-07-15T03-24-35-04-00`, render-order audit at `2026-07-14T23-38-29-04-00` and all earlier pause, terminal, startup, settings, save, lifecycle, scheduler, WebGL, accessibility, spatial-input, keyboard-input and combat audits remain active.

## Current mismatch

```txt
public campaign canvas
  -> cursor:none

pointer sample
  -> project screen to source
  -> store x y and inside

normal frame
  -> draw world HUD minimap and CRT
  -> draw no pointer reticle or hover candidate

command commit
  -> resolve unit pad enemy or ground candidate
  -> mutate selection build order or camera state
  -> show only post-commit state or effects
```

## Required authority

```txt
phantom-command-campaign-pointer-feedback-projection-authority-domain
```