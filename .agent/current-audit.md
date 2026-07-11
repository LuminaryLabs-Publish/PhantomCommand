# PhantomCommand Current Audit

**Timestamp:** `2026-07-11T07-38-25-04-00`

## Summary

PhantomCommand has a fixed-step simulation, but its campaign phase is not authoritative. `paused`, `won` and `lost` stop `update()` while pointer, keyboard and `GameHost` paths can still mutate selection, economy, towers, orders, wave state and camera presentation. This audit adds a phase-admission sub-gate to the existing campaign action-authority plan.

## Plan ledger

**Goal:** catalogue the current interaction/runtime architecture and define a deterministic mutation barrier for paused, terminal, transitioning and disposed campaign phases.

- [x] Reconcile the full Publish inventory and central ledgers.
- [x] Select only `PhantomCommand` as the oldest stable eligible fallback.
- [x] Read campaign callbacks, fixed-step update, render, CRT, package and `.agent` source.
- [x] Trace direct mutations that bypass the fixed-step update.
- [x] Identify all domains, implemented kits and services.
- [x] Define canonical phases, legal transitions and command admission matrix.
- [x] Define typed results, stable rejection reasons and input retirement.
- [x] Define phase/frame correlation and executable fixture requirements.
- [ ] Implement command envelopes, phase authority and fixed-step application.
- [ ] Add behavioral fixtures and browser smoke.

## Selection audit

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
central ledger entries: 9/9
root .agent state: 9/9
active same-window repo skipped: HorrorCorridor
selected: LuminaryLabs-Publish/PhantomCommand
excluded: LuminaryLabs-Publish/TheCavalryOfRome
```

## Interaction loops

### Menu

```txt
module evaluates
  -> create source canvas, graveyard art and CRT renderer
  -> read settings
  -> scan three save keys across local/session storage
  -> reduce candidates to Boolean presence
  -> attach listeners and start recursive RAF
  -> Begin or Continue navigates to campaign route
```

### Campaign

```txt
module evaluates
  -> build rings, lanes, pads, archetypes and waves
  -> create fresh counters, camera, input and state
  -> attach pointer, wheel, keyboard and blur callbacks
  -> callbacks mutate live state immediately
  -> RAF updates camera regardless of pause/terminal state
  -> accumulator applies exact 1/60 updates
  -> update returns early for paused/won/lost
  -> render world, HUD, minimap, overlay and CRT
  -> victory writes { scene, souls, wave }
```

## Exact phase gap

```txt
P toggles state.paused
  -> update() stops
  -> selectAt() remains callable
  -> double-click pad can call build()
  -> right-click can call order()
  -> Space can call startWave() because pause is not checked
  -> camera pan/zoom/focus still mutate
  -> GameHost direct mutators remain available

won or lost
  -> update() stops
  -> select/build/order and camera mutation remain admitted
```

The pause and terminal overlays communicate an interaction lock that the state graph does not enforce.

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
identity-counter-domain
campaign-phase-domain-next
```

### Interaction and simulation

```txt
build-action-domain
order-action-domain
wave-start-action-domain
pause-resume-action-domain
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
phase-admission-domain-next
command-result-domain-next
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
phase-frame-correlation-domain-next
```

### Lifecycle, persistence and proof

```txt
runtime-session and lifecycle domains
save-candidate and Continue domains
checkpoint schema/capture/migration/hydration/resume domains
menu and campaign static-check domains
static build and GitHub Pages deploy domains
central-ledger-sync-domain
```

## Implemented kits and services

| Kit | Current services |
|---|---|
| `crt-renderer-kit` | WebGL setup, source texture upload, contain framing, pixel filtering, CRT uniforms, draw, resize and coordinate projection |
| `graveyard-art-kit` | Procedural menu composition and animated source-canvas drawing |
| `menu-route-kit` | Menu selection, panels, Begin/Continue routing and fade timing |
| `menu-settings-persistence-kit` | Read, normalize and write CRT, grain and ambience settings |
| `menu-save-presence-kit` | Scan three keys across two storage layers and return Boolean presence |
| `menu-audio-kit` | Lazy AudioContext, ambience, UI tones and delayed close |
| `campaign-route-shell-kit` | Campaign canvas boot and module execution |
| `pixel-campaign-runtime-kit` | Content descriptors, mutable state, selection, building, orders, wave and camera input |
| `fixed-step-campaign-simulation-kit` | Exact `1/60` spawning, AI, combat, projectiles, rewards and terminal updates |
| `pixel-campaign-render-kit` | World, HUD, minimap, overlay and CRT source rendering |
| `legacy-gamehost-diagnostics-kit` | Mutable state/camera exposure and direct action bypasses |
| check/build/deploy kits | Source-pattern checks, static artifact copy and Pages publishing |
| retained construct kits | Historical concentric construction descriptors and sequence helpers |

## Candidate phase kits

```txt
phantom-command-campaign-phase-kit
phantom-command-phase-transition-kit
phantom-command-phase-admission-matrix-kit
phantom-command-phase-command-preflight-kit
phantom-command-phase-reason-catalog-kit
phantom-command-paused-input-retirement-kit
phantom-command-terminal-mutation-barrier-kit
phantom-command-phase-result-kit
phantom-command-phase-event-journal-kit
phantom-command-phase-frame-correlation-kit
phantom-command-phase-observation-kit
phantom-command-phase-admission-fixture-kit
```

## Required phase model

```txt
BOOTING -> ACTIVE
ACTIVE <-> PAUSED
ACTIVE -> WON | LOST
ACTIVE|PAUSED|WON|LOST -> TRANSITIONING
TRANSITIONING -> DISPOSED
```

Gameplay commands are admitted only in `ACTIVE`. Restart and exit are typed lifecycle commands. Camera behavior outside `ACTIVE` must be an explicit presentation policy rather than accidental RAF mutation.

## Required proof

```txt
rejected non-active gameplay commands preserve the authoritative fingerprint
pause/terminal entry retires held and drag input
GameHost receives the same admission result as browser input
phase sequence increments exactly once per accepted transition
world/HUD/minimap/overlay/CRT consume one committed phase/frame identity
```

## Ordered implementation queue

```txt
1. Continue Capability Resolver
2. Campaign Action Result Authority
   2a. Campaign Phase Admission Authority
   2b. Fixed-Step Replay and Committed Frame Authority
3. Runtime Session Lifecycle Authority
4. Versioned Campaign Checkpoint and Atomic Resume Authority
```

## Validation status

Documentation only. Runtime behavior was not changed. `npm run check`, `npm run build`, phase fixtures and browser phase smoke were not run. No branch or pull request was created.