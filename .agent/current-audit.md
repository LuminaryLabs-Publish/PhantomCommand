# PhantomCommand Current Audit

**Timestamp:** `2026-07-11T11-51-06-04-00`

## Summary

PhantomCommand uses exact `1/60` combat updates, but authoritative commands are not scheduled through that fixed-step boundary. Browser callbacks mutate live campaign and camera state immediately, wall-clock delta is capped at 50 ms, and rendered frames have no tick, state-fingerprint or command provenance. Deterministic replay is not established.

## Plan ledger

**Goal:** catalogue the full runtime and define one authoritative path from browser intent to target tick, committed state and correlated render frame.

- [x] Compare the full Publish inventory with the central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central and root `.agent` coverage.
- [x] Select only `PhantomCommand` as the oldest eligible entry.
- [x] Read campaign clock, callbacks, fixed-step update, render, `GameHost`, package scripts and prior audits.
- [x] Identify the interaction loop, all domains, implemented kits and services.
- [x] Trace immediate browser mutations relative to accumulator ticks.
- [x] Define command sequence, target-tick, overrun, fingerprint, replay and frame receipts.
- [ ] Implement the authority boundary and executable fixtures.

## Selection audit

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
central ledger entries: 9/9
root .agent state: 9/9
selected: LuminaryLabs-Publish/PhantomCommand
prior central timestamp: 2026-07-11T09-40-19-04-00
excluded: LuminaryLabs-Publish/TheCavalryOfRome
```

## Interaction loops

### Browser command path

```txt
pointerdown / pointerup / wheel / keydown
  -> project current pointer with current mutable camera
  -> direct selectAt / build / order / startWave / pause / tower-type mutation
  -> no command envelope
  -> no target tick
  -> no typed result
  -> no journal
```

### Frame and simulation path

```txt
RAF(now)
  -> dt = min(0.05, (now - last) / 1000)
  -> variable-step camera velocity, position and zoom
  -> accumulator += dt
  -> while accumulator >= 1/60
       update(1/60)
       accumulator -= 1/60
  -> render current mutable state and camera
  -> CRT render with performance.now()/1000
```

### Observation path

```txt
world + HUD + minimap + overlay
  -> read mutable state directly
CRT
  -> uploads current source canvas
GameHost
  -> exposes mutable state, mutable camera and direct startWave/build/setZoom
```

## Main finding

The combat loop is fixed-step, but mutation admission is event-time driven. The same logical input can land before or after a simulation tick depending on browser callback timing and display cadence.

```txt
fixed-step update: deterministic only for an already-established state
input-to-state ordering: browser-event dependent
camera/projection state: variable-frame dependent
render correlation: absent
```

### Silent wall-clock loss

`dt` is capped at `.05`. Any frame gap above 50 ms is discarded before entering the accumulator. The current loop can execute at most three `1/60` updates after a stall, with no `ClockOverrunResult`, dropped-duration counter, visibility policy or replay receipt.

### Immediate command mutation

The following mutate outside the fixed-step loop:

```txt
start wave
tower-type selection
pause toggle
unit and pad selection
construction
move or target order
wheel-anchored camera change
middle-button pan
keyboard camera pan state
GameHost startWave/build/setZoom
```

### Mixed render provenance

Each frame combines:

```txt
latest completed simulation state
variable-step camera state
current pointer/drag state
independent CRT animation time
no immutable snapshot
no tickId
no frameId
no stateFingerprint
no command cursor
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
```

### Presentation and projection

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
campaign-terminal-state-domain
camera-pan-zoom-domain
identity-counter-domain
```

### Commands and simulation

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
command-sequence-domain-next
target-tick-domain-next
clock-overrun-domain-next
replay-journal-domain-next
state-fingerprint-domain-next
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
render-frame-domain-next
frame-consumer-ack-domain-next
cadence-replay-proof-domain-next
runtime lifecycle and checkpoint domains
source checks, static build, Pages deploy and central sync
```

## Implemented kits and services

| Kit | Current services |
|---|---|
| `crt-renderer-kit` | WebGL setup, source upload, contain framing, CRT curvature, animation-time effects, draw, resize and partial coordinate projection |
| `graveyard-art-kit` | Procedural menu composition and animated source-canvas drawing |
| `menu-route-kit` | Menu selection, panels, Begin/Continue routing and fade timing |
| `menu-settings-persistence-kit` | Read, normalize and write CRT, grain and ambience settings |
| `menu-save-presence-kit` | Scan three keys across two storage layers and return Boolean presence |
| `menu-audio-kit` | Lazy AudioContext, ambience, UI tones and delayed close |
| `campaign-route-shell-kit` | Campaign canvas boot and module execution |
| `pixel-campaign-runtime-kit` | Content descriptors, mutable state, pointer/world actions, building, orders, wave and camera input |
| `fixed-step-campaign-simulation-kit` | Exact `1/60` spawning, AI, combat, projectiles, rewards and terminal updates |
| `pixel-campaign-render-kit` | World, HUD, minimap, overlay and source-frame drawing |
| `legacy-gamehost-diagnostics-kit` | Mutable state/camera exposure and direct action bypasses |
| check/build/deploy kits | Source-pattern checks, static artifact copy and Pages publishing |
| retained construct kits | Historical concentric construction descriptors and sequence helpers |

## Candidate fixed-step and frame kits

```txt
phantom-command-monotonic-frame-sample-kit
phantom-command-simulation-clock-kit
phantom-command-fixed-step-accumulator-kit
phantom-command-simulation-tick-id-kit
phantom-command-command-envelope-kit
phantom-command-command-sequence-kit
phantom-command-target-tick-policy-kit
phantom-command-fixed-step-command-queue-kit
phantom-command-command-application-kit
phantom-command-catchup-budget-kit
phantom-command-clock-overrun-result-kit
phantom-command-state-fingerprint-kit
phantom-command-committed-tick-receipt-kit
phantom-command-render-frame-id-kit
phantom-command-committed-frame-receipt-kit
phantom-command-frame-consumer-ack-kit
phantom-command-replay-journal-kit
phantom-command-cadence-parity-fixture-kit
phantom-command-stall-policy-fixture-kit
phantom-command-command-replay-fixture-kit
phantom-command-frame-correlation-fixture-kit
```

## Required authority chain

```txt
browser intent
  -> projection result and revision
  -> CampaignCommand
       sessionId, commandId, sequence, source
       observedPhase, targetTick, payload
  -> preflight and phase admission
  -> ordered fixed-step queue
  -> apply exactly once before target tick update
  -> domain events and state fingerprint
  -> CommittedTickReceipt
  -> immutable render snapshot
  -> CommittedFrameReceipt
       frameId, tickId, fingerprint, command cursor
       camera revision, projection revision, consumer acknowledgements
```

## Clock policy required

```txt
monotonic frame sample
  -> visibility policy
  -> elapsed duration
  -> accumulator
  -> bounded catch-up count
  -> explicit overrun result
  -> zero or more simulation ticks
```

The implementation must declare whether excess time is simulated, suspended or dropped. It must never discard time silently.

## Required proof

```txt
same command journal produces the same state fingerprint
20, 30, 60 and 120 Hz frame schedules converge
irregular frame schedule converges
50 ms and longer stalls follow declared policy
commands apply once at the declared target tick
commands received around a RAF boundary have stable ordering
pause and terminal phases reject forbidden mutations
world, HUD, minimap, overlay and CRT acknowledge one frame receipt
GameHost cannot bypass command scheduling
```

## Ordered implementation queue

```txt
1. Continue Capability Resolver
2. Campaign Action Result Authority
   2a. CRT Display/Input Projection Authority
   2b. Campaign Phase Admission Authority
   2c. Fixed-Step Command Scheduling, Replay and Committed Frame Authority
3. Runtime Session Lifecycle Authority
4. Versioned Campaign Checkpoint and Atomic Resume Authority
```

## Validation status

Documentation only. Runtime behavior was not changed. `npm run check`, `npm run build`, cadence fixtures, stall fixtures, replay fixtures and browser frame-correlation smoke were not run.