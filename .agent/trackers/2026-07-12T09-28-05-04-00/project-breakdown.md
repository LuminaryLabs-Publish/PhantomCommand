# PhantomCommand Project Breakdown

**Timestamp:** `2026-07-12T09-28-05-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Branch:** `main`

## Summary

This documentation pass selected PhantomCommand as the oldest eligible Publish repository. The main finding is that pointer hit tests return misses correctly, but canvas pointer activation ignores those misses and executes the previously selected menu or settings action.

## Plan ledger

**Goal:** document one target-bound pointer admission authority without changing runtime behavior.

- [x] Compare the ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories are centrally tracked and have root `.agent` state.
- [x] Select only PhantomCommand using the oldest eligible timestamp.
- [x] Trace menu boot, source projection, hit testing, pointer movement, pointer activation, keyboard activation and route effects.
- [x] Identify all active domains.
- [x] Identify all 20 implemented kits.
- [x] Identify the services offered by each kit group.
- [x] Define the missing DSK/domain boundary and fixture gate.
- [x] Update required `.agent` files on `main`.
- [ ] Runtime changes remain future work.

## Selection comparison

```txt
accessible repositories: 10
eligible repositories: 9
excluded: LuminaryLabs-Publish/TheCavalryOfRome
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0
oldest eligible central timestamp: PhantomCommand, 2026-07-12T07-29-32-04-00
selected repository: LuminaryLabs-Publish/PhantomCommand
```

## Interaction loop

```txt
index.html
  -> full-viewport canvas and hidden native menu controls
  -> load graveyard-menu.js

graveyard-menu.js boot
  -> create 480x270 source canvas
  -> create graveyard art and CRT renderer
  -> read settings and raw save presence
  -> initialize selection, panel, transition and audio state
  -> install pointer and keyboard handlers
  -> start recursive RAF
  -> publish window.PhantomMenu

pointer move
  -> screenToSource()
  -> menuHitIndex() or panelHitIndex()
  -> update visual selection only on hit

pointer down, no panel
  -> ensureAudio()
  -> screenToSource()
  -> optional selection update on hit
  -> unconditional activateMain(current selection)

pointer down, settings panel
  -> optional row selection update on hit
  -> unconditional activatePanel(current selection)

keyboard
  -> directional keys update selection
  -> Enter or Space activates selected command

campaign route
  -> game.html?campaign=new or game.html?campaign=continue
  -> construct fixed campaign state
  -> fixed-step combat and rendering loop
```

## Domains in use

```txt
static page and route shell
menu state and selection
settings persistence
save-presence discovery
viewport-to-source coordinate projection
contain letterbox classification
menu and settings hit testing
pointer and keyboard input
panel lifecycle
fade and navigation transition
procedural graveyard art
CRT WebGL presentation
Web Audio ambience and tones
campaign bootstrap and persistence gaps
campaign state and actions
fixed-step campaign simulation
combat, rewards and terminal state
CPU world, HUD and minimap rendering
public host diagnostics
construction intro sequencing
source validation, static build and Pages deployment
repo-local and central audit tracking
```

## Implemented kits and services

| Kit | Offered services |
|---|---|
| `crt-renderer-kit` | WebGL context, shader program, buffers, texture upload, contain projection, source-coordinate conversion, CRT curve, grain, fade and draw submission |
| `graveyard-art-kit` | Procedural source-canvas graveyard, menu, panels and visual selection drawing |
| `menu-route-kit` | Menu item activation, fade transition and campaign URL routing |
| `menu-settings-persistence-kit` | CRT, grain and ambience preference read/write |
| `menu-save-presence-kit` | Presence scan across three save keys and two storage scopes |
| `menu-audio-kit` | AudioContext, ambience graph, UI tones and delayed close |
| `campaign-route-shell-kit` | Campaign page startup and route shell |
| `pixel-campaign-runtime-kit` | Campaign content, mutable state, selection, building, orders, wave, pause, camera, restart and navigation |
| `fixed-step-campaign-simulation-kit` | Spawn, movement, targeting, damage, rewards and terminal mutation |
| `pixel-campaign-render-kit` | World, HUD, minimap, pause and terminal overlay rendering |
| `legacy-gamehost-diagnostics-kit` | Public state reads and direct mutation surfaces |
| `menu-static-check-kit` | Menu source and token checks |
| `campaign-static-check-kit` | Campaign source and token checks |
| `static-build-copy-kit` | Static output assembly |
| `pages-deploy-kit` | GitHub Pages deployment |
| `construct-spiral-intro-kit` | Ring-construction intro orchestration |
| `construct-spiral-schedule-kit` | Intro timing schedule |
| `construct-piece-id-kit` | Stable construction piece identity |
| `construct-piece-state-kit` | Construction piece lifecycle state |
| `construct-sequence-update-kit` | Construction sequence progression |

## Main source finding

```txt
screenToSource(): returns x, y and inside
menuHitIndex(): returns row or -1
panelHitIndex(): returns row or -1
pointermove: changes selection only when hit >= 0
pointerdown menu path: calls activateMain(current selection) after hit or miss
pointerdown settings path: calls activatePanel() after hit or miss
```

### Reachable menu failure

```txt
initial selection = Begin Campaign
  -> pointer clicks graveyard background or letterbox margin
  -> hit result = -1
  -> selection remains Begin Campaign
  -> activateMain(Begin Campaign)
  -> transition to game.html?campaign=new
```

### Reachable settings failure

```txt
open settings, selected row = CRT
  -> pointer clicks panel background or outside source frame
  -> hit result = -1
  -> selected row remains CRT
  -> activatePanel()
  -> CRT preference toggles
```

## Required DSK/domain

```txt
phantom-command-menu-pointer-hit-admission-authority-domain
```

It owns event identity, source projection, containment, target identity, menu/panel generations, selection revision, pointer activation admission, typed results, observations, journals and fixtures.

## Required proof

```txt
background and letterbox misses are inert
between-row misses are inert
settings-panel misses are inert
current Hit executes exactly one current target
stale surface, panel or selection results are rejected
disabled target returns a typed rejection
keyboard activation remains selection-based
hidden native button clicks retain native semantics
pointer result correlates with route or settings revision
```

## Validation boundary

Documentation only. Runtime source, behavior, dependencies, package scripts and deployment were not changed.