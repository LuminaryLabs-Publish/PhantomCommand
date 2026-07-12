# PhantomCommand Project Breakdown

**Timestamp:** `2026-07-12T11-48-43-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Branch:** `main`

## Summary

This documentation pass reconciles newer repo-local campaign-pointer work with central tracking and isolates the next source-backed boundary: runtime-session and resource lifecycle ownership. Menu and campaign modules allocate recursive RAF loops, anonymous DOM listeners, WebGL programs/buffers/textures and optional Web Audio resources without one session identity, retirement command, idempotent disposal result or context-loss recovery path.

## Plan ledger

**Goal:** define one runtime-session authority that admits startup, owns every RAF/listener/timer/WebGL/audio lease, retires them exactly once, handles context loss, and proves no stale frame or input can mutate a retired route.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Detect `PhantomCommand` repo-local `2026-07-12T11-40-50-04-00` documentation newer than its central `2026-07-12T09-28-05-04-00` ledger state.
- [x] Select and modify only `LuminaryLabs-Publish/PhantomCommand`.
- [x] Inspect menu startup, campaign startup, CRT resource allocation, RAF ownership, DOM listeners, audio shutdown, navigation and public hosts.
- [x] Identify the complete interaction loop, all domains, all 20 implemented kits and their offered services.
- [x] Define lifecycle phases, resource leases, context generations, retirement results, observations and fixture gates.
- [x] Add fresh timestamped tracker and audit files under the root `.agent` folder.
- [x] Refresh the required root `.agent` routing and machine registry files.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Runtime implementation and executable lifecycle fixtures remain future work.

## Selection state

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

PhantomCommand central:   2026-07-12T09-28-05-04-00
PhantomCommand repo-local: 2026-07-12T11-40-50-04-00
selection reason: newer repo-local audit state was not yet represented centrally
excluded repository: LuminaryLabs-Publish/TheCavalryOfRome
```

Only `LuminaryLabs-Publish/PhantomCommand` was modified in the Publish organization.

## Complete interaction loop

```txt
menu boot
  -> create 480x270 source canvas and procedural graveyard art
  -> create CRT WebGL context, shaders, program, buffer and texture
  -> read settings and save presence
  -> install canvas, document and hidden-button listeners
  -> optionally create AudioContext graph
  -> start an untracked recursive RAF
  -> publish window.PhantomMenu

menu transition
  -> set transition timestamp and target URL
  -> continue RAF, rendering and audio during fade
  -> assign window.location.href
  -> rely on browser navigation to retire all owners

campaign boot
  -> create 640x360 source canvas and CRT WebGL resources
  -> create world, camera, input and fixed-step state
  -> install canvas and global listeners
  -> start an untracked recursive RAF
  -> publish window.GameHost with live owners

campaign frame
  -> sample keys and pointer state
  -> update camera and fixed-step simulation
  -> draw world, HUD, minimap and overlays
  -> upload source canvas and draw CRT frame
  -> schedule successor RAF

route exit or failure
  -> Escape changes location or R reloads
  -> no explicit session retirement barrier
  -> no listener, RAF, WebGL or host revocation result
  -> no WebGL context-loss/restoration generation
```

## Domains in use

```txt
static menu and campaign route shells
menu selection panels settings save presence fade and navigation
browser runtime-session startup transition retirement and failure
RAF timer DOM listener pointer keyboard wheel focus and page lifecycle
viewport containment source projection and CRT curved presentation
WebGL context shader program buffer texture upload draw and context loss
Web Audio activation ambience UI tones delayed close and route retirement
campaign selection build orders wave pause camera restart and fixed-step simulation
spawn movement targeting projectiles damage rewards and terminal state
campaign world HUD minimap and overlay rendering
procedural graveyard rendering
public menu and campaign host capabilities
source checks static build GitHub Pages deployment and audit tracking
```

## Implemented kits and offered services

| Kit | Offered services |
|---|---|
| `crt-renderer-kit` | WebGL context, shader compilation/link, fullscreen buffer, source texture, contain projection, CRT curve, grain, fade and draw |
| `graveyard-art-kit` | Procedural graveyard, menu, settings and credits drawing |
| `menu-route-kit` | Selection, panels, activation, fade and campaign routing |
| `menu-settings-persistence-kit` | CRT, grain and ambience preference persistence |
| `menu-save-presence-kit` | Presence scan across three save keys and local/session storage |
| `menu-audio-kit` | AudioContext, master gain, drone, wind, UI tones and delayed context close |
| `campaign-route-shell-kit` | Campaign page startup and route shell |
| `pixel-campaign-runtime-kit` | State, selection, building, orders, waves, pause, camera, restart and navigation |
| `fixed-step-campaign-simulation-kit` | Spawn, movement, targeting, projectiles, damage, rewards and terminal mutation |
| `pixel-campaign-render-kit` | World, HUD, minimap, pause and terminal source rendering |
| `legacy-gamehost-diagnostics-kit` | Public state reads and direct mutation surfaces |
| `menu-static-check-kit` | Menu source and token checks |
| `campaign-static-check-kit` | Campaign source and token checks |
| `static-build-copy-kit` | Static deployable output assembly |
| `pages-deploy-kit` | GitHub Pages build and deployment |
| `construct-spiral-intro-kit` | Construction-intro orchestration |
| `construct-spiral-schedule-kit` | Construction timing schedule |
| `construct-piece-id-kit` | Stable construction-piece identity |
| `construct-piece-state-kit` | Construction-piece lifecycle state |
| `construct-sequence-update-kit` | Construction-sequence progression |

## Main finding

`createCrtRenderer()` allocates compiled shaders, a linked program, a fullscreen buffer and a source texture. It returns `{ render, resize, screenToSource, gl }`, but no resource inventory or `dispose()` service. Successful shader objects are not retained for deletion, link-failure cleanup is incomplete, and neither menu nor campaign handles `webglcontextlost` or `webglcontextrestored`.

Both route modules then own anonymous listeners and recursive RAF calls that cannot be removed or cancelled by a named runtime owner. Menu audio uses an untracked delayed close timer. Navigation and reload are treated as implicit teardown.

```txt
runtime session ID: absent
lifecycle phase: absent
RAF lease: absent
listener lease registry: absent
timer lease registry: absent
WebGL resource ledger: absent
context generation and recovery: absent
audio lease and close receipt: absent
public host revocation: absent
idempotent retirement result: absent
stale-frame/input rejection: absent
browser repeated-session fixture: absent
```

## Required parent domain

```txt
phantom-command-runtime-session-resource-lifecycle-authority-domain
```

## Candidate kits

```txt
runtime-session-id-kit
runtime-session-phase-kit
runtime-session-generation-kit
runtime-start-command-kit
runtime-start-result-kit
runtime-resource-ledger-kit
raf-lease-kit
dom-listener-lease-kit
timer-lease-kit
webgl-context-generation-kit
webgl-resource-inventory-kit
webgl-context-loss-result-kit
webgl-context-restore-result-kit
audio-resource-lease-kit
route-transition-retirement-kit
runtime-retire-command-kit
runtime-retire-result-kit
runtime-idempotent-disposal-kit
stale-runtime-callback-rejection-kit
public-host-revocation-kit
runtime-lifecycle-observation-kit
runtime-lifecycle-journal-kit
repeated-menu-session-fixture-kit
repeated-campaign-session-fixture-kit
webgl-context-loss-browser-fixture-kit
route-retirement-browser-smoke-kit
pages-runtime-lifecycle-smoke-kit
```

## Required transaction

```txt
RuntimeStartCommand
  -> validate route and predecessor generation
  -> allocate session ID and generation
  -> create detached listener, RAF, timer, WebGL and audio leases
  -> validate required resources
  -> publish one READY start result

route transition, context failure or retirement request
  -> move session to RETIRING
  -> reject new input and stale callbacks
  -> cancel RAF and timers
  -> remove listeners
  -> stop and close audio ownership
  -> delete WebGL textures, buffers, programs and shaders
  -> revoke public hosts
  -> publish one idempotent RETIRED result and journal row

context restoration
  -> allocate a new context generation
  -> rebuild detached resources
  -> commit only if the runtime session is still current
  -> acknowledge the first frame from the restored generation
```

## Validation boundary

Documentation only. Runtime source, input, camera, simulation, rendering, audio, persistence, package scripts, dependencies and deployment were not changed. Existing source checks were inspected but not executed.