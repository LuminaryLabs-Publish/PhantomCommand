# PhantomCommand Current Audit

**Timestamp:** `2026-07-11T03-31-26-04-00`

## Summary

`PhantomCommand` remains a static pixel-isometric browser RTS with a procedural graveyard menu and a fixed-step grave-ring campaign. This pass found that campaign requests mutate live state outside the fixed-step boundary and return no typed result, making deterministic replay and committed-frame proof impossible.

## Status

```txt
status: continue-resolver-first-action-authority-second-implementation-ready
runtime source changed: no
branch: main
root .agent state: refreshed
central ledger sync: complete
central internal change log: complete
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
Prior selected-repo timestamp: 2026-07-11T01-20-51-04-00
```

## Current interaction loop

```txt
menu module evaluates
  -> reads settings and raw save presence
  -> Begin or Continue emits campaign=new|continue
  -> campaign ignores route mode and creates fresh mutable state
  -> pointer, keyboard, and GameHost invoke direct mutation functions
  -> requests can mutate state between simulation ticks
  -> RAF applies variable-dt camera motion
  -> accumulator applies zero or more exact 1/60 simulation steps
  -> world, HUD, minimap, modal, and CRT read mutable state
  -> GameHost exposes mutable state/camera plus an aggregate clone
  -> victory writes { scene, souls, wave }
```

## Domains in use

```txt
route and menu
  static shell, menu route, campaign route, menu selection,
  settings and credits panels, settings persistence, raw save presence,
  Continue capability, fade transition, procedural audio, graveyard art,
  source-canvas composition, CRT display

campaign content and state
  ring map, lanes, generated build pads, unit archetypes, tower archetypes,
  wave scripts, souls economy, sanctum health, selection, messages,
  terminal state, camera pan/zoom/focus

interaction and commands
  pointer mapping, point and rectangle selection, pad selection,
  tower-type selection, build, unit order, wave start, pause, restart, focus

simulation
  RAF clock, fixed-step accumulator, spawn queue, unit AI, pathing,
  targeting, projectiles, damage, rewards, effects, wave clear, win/loss

presentation and proof
  world, entities, selection, HUD, minimap, modal, CRT,
  victory-summary persistence, PhantomMenu, GameHost,
  source checks, static build, Pages deployment, central sync
```

## Implemented kits and services

- `crt-renderer-kit`: WebGL program, source texture upload, nearest filtering, containment mapping, CRT curve, grain, aberration, fade, resize, pointer conversion.
- `graveyard-art-kit`: procedural menu scene and animation.
- `menu-route-kit`: selection, panels, activation, fade, and new/continue route emission.
- `menu-settings-persistence-kit`: CRT, grain, and ambience preferences.
- `menu-save-presence-kit`: raw three-key by two-layer storage presence scan.
- `menu-audio-kit`: lazy AudioContext, drone, wind, and UI tones.
- `campaign-route-shell-kit`: campaign canvas route and module bootstrap.
- `pixel-campaign-runtime-kit`: descriptors, mutable state, input, simulation, persistence, render, and diagnostics.
- `fixed-step-campaign-simulation-kit`: frame-dt clamp, accumulator, and exact `1/60` updates.
- `pixel-campaign-render-kit`: world, entities, selection, HUD, minimap, terminal modal, and CRT projection.
- `legacy-gamehost-diagnostics-kit`: mutable state/camera, direct `startWave` and `build`, aggregate clone, and zoom.
- `menu-static-check-kit` and `campaign-static-check-kit`: source-shape assertions.
- `static-build-copy-kit`: deployable artifact copy.
- `pages-deploy-kit`: syntax checks, source checks, artifact validation, Pages upload and deployment.
- retained construct kits: historical construct-profile proof, inactive in the current campaign route.

## Source-backed action facts

```txt
action functions:
  selectAt(world, add)
  build()
  order(world)
  startWave()

successful return shape: undefined
rejected return shape: undefined
no-op return shape: undefined
command ID: absent
command sequence: absent
target tick: absent
preflight result: absent
command queue: absent
result journal: absent
event journal: absent
state fingerprint: absent
committed frame: absent
render consumption rows: absent
```

### `selectAt()` conflates distinct commands

One call can select or toggle an ally, select a build pad, trigger a build on a second pad click, or clear selection. The caller cannot identify which semantic action occurred.

### Rejection reasons are discarded

`startWave()` silently returns for active waves, terminal states, and exhausted wave scripts. `build()` silently returns for missing pads, occupied pads, or insufficient souls. `order()` silently returns when no units are selected.

### Input and simulation authority are split

Pointer callbacks, keyboard callbacks, and GameHost calls mutate live state immediately. Only AI, spawning, combat, economy, and terminal progression run inside `update(1/60)`. Equivalent requests can therefore land before or after a simulation step depending on browser event timing.

### Presentation is not a committed frame

The RAF advances camera with variable dt, applies zero or more fixed steps, then renders. The runtime publishes no frame ID, tick range, applied command list, state fingerprint, consumer results, or CRT acknowledgement.

### GameHost is not a proof surface

`window.GameHost` exposes mutable `state` and `camera` references and direct mutation functions. `getState()` returns an aggregate clone but omits session, command, tick, result, event, fingerprint, and frame identity.

## Required authority flow

```txt
admitted campaign session
  -> normalize pointer, keyboard, GameHost, replay, or fixture request
  -> allocate command ID and monotonic sequence
  -> assign deterministic target tick
  -> run pure preflight
  -> publish accepted/rejected/no-op result
  -> apply accepted plan at fixed-step boundary
  -> publish ordered domain events
  -> compute canonical state fingerprint
  -> commit immutable presentation frame
  -> publish render and GameHost consumption rows
```

## Candidate DSKs

```txt
phantom-command-action-authority-domain
  action-source-adapter-kit
  action-command-envelope-kit
  action-sequence-kit
  target-tick-policy-kit
  action-preflight-kit
  action-reason-catalog-kit
  action-result-kit
  fixed-step-command-queue-kit
  command-application-kit
  domain-event-journal-kit
  state-fingerprint-kit
  committed-frame-kit
  render-consumption-kit
  crt-upload-ack-kit
  gamehost-command-observation-kit
  action-result-fixture-kit
  fixed-step-replay-fixture-kit
  frame-consumption-fixture-kit
```

## Implementation queue

```txt
1. Continue Capability Resolver + Save Candidate Precedence Fixture Gate
2. Campaign Action Result Authority + Fixed-Step Replay/Frame Fixture Gate
3. Runtime Session Lifecycle Authority + Menu/Campaign Teardown Fixture Gate
4. Versioned Save Envelope + Atomic Resume Fidelity Gate
```

Continue resolution remains first because commands, ticks, journals, fingerprints, and frames must belong to one admitted campaign session. The action-authority slice is now fully mapped as the second bounded implementation gate.

## Validation status

```txt
runtime source changed: no
package scripts changed: no
dependencies changed: no
routes changed: no
gameplay changed: no
rendering changed: no
persistence changed: no
deployment changed: no
branch created: no
pull request created: no
npm run check: not run
npm run build: not run
browser smoke: not run
action-result fixture: absent / not run
fixed-step replay fixture: absent / not run
frame-consumption fixture: absent / not run
repo-local documentation pushed to main: yes
central ledger updated: yes
central internal change log added: yes
```