# PhantomCommand Current Audit

**Timestamp:** `2026-07-13T05-59-03-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Status:** `webgl-context-lifecycle-recovery-authority-central-reconciled`

## Summary

The menu and campaign both use `createCrtRenderer()` as their final display owner. The renderer creates one WebGL context, shader program, vertex buffer and source texture at module boot, returns the raw `gl` object, and assumes those objects remain valid for the page lifetime. There are no `webglcontextlost` or `webglcontextrestored` listeners, no context generation, no resource-disposal/rebuild path, no typed presentation result, no fallback surface and no acknowledgement that a recovered resource generation produced a visible frame.

## Plan ledger

**Goal:** require every CRT draw to cite one live context/resource generation and produce one terminal presentation result before the next frame is admitted.

- [x] Compare the full Publish repository list with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only PhantomCommand by the oldest eligible central timestamp.
- [x] Read `index.html`, `game.html`, `graveyard-menu.js`, `campaign-scene.js`, `crt-renderer.js`, checks and agent state.
- [x] Identify the interaction loop and all domains.
- [x] Preserve all 20 implemented kits and services.
- [x] Trace context allocation, resource ownership, draw submission, RAF liveness and public raw-context exposure.
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

## Complete interaction loop

```txt
menu route
  -> create 480x270 source canvas
  -> create WebGL context/program/buffer/texture
  -> draw procedural menu into source canvas
  -> resize display buffer from window dimensions and DPR
  -> upload source canvas with texSubImage2D
  -> draw full-screen CRT pass
  -> request successor RAF

campaign route
  -> create 640x360 source canvas
  -> create a second page-local WebGL context/program/buffer/texture
  -> advance fixed-step simulation
  -> draw world, HUD and minimap into source canvas
  -> upload and draw CRT pass
  -> request successor RAF

context-loss path
  -> browser emits WebGL context event
  -> no route listener or context-state transition exists
  -> no preventDefault/recovery admission exists
  -> no resource generation is retired or rebuilt
  -> no degraded/fatal projection or recovery acknowledgement exists
```

## Source-backed findings

### One lifetime resource set is assumed

`createCrtRenderer()` creates the context, links one program, allocates one buffer and one texture, captures them in closures and returns no disposal or reconstruction operation.

### Context lifecycle events are unowned

Neither route registers `webglcontextlost` or `webglcontextrestored`. There is no context state, generation, loss reason, restoration result or retry policy.

### Restored resources cannot be reconstructed

A restored WebGL context requires program, buffer, texture, uniform and attribute locations to be recreated. Those handles are constants captured during initial construction, and no rebuild transaction exists.

### RAF liveness depends on successful synchronous rendering

Both frame functions call the CRT renderer before scheduling the successor RAF. A synchronous rendering exception prevents the next frame request and produces no terminal host result.

### Source simulation and visible presentation can diverge

The menu art or campaign simulation can continue producing source-canvas state while the WebGL display context is lost. No committed frame identity relates source revision, context generation, resource generation and visible display result.

### Raw GL escapes ownership

The renderer returns `{ render, resize, screenToSource, gl }`. External callers can inspect or mutate the context without capability identity, lifecycle admission or a typed result.

### Boot failure lacks route-owned recovery

If context creation, shader compilation or program linking fails, module initialization throws before either route installs a route-owned fallback, retry control or public diagnostics surface.

## Domains in use

```txt
menu and campaign route shells
browser document, canvas, RAF, visibility and page lifecycle
2D source-canvas drawing
WebGL context creation and context events
shader compilation and program linking
GPU buffer, texture, uniform and attribute ownership
source upload and CRT draw submission
viewport sizing, DPR and containment
CRT curvature, aberration, grain, scanlines, vignette and fade
menu settings, save presence, panels, navigation and audio
campaign input, state, camera, selection, construction and orders
fixed-step waves, combat, projectiles and outcomes
world, HUD, minimap and terminal projection
context/resource generations, loss, restore, disposal and fallback
public diagnostics and capability admission
source checks, static build, Pages deployment and audit tracking
```

## Implemented kits and offered services

```txt
crt-renderer-kit: WebGL creation, shader/program setup, source texture, resize, projection and CRT draw
 graveyard-art-kit: procedural visual menu and panels
menu-route-kit: visual selection, panel state, transition and navigation
menu-settings-persistence-kit: settings read/write
menu-save-presence-kit: save-key presence scan
menu-audio-kit: ambience, UI tones and delayed close
campaign-route-shell-kit: campaign document, canvas and static assistive description
pixel-campaign-runtime-kit: state, input, selection, building, orders, pause and camera
fixed-step-campaign-simulation-kit: waves, movement, targeting, projectiles, damage and outcomes
pixel-campaign-render-kit: source-canvas world, HUD, minimap and terminal overlays
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
phantom-command-webgl-context-lifecycle-recovery-authority-domain
```

## Required transaction

```txt
CrtPresentationCommand
  -> identify route, display surface and source-frame revision
  -> bind current context and resource generations
  -> reject lost, restoring, retired, stale or duplicate generations
  -> upload the exact source frame
  -> submit one draw
  -> publish Presented, ContextLost, RestorePending, RestoreRejected,
     ResourceRebuildFailed, DrawFailed, Disposed or Stale

WebGL context loss
  -> prevent default only under approved recovery policy
  -> retire the current resource generation
  -> stop presentation submission without stopping simulation ownership
  -> publish bounded degraded/fatal UI independent of the lost context

WebGL context restore
  -> allocate a successor context/resource generation
  -> recompile/link shaders and recreate buffer/texture/locations
  -> validate one recovery probe frame
  -> atomically adopt the successor generation
  -> acknowledge the first matching visible frame
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

This is documentation-only. No HTML, JavaScript, gameplay, rendering, resource lifetime, package script or deployment workflow changed.