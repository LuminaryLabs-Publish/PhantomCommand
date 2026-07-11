# PhantomCommand Current Audit

**Timestamp:** `2026-07-11T13-28-37-04-00`

## Summary

PhantomCommand can commit defeat and victory during the same fixed update. Core breach sets `lost = true`, but the update continues into final-wave completion, which can set `won = true`, overwrite the message and write a victory save. The render overlay prioritizes `won`, so a destroyed sanctum can be presented and persisted as a win.

## Plan ledger

**Goal:** catalogue the complete runtime and define one exclusive, monotonic terminal-outcome transaction that is compatible with the planned command, phase, replay, frame and checkpoint authorities.

- [x] Compare the current Publish inventory with the central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central and root `.agent` coverage.
- [x] Detect a same-window active documentation sequence in `HorrorCorridor`.
- [x] Select only `PhantomCommand` as the oldest stable eligible repository.
- [x] Read menu, campaign state, unit update, wave completion, render, persistence, restart and `GameHost` source.
- [x] Identify the interaction loop, all domains, implemented kits and offered services.
- [x] Prove the simultaneous win/loss path by source ordering.
- [x] Define terminal arbitration, latch, result, persistence and frame contracts.
- [ ] Implement the boundary and executable fixtures.

## Selection audit

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
central ledger entries: 9/9
root .agent state: 9/9
same-window active repo skipped: HorrorCorridor at 2026-07-11T13-20-45-04-00
selected: LuminaryLabs-Publish/PhantomCommand
selected prior timestamp: 2026-07-11T11-51-06-04-00
excluded: LuminaryLabs-Publish/TheCavalryOfRome
```

Current stable comparison:

```txt
PhantomCommand     2026-07-11T11-51-06-04-00 selected
ZombieOrchard      2026-07-11T12-01-38-04-00
TheUnmappedHouse   2026-07-11T12-08-47-04-00
AetherVale         2026-07-11T12-18-42-04-00
IntoTheMeadow      2026-07-11T12-29-49-04-00
PrehistoricRush    2026-07-11T12-39-53-04-00
MyCozyIsland       2026-07-11T12-58-06-04-00
TheOpenAbove       2026-07-11T13-10-35-04-00
HorrorCorridor     active repo-local audit at 2026-07-11T13-20-45-04-00
TheCavalryOfRome   excluded
```

## Interaction loops

### Menu and route loop

```txt
index.html
  -> graveyard-menu.js
  -> settings and raw save-key presence
  -> Begin routes to game.html?campaign=new
  -> Continue routes to game.html?campaign=continue
  -> campaign module constructs fresh state regardless of query mode
```

### Campaign input loop

```txt
pointer or keyboard event
  -> contain-only source projection
  -> direct selection, build, order, wave, pause, tower or camera mutation
  -> no command envelope or terminal-phase admission
```

### Fixed-step terminal loop

```txt
frame(now)
  -> cap dt to 50 ms
  -> variable-step camera update
  -> accumulator-driven update(1/60)

update(1/60)
  -> return if paused or already terminal
  -> update spawn timers
  -> update each unit
       enemy may reach core
       core may become 0
       lost = true
       enemy deleted
  -> update towers and projectiles
  -> remove expired effects
  -> evaluate wave clear
       if final wave cleared
         won = true
         victory message
         victory summary write
```

### Presentation and restart loop

```txt
render()
  -> world
  -> HUD and minimap
  -> overlay checks won before lost
  -> CRT upload and draw

R key
  -> location.reload()
  -> no terminal result acknowledgement
  -> no ordered teardown
  -> no explicit new-run epoch

GameHost
  -> exposes won and lost independently
  -> exposes live state and camera
```

## Main finding

The runtime uses independent terminal booleans:

```txt
state.won
state.lost
```

`updateUnit()` admits defeat when an enemy reaches the center and reduces core health to zero. It deletes that enemy and returns only from the unit update. The parent `update()` continues.

The same parent update then evaluates:

```txt
state.waveActive
&& state.spawn.length === 0
&& enemies().length === 0
```

On the final wave, that branch sets `state.won = true` and writes:

```txt
phantomCommand.save = {
  scene: "grave-ring",
  souls,
  wave
}
```

### Reachable conflicting state

```txt
final wave
last enemy
empty spawn queue
enemy reaches core
core becomes 0
lost becomes true
enemy is deleted
enemies() becomes empty
wave-clear branch runs
won becomes true
success save is written
```

Result:

```txt
core = 0
lost = true
won = true
message = victory message
saved result = victory summary
```

### Presentation conflict

The overlay chooses:

```txt
won ? "GRAVE RING SECURED"
    : lost ? "SANCTUM LOST"
    : "PAUSED"
```

The visible result is therefore victory even though the sanctum was destroyed.

### Persistence conflict

The save write occurs inside the final-wave victory branch and does not preflight:

```txt
core > 0
lost === false
exclusive terminal outcome
committed tick fingerprint
terminal result identity
```

A contradictory state can therefore produce a success candidate that later enables Continue.

## Domains in use

### Route, menu and product shell

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
```

### Projection and presentation

```txt
crt-display-domain
contain-projection-domain
crt-curve-domain
source-resolution-domain
display-to-source-domain-next
source-to-world-domain
world-to-source-domain
pointer-hit-domain
wheel-anchor-domain
drag-selection-domain
projection-revision-domain-next
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
campaign-phase-domain-next
camera-pan-zoom-domain
identity-counter-domain
```

### Simulation and interaction

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
fixed-step-simulation-domain
command-sequence-domain-next
target-tick-domain-next
clock-overrun-domain-next
replay-journal-domain-next
state-fingerprint-domain-next
```

### Terminal outcome and persistence

```txt
core-breach-predicate-domain
wave-clear-predicate-domain
victory-predicate-domain
defeat-predicate-domain
terminal-outcome-arbitration-domain-next
terminal-transition-domain-next
terminal-latch-domain-next
terminal-result-domain-next
terminal-persistence-policy-domain-next
save-on-win-domain
checkpoint-resume-domain-next
```

### Render, observation and proof

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
terminal-frame-receipt-domain-next
frame-consumer-ack-domain-next
runtime-lifecycle-domain-next
source-check-build-pages-deploy-domain
central-ledger-sync-domain
```

## Implemented kits and services

| Kit | Current services |
|---|---|
| `crt-renderer-kit` | WebGL setup, source upload, contain framing, CRT curvature, animation-time effects, draw, resize and contain-only coordinate projection |
| `graveyard-art-kit` | Procedural graveyard composition and animated menu source-canvas drawing |
| `menu-route-kit` | Menu selection, panels, Begin/Continue routing and fade timing |
| `menu-settings-persistence-kit` | Read, normalize and write CRT, grain and ambience settings |
| `menu-save-presence-kit` | Scan three keys across local and session storage and return Boolean presence |
| `menu-audio-kit` | Lazy AudioContext, ambience, UI tones and delayed close |
| `campaign-route-shell-kit` | Campaign canvas boot and module execution |
| `pixel-campaign-runtime-kit` | Campaign descriptors, mutable state, selection, building, orders, wave and camera input |
| `fixed-step-campaign-simulation-kit` | Exact `1/60` spawning, AI, combat, projectiles, rewards, core damage and terminal mutation |
| `pixel-campaign-render-kit` | World, HUD, minimap, terminal overlay and source-frame drawing |
| `legacy-gamehost-diagnostics-kit` | Live state/camera exposure and direct action methods |
| `menu-static-check-kit` | Menu source-pattern checks |
| `campaign-static-check-kit` | Campaign source-pattern checks |
| `static-build-copy-kit` | Static artifact assembly |
| `pages-deploy-kit` | GitHub Pages artifact deployment |
| retained construct kits | Intro scheduling, construct IDs, piece state and sequence updates |

## Candidate terminal-outcome kits

```txt
phantom-command-terminal-evaluation-input-kit
phantom-command-core-breach-predicate-kit
phantom-command-final-wave-clear-predicate-kit
phantom-command-outcome-priority-policy-kit
phantom-command-exclusive-outcome-arbitration-kit
phantom-command-terminal-transition-kit
phantom-command-terminal-latch-kit
phantom-command-terminal-result-kit
phantom-command-terminal-event-kit
phantom-command-terminal-persistence-policy-kit
phantom-command-terminal-save-admission-kit
phantom-command-terminal-frame-receipt-kit
phantom-command-terminal-observation-kit
phantom-command-terminal-outcome-fixture-kit
```

## Required terminal transaction

```txt
fixed tick begins
  -> run combat and collect terminal evidence
       core breach evidence
       wave clear evidence
       remaining enemies and spawn evidence
       core health
       prior phase and prior outcome
  -> evaluate predicates without mutating terminal state
  -> arbitrate exactly one outcome using a versioned policy
       defeat dominates when core <= 0
       victory requires final wave clear and core > 0
       otherwise remain active
  -> commit one monotonic terminal transition
  -> latch terminal outcome for the run epoch
  -> emit TerminalOutcomeResult
  -> admit or reject persistence from that result
  -> publish committed tick and terminal frame receipts
```

## Required contracts

### TerminalEvaluationInput

```txt
runId
runEpoch
tickId
priorPhase
priorOutcome
coreHealth
waveIndex
waveCount
waveActive
spawnCount
enemyCount
coreBreachEvents
waveClearEvents
stateFingerprintBefore
```

### TerminalOutcomeResult

```txt
resultId
runId
runEpoch
tickId
status: active | victory | defeat
reason
transitioned
latched
coreHealth
waveIndex
stateFingerprintAfter
persistenceDecision
```

### TerminalPersistenceDecision

```txt
terminalResultId
accepted
reason
checkpointKind
stateFingerprint
commandCursor
```

## Required proof

```txt
core breach before final wave commits defeat only
final wave clear with positive core commits victory only
simultaneous core breach and final-wave clear commits defeat only
no tick can commit both outcomes
terminal result is monotonic within one run epoch
victory persistence is rejected after defeat evidence
render overlay consumes the committed terminal result rather than Boolean priority
GameHost observes one outcome enum and one terminal result ID
R restart retires the prior outcome and advances a run epoch
same replay journal reproduces the same terminal result and fingerprint
```

## Ordered implementation queue

```txt
1. Continue Capability Resolver
2. Campaign Action Result Authority
   2a. CRT Display/Input Projection Authority
   2b. Campaign Phase Admission Authority
   2c. Fixed-Step Command Scheduling, Replay and Committed Frame Authority
   2d. Exclusive Terminal Outcome Transaction Authority
3. Runtime Session Lifecycle Authority
4. Versioned Campaign Checkpoint and Atomic Resume Authority
```

## Validation boundary

Documentation only. Runtime source, package scripts, dependencies, routes, gameplay, rendering, persistence and deployment configuration were not changed. Existing checks are source-pattern checks and do not execute simultaneous core-breach/final-wave-clear behavior, terminal exclusivity, persistence admission, replay convergence or terminal-frame correlation.