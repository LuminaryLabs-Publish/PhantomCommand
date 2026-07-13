# PhantomCommand Current Audit

**Timestamp:** `2026-07-12T22-00-46-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Status:** `campaign-keyboard-command-admission-authority-audited`

## Summary

The campaign installs global `keydown`, `keyup` and `blur` listeners. Keyboard events are accepted without proving current campaign-route ownership, canvas focus or a non-editable target. One-shot commands do not check `event.repeat`; a held `P` can therefore toggle pause repeatedly. The path has no input generation, command identity, typed result, consumer receipt or visible-frame acknowledgement.

## Plan ledger

**Goal:** admit only current, focus-owned and generation-correct keyboard evidence, then route held movement and one-shot commands through typed results before mutation.

- [x] Compare all eligible Publish repositories and select only `PhantomCommand`.
- [x] Inspect campaign keyboard, blur, camera, phase, navigation, render and static-check paths.
- [x] Identify the complete interaction loop and all active domains.
- [x] Preserve all 20 implemented kits and offered services.
- [x] Define route, focus, repeat, generation, command, result and frame-proof boundaries.
- [x] Add the timestamped tracker and system audits.
- [x] Refresh root `.agent` state and central tracking.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Implement and execute the authority later.

## Selection

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new/ledger-missing/root-agent-missing eligible repositories: 0
selected repository: LuminaryLabs-Publish/PhantomCommand
selection reason: oldest eligible central-ledger entry
excluded repository: LuminaryLabs-Publish/TheCavalryOfRome
```

## Complete interaction loop

```txt
campaign boot
  -> create source canvas, CRT renderer, authored state and mutable camera
  -> attach global keydown, keyup and blur listeners
  -> attach pointer and wheel listeners to the canvas
  -> expose window.GameHost
  -> start RAF

keydown
  -> normalize event.key to lowercase
  -> add key to held Set
  -> no route, focus, editable-target or generation admission
  -> no event.repeat classification
  -> Space starts wave
  -> 1/2/3 select tower type
  -> P toggles pause
  -> R reloads
  -> Escape navigates to menu
  -> F focuses camera and target zoom

simulation and presentation
  -> RAF consumes held WASD/Arrow keys
  -> camera velocity and position advance
  -> accumulator advances update(1/60)
  -> world, HUD and minimap consume mutable state
  -> CRT presents the source canvas
  -> no keyboard result is correlated with the frame

keyup / blur
  -> keyup removes normalized key
  -> blur clears held keys and pointer state
  -> no generation retirement, visibility fence or listener teardown
```

## Source-backed findings

```txt
global keydown listener: yes
global keyup listener: yes
global blur listener: yes
route/surface focus admission: no
editable-target exclusion: no
event.repeat policy: no
held movement keys: WASD and Arrow keys
one-shot keys: Space, 1, 2, 3, P, F, R, Escape
keyboard sample/command ID: no
monotonic keyboard sequence: no
keyboard/focus generation: no
duplicate command rejection: no
stale generation rejection: no
visibilitychange/pagehide/pageshow handling: no
listener teardown: no
typed keyboard result: no
consumer receipts: no
first visible keyboard-result frame acknowledgement: no
```

### Exact repeat failure

```txt
physical P press
  -> first keydown toggles paused
  -> browser auto-repeat emits another keydown
  -> repeated keydown toggles paused again
  -> final phase depends on repeat count and timing
```

### Held-state lifecycle gap

Blur clears the live Set, but no keyboard generation is retired. There is no typed clear result, no stale keyup classification after resume, and no visibility or page-lifecycle fence.

### Static proof gap

The campaign check reads source files and asserts expected tokens. It does not dispatch keyboard events, create focus/editable targets, simulate auto-repeat or inspect visible frames.

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
validation, static build, Pages deployment and audit tracking
```

## Implemented kits

```txt
crt-renderer-kit
graveyard-art-kit
menu-route-kit
menu-settings-persistence-kit
menu-save-presence-kit
menu-audio-kit
campaign-route-shell-kit
pixel-campaign-runtime-kit
fixed-step-campaign-simulation-kit
pixel-campaign-render-kit
legacy-gamehost-diagnostics-kit
menu-static-check-kit
campaign-static-check-kit
static-build-copy-kit
pages-deploy-kit
construct-spiral-intro-kit
construct-spiral-schedule-kit
construct-piece-id-kit
construct-piece-state-kit
construct-sequence-update-kit
```

## Offered services

```txt
menu drawing, selection, settings, save-presence scanning, panels, fade and routing
viewport containment, screen-to-source projection and CRT presentation
keyboard, pointer, wheel and hidden-control activation
AudioContext ambience, UI tones and delayed close
campaign state, held movement, one-shot shortcuts, selection, building, orders, waves, pause, camera and restart
fixed-step spawning, movement, targeting, projectiles, damage, rewards and terminal mutation
world, HUD, minimap and overlay rendering
public snapshots and direct mutation capabilities
construction intro scheduling and piece-state updates
source checks, static build and GitHub Pages deployment
```

## Required authority

```txt
phantom-command-campaign-keyboard-command-admission-authority-domain
```

### Required transaction

```txt
KeyboardEvent
  -> route/surface/focus admission
  -> editable-target exclusion
  -> session generation and monotonic sequence admission
  -> held-state or one-shot classification
  -> repeat, duplicate and stale rejection
  -> generation-bound HeldStateTransitionResult
     or typed CampaignKeyboardCommand
  -> Campaign Action / Camera / Navigation consumer result
  -> terminal CampaignKeyboardResult
  -> first visible successor-frame acknowledgement
```

## Candidate kits

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

## Current output

```txt
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

Documentation only. Runtime, keyboard, campaign, camera, navigation, rendering, package scripts, dependencies and deployment were not changed. No executable keyboard fixture was run.