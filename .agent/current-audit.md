# PhantomCommand Current Audit

**Timestamp:** `2026-07-13T02-49-07-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Status:** `accessible-command-focus-projection-authority-central-reconciled`

## Summary

The visual canvas menu, hidden DOM controls and global keyboard handler do not share one command/focus authority. `index.html` exposes four focusable hidden buttons. `graveyard-menu.js` separately tracks `menu.selected`, intercepts Enter/Space at `document`, and also installs native click handlers on those buttons. A focused button can therefore generate a document command for the visual selection and a native click command for the focused control. Panel state changes the document command target without moving or constraining DOM focus. The campaign route then exposes only static instructions, so souls, sanctum health, wave, pause, win and loss state never reach an accessible read model.

## Plan ledger

**Goal:** require all visual, native, keyboard, assistive and public activation paths to resolve one exact command against one current focus and availability revision.

- [x] Compare the full Publish repository list with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only PhantomCommand by the oldest eligible central timestamp.
- [x] Read `index.html`, `game.html`, menu, campaign, CRT, checks and agent state.
- [x] Identify the interaction loop and all domains.
- [x] Preserve all 20 implemented kits and services.
- [x] Define command identity, focus scope, availability, status and acknowledgement boundaries.
- [x] Add the timestamped audit family and central reconciliation.
- [ ] Implement and execute the authority later.

## Selection

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0
unsynchronized eligible repositories: 0

PhantomCommand     2026-07-13T00-40-00-04-00 selected
PrehistoricRush    2026-07-13T00-58-50-04-00
HorrorCorridor     2026-07-13T01-08-28-04-00
ZombieOrchard      2026-07-13T01-18-20-04-00
MyCozyIsland       2026-07-13T01-40-00-04-00
TheUnmappedHouse   2026-07-13T01-49-49-04-00
AetherVale         2026-07-13T02-15-51-04-00
TheOpenAbove       2026-07-13T02-18-03-04-00
IntoTheMeadow      2026-07-13T02-28-51-04-00
TheCavalryOfRome   excluded
```

## Complete interaction loop

```txt
menu boot
  -> create canvas visual menu
  -> expose four hidden native buttons
  -> read settings and save presence
  -> initialize visual selection independently from DOM focus

visual keyboard path
  -> document keydown receives Arrow/WASD/Enter/Space/Escape
  -> Arrow/WASD changes visual menu.selected or panel.selected
  -> Enter/Space activates visual menu.selected or panel.selected

native control path
  -> Tab changes DOM focus among hidden buttons
  -> Enter/Space bubbles through document keydown
  -> browser may then dispatch native click for the focused button
  -> button click resolves data-menu-action independently

panel path
  -> Settings or Credits opens only in canvas state
  -> DOM focus stays on the prior hidden control
  -> hidden nav remains active
  -> document Enter/Space now targets panel.selected
  -> native click still targets the focused nav button

campaign path
  -> role=application canvas and static assistive instructions
  -> global keyboard/pointer commands mutate campaign
  -> fixed-step simulation and CRT render
  -> dynamic status remains canvas-only
```

## Source-backed findings

### Focused and selected identities can diverge

The native buttons identify `new`, `continue`, `settings` and `credits`. The document keydown handler does not inspect the focused element; it activates `menu.items[menu.selected]` or the active panel row. The native button click handler separately activates the button's `data-menu-action`.

### Native Enter/Space can produce two attempts

A focused button keyboard activation can pass through the document handler and then produce a native click. No event-sequence identity or deduplication result exists.

### Transition ownership hides disagreement

`beginTransition()` ignores later transitions after `transitionStartedAt` is set. If document and native commands disagree, the first route wins rather than publishing a conflict result.

### Continue availability is visual-only

The visual Continue item uses `enabled: hasCampaignSave()`. The hidden Continue button is never assigned `disabled` or `aria-disabled`, so it stays focusable and announced as available when the visual state says `EMPTY`.

### Panel focus is unowned

Opening Settings or Credits does not transfer focus, make background controls inert or restore an invoking control on close. Hidden navigation remains live while panel state changes the meaning of Enter/Space.

### Campaign status is inaccessible

`game.html` contains static instructional text inside `aria-live="polite"`, but it is never updated. Souls, sanctum health, wave, selected tower, action messages, pause, victory and defeat remain pixel-only.

### Public activation bypasses evidence

`window.PhantomMenu.activate(action)` has no focus generation, source identity, availability revision or typed result.

## Domains in use

```txt
menu and campaign route shells
browser document, canvas, hidden controls and accessibility tree
visual menu selection and panel state
DOM focus, native button activation and keyboard dispatch
menu settings, save presence, panels, fade, navigation and audio
accessible command identity, source, deduplication and availability
focus scope, panel transfer, inertness and restoration
CRT containment, curvature, aberration, grain, vignette and fade
campaign keyboard, pointer, wheel, blur and context-menu input
campaign state, camera, selection, building, waves, combat and outcomes
campaign accessible command and dynamic status projection
world, HUD, minimap and terminal rendering
public menu and campaign diagnostics
source checks, static build, Pages deployment and audit tracking
```

## Implemented kits and offered services

```txt
crt-renderer-kit: WebGL context, source texture, containment, effects and screen-to-source projection
graveyard-art-kit: procedural visual menu and panels
menu-route-kit: visual selection, panel state, activation, fade and navigation
menu-settings-persistence-kit: settings read/write
menu-save-presence-kit: save-key presence scan
menu-audio-kit: ambience, UI tones and delayed close
campaign-route-shell-kit: campaign document, canvas and static assistive description
pixel-campaign-runtime-kit: state, input, selection, building, orders, pause and camera
fixed-step-campaign-simulation-kit: waves, movement, targeting, projectiles, damage and outcomes
pixel-campaign-render-kit: world, HUD, minimap and terminal overlays
legacy-gamehost-diagnostics-kit: public state and direct capabilities
menu-static-check-kit: menu source-marker checks
campaign-static-check-kit: campaign source-marker checks
static-build-copy-kit: deployable static copy
pages-deploy-kit: GitHub Pages deployment
construct-spiral-intro-kit: construction intro choreography
construct-spiral-schedule-kit: ring and piece timing
construct-piece-id-kit: stable construction identity
construct-piece-state-kit: construction state projection
construct-sequence-update-kit: sequence advancement
```

## Required authority

```txt
phantom-command-accessible-command-focus-projection-authority-domain
```

## Required transaction

```txt
ActivationEvidence
  -> identify source: visual pointer, global keyboard, native control, assistive technology or public host
  -> bind surface, focus generation and visual-selection revision
  -> resolve exactly one stable command ID
  -> verify focused-control and visual-command agreement
  -> verify enabled/disabled availability
  -> reject stale, duplicate, conflicting or unavailable evidence
  -> commit one MenuCommandResult or CampaignCommandResult
  -> apply panel focus transfer/inertness/restoration policy
  -> project native control state and dynamic campaign status
  -> acknowledge the first matching visual and accessible result
```

## Candidate kits

```txt
accessible-surface-id-kit
accessible-focus-generation-kit
accessible-control-id-kit
visual-command-id-kit
native-control-command-id-kit
command-source-identity-kit
focused-control-binding-kit
visual-selection-binding-kit
accessible-command-envelope-kit
accessible-command-deduplication-kit
accessible-availability-projection-kit
panel-focus-scope-kit
panel-background-inertness-kit
panel-focus-transfer-kit
panel-focus-restore-kit
settings-control-projection-kit
credits-content-projection-kit
campaign-focus-admission-kit
campaign-accessible-command-kit
campaign-status-read-model-kit
campaign-live-region-projection-kit
accessible-command-result-kit
first-accessible-result-ack-kit
native-enter-space-activation-fixture-kit
disabled-continue-projection-fixture-kit
panel-focus-isolation-fixture-kit
campaign-live-status-fixture-kit
accessibility-source-build-pages-parity-fixture-kit
```

## Validation boundary

This is documentation-only. No HTML, JavaScript, gameplay, focus behavior, accessibility tree, build script or deployment workflow changed.
