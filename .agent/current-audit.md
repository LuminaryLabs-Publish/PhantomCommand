# PhantomCommand Current Audit

**Timestamp:** `2026-07-11T18-21-09-04-00`

## Summary

PhantomCommand can commit contradictory terminal state inside one fixed update. An enemy that reaches the sanctum can set `lost=true` and delete itself. The update then continues through remaining actors, towers, projectiles and the wave-clear predicate. If the breach came from the last enemy of the final wave, the same update can also set `won=true`, overwrite the defeat message, grant the clear reward and write a victory summary. Rendering prefers victory when both flags are true.

## Plan ledger

**Goal:** define one exclusive and monotonic terminal transaction that consumes committed combat evidence and controls persistence, presentation, diagnostics, restart and exit.

- [x] Compare the complete current Publish inventory with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central and root `.agent` coverage.
- [x] Select only `PhantomCommand` as the oldest eligible repository.
- [x] Read campaign input, fixed update, core breach, enemy retirement, wave clear, rewards, save write, rendering and GameHost projection.
- [x] Identify the full interaction loop.
- [x] Identify all active and missing domains.
- [x] Identify all implemented kits and current services.
- [x] Define terminal evidence, arbitration, latch, persistence, projection and fixture contracts.
- [ ] Implement and execute the authority boundary.

## Selection audit

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
central ledger entries: 9/9
root .agent state: 9/9
new or missing eligible repositories: 0
selected: LuminaryLabs-Publish/PhantomCommand
selected prior central timestamp: 2026-07-11T16-49-51-04-00
excluded: LuminaryLabs-Publish/TheCavalryOfRome
other Publish repositories changed: none
```

Current central order before this run:

```txt
PhantomCommand     2026-07-11T16-49-51-04-00 selected
ZombieOrchard      2026-07-11T17-01-11-04-00
TheUnmappedHouse   2026-07-11T17-10-50-04-00
AetherVale         2026-07-11T17-20-20-04-00
IntoTheMeadow      2026-07-11T17-30-56-04-00
PrehistoricRush    2026-07-11T17-39-47-04-00
MyCozyIsland       2026-07-11T17-50-37-04-00
TheOpenAbove       2026-07-11T18-01-38-04-00
HorrorCorridor     2026-07-11T18-11-21-04-00
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
  -> sample and clamp wall-clock time
  -> update variable-delta camera
  -> run zero or more exact 1/60 updates
  -> draw world, HUD, minimap and terminal overlay
  -> upload and draw CRT
```

## Terminal path today

```txt
fixed update entry
  -> return only if paused, won or lost was already true
  -> process spawns and captured units
  -> enemy may reach core
       core -= enemy.core
       enemy deletes itself
       lost = true when core <= 0
  -> continue processing the same update
  -> process towers and projectiles
  -> evaluate no-spawn/no-enemy wave clear
  -> advance wave and grant reward
  -> final wave sets won = true
  -> overwrite message and write victory summary
  -> render checks won before lost
```

## Main finding

### Simultaneous terminal evidence is possible

```txt
final-wave state
spawn queue empty
a single enemy remains
core health <= enemy core damage

enemy breaches core
  -> defeat evidence
  -> enemy removed

wave-clear predicate runs later
  -> no enemies remain
  -> victory evidence
```

### Mutable outcomes are contradictory

```txt
state.lost = true
state.won = true
state.message = victory copy
localStorage victory summary = written
overlay = victory because won is checked first
GameHost = exposes won:true and lost:true
```

### No authoritative terminal result exists

```txt
run epoch: absent
terminal candidate IDs: absent
evidence revision: absent
arbitration policy/version: absent
exclusive result enum: absent
terminal latch: absent
terminal result ID: absent
persistence admission result: absent
terminal frame receipt: absent
restart/exit result: absent
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

### Input, clock and combat

```txt
build-action-domain
order-action-domain
wave-start-action-domain
pause-resume-action-domain
gamehost-action-domain
fixed-step-simulation-domain
command-sequence-domain-next
target-tick-domain-next
spawn-queue-domain
entity-liveness-domain-next
deterministic-entity-order-domain-next
unit-ai-domain
enemy-pathing-domain
ally-targeting-domain
tower-targeting-domain
projectile-domain
damage-resolution-domain-next
entity-retirement-domain-next
reward-settlement-domain-next
combat-resolution-result-domain-next
```

### Terminal outcome

```txt
core-breach-evidence-domain-next
final-wave-clear-evidence-domain-next
victory-predicate-domain
defeat-predicate-domain
terminal-outcome-policy-domain-next
terminal-outcome-arbitration-domain-next
terminal-outcome-latch-domain-next
terminal-result-domain-next
terminal-persistence-admission-domain-next
terminal-message-projection-domain-next
terminal-overlay-projection-domain-next
terminal-gamehost-projection-domain-next
terminal-frame-correlation-domain-next
terminal-restart-exit-domain-next
```

### Lifecycle, checkpoint, proof and deployment

```txt
runtime-lifecycle-domain-next
versioned-checkpoint-domain-next
atomic-resume-domain-next
world-render-domain
hud-projection-domain
minimap-domain
modal-overlay-domain
crt-upload-domain
crt-draw-domain
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
| `fixed-step-campaign-simulation-kit` | Spawning, AI, movement, targeting, towers, projectiles, damage, rewards, core damage, wave completion and direct terminal mutation |
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

## Required terminal-outcome kits

```txt
phantom-command-terminal-evidence-input-kit
phantom-command-core-breach-evidence-kit
phantom-command-final-wave-clear-evidence-kit
phantom-command-terminal-policy-kit
phantom-command-terminal-arbitration-kit
phantom-command-terminal-outcome-result-kit
phantom-command-terminal-latch-kit
phantom-command-terminal-transition-kit
phantom-command-terminal-persistence-admission-kit
phantom-command-terminal-message-projection-kit
phantom-command-terminal-overlay-projection-kit
phantom-command-terminal-gamehost-projection-kit
phantom-command-terminal-frame-correlation-kit
phantom-command-terminal-restart-exit-kit
phantom-command-terminal-journal-kit
phantom-command-simultaneous-outcome-fixture-kit
phantom-command-terminal-persistence-fixture-kit
phantom-command-terminal-frame-smoke-kit
```

## Required result contract

```txt
TerminalOutcomeResult
  resultId
  runEpoch
  sourceCombatResultId
  sourceTickId
  evidenceRevision
  policyId
  policyVersion
  previousPhase
  outcome: ACTIVE | VICTORY | DEFEAT
  acceptedVictoryEvidence[]
  acceptedDefeatEvidence[]
  rejectedEvidence[]
  persistenceDecision
  transitionDecision
  stateFingerprint
  journalRange
```

## Recommended arbitration policy

The policy must be explicit and versioned. For the current survival objective, defeat should win when the sanctum reaches zero in the same committed combat result that clears the final wave. This prevents a destroyed objective from being reported and persisted as victory. A different design is valid only if authored as a named policy and covered by fixtures.

## Validation boundary

This pass changes documentation only. It does not implement exclusive outcome state, change gameplay, run browser fixtures or claim the terminal race is fixed.