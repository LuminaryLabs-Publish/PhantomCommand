# PhantomCommand Current Audit

**Timestamp:** `2026-07-10T21-49-26-04-00`

## Status

```txt
status: continue-resolver-first-action-authority-second-lifecycle-third-planned
runtime source changed: no
branch: main
root .agent state: refreshed
central ledger sync: complete
```

## Selection audit

```txt
Accessible Publish repositories: 10
Eligible non-Cavalry repositories: 9
Central ledger entries present: 9/9
Root .agent state present: 9/9
Excluded: LuminaryLabs-Publish/TheCavalryOfRome
Selected: LuminaryLabs-Publish/PhantomCommand
Selection rule: oldest eligible documented fallback
Prior selected-repo timestamp: 2026-07-10T20-19-35-04-00
```

## Current interaction loop

```txt
index.html menu module evaluation
  -> settings and six-slot raw save-presence scans
  -> menu/art/CRT/audio construction
  -> canvas, document, and hidden-button listeners
  -> unretained recursive RAF loop
  -> Begin or Continue timed fade and browser navigation
  -> game.html campaign module evaluation
  -> fresh descriptors, mutable state, CRT renderer, listeners, and unretained RAF loop
  -> pointer and keyboard callbacks mutate camera or campaign state
  -> accumulator advances exact 1/60 simulation steps
  -> live state renders through world, HUD, minimap, modal, and CRT
  -> win/loss stops simulation updates
  -> R reloads or Escape navigates to menu
```

## Domains in use

```txt
route and menu presentation:
  static-route-shell, menu-route, campaign-route
  menu-selection, panel, settings, save-presence, Continue capability
  transition, audio, graveyard art, source canvas, CRT display

session and persistence:
  campaign route intent, save-key ownership, victory completion summary
  candidate classification/precedence/resolution next
  versioned save envelope and hydration follow-on

campaign content and simulation:
  rings, lanes, build pads, units, towers, waves
  souls economy, sanctum health, selection, build, order, wave start
  AI, pathing, targeting, projectiles, damage, rewards, effects, win/loss
  fixed-step accumulator

input and render:
  pointer selection, drag selection, order input
  keyboard pan, pause, wave, tower choice, restart, exit
  wheel zoom and camera focus
  world, entity, HUD, minimap, modal, CRT rendering

proof and deploy:
  PhantomMenu and GameHost diagnostics
  source-pattern checks, static build, Pages deployment, central ledger

lifecycle next:
  route-session state and ID
  startup transaction and rollback
  RAF ownership and cancellation
  listener registration/removal ledger
  audio and WebGL resource ownership
  ordered idempotent stop/dispose/restart
  lifecycle journal and clone-safe host observation
```

## Source-backed kits and services

- `crt-renderer-kit`: WebGL program, texture upload, nearest sampling, containment mapping, CRT effects, resize, and pointer conversion.
- `graveyard-art-kit`: procedural menu art.
- `menu-route-kit`: selection, panels, Begin/Continue route emission, credits, and fade transition.
- `menu-settings-persistence-kit`: CRT, grain, and ambience preferences.
- `menu-save-presence-kit`: raw six-slot presence scans.
- `menu-audio-kit`: lazy AudioContext, drone, wind, and UI tones.
- `campaign-route-shell-kit`: campaign canvas route.
- `pixel-campaign-runtime-kit`: descriptors, mutable state, input, action mutation, simulation, save, rendering, and diagnostics.
- `fixed-step-campaign-simulation-kit`: accumulator-based `1/60` updates.
- `pixel-campaign-render-kit`: world, entities, HUD, minimap, modal, selection rectangle, and CRT projection.
- `legacy-gamehost-diagnostics-kit`: mutable state/camera, `startWave`, `build`, aggregate `getState`, and `setZoom`.
- `campaign-static-check-kit`: source-pattern assertions.
- `static-build-copy-kit`: static artifact creation.
- Legacy construct kits remain source-backed retained proof but are not live campaign authority.

## Verified source facts

```txt
menu RAF request ID retained: no
campaign RAF request ID retained: no
menu listener removal service: no
campaign listener removal service: no
menu route stop/dispose/restart: no
campaign route stop/dispose/restart: no
startup rollback: no
session ID/state: no
CRT renderer dispose: no
WebGL program/buffer/texture release: no
menu audio teardown on route navigation: no
GameHost lifecycle surface: no
PhantomMenu lifecycle surface: no

campaign action functions: selectAt, build, order, startWave
action result shape: none
action sequence/target tick: none
command/result/event journals: none
committed frame/fingerprint: none

candidate keys: phantomCommand.save, nexus.sceneSnapshot, phantom.command.campaign
candidate layers: localStorage, sessionStorage
Continue resolver: Boolean presence only
campaign mode parsing/hydration: none
```

## Main findings

### Queue head retained

Menu and campaign must consume one immutable six-slot candidate-resolution result before hydration work.

### Action authority retained

Gameplay mutation still bypasses a deterministic command/result queue and committed-frame boundary.

### Newly mapped lifecycle blocker

Both route modules eagerly allocate resources, register listeners, and begin recursive RAF loops. They rely on page destruction for cleanup. No object can prove that frames stop, listeners are removed, audio closes, WebGL resources release, partial startup rolls back, or restart/remount produces exactly one live route session.

## Implementation queue

```txt
1. Continue Capability Resolver + Save Candidate Precedence Fixture Gate
2. Campaign Action Result Authority + Fixed-Step Frame Fixture Gate
3. Runtime Session Lifecycle Authority + Menu/Campaign Teardown Fixture Gate
4. Versioned Save Envelope + Atomic Resume Fidelity Gate
```

## Validation status

```txt
runtime source changed: no
branch created: no
pull request created: no
npm run check: not run
npm run build: not run
browser smoke: not run
lifecycle fixture: absent / not run
CRT disposal fixture: absent / not run
listener ledger fixture: absent / not run
restart idempotency fixture: absent / not run
repo-local documentation pushed to main: yes
central ledger updated: yes
central internal change log added: yes
```