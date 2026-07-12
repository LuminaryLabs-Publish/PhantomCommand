# PhantomCommand Current Audit

**Timestamp:** `2026-07-12T09-28-05-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`

## Summary

The current audit isolates menu pointer-hit admission. `screenToSource()` correctly reports whether a pointer lies inside the contained 480x270 source frame, and the menu and settings hit-test functions correctly return `-1` for misses. The `pointerdown` handler then discards that miss result and activates the currently selected command anyway. A background click, letterbox-margin click or settings-panel miss can therefore execute an action that was only selected previously.

## Plan ledger

**Goal:** make pointer activation require a current hit-test result bound to the active menu or panel generation, without changing runtime behavior in this documentation pass.

- [x] Compare the full Publish inventory with central ledgers.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm nine eligible repositories have central ledger and root `.agent` coverage.
- [x] Select only the oldest eligible repository.
- [x] Inspect canvas containment, source projection, pointer movement, menu and panel hit testing and pointer activation.
- [x] Identify the complete interaction loop, all domains, all 20 implemented kits and offered services.
- [x] Define hit results, target generations, activation commands, typed misses, observations and fixtures.
- [x] Change documentation only on `main`.
- [ ] Implement and execute the authority.

## Selection state

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new/ledger-missing/root-agent-missing eligible repositories: 0
oldest eligible central timestamp: PhantomCommand at 2026-07-12T07-29-32-04-00
selected repository: LuminaryLabs-Publish/PhantomCommand
excluded repository: LuminaryLabs-Publish/TheCavalryOfRome
```

## Complete interaction loop

```txt
menu startup
  -> create source canvas, graveyard art and CRT renderer
  -> read settings and save presence
  -> initialize menu.selected = 0 and panel = null
  -> install pointer and keyboard handlers
  -> start recursive RAF
  -> publish window.PhantomMenu

pointer move
  -> renderer.screenToSource(clientX, clientY)
  -> retain source x/y plus inside flag
  -> menuHitIndex or panelHitIndex returns row index or -1
  -> selection changes only when a row is hit

pointer down with no panel
  -> ensureAudio()
  -> project coordinates
  -> menuHitIndex(point)
  -> when hit, update menu.selected
  -> activateMain(menu.items[menu.selected]) regardless of hit or miss

pointer down with a settings panel
  -> panelHitIndex(point)
  -> when hit, update panel.selected
  -> activatePanel() regardless of hit or miss

keyboard
  -> directional key explicitly changes selection
  -> Enter or Space explicitly activates selected command
```

## Source-backed findings

```txt
viewport-to-source containment: implemented
letterbox inside=false result: implemented
menu row hit testing: implemented
settings row hit testing: implemented
hover selection update on hit: implemented
keyboard selection and activation: implemented

pointer miss rejection: absent
letterbox miss rejection: absent
settings-panel miss rejection: absent
hit target identity: absent
menu or panel generation identity: absent
selection revision fence: absent
pointer command identity: absent
typed hit/miss result: absent
pointer action observation/journal: absent
browser pointer-target fixtures: absent
```

### Background and letterbox clicks can launch the current selection

`menuHitIndex()` returns `-1` when the pointer is outside the menu rows, outside the source frame or while a panel is open. The no-panel `pointerdown` path only uses a non-negative index to update selection; it calls `activateMain(menu.items[menu.selected])` unconditionally afterward. The initial selection is Begin Campaign, so a first click anywhere on the canvas can start the campaign.

### Settings misses can mutate the current setting

When the settings panel is open, a miss leaves `state.panel.selected` unchanged and still calls `activatePanel()`. The default selected row is CRT. A click on panel background, outside the panel or in a letterbox margin can therefore toggle CRT.

### Visual selection and pointer target are different authorities

The highlighted selection is useful for keyboard navigation and hover projection. It is not proof that the current pointerdown targeted that row. Pointer activation needs a current `Hit` result, while keyboard activation may continue to use explicit selection.

## Domains in use

```txt
static menu and campaign route shells
menu selection panels settings save presence and fade transition
viewport-to-source contain projection and letterbox classification
menu and settings-panel hit testing
pointer keyboard hidden-button focus page navigation and RAF lifecycle
procedural graveyard source rendering
CRT WebGL context program buffer texture and display projection
Web Audio activation ambience UI tones and lifecycle gaps
campaign launch bootstrap persistence actions simulation combat and rendering
public menu and campaign host capabilities
runtime session command phase terminal and checkpoint authority gaps
source checks static build Pages deployment and audit tracking
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
menu routing selection panels fade and hidden-button activation
settings persistence and CRT grain ambience selection
presence-only save scanning across legacy keys and scopes
viewport-to-source contain projection with inside classification
menu and settings-panel row hit testing
pointer hover pointer activation and keyboard activation
procedural graveyard source-canvas drawing
AudioContext ambience and UI tone construction
WebGL context program buffer texture source upload and CRT presentation
default campaign state selection building orders wave pause camera and restart
fixed-step spawning AI movement targeting damage rewards and terminal mutation
minimal victory save writing
world HUD minimap pause and terminal overlay rendering
mutable public host read and direct mutation
construction intro sequencing
source checks static build and GitHub Pages deployment
```

## Required parent domain

```txt
phantom-command-menu-pointer-hit-admission-authority-domain
```

## Candidate kits

```txt
phantom-command-menu-input-session-kit
phantom-command-menu-surface-generation-kit
phantom-command-menu-panel-generation-kit
phantom-command-menu-selection-revision-kit
phantom-command-pointer-event-envelope-kit
phantom-command-source-coordinate-projection-kit
phantom-command-pointer-containment-result-kit
phantom-command-menu-hit-target-kit
phantom-command-menu-hit-test-result-kit
phantom-command-pointer-activation-command-kit
phantom-command-pointer-activation-admission-kit
phantom-command-pointer-miss-result-kit
phantom-command-menu-action-result-kit
phantom-command-pointer-action-observation-kit
phantom-command-pointer-action-journal-kit
phantom-command-background-miss-fixture-kit
phantom-command-letterbox-miss-fixture-kit
phantom-command-settings-panel-miss-fixture-kit
phantom-command-pointer-target-browser-smoke-kit
```

## Required invariants

```txt
pointer activation requires a Hit result from the current event
Miss performs zero menu or settings mutation
letterbox margins are non-interactive unless an explicit target is rendered there
hit target belongs to the current menu or panel generation
stale hit results and stale selection revisions perform zero mutation
keyboard activation remains an explicit selection-based command
hidden native buttons retain their own native click path
one pointer command returns one typed terminal result
pointer result and resulting route or setting revision are observable
```

## Retained dependencies

```txt
Campaign Bootstrap and Continue Resume Authority
Public Host Owner Quarantine and Typed Command Admission
CRT Display/Input Projection Authority
Campaign Phase Admission Authority
Fixed-Step Command Scheduling and Committed Frame Authority
Combat Resolution and Exclusive Terminal Outcome Authorities
Runtime Session Lifecycle Authority
Menu Audio Activation and Lifecycle Authority
Versioned Full Campaign Checkpoint Capture Authority
```

## Validation boundary

Documentation only. Menu behavior, campaign behavior, persistence, rendering, audio, package scripts, dependencies and deployment were not changed.