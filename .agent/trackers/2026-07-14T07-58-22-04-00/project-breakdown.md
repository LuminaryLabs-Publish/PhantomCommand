# PhantomCommand Project Breakdown

**Timestamp:** `2026-07-14T07-58-22-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Branch:** `main`  
**Status:** `browser-route-startup-readiness-failure-authority-audited`

## Summary

PhantomCommand has two static browser routes. Each route loads one ES module whose top-level evaluation immediately acquires DOM roots, creates a Canvas2D source, creates and compiles a WebGL CRT presentation, allocates route state, installs listeners, publishes a browser global and starts a recursive animation frame. No application-owned startup boundary catches import, DOM, Canvas2D, WebGL, shader, allocation or first-frame failures. A failure before host publication leaves the route blank or inert without a typed result, visible fallback, retry control or first-frame evidence.

## Plan ledger

**Goal:** make menu and campaign startup explicit, fault-contained and observable from module admission through the first accepted visible frame.

- [x] Compare all 11 accessible Publish repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm ten eligible central ledgers and root `.agent` states.
- [x] Confirm no eligible repository is new, missing, undocumented or runtime-ahead.
- [x] Select only `LuminaryLabs-Publish/PhantomCommand` by the oldest eligible synchronized timestamp.
- [x] Inspect both HTML routes, menu startup, campaign startup, CRT creation, static checks and static build.
- [x] Identify the complete interaction loop and all active domains.
- [x] Preserve all 20 implemented kits and their offered services.
- [x] Define a 24-surface browser-startup authority family.
- [x] Add the timestamped tracker and audit family.
- [x] Refresh required root `.agent` state.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Runtime startup authority and browser fault-injection fixtures remain future work.

## Selection comparison

```txt
accessible Publish repositories: 11
eligible after Cavalry exclusion: 10
central ledger entries: 10
root .agent states: 10
new eligible repositories: 0
ledger-missing eligible repositories: 0
root-agent-missing eligible repositories: 0
runtime-ahead eligible repositories: 0
selected: PhantomCommand
selection reason: oldest eligible synchronized central timestamp
prior central timestamp: 2026-07-14T02-58-28-04-00
excluded: TheCavalryOfRome
```

Only `LuminaryLabs-Publish/PhantomCommand` is modified in the Publish organization.

## Complete interaction loop

```txt
menu HTML
  -> parse canvas and hidden native navigation
  -> import graveyard-menu.js
  -> query #game
  -> create 480 x 270 source canvas and Canvas2D context
  -> create graveyard art
  -> acquire WebGL context
  -> compile and link CRT shaders
  -> create buffer and source texture
  -> read settings and save-key presence
  -> create menu state
  -> attach pointer, key and native-button listeners
  -> publish window.PhantomMenu
  -> request first animation frame
  -> draw art and submit CRT frame

campaign HTML
  -> parse role=application canvas and static live instructions
  -> import campaign-scene.js
  -> query #game
  -> create 640 x 360 source canvas and Canvas2D context
  -> acquire WebGL context
  -> compile and link CRT shaders
  -> construct authored rings, pads, units, waves and campaign state
  -> attach pointer, wheel, key and blur listeners
  -> request first animation frame
  -> publish window.GameHost
  -> update fixed-step simulation and submit CRT frame

failure before completion
  -> module promise rejects or top-level evaluation throws
  -> no RouteStartupResult is published
  -> no fallback replaces the blank or inert canvas
  -> no retry command exists
  -> no candidate resource manifest is retired
  -> no first visible route frame is acknowledged
```

## Domains in use

```txt
static HTML route shells and ES module loading
browser document, page and route lifecycle
DOM root discovery and accessibility fallback content
Canvas2D source-canvas allocation and drawing
WebGL context acquisition and capability classification
shader compilation, linking, buffers, textures and uniforms
CRT containment, curve, grain, aberration, vignette and fade
procedural graveyard menu art and panels
settings, save presence, audio and navigation
campaign authored state, input, camera, waves, combat and outcomes
listener, browser-global and animation-frame publication
startup attempt identity, phase, readiness and failure
candidate resource preparation, atomic adoption and rollback
visible failure projection, retry and route escape
first accepted source and CRT frame evidence
source checks, static build, Pages deployment and central tracking
```

## Implemented kits and offered services

| Kit | Offered services |
|---|---|
| `crt-renderer-kit` | WebGL acquisition, shader compile/link, buffer and texture allocation, resize, screen mapping, upload and CRT draw |
| `graveyard-art-kit` | Procedural menu, graveyard, title, panels and visual selection drawing |
| `menu-route-kit` | Menu selection, panels, fade, transition and navigation |
| `menu-settings-persistence-kit` | Settings parsing, defaults, mutation and storage write |
| `menu-save-presence-kit` | Local/session save-key presence scan |
| `menu-audio-kit` | AudioContext creation, ambience, wind, UI tones and delayed close |
| `campaign-route-shell-kit` | Campaign HTML, source canvas and static assistive instructions |
| `pixel-campaign-runtime-kit` | Campaign state, input, selection, building, orders, pause and camera |
| `fixed-step-campaign-simulation-kit` | Accumulator, waves, spawning, movement, targeting, projectiles, damage, rewards and outcomes |
| `pixel-campaign-render-kit` | World, entities, HUD, minimap, overlays and CRT submission |
| `legacy-gamehost-diagnostics-kit` | Public campaign snapshot and direct capabilities |
| `menu-static-check-kit` | Menu HTML and source-marker checks |
| `campaign-static-check-kit` | Campaign HTML and source-marker checks |
| `static-build-copy-kit` | Static route and source copying into `dist` |
| `pages-deploy-kit` | GitHub Pages publication |
| `construct-spiral-intro-kit` | Concentric construction choreography |
| `construct-spiral-schedule-kit` | Ring and piece scheduling |
| `construct-piece-id-kit` | Stable construction identity |
| `construct-piece-state-kit` | Construction-state projection |
| `construct-sequence-update-kit` | Construction sequence advancement |

```txt
implemented source-backed kits: 20
planned startup-authority surfaces: 24
```

## Source-backed findings

### Startup is top-level and non-transactional

Both route modules perform irreversible work during module evaluation. There is no `main()` boundary that returns a result, no staged candidate, no startup attempt ID and no catch that owns cleanup or fallback projection.

### Canvas and WebGL prerequisites are assumed

The menu and campaign immediately use `document.querySelector("#game")`, a Canvas2D context and the CRT renderer. The CRT renderer throws when WebGL is unavailable and throws on shader compile or link failure. These errors are not translated into route-visible state.

### Publication happens after most risky work

`window.PhantomMenu` and `window.GameHost` are published only after contexts, resources, state and listeners are created. A failure before publication leaves no public readiness or failure readback.

### Fallback controls are not independently operational

The menu contains hidden native buttons, but their listeners are installed by the same module that can fail. Campaign contains static live instructions only. Neither route has parser-owned fallback controls, an error region, a retry button or a safe return-to-menu action independent of the failed module.

### Validation does not execute startup

`npm run check` reads files and asserts regular-expression markers. `npm run build` copies static files. Neither path loads a route in a browser, forces Canvas2D/WebGL/shader failures, verifies fallback controls or observes a first frame.

## Required parent domain

```txt
phantom-command-browser-route-startup-readiness-failure-authority-domain
```

## Planned coordinating kits

```txt
route-startup-attempt-kit
route-startup-phase-kit
startup-capability-probe-kit
dom-root-admission-kit
source-canvas-admission-kit
canvas2d-context-probe-kit
webgl-context-probe-kit
shader-compile-result-kit
shader-link-result-kit
crt-resource-preparation-kit
menu-art-preparation-kit
campaign-state-preparation-kit
listener-lease-preparation-kit
audio-capability-classification-kit
startup-candidate-resource-manifest-kit
startup-atomic-adoption-kit
startup-rollback-kit
route-startup-result-kit
startup-failure-projection-kit
startup-retry-command-kit
startup-attempt-supersession-kit
public-host-publication-kit
first-route-frame-ack-kit
source-build-pages-startup-fixture-kit
```

## Required transaction

```txt
RouteStartupCommand
  -> bind route ID, startup attempt ID and source/build revision
  -> probe DOM, Canvas2D, WebGL and shader capabilities
  -> prepare source canvas, CRT resources and route state as candidates
  -> prepare listeners, public host and frame lease without publication
  -> execute one source render and one CRT probe frame
  -> atomically adopt candidates and publish RouteStartupResult
  -> publish the route host only for the accepted attempt
  -> publish FirstRouteFrameAck

failure
  -> classify the failed phase and evidence
  -> retire every candidate resource and listener
  -> project a DOM-owned fallback with retry and route escape
  -> reject stale or duplicate completion from superseded attempts
```

## Required fixtures

```txt
missing #game root
Canvas2D context unavailable
WebGL context unavailable
vertex shader compile failure
fragment shader compile failure
program link failure
first texSubImage2D or draw failure
listener/public-host publication failure
retry after failure
superseded startup result
menu fallback keyboard activation
campaign fallback return-to-menu activation
source versus dist versus Pages startup parity
first accepted visible frame acknowledgement
```

## Validation

```txt
documentation-only: yes
runtime JavaScript changed: no
HTML or CSS changed: no
gameplay changed: no
rendering changed: no
package scripts or dependencies changed: no
workflow or deployment changed: no
branch created: no
pull request created: no
npm run check: not run
npm run build: not run
browser startup fixture: unavailable / not run
Pages startup fixture: unavailable / not run
```

No startup fallback, resource rollback, retry isolation, first-frame convergence or production-readiness claim is made.