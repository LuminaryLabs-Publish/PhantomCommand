# PhantomCommand Current Audit

**Timestamp:** `2026-07-12T11-48-43-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`

## Summary

The current audit isolates runtime-session and resource lifecycle ownership. `graveyard-menu.js` and `campaign-scene.js` each install route-scoped listeners and start an unconditional recursive RAF. `createCrtRenderer()` allocates shaders, a program, a buffer and a texture but exposes no inventory, context generation or disposal service. Menu audio also owns a delayed close timer without aggregate retirement.

## Plan ledger

**Goal:** make route startup and teardown explicit, generation-bound and observable without changing runtime behavior in this documentation pass.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central and root `.agent` coverage.
- [x] Select only `PhantomCommand` because repo-local `11-40-50` state was newer than its central `09-28-05` ledger state.
- [x] Inspect menu, campaign, CRT, audio, route navigation, public hosts, checks and build scripts.
- [x] Identify the complete interaction loop, domains, all 20 implemented kits and offered services.
- [x] Define session phases, resource leases, context generations, typed start/retire results, observations and fixtures.
- [x] Change documentation only on `main`.
- [ ] Implement and execute the authority.

## Selection state

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new/ledger-missing/root-agent-missing eligible repositories: 0
selected repository: LuminaryLabs-Publish/PhantomCommand
selection reason: repo-local audit state newer than central ledger
prior central timestamp: 2026-07-12T09-28-05-04-00
prior repo-local timestamp: 2026-07-12T11-40-50-04-00
excluded repository: LuminaryLabs-Publish/TheCavalryOfRome
```

## Complete interaction loop

```txt
menu startup
  -> create 480x270 source canvas
  -> create graveyard-art owner
  -> acquire WebGL and allocate CRT shaders/program/buffer/texture
  -> read settings and save presence
  -> install canvas/document/hidden-button listeners
  -> optionally allocate AudioContext graph
  -> start recursive menu RAF
  -> publish PhantomMenu

menu transition
  -> start fade timestamp
  -> continue RAF and audio
  -> assign location.href
  -> rely on page destruction for cleanup

campaign startup
  -> create 640x360 source canvas
  -> acquire a second route-local CRT resource set
  -> create campaign, camera and input state
  -> install canvas/window listeners
  -> start recursive campaign RAF
  -> publish GameHost

campaign frame
  -> sample input and update camera
  -> drain 1/60 fixed steps
  -> render world, HUD, minimap and overlays
  -> upload source canvas and draw CRT
  -> schedule successor RAF

failure or exit
  -> Escape navigates and R reloads
  -> blur clears only held interaction state
  -> no explicit runtime retirement result
  -> no WebGL context-loss/restoration transaction
```

## Source-backed findings

```txt
menu RAF ID retained: no
campaign RAF ID retained: no
successor scheduling phase check: no
anonymous listener lease registry: no
menu transition retirement barrier: no
campaign route retirement barrier: no
CRT resource inventory: no
CRT dispose service: no
successful shader deletion: no
WebGL context loss/restoration handling: no
WebGL context generation: no
AudioContext aggregate lease: no
delayed close timer lease: no
PhantomMenu/GameHost revocation: no
stale callback rejection: no
browser lifecycle fixtures: no
```

### WebGL ownership is incomplete

`createCrtRenderer()` compiles and attaches two shaders, links a program, allocates one buffer and one texture, then returns `render`, `resize`, `screenToSource` and raw `gl`. Successful shader objects are not retained for explicit deletion. Link-failure cleanup, resource inventory, context-loss handling and route disposal are absent.

### RAF and listener ownership is implicit

Both route frames call `requestAnimationFrame(frame)` unconditionally. Listener callbacks are mostly anonymous closures, so no route-owned list can remove them. Browser navigation or reload is expected to destroy the page and resources.

### Audio retirement is detached

Menu ambience can schedule `AudioContext.close()` through an untracked 300 ms timeout. No runtime retirement result proves that the timer ran, the context closed or a successor session did not inherit stale audio work.

## Domains in use

```txt
static menu and campaign route shells
menu selection panels settings save presence fade and navigation
browser runtime-session startup readiness transition failure and retirement
RAF timer DOM listener pointer keyboard wheel focus and page lifecycle
viewport containment source-coordinate projection and CRT curved presentation
WebGL context shader program buffer texture upload draw loss restore and disposal
Web Audio activation graph UI tones delayed close and retirement
campaign launch bootstrap persistence selection build orders wave pause camera and restart
fixed-step spawning movement targeting projectiles damage rewards and terminal state
procedural graveyard and campaign world HUD minimap overlay rendering
public menu and campaign host capabilities
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
menu routing selection panels settings save presence fade and hidden-button activation
pointer keyboard wheel drag focus and route interactions
procedural graveyard and campaign source rendering
WebGL compile link buffer texture upload contain curve grain fade and draw
AudioContext ambience graph UI tones and delayed close
campaign state selection building orders waves pause camera restart and navigation
fixed-step spawning movement targeting projectiles damage rewards and terminal mutation
public state reads and direct mutation
construction intro sequencing
source checks static build and GitHub Pages deployment
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

## Required invariants

```txt
Every callback and resource belongs to one session and generation.
Only READY sessions admit input, simulation and draw work.
Every RAF, listener and timer has an explicit cancellable lease.
Every WebGL resource is inventoried and retired or replaced under a new context generation.
Context restoration cannot revive a RETIRED session.
Retirement revokes public hosts and rejects stale callbacks before completion.
Duplicate retirement is idempotent and cannot affect a successor session.
A start, loss, restore or retire result is observable in a bounded journal.
```

## Retained dependencies

```txt
Campaign Bootstrap and Continue Resume Authority
Menu Pointer-Hit Admission Authority
Campaign World-Pointer Admission Authority
Public Host Owner Quarantine and Typed Command Admission
CRT Display/Input Projection Authority
Campaign Phase Admission Authority
Fixed-Step Scheduling Replay and Committed Frames
Combat Resolution and Exclusive Terminal Outcome Authorities
Menu Audio Activation and Lifecycle Authority
Versioned Full Campaign Checkpoint Capture Authority
```

## Validation boundary

Documentation only. Runtime, menu, campaign, input, camera, simulation, rendering, audio, persistence, package scripts, dependencies and deployment were not changed.