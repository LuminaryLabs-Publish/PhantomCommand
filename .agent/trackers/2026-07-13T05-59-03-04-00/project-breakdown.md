# PhantomCommand Project Breakdown

**Timestamp:** `2026-07-13T05-59-03-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Selected authority:** `phantom-command-webgl-context-lifecycle-recovery-authority-domain`

## Summary

PhantomCommand uses one shared CRT renderer implementation for both the menu and campaign. Each route creates a WebGL context and one fixed set of GPU handles at module boot, then uploads a 2D source canvas and submits a full-screen CRT draw every RAF. The renderer has no context-loss/restoration listeners, resource-generation model, disposal/rebuild transaction, presentation result, fallback surface or recovered-frame acknowledgement.

## Plan ledger

**Goal:** document every current owner and define one recoverable presentation transaction from source-canvas revision through WebGL resource generation to visible-frame proof.

- [x] Enumerate all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Compare nine eligible repositories with central ledgers and root `.agent` state.
- [x] Confirm no new, ledger-missing, root-agent-missing or unsynchronized eligible repository exists.
- [x] Select only PhantomCommand as the oldest eligible central entry.
- [x] Read route shells, CRT renderer, menu and campaign frame loops.
- [x] Identify the complete interaction loop.
- [x] Identify all active domains.
- [x] Preserve all 20 implemented kit surfaces and services.
- [x] Define the 25-kit WebGL lifecycle authority family.
- [x] Add architecture, render, gameplay, interaction, lifecycle, deploy and central-sync audits.
- [x] Refresh required root `.agent` files and registry.
- [x] Push directly to `main` without a branch or pull request.
- [ ] Implement runtime recovery and executable fixtures later.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
central ledger entries: 9
root .agent folders: 9
new or ledger-missing eligible repositories: 0
root-agent-missing eligible repositories: 0
repo-local heads newer than central: 0

PhantomCommand     2026-07-13T02-49-07-04-00 selected
PrehistoricRush    2026-07-13T03-20-58-04-00
HorrorCorridor     2026-07-13T03-38-31-04-00
ZombieOrchard      2026-07-13T03-59-28-04-00
MyCozyIsland       2026-07-13T04-21-10-04-00
TheUnmappedHouse   2026-07-13T04-47-00-04-00
AetherVale         2026-07-13T05-00-02-04-00
TheOpenAbove       2026-07-13T05-19-21-04-00
IntoTheMeadow      2026-07-13T05-40-11-04-00
TheCavalryOfRome   excluded
```

Only `LuminaryLabs-Publish/PhantomCommand` was modified in the Publish organization.

## Complete interaction loop

```txt
menu boot
  -> parse index.html and locate #game
  -> create 480x270 source canvas
  -> create procedural graveyard art owner
  -> create WebGL context
  -> compile/link CRT program
  -> allocate vertex buffer and source texture
  -> read settings/save presence and install input
  -> start recursive RAF

menu frame
  -> update transition, flash and pointer state
  -> draw menu/panel source frame
  -> resize output from innerWidth/innerHeight and capped DPR
  -> texSubImage2D source canvas
  -> submit CRT draw
  -> request successor RAF

campaign boot
  -> parse game.html and locate #game
  -> create 640x360 source canvas
  -> create a page-local WebGL context and equivalent resource set
  -> create campaign state and input listeners
  -> start recursive RAF

campaign frame
  -> consume held camera input
  -> advance bounded fixed-step simulation
  -> draw world, HUD, minimap and terminal overlays
  -> upload source canvas and submit CRT draw
  -> request successor RAF

context loss or GPU reset
  -> browser context event has no listener
  -> no context/resource generation retirement
  -> no typed degraded state or fallback projection
  -> no restoration/rebuild/adoption transaction
  -> no first recovered-frame proof
```

## Domains in use

```txt
menu route and campaign route shells
browser document, canvas, RAF and navigation lifecycle
2D source-canvas generation
WebGL context and context-event lifecycle
GLSL shader compilation and program linking
GPU buffer, texture, uniform and attribute resources
source upload and full-screen draw submission
viewport resize, DPR and contain projection
CRT curvature, scanlines, grain, aberration, vignette and fade
menu selection, panels, settings, save presence, audio and route transition
campaign keyboard/pointer/wheel input
camera, selection, building and orders
fixed-step waves, units, projectiles, combat and outcomes
world, HUD, minimap and terminal presentation
public diagnostics and capability exposure
context generation, resource generation, fallback and recovery proof
static checks, build, Pages deployment and audit tracking
```

## Implemented kits and services

```txt
crt-renderer-kit
  WebGL context creation, GLSL compile/link, vertex buffer, source texture,
  resize, screen-to-source projection, source upload and CRT draw

graveyard-art-kit
  deterministic procedural menu and panel drawing

menu-route-kit
  visual selection, panel state, activation, transition and navigation

menu-settings-persistence-kit
  local settings parse, defaults and write

menu-save-presence-kit
  local/session storage save-key scan

menu-audio-kit
  AudioContext ambience, UI tones and delayed close

campaign-route-shell-kit
  campaign document, canvas and static assistive description

pixel-campaign-runtime-kit
  mutable campaign state, camera, selection, construction, orders and pause

fixed-step-campaign-simulation-kit
  waves, spawning, movement, targeting, projectiles, damage, rewards and outcomes

pixel-campaign-render-kit
  source-canvas world, HUD, minimap, terminal and selection overlays

legacy-gamehost-diagnostics-kit
  public mutable state/capability exposure and cloned readback

menu-static-check-kit
  menu source-marker validation

campaign-static-check-kit
  campaign source-marker validation

static-build-copy-kit
  static artifact construction

pages-deploy-kit
  GitHub Pages publication

construct-spiral-intro-kit
construct-spiral-schedule-kit
construct-piece-id-kit
construct-piece-state-kit
construct-sequence-update-kit
  construction intro choreography, timing, stable identity, state and advancement
```

## Source-backed findings

1. `createCrtRenderer()` creates the WebGL context and every GPU handle once and closes over them permanently.
2. Neither route installs `webglcontextlost` or `webglcontextrestored` listeners.
3. No resource deletion, partial-allocation cleanup, rebuild or atomic restored-generation adoption exists.
4. `render()` returns no presentation result and exposes no context health.
5. Both RAF loops schedule the next frame after synchronous rendering, so a thrown rendering error can terminate frame scheduling.
6. Menu/campaign source state can continue changing without a corresponding visible CRT result.
7. The renderer returns raw `gl`, allowing untracked external mutation outside lifecycle admission.
8. Context creation, shader compilation or link failure throws during module initialization before route-owned recovery UI is installed.
9. Existing checks inspect source markers only and do not exercise real WebGL lifecycle events.

## Required authority

```txt
phantom-command-webgl-context-lifecycle-recovery-authority-domain
```

### Required transaction

```txt
CrtPresentationCommand
  -> validate route and display-surface generation
  -> bind source-frame, context and resource revisions
  -> reject lost, restoring, disposed, stale or duplicate evidence
  -> upload the exact source revision
  -> submit one draw
  -> publish a terminal CrtPresentationResult

ContextLost
  -> retire current resource generation
  -> stop GPU submission
  -> preserve bounded simulation/source ownership
  -> project WebGL-independent degraded/fatal status

ContextRestored
  -> prepare successor program/buffer/texture/location generation
  -> validate a probe frame
  -> atomically adopt or reject the candidate
  -> acknowledge the first recovered visible frame
```

## Candidate kits

```txt
crt-surface-id-kit
webgl-context-id-kit
webgl-context-generation-kit
webgl-context-state-kit
webgl-context-event-adapter-kit
webgl-loss-policy-kit
webgl-restore-admission-kit
webgl-resource-generation-kit
webgl-program-resource-kit
webgl-buffer-resource-kit
webgl-texture-resource-kit
webgl-location-cache-kit
webgl-resource-disposal-kit
webgl-resource-rebuild-kit
source-frame-revision-kit
crt-presentation-command-kit
crt-presentation-result-kit
crt-presentation-journal-kit
presentation-fallback-surface-kit
public-render-readback-kit
first-recovered-frame-ack-kit
context-loss-browser-fixture-kit
context-restore-browser-fixture-kit
resource-rebuild-failure-fixture-kit
source-build-pages-webgl-lifecycle-fixture-kit
```

## Validation boundary

This is a documentation-only audit. Runtime source, rendering, gameplay, package scripts, dependencies and deployment were not changed. No context recovery or production-readiness claim is made.