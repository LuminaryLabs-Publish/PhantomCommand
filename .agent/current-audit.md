# PhantomCommand Current Audit

**Timestamp:** `2026-07-10T23-40-35-04-00`

## Status

```txt
status: continue-resolver-first-action-authority-implementation-ready
runtime source changed: no
branch: main
root .agent state: refreshed
central ledger sync: pending until repo-local audit completes
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
Prior selected-repo timestamp: 2026-07-10T21-49-26-04-00
```

## Current interaction loop

```txt
index.html menu module evaluation
  -> settings and six-slot raw save-presence scan
  -> menu/art/CRT/audio construction
  -> canvas, document, and hidden-button listeners
  -> recursive RAF loop
  -> Begin or Continue fade and browser navigation
  -> game.html campaign module evaluation
  -> fresh descriptors, mutable campaign state, CRT renderer, listeners, and recursive RAF
  -> pointer, keyboard, and GameHost entry points mutate camera or campaign state directly
  -> accumulator advances exact 1/60 simulation steps
  -> world, HUD, minimap, modal, and CRT render live mutable state
  -> win/loss stops simulation updates
  -> R reloads or Escape navigates to the menu
```

## Domains in use

```txt
route and menu presentation:
  static-route-shell, menu-route, campaign-route
  menu-selection, settings-panel, credits-panel
  settings persistence, save-candidate discovery, Continue capability
  fade transition, audio, graveyard art, source canvas, CRT display

campaign content and state:
  ring map, lanes, build pads
  unit, tower, and wave descriptors
  souls economy, sanctum health, campaign flags and messages
  selection, selected pad, camera pan/zoom/focus

campaign commands and simulation:
  selection, pad selection, building, unit orders, wave start
  fixed-step accumulator and spawn queue
  AI, pathing, targeting, projectiles, damage, rewards, effects
  wave completion, win/loss, victory summary persistence

input, render, proof, and deploy:
  pointer and keyboard input
  world, entity, HUD, minimap, modal, and CRT rendering
  PhantomMenu and GameHost diagnostics
  source-pattern checks, static build, Pages deployment, central ledger
```

## Source-backed kits and services

- `crt-renderer-kit`: WebGL program, source texture, nearest filtering, containment mapping, CRT curve, grain, aberration, fade, resize, and pointer conversion.
- `graveyard-art-kit`: procedural menu art and animation.
- `menu-route-kit`: selection, settings/credits panels, activation, fade, and route emission.
- `menu-settings-persistence-kit`: CRT, grain, and ambience preferences.
- `menu-save-presence-kit`: raw six-slot storage presence scan.
- `menu-audio-kit`: lazy AudioContext graph, drone, wind, and UI tones.
- `campaign-route-shell-kit`: campaign canvas route.
- `pixel-campaign-runtime-kit`: descriptors, live state, input, action mutation, simulation, persistence, render, and diagnostics.
- `fixed-step-campaign-simulation-kit`: accumulator-based exact `1/60` updates.
- `pixel-campaign-render-kit`: world, entities, HUD, minimap, modal, selection rectangle, and CRT projection.
- `legacy-gamehost-diagnostics-kit`: mutable state/camera, `startWave`, `build`, aggregate state clone, and zoom control.
- `menu-static-check-kit` and `campaign-static-check-kit`: source-shape assertions.
- `static-build-copy-kit`: static artifact creation.
- Retained construct kits remain historical proof and are not live campaign authority.

## Verified source facts

```txt
campaign action entry points: selectAt, build, order, startWave
shared command envelope: none
command sequence: none
target tick: none
accepted/rejected/no-op result: none
stable reason vocabulary: none
command/result/event journals: none
canonical state fingerprint: none
committed frame: none
render consumption rows: none

selectAt separates selection and building: no
build rejection is observable: no
order rejection is observable: no
wave-start rejection is observable: no
GameHost uses the same typed command path: no
DOM callbacks mutate simulation state directly: yes

simulation step: 1/60
commands drained at tick boundary: no
browser callback timing can change request ordering relative to update: yes
render reads mutable state directly: yes
GameHost getState matches one committed rendered frame: no

candidate slots: 6
Continue resolver: Boolean presence only
campaign reads session mode: no
route lifecycle owner: no
```

## Main findings

### Queue head remains Continue resolution

The menu and campaign still need one shared immutable save-candidate decision before resume work.

### Action authority is now mapped in implementation order

The fixed-step accumulator does not make browser requests deterministic because callbacks mutate state before the queue-free simulation loop decides how many ticks to run. The same logical request stream cannot yet be replayed independently of browser timing.

Required boundary:

```txt
request adapter
  -> command sequence
  -> target tick
  -> pure preflight
  -> typed result
  -> fixed-step queue
  -> deterministic events
  -> state fingerprint
  -> committed frame
  -> render/GameHost consumption proof
```

### Rendering lacks committed-frame identity

World, HUD, minimap, modal, CRT, and GameHost observation may inspect the same mutable objects at different moments. No frame ID or fingerprint proves convergence.

### Lifecycle remains third

Session ownership, frame cancellation, listener removal, audio/CRT disposal, restart, and stale-session rejection remain necessary after command authority.

## Implementation queue

```txt
1. Continue Capability Resolver + Save Candidate Precedence Fixture Gate
2. Campaign Action Result Authority + Fixed-Step Replay/Frame Fixture Gate
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
candidate resolver fixture: absent / not run
action-result fixture: absent / not run
fixed-step replay fixture: absent / not run
frame-consumption fixture: absent / not run
repo-local documentation pushed to main: in progress
central ledger update: pending
```
