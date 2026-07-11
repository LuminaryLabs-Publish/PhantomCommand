# PhantomCommand Current Audit

**Timestamp:** `2026-07-11T03-41-49-04-00`

## Summary

The codebase has a compact, understandable menu and campaign loop, but runtime resources are created directly at module scope and are not owned by a session object. The missing boundary is not another renderer or gameplay rewrite; it is lifecycle authority across construction, running, transition, failure, restart and disposal.

## Plan ledger

**Goal:** record the full current product loop, domains, kit services and lifecycle gaps so implementation can add ownership without changing gameplay or visual output.

- [x] Read the menu, campaign, CRT renderer and package scripts.
- [x] Trace all RAF, listener, timer, global, audio and WebGL ownership.
- [x] Preserve the current Continue and action-authority dependency order.
- [x] Identify the lifecycle domain and candidate kits.
- [x] Define proof requirements for startup, transition, remount and disposal.
- [ ] Implement lifecycle authority.
- [ ] Add executable fixtures and browser smoke tests.

## Interaction loops

### Menu

```txt
module evaluates
  -> create 480 x 270 source canvas
  -> create graveyard art provider
  -> create CRT WebGL renderer
  -> read settings
  -> scan six save slots as Boolean presence
  -> create mutable menu state
  -> attach canvas, document and button listeners
  -> lazily create AudioContext, oscillators and looping buffer source
  -> start recursive RAF
  -> draw art and CRT each frame
  -> begin timed fade
  -> assign window.location.href
```

### Campaign

```txt
module evaluates
  -> create 640 x 360 source canvas
  -> create CRT WebGL renderer
  -> build rings, lanes, pads, archetypes and waves
  -> create mutable camera, input and campaign state
  -> attach canvas and window listeners
  -> expose mutable GameHost references
  -> start recursive RAF
  -> update camera with variable dt
  -> apply zero or more exact 1/60 simulation steps
  -> draw world, HUD, minimap and terminal overlay
  -> upload source canvas and draw CRT
  -> reload or navigate on keyboard request
```

## Domains in use

### Route and menu

```txt
static-route-shell-domain
menu-route-domain
campaign-route-domain
menu-selection-domain
menu-panel-domain
menu-settings-persistence-domain
menu-save-presence-domain
menu-continue-capability-domain
menu-transition-domain
menu-audio-domain
graveyard-art-domain
source-canvas-domain
crt-display-domain
```

### Campaign content and state

```txt
ring-map-domain
lane-domain
build-pad-domain
unit-archetype-domain
tower-archetype-domain
wave-script-domain
souls-economy-domain
sanctum-core-health-domain
selection-domain
campaign-message-domain
campaign-terminal-state-domain
camera-pan-zoom-domain
```

### Campaign simulation

```txt
build-action-domain
order-action-domain
wave-start-action-domain
spawn-queue-domain
unit-ai-domain
enemy-pathing-domain
ally-targeting-domain
tower-targeting-domain
projectile-domain
damage-reward-domain
effect-domain
win-loss-domain
save-on-win-domain
fixed-step-simulation-domain
```

### Render and observation

```txt
world-render-domain
hud-projection-domain
minimap-domain
modal-overlay-domain
crt-upload-domain
crt-draw-domain
phantom-menu-diagnostics-domain
gamehost-diagnostics-domain
```

### Runtime lifecycle

```txt
route-session-domain
startup-transaction-domain
runtime-lifecycle-state-domain
raf-ownership-domain
run-generation-domain
listener-lease-domain
timer-lease-domain
global-exposure-lease-domain
audio-resource-domain
webgl-resource-domain
transition-admission-domain
ordered-disposal-domain
startup-rollback-domain
lifecycle-journal-domain
lifecycle-observation-domain
```

### Proof and deployment

```txt
menu-static-check-domain
campaign-static-check-domain
static-build-domain
github-pages-deploy-domain
central-ledger-sync-domain
```

## Implemented kits and services

| Kit | Current services |
|---|---|
| `crt-renderer-kit` | WebGL context creation, shader compile/link, source texture upload, contain framing, pixel filtering, CRT uniforms, draw, resize and coordinate projection |
| `graveyard-art-kit` | Procedural graveyard menu composition and animated source-canvas drawing |
| `menu-route-kit` | Menu state, selection, panel activation, Begin/Continue routing and fade timing |
| `menu-settings-persistence-kit` | Read, normalize and write CRT, grain and ambience preferences |
| `menu-save-presence-kit` | Scan three keys across local and session storage and return Boolean presence |
| `menu-audio-kit` | Lazy AudioContext creation, ambience graph, UI tones and delayed close |
| `campaign-route-shell-kit` | Campaign canvas boot and route-level module execution |
| `pixel-campaign-runtime-kit` | Rings, lanes, pads, units, towers, waves, mutable state and input integration |
| `fixed-step-campaign-simulation-kit` | Exact `1/60` spawning, AI, combat, projectile, reward and terminal updates |
| `pixel-campaign-render-kit` | World, entity, HUD, minimap, overlay and CRT source rendering |
| `legacy-gamehost-diagnostics-kit` | Mutable state/camera exposure, direct actions and aggregate clone |
| `menu-static-check-kit` | Source-pattern checks for menu structure |
| `campaign-static-check-kit` | Source-pattern checks for campaign structure |
| `static-build-copy-kit` | Copy static route and source files to deployment artifact |
| `pages-deploy-kit` | GitHub Pages publishing |
| retained construct kits | Legacy concentric construction descriptors and sequence helpers not used by the active campaign route |

## Lifecycle ownership gaps

```txt
RAF:
  menu and campaign discard request IDs
  no stop, resume or stale-callback fence
  every admitted callback schedules a successor

listeners:
  several handlers are anonymous
  no listener ledger
  no exact remove operation
  canvas, document and window ownership is split

globals:
  PhantomMenu and GameHost overwrite prior values
  no lease token or restore-on-dispose behavior
  GameHost exposes mutable state and camera

audio:
  AudioContext, oscillator, looping buffer source and nodes are route-owned but not session-owned
  delayed close timer is not retained
  transition does not await or report audio shutdown

CRT/WebGL:
  program, buffer and texture are allocated
  shader objects are not retained for explicit post-link deletion
  no deleteProgram, deleteBuffer or deleteTexture
  no dispose state or render-after-dispose rejection
  raw gl escapes through the public return value

startup and failure:
  allocation happens during module evaluation
  partial startup has no rollback stack
  a shader or later initialization failure can leave earlier resources alive

navigation:
  menu fade navigates after time threshold
  campaign reload and exit use location directly
  no typed transition command/result
  no exactly-once teardown completion proof
```

## Candidate lifecycle kits and services

```txt
phantom-command-runtime-session-authority-kit
  construct, start, stop, transition, restart, fail and dispose one route session

phantom-command-runtime-session-id-kit
  allocate sessionId, runId and runGeneration

phantom-command-lifecycle-state-kit
  enforce constructing -> running -> transitioning/stopping -> disposed/failed

phantom-command-startup-transaction-kit
  stage resources, register cleanup immediately and publish start result

phantom-command-animation-frame-lease-kit
  retain one RAF id, cancel it and reject stale generation callbacks

phantom-command-listener-lease-kit
  register named listeners and remove each exactly once

phantom-command-timer-lease-kit
  retain transition and delayed-close timers

phantom-command-global-exposure-lease-kit
  own, replace and restore PhantomMenu/GameHost globals safely

phantom-command-audio-resource-owner-kit
  stop sources, disconnect nodes, close context and report completion

phantom-command-crt-resource-owner-kit
  delete texture, buffer, program and shaders; reject render after disposal

phantom-command-transition-command-kit
  normalize menu navigation, restart and exit requests

phantom-command-transition-result-kit
  publish accepted, rejected, no-op, completed and failed results

phantom-command-ordered-dispose-kit
  stop admission, cancel RAF, remove listeners, release globals, close audio, dispose CRT

phantom-command-startup-rollback-kit
  unwind partial construction in reverse acquisition order

phantom-command-lifecycle-journal-kit
  retain bounded ordered lifecycle and cleanup rows

phantom-command-lifecycle-observation-kit
  expose clone-safe state, leases, last result and disposal counts

phantom-command-lifecycle-fixture-kit
  fake scheduler, fake event targets, fake globals, fake audio and fake WebGL assertions
```

## Required invariants

```txt
one active route session owns at most one RAF request
every listener registration has one matching removal
every global replacement has one matching release or restoration
every timer is cancelled or completes under the owning session
every audio/WebGL allocation is released exactly once
dispose is idempotent
no callback mutates or renders after runGeneration changes
no render occurs after CRT disposal
startup failure leaves zero owned resources
navigation occurs only after teardown reaches a terminal result
```
