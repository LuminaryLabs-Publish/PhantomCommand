# PhantomCommand Current Audit

**Timestamp:** `2026-07-11T16-49-51-04-00`

## Summary

PhantomCommand has an exact `1/60` update step, but combat inside that step is not yet deterministic or liveness-safe. `update()` captures `Object.values(state.units)`, and `damage()` can delete a later actor from `state.units` before that actor's captured entry is processed. Because `updateUnit()` does not re-check liveness, a killed unit can still move, attack, create a projectile or damage the sanctum in the same tick. Rendering then omits the deleted actor, creating a visible-causality gap.

## Plan ledger

**Goal:** preserve the complete architecture census and define one staged combat-resolution transaction that is independent from object insertion order and produces a committed, renderable result.

- [x] Compare the complete current Publish inventory with the central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central and root `.agent` coverage.
- [x] Select only `PhantomCommand` as the oldest eligible repository.
- [x] Read campaign content, input, fixed-step update, targeting, damage, deletion, rewards, terminal checks, rendering and validation.
- [x] Identify the full interaction loop.
- [x] Identify all domains in use.
- [x] Identify all implemented kits and current services.
- [x] Define combat input, liveness, ordering, intent, damage, retirement, cleanup, result and fixture contracts.
- [ ] Implement and execute the authority boundary.

## Selection audit

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
central ledger entries: 9/9
root .agent state: 9/9
new or missing eligible repositories: 0
selected: LuminaryLabs-Publish/PhantomCommand
selected prior central timestamp: 2026-07-11T15-08-41-04-00
excluded: LuminaryLabs-Publish/TheCavalryOfRome
other Publish repositories changed: none
```

Stable comparison:

```txt
PhantomCommand     2026-07-11T15-08-41-04-00 selected
ZombieOrchard      2026-07-11T15-20-27-04-00
TheUnmappedHouse   2026-07-11T15-30-50-04-00
AetherVale         2026-07-11T15-38-27-04-00
IntoTheMeadow      2026-07-11T15-49-49-04-00
PrehistoricRush    2026-07-11T15-59-12-04-00
MyCozyIsland       2026-07-11T16-10-58-04-00
TheOpenAbove       2026-07-11T16-30-25-04-00
HorrorCorridor     2026-07-11T16-38-10-04-00
TheCavalryOfRome   excluded
```

## Complete interaction loop

```txt
index.html
  -> graveyard-menu.js
  -> procedural menu art, settings, audio and raw save presence
  -> Begin or Continue navigation

game.html
  -> campaign-scene.js
  -> create source canvas and CRT
  -> construct rings, lanes, pads, archetypes, waves, camera and state
  -> create six allies
  -> install input listeners
  -> expose GameHost
  -> request RAF

input callback
  -> immediate live mutation of selection, order, build, wave, pause or camera

RAF
  -> sample wall-clock time
  -> clamp accepted delta to 50 ms
  -> update variable-delta camera
  -> run zero or more exact 1/60 updates
  -> draw world, HUD, minimap and overlay
  -> upload and draw CRT
```

## Combat-resolution loop

```txt
update(dt)
  -> decrement due spawn rows
  -> insert spawned enemies
  -> capture Object.values(state.units)
  -> process captured units in insertion order
       cooldown
       target selection
       movement or attack
       immediate damage or projectile creation
       immediate deletion and reward
       possible core breach and self-deletion
  -> process towers
  -> process projectiles and splash damage
  -> age effects
  -> evaluate wave completion and terminal state
```

## Main finding

### Dead actor can still act

```txt
const actors = Object.values(state.units)
earlier actor kills later actor
damage() deletes state.units[laterActor.id]
actors still contains laterActor
updateUnit(laterActor) executes
```

The deleted actor can still:

```txt
select a target
move
perform melee damage
launch a projectile
breach the sanctum
create visible effects
```

### Combat result depends on incidental order

```txt
allies are inserted before enemies
enemies are inserted by spawn order
nearest() resolves equal distance by first encountered entry
immediate damage changes which later entries survive
checkpoint reconstruction order can alter next-tick behavior
```

### Spawn and cleanup policy is implicit

```txt
newly spawned enemies act during the same update
unit target cleanup is lazy
projectile target cleanup occurs in the projectile phase
selection cleanup occurs inside damage()
reward settlement occurs inside deletion
core breach occurs inside unit iteration
wave clear occurs after mutable subsystem passes
```

## Domains in use

### Route, menu and startup

```txt
static-route-shell-domain
menu-route-domain
campaign-route-domain
menu-selection-domain
menu-panel-domain
menu-settings-persistence-domain
menu-transition-domain
menu-audio-domain
graveyard-art-domain
source-canvas-domain
save-slot-registry-domain
storage-slot-read-domain
raw-save-presence-domain
save-candidate-resolution-domain-next
continue-capability-domain-next
campaign-startup-admission-domain-next
```

### Projection and presentation

```txt
crt-display-domain
contain-projection-domain
crt-curve-domain
source-resolution-domain
pointer-hit-domain
source-to-world-domain
world-to-source-domain
wheel-anchor-domain
drag-selection-domain
display-to-source-authority-domain-next
projection-revision-domain-next
```

### Campaign content and mutable state

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
camera-pan-zoom-domain
identity-counter-domain
campaign-phase-domain-next
```

### Input, command and fixed step

```txt
build-action-domain
order-action-domain
wave-start-action-domain
pause-resume-action-domain
gamehost-action-domain
fixed-step-simulation-domain
command-sequence-domain-next
target-tick-domain-next
clock-overrun-domain-next
replay-journal-domain-next
state-fingerprint-domain-next
```

### Combat resolution

```txt
spawn-queue-domain
spawn-admission-domain-next
entity-liveness-domain-next
deterministic-entity-order-domain-next
unit-ai-domain
enemy-pathing-domain
ally-targeting-domain
tower-targeting-domain
target-tie-break-domain-next
unit-intent-domain-next
attack-intent-domain-next
projectile-domain
damage-intent-domain-next
damage-resolution-domain-next
entity-retirement-domain-next
reference-cleanup-domain-next
damage-reward-domain
core-breach-event-domain-next
wave-clear-predicate-domain
combat-resolution-result-domain-next
combat-resolution-journal-domain-next
```

### Terminal, lifecycle and persistence

```txt
victory-predicate-domain
defeat-predicate-domain
terminal-outcome-arbitration-domain-next
terminal-transition-domain-next
terminal-result-domain-next
victory-summary-write-domain
runtime-lifecycle-domain-next
versioned-checkpoint-domain-next
atomic-resume-domain-next
```

### Render, proof and deployment

```txt
world-render-domain
hud-projection-domain
minimap-domain
modal-overlay-domain
crt-upload-domain
crt-draw-domain
phantom-menu-diagnostics-domain
gamehost-diagnostics-domain
committed-tick-domain-next
committed-frame-domain-next
frame-consumer-ack-domain-next
menu-static-check-domain
campaign-static-check-domain
static-build-domain
github-pages-deploy-domain
central-ledger-sync-domain
```

## Implemented kits and services

| Kit | Current services |
|---|---|
| `crt-renderer-kit` | WebGL setup, source upload, contain framing, CRT curvature, draw, resize and contain-only coordinate projection |
| `graveyard-art-kit` | Procedural graveyard composition and animated menu drawing |
| `menu-route-kit` | Menu selection, panels, Begin/Continue routing and fade |
| `menu-settings-persistence-kit` | CRT, grain and ambience setting read/write |
| `menu-save-presence-kit` | Boolean raw-presence scan across six possible slots |
| `menu-audio-kit` | AudioContext, ambience and UI tones |
| `campaign-route-shell-kit` | Campaign page and module bootstrap |
| `pixel-campaign-runtime-kit` | Content, mutable state, selection, construction, orders, waves, camera and input |
| `fixed-step-campaign-simulation-kit` | Spawning, AI, movement, targeting, towers, projectiles, damage, rewards, core damage and wave completion |
| `pixel-campaign-render-kit` | World, HUD, minimap, terminal overlay and source-frame drawing |
| `legacy-gamehost-diagnostics-kit` | Mutable state/camera exposure and direct actions |
| `menu-static-check-kit` | Menu source-pattern checks |
| `campaign-static-check-kit` | Campaign source-pattern checks |
| `static-build-copy-kit` | Static artifact assembly |
| `pages-deploy-kit` | Pages artifact deployment |
| `construct-spiral-intro-kit` | Retained intro scheduling |
| `construct-spiral-schedule-kit` | Retained piece timing |
| `construct-piece-id-kit` | Retained piece identity |
| `construct-piece-state-kit` | Retained piece state |
| `construct-sequence-update-kit` | Retained sequence updates |

## Required combat-resolution kits

```txt
phantom-command-combat-frame-input-kit
phantom-command-entity-liveness-index-kit
phantom-command-deterministic-entity-order-kit
phantom-command-spawn-admission-phase-kit
phantom-command-unit-intent-kit
phantom-command-target-selection-policy-kit
phantom-command-attack-intent-kit
phantom-command-damage-intent-kit
phantom-command-damage-resolution-policy-kit
phantom-command-entity-retirement-kit
phantom-command-reference-cleanup-kit
phantom-command-reward-settlement-kit
phantom-command-core-breach-event-kit
phantom-command-wave-clear-evaluation-kit
phantom-command-combat-resolution-result-kit
phantom-command-combat-resolution-journal-kit
phantom-command-dead-entity-no-action-fixture-kit
phantom-command-combat-order-parity-fixture-kit
phantom-command-checkpoint-order-parity-fixture-kit
phantom-command-ghost-action-frame-smoke-kit
```

## Required transaction

```txt
admitted commands for tick
  -> immutable CombatFrameInput
  -> due spawn admission
  -> alive entity index
  -> versioned stable entity order
  -> movement/target/attack intent collection
  -> damage intent collection
  -> declared damage resolution
  -> exactly-once retirement
  -> eager reference cleanup
  -> reward and core-breach settlement
  -> wave-clear evidence
  -> CombatResolutionResult
  -> terminal arbitration
  -> committed state fingerprint
  -> immutable render snapshot
  -> world/HUD/minimap/CRT acknowledgement
```

## Implementation order

```txt
1. Continue Capability Resolver
2. Campaign Action Result Authority
   2a. Projection Authority
   2b. Phase Admission Authority
   2c. Fixed-Step Command/Replay/Frame Authority
   2d. Combat Resolution and Entity Liveness Authority
   2e. Exclusive Terminal Outcome Authority
3. Runtime Session Lifecycle Authority
4. Versioned Checkpoint and Atomic Resume Authority
```

## Validation boundary

```txt
runtime source changed: no
package scripts changed: no
dependencies changed: no
gameplay changed: no
rendering changed: no
persistence changed: no
deployment changed: no
npm run check: not run
npm run build: not run
browser smoke: not run
dead-entity fixture: absent
combat-order fixture: absent
checkpoint-order parity fixture: absent
ghost-action committed-frame smoke: absent
```
