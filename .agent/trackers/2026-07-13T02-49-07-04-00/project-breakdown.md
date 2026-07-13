# PhantomCommand Project Breakdown

**Timestamp:** `2026-07-13T02-49-07-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Branch:** `main`  
**Status:** `accessible-command-focus-projection-authority-central-reconciled`

## Summary

PhantomCommand contains a visual canvas menu, hidden native buttons, global keyboard input, Settings/Credits panels, a fixed-step pixel campaign, CRT rendering, browser storage and public diagnostics. This breakdown isolates Accessible Command and Focus Projection Authority. Visual selection, DOM focus and native activation do not share one command identity; Enter/Space can attempt different actions, visual Continue availability is not projected to the native button, panels do not own focus, and campaign state has no dynamic accessible read model.

## Plan ledger

**Goal:** make visual, native, keyboard, assistive and public activation converge on one stable command/result and one focus/availability generation.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Find no new, missing or unsynchronized eligible repository.
- [x] Select only PhantomCommand as the oldest eligible central entry.
- [x] Inspect menu DOM, visual state, keyboard, pointer, panels, transitions, campaign shell and status output.
- [x] Identify all domains, all 20 implemented kits and all offered services.
- [x] Define the parent authority and 28 candidate kits.
- [x] Add the complete timestamped audit family.
- [x] Refresh root agent state and central tracking.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Runtime implementation and fixtures remain future work.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
central ledger entries: 9
root .agent folders: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-agent-missing eligible repositories: 0
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

Only `LuminaryLabs-Publish/PhantomCommand` is modified in the Publish organization.

## Complete interaction loop

```txt
menu boot
  -> create 480 x 270 visual source canvas
  -> expose four hidden native buttons
  -> read settings and raw save presence
  -> create visual menu.selected and panel state
  -> start CRT RAF

menu visual navigation
  -> Arrow/WASD changes visual selection
  -> pointer hover changes visual selection
  -> canvas pointerdown activates visual selection

menu native navigation
  -> Tab changes DOM focus among hidden buttons
  -> document keydown receives Enter/Space
  -> document handler activates visual selection or panel selection
  -> browser may dispatch native button click
  -> click handler activates focused button identity
  -> no shared command ID or deduplication receipt

panel flow
  -> visual Settings/Credits panel opens
  -> DOM focus stays on previous hidden button
  -> hidden nav remains active
  -> Enter/Space meaning changes to panel action
  -> native click can still invoke menu action

campaign flow
  -> role=application canvas and static live instructions
  -> global keyboard/pointer commands mutate campaign
  -> fixed-step simulation advances
  -> world/HUD/minimap/terminal pixels render
  -> no dynamic accessible status or result acknowledgement
```

## Domains in use

```txt
route shell and document lifecycle
canvas visual menu and campaign presentation
hidden native menu controls and accessibility tree
visual selection, DOM focus and activation-source identity
keyboard, pointer, wheel, blur and native click input
menu settings, save presence, panels, transition and audio
focus scope, modal isolation and restoration
accessible availability and result projection
CRT containment, curvature, grain, vignette and fade
campaign state, camera, selection, construction and orders
wave progression, units, projectiles, damage and outcomes
campaign status read model and accessible announcements
public menu/campaign capabilities
static checks, build, Pages and audit tracking
```

## Implemented kits and services

| Kit | Offered services |
|---|---|
| `crt-renderer-kit` | WebGL context, source texture, containment, CRT effects, screen-to-source projection |
| `graveyard-art-kit` | Procedural menu, panels and visual selection drawing |
| `menu-route-kit` | Menu state, selection, panels, transition and navigation |
| `menu-settings-persistence-kit` | Settings load/store |
| `menu-save-presence-kit` | Save-key presence scan |
| `menu-audio-kit` | AudioContext, ambience, tones and delayed close |
| `campaign-route-shell-kit` | Campaign document, canvas and static assistive description |
| `pixel-campaign-runtime-kit` | State, input, selection, building, orders, pause and camera |
| `fixed-step-campaign-simulation-kit` | Waves, movement, targeting, projectiles, damage, rewards and outcomes |
| `pixel-campaign-render-kit` | World, HUD, minimap, effects and terminal overlays |
| `legacy-gamehost-diagnostics-kit` | Public state and direct capabilities |
| `menu-static-check-kit` | Menu source-marker checks |
| `campaign-static-check-kit` | Campaign source-marker checks |
| `static-build-copy-kit` | Static dist assembly |
| `pages-deploy-kit` | GitHub Pages publication |
| `construct-spiral-intro-kit` | Concentric intro choreography |
| `construct-spiral-schedule-kit` | Ring and piece schedule |
| `construct-piece-id-kit` | Stable piece identity |
| `construct-piece-state-kit` | Piece-state projection |
| `construct-sequence-update-kit` | Sequence advancement |

## Main findings

### Native and visual identity are independent

The native control owns one action ID, while the global keyboard handler activates `menu.selected`. No focus check binds them.

### Enter/Space can produce two attempts

Native activation can include keyboard events and a click. The document handler consumes the keyboard event, then the button click listener can run. No event-sequence deduplication exists.

### Panel state does not own focus

Panels are canvas-only. Focus remains on hidden navigation, background controls are not inert, and close does not restore an explicit invoking control.

### Availability is visually computed only

Continue has a visual `enabled` flag but no native disabled state. Accessible and visual availability can disagree.

### Campaign status is pixel-only

The campaign live region never changes after page load. Dynamic resource, wave, action and terminal results are not projected.

## Required parent domain

```txt
phantom-command-accessible-command-focus-projection-authority-domain
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

## Required transaction

```txt
ActivationEvidence
  -> validate route, accessibility surface and focus generation
  -> bind source identity and event sequence
  -> resolve focused-control and visual-command IDs
  -> require identity agreement or explicit source policy
  -> verify availability revision
  -> suppress duplicate native keyboard/click delivery
  -> commit one typed command result
  -> update focus scope and native projections
  -> publish bounded accessible status
  -> acknowledge the first matching visual and accessible result
```

## Validation

```txt
documentation-only: yes
runtime changed: no
HTML/CSS changed: no
checks run: no
browser fixtures available: no
branch created: no
pull request created: no
```
