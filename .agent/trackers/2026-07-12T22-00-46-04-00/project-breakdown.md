# PhantomCommand Project Breakdown

**Timestamp:** `2026-07-12T22-00-46-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Branch:** `main`  
**Status:** `campaign-keyboard-command-admission-authority-audited`

## Summary

PhantomCommand is a static pixel-isometric campaign game with a procedural graveyard menu, CRT presentation, fixed-step combat, browser persistence and public diagnostics. This breakdown isolates campaign keyboard ownership and one-shot command admission. The campaign installs global `keydown`, `keyup` and `blur` listeners, accepts commands without proving canvas focus or route ownership, does not reject editable targets or repeated keydown events, and mutates campaign, camera and navigation state directly without command identity or terminal results.

A held `P` key can emit repeated `keydown` events and toggle pause repeatedly because the handler never checks `event.repeat`. The same global path directly changes tower type, starts waves, reloads, navigates to the menu and focuses the camera.

## Plan ledger

**Goal:** require every campaign keyboard effect to prove current route, surface, focus, lifecycle generation and command identity before held movement or one-shot actions can mutate campaign, camera or navigation state.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger entries and root `.agent` state.
- [x] Confirm no new, ledger-missing or root-agent-missing repository takes priority.
- [x] Select only `LuminaryLabs-Publish/PhantomCommand` as the oldest eligible central entry.
- [x] Inspect campaign keyboard, blur, held-key, one-shot action, camera, phase, navigation and static-check paths.
- [x] Identify the complete interaction loop and all domains in use.
- [x] Preserve all 20 implemented kits and their offered services.
- [x] Define the Campaign Keyboard Command Admission authority and proposed kit family.
- [x] Add timestamped architecture, render, gameplay, interaction, keyboard-input and deployment audits.
- [x] Refresh every required root `.agent` document and machine registry.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Runtime corrections and executable keyboard fixtures remain future work.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

central last-updated order at selection:
  PhantomCommand     2026-07-12T19-58-07-04-00 selected oldest
  PrehistoricRush    2026-07-12T20-10-25-04-00
  HorrorCorridor     2026-07-12T20-20-02-04-00
  ZombieOrchard      2026-07-12T20-31-27-04-00
  MyCozyIsland       2026-07-12T20-40-56-04-00
  TheUnmappedHouse   2026-07-12T20-51-16-04-00
  AetherVale         2026-07-12T21-15-06-04-00
  TheOpenAbove       2026-07-12T21-31-40-04-00
  IntoTheMeadow      2026-07-12T21-40-09-04-00

excluded: LuminaryLabs-Publish/TheCavalryOfRome
```

Only `LuminaryLabs-Publish/PhantomCommand` is modified in the Publish organization.

## Complete interaction loop

```txt
campaign boot
  -> create source canvas, CRT renderer, authored state and mutable camera
  -> install global keydown and keyup listeners
  -> install global blur listener
  -> expose window.GameHost
  -> start recursive RAF

keydown
  -> lowercase event.key
  -> add key to held-key Set
  -> no route, surface, focus or editable-target admission
  -> no event.repeat policy
  -> Space calls startWave immediately
  -> 1/2/3 mutate towerType immediately
  -> P toggles paused immediately
  -> R reloads the page immediately
  -> Escape navigates to the menu immediately
  -> F mutates camera focus and target zoom immediately

RAF
  -> read held WASD/arrow keys
  -> update camera velocity and position using clamped frame dt
  -> advance fixed-step campaign simulation
  -> draw world, HUD and minimap
  -> present through CRT
  -> no keyboard command result or visible-frame acknowledgement

keyup / blur
  -> keyup removes one normalized key
  -> blur clears held keys and pointer gesture flags
  -> no input generation is retired
  -> no visibilitychange or page-lifecycle fence exists
```

## Source-backed findings

### Keyboard ownership is global

The campaign registers `keydown`, `keyup` and `blur` on the global event target. It does not prove that the campaign canvas or route owns focus before mutating gameplay, camera or navigation state.

### One-shot commands accept repeat events

The keydown handler never checks `event.repeat`. A held `P` can toggle pause on every repeat event. Space, R, Escape and F also re-enter their command paths on repeated keydown events, even where downstream guards make some effects idempotent.

### Editable targets are not excluded

The handler does not reject input originating from buttons, links, text fields, developer overlays or future editor controls. Campaign shortcuts therefore remain globally active if interactive DOM controls are added or focused.

### Lifecycle fencing is incomplete

Blur clears current held keys, but no keyboard session ID, focus generation, visibility generation or page lifecycle generation exists. There is no `visibilitychange`, `pagehide`, `pageshow` or teardown result, and the global listeners are never removed.

### Commands and results are anonymous

No keyboard sample ID, command ID, sequence, duplicate rejection, stale-generation rejection, typed no-op result, consumption receipt or first-visible-frame acknowledgement exists. Static checks only assert source tokens and do not dispatch keyboard events.

## Domains in use

```txt
menu and campaign route shells
menu settings, save presence, panels, fade, navigation and audio
browser document, canvas and hidden accessibility surfaces
CRT aspect containment, curvature, aberration, grain, vignette and fade
browser keyboard, pointer, wheel, blur and context-menu input
campaign route, input-surface and focus ownership
keyboard held-state and one-shot command mapping
campaign phase, pause, restart and terminal outcomes
camera pan, focus and zoom
selection, selected-pad state, building and orders
economy, tower type, pad occupancy and construction
wave phase, spawn queue and progression
fixed-step spawning, movement, targeting, combat, projectiles, damage and rewards
world, HUD, minimap and terminal rendering
public GameHost commands and readback
browser persistence
source checks, static build, Pages deployment and audit tracking

missing:
keyboard session and focus generations
editable-target exclusion and repeat policy
command identity, sequence, duplicate and stale rejection
held-state lifecycle fence and typed clear result
one-shot command results and consumer receipts
first visible keyboard-result frame acknowledgement
```

## Implemented kits and offered services

```txt
crt-renderer-kit: WebGL context, shader program, source texture, aspect containment, CRT effects, screen-to-source projection
graveyard-art-kit: procedural graveyard menu drawing
menu-route-kit: menu state, selection, panels, fade and navigation
menu-settings-persistence-kit: settings read/write and presentation options
menu-save-presence-kit: browser storage presence scan
menu-audio-kit: AudioContext, ambience, tones and delayed close
campaign-route-shell-kit: game document and canvas route
pixel-campaign-runtime-kit: authored state, keyboard/pointer ingress, selection, building, orders, camera and pause
fixed-step-campaign-simulation-kit: spawn, movement, targeting, combat, projectiles, rewards and outcomes
pixel-campaign-render-kit: world, entities, HUD, minimap, overlays and CRT presentation
legacy-gamehost-diagnostics-kit: public snapshot and direct mutation capabilities
menu-static-check-kit: static menu source assertions
campaign-static-check-kit: static campaign source assertions
static-build-copy-kit: static dist assembly
pages-deploy-kit: GitHub Pages publication
construct-spiral-intro-kit: construction intro composition
construct-spiral-schedule-kit: construction timing schedule
construct-piece-id-kit: stable construction piece identity
construct-piece-state-kit: construction piece state
construct-sequence-update-kit: construction sequence progression
```

```txt
implemented source-backed kits: 20
planned keyboard-admission authority kits: 28
```

## Required parent domain

```txt
phantom-command-campaign-keyboard-command-admission-authority-domain
```

This authority coordinates the existing route, input, phase, camera, campaign action, render and lifecycle owners. It does not replace campaign action semantics.

## Candidate coordinating kits

```txt
campaign-keyboard-surface-id-kit
campaign-keyboard-session-generation-kit
campaign-keyboard-focus-generation-kit
campaign-key-event-envelope-kit
campaign-key-sequence-kit
campaign-key-repeat-policy-kit
campaign-editable-target-exclusion-kit
campaign-key-command-map-kit
campaign-held-input-state-kit
campaign-one-shot-command-kit
campaign-key-command-id-kit
duplicate-key-command-rejection-kit
stale-key-generation-rejection-kit
campaign-key-lifecycle-fence-kit
campaign-key-clear-result-kit
campaign-key-command-result-kit
campaign-camera-input-consumption-receipt-kit
campaign-phase-command-consumption-receipt-kit
campaign-navigation-command-result-kit
campaign-keyboard-observation-kit
campaign-keyboard-journal-kit
campaign-keyboard-visible-frame-ack-kit
key-repeat-pause-fixture-kit
editable-target-key-fixture-kit
blur-visibility-generation-fixture-kit
held-movement-release-fixture-kit
duplicate-one-shot-fixture-kit
browser-pages-keyboard-smoke-kit
```

## Required transaction

```txt
KeyboardEvent
  -> verify current campaign route and input surface
  -> verify focus generation and reject editable targets
  -> normalize physical/logical key under an explicit mapping policy
  -> classify held-state versus one-shot action
  -> reject unsupported, stale or duplicate evidence
  -> apply repeat policy before one-shot command construction
  -> allocate sample, sequence and command identity
  -> held movement: update generation-bound held state
  -> one-shot action: produce typed CampaignKeyboardCommand
  -> feed accepted commands into Campaign Action Result Authority
  -> publish one terminal CampaignKeyboardResult
  -> collect camera/phase/navigation consumption receipts
  -> acknowledge the first visible frame citing the terminal result
```

Lifecycle boundaries must retire the current keyboard generation, clear held state exactly once, reject predecessor-generation events and remove listeners during route teardown.

## Required invariants

```txt
P toggles pause at most once per physical press
R and Escape execute at most once per admitted command
focused editable controls receive no campaign shortcuts
inactive or retired campaign surfaces receive zero mutation
blur, visibility loss and page teardown retire predecessor held state
keyup from another generation cannot change current held state
one command ID produces at most one terminal result
rejected evidence produces zero campaign, camera or navigation mutation
first visible frame cites accepted keyboard and campaign-action results
source, built output and Pages fixtures agree
```

## Repo-local output

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
.agent/trackers/2026-07-12T22-00-46-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-12T22-00-46-04-00.md
.agent/architecture-audit/2026-07-12T22-00-46-04-00-campaign-keyboard-command-admission-authority-dsk-map.md
.agent/render-audit/2026-07-12T22-00-46-04-00-keyboard-result-visible-frame-gap.md
.agent/gameplay-audit/2026-07-12T22-00-46-04-00-global-key-repeat-campaign-loop.md
.agent/interaction-audit/2026-07-12T22-00-46-04-00-key-event-command-consumption-result-map.md
.agent/keyboard-input-audit/2026-07-12T22-00-46-04-00-focus-repeat-generation-contract.md
.agent/deploy-audit/2026-07-12T22-00-46-04-00-campaign-keyboard-browser-fixture-gate.md
```

## Validation boundary

Documentation only. Runtime, keyboard, campaign, camera, navigation, rendering, package scripts, dependencies and deployment are unchanged. No executable keyboard fixture was run.