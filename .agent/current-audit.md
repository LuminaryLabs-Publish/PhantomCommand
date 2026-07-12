# PhantomCommand Current Audit

**Timestamp:** `2026-07-12T03-00-46-04-00`

## Summary

The campaign runtime uses `paused`, `waveActive`, `won`, and `lost` as independent mutable booleans rather than one authoritative phase. `update()` exits while paused or terminal, but browser callbacks and `GameHost` mutators continue to change gameplay state. Space can create a spawn queue while paused; selection, construction and orders remain active; and terminal states do not close mutation. No action cites a phase revision or returns a typed accepted/rejected result.

## Plan ledger

**Goal:** define one revisioned phase contract consumed by every campaign action, simulation transition, render observation and public host adapter.

- [x] Compare the current Publish inventory with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `PhantomCommand` as the oldest eligible repository.
- [x] Inspect campaign state, `startWave`, `build`, `selectAt`, `order`, keyboard, pointer, wheel, RAF, renderer and `GameHost`.
- [x] Identify the complete interaction loop, domains, kits and services.
- [x] Confirm pause gates `update()` but not gameplay commands.
- [x] Confirm `startWave()` does not reject paused state.
- [x] Confirm construction and orders do not reject paused, won or lost state.
- [x] Confirm public host calls bypass phase admission.
- [x] Define phase schema, policy matrix, typed results, mutation fences and fixture gates.
- [ ] Implement and execute the documented fixtures.

## Selection audit

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

PhantomCommand     2026-07-12T01-20-00-04-00 selected oldest
ZombieOrchard      2026-07-12T01-30-07-04-00
TheUnmappedHouse   2026-07-12T01-41-56-04-00
AetherVale         2026-07-12T01-58-43-04-00
MyCozyIsland       2026-07-12T02-10-14-04-00
PrehistoricRush    2026-07-12T02-21-55-04-00
TheOpenAbove       2026-07-12T02-29-50-04-00
IntoTheMeadow      2026-07-12T02-38-23-04-00
HorrorCorridor     2026-07-12T02-49-19-04-00
TheCavalryOfRome   excluded
```

Only `LuminaryLabs-Publish/PhantomCommand` is in scope for Publish changes.

## Complete interaction loop

```txt
menu module evaluation
  -> create 480x270 source canvas
  -> create shared CRT renderer
  -> load menu settings and save presence
  -> attach pointer, keyboard and hidden-button listeners
  -> start recursive menu RAF
  -> publish window.PhantomMenu

campaign module evaluation
  -> create 640x360 source canvas and shared CRT renderer
  -> create camera, input, IDs, pads, units and mutable campaign state
  -> state begins with paused=false, won=false, lost=false, waveActive=false
  -> attach pointer, wheel, keyboard, keyup and blur listeners
  -> start fixed-step campaign RAF
  -> publish window.GameHost with raw owners and direct mutators

campaign frame
  -> camera consumes held input independently of gameplay phase
  -> accumulator calls update(1/60)
  -> update returns immediately for paused, won or lost
  -> render world, HUD, minimap and pause/terminal overlay
  -> submit source through shared CRT renderer

campaign actions
  -> Space calls startWave directly
  -> left pointer selects, drag-selects or double-click builds
  -> right pointer orders selected units
  -> number keys replace towerType
  -> P toggles paused
  -> wheel and middle-drag mutate camera
  -> GameHost callers invoke startWave/build/setZoom or mutate state/camera directly
```

## Source-backed defects

### Pause stops simulation but not mutation

`update(dt)` returns when `state.paused` is true. None of `startWave`, `build`, `selectAt`, or `order` consumes that pause state as an admission guard.

A concrete sequence is:

```txt
P
  -> paused = true

Space
  -> startWave builds and sorts spawn[]
  -> waveActive = true
  -> message changes

second click on selected pad
  -> build spends Souls
  -> pad/tower state mutates
  -> effect is appended

right click with selected units
  -> target/move state mutates
  -> effect is appended
```

Simulation time remains frozen while durable gameplay owners change.

### Terminal state is not mutation-closed

`startWave()` rejects `won` and `lost`, but construction, selection, orders, tower-type changes, camera changes and raw `GameHost` owner mutation do not. After terminal outcome:

```txt
build can spend Souls and create towers
selectAt can replace selection and selectedPad
order can replace target/move destinations
order/build can append visible effects
number keys can change towerType
P can create paused + won or paused + lost combinations
GameHost callers can mutate state and camera directly
```

The terminal overlay therefore does not represent an immutable terminal snapshot.

### Phase is represented by overlapping booleans

Representable combinations include:

```txt
paused + waveActive
paused + won
paused + lost
won + lost
waveActive + won
waveActive + lost
```

Some combinations may be unreachable through the intended UI today, but no schema rejects them and public owner exposure can create them directly.

### Wave admission is incomplete

`startWave()` rejects active wave, terminal state and exhausted wave count. It does not reject paused state and returns no result distinguishing:

```txt
accepted
already active
paused
terminal
campaign complete
invalid phase
```

### Build-phase policy is undefined

`build()` verifies selected pad, occupancy and Souls only. It does not declare whether building is allowed:

```txt
before first wave
between waves
during active wave
while paused
after terminal outcome
```

The UI message tells the player to build before the next procession, but the runtime does not encode a corresponding policy.

### Command and phase timing are uncorrelated

Browser callbacks mutate state outside the fixed-step accumulator. There is no:

```txt
campaignPhaseId
phaseRevision
actionId
observedPhaseRevision
admissionResultId
committedTickId
terminalRevision
phaseFrameReceipt
```

An action cannot prove which phase admitted it or which rendered frame first displayed its result.

## Domains in use

```txt
static route and full-window canvas shell
menu selection panels settings audio and fade transition
save-key discovery and Continue capability projection
procedural graveyard source-canvas rendering
campaign rings lanes pads archetypes waves economy and core health
selection construction orders pause camera and fixed-step simulation
unit tower projectile combat reward and terminal mutation
CPU world HUD minimap and terminal overlay rendering
WebGL context shader program buffer texture and source projection lifecycle
output-surface sizing DPR contain and CRT presentation
client pointer keyboard wheel blur and input lifecycle
campaign phase derivation action admission and result gap
public menu and campaign host capability projection
source checks static build Pages deployment and central tracking
```

Missing coordinating domains:

```txt
canonical campaign phase schema
phase identity and revision
legal phase-transition table
action kind and policy matrix
phase-snapshot command admission
typed accepted/rejected results
paused-state gameplay mutation fence
terminal-state mutation fence
stale phase-result rejection
phase/tick/terminal/frame correlation
phase observation and bounded journal
pure and browser mutation fixtures
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
menu routing fade and hidden-button activation
settings persistence and CRT enablement
raw save-presence scanning across three keys and two storage scopes
procedural graveyard source drawing
AudioContext ambience and UI tones
WebGL context/program/buffer/texture creation
source-canvas upload contain projection and CRT effects
CSS-client to source-canvas mapping and menu hit testing
campaign default-state and authored content construction
selection drag selection building orders wave start pause and camera control
fixed-step spawning AI movement targeting damage rewards and terminal mutation
world HUD minimap pause and terminal overlay rendering
mutable GameHost state/camera exposure and direct mutation
source-pattern checks static build and GitHub Pages deployment
```

## Required parent domain

```txt
phantom-command-campaign-phase-admission-authority-domain
```

Candidate kits:

```txt
phantom-command-campaign-phase-schema-kit
phantom-command-campaign-phase-id-kit
phantom-command-campaign-phase-revision-kit
phantom-command-campaign-phase-derivation-kit
phantom-command-campaign-phase-transition-table-kit
phantom-command-campaign-action-kind-kit
phantom-command-campaign-action-envelope-kit
phantom-command-campaign-action-id-kit
phantom-command-campaign-action-policy-matrix-kit
phantom-command-campaign-phase-snapshot-kit
phantom-command-campaign-action-admission-kit
phantom-command-campaign-action-result-kit
phantom-command-campaign-phase-transition-result-kit
phantom-command-paused-mutation-fence-kit
phantom-command-terminal-mutation-fence-kit
phantom-command-wave-start-adapter-kit
phantom-command-build-adapter-kit
phantom-command-order-adapter-kit
phantom-command-selection-adapter-kit
phantom-command-camera-action-policy-kit
phantom-command-legacy-gamehost-phase-adapter-kit
phantom-command-stale-phase-result-rejection-kit
phantom-command-phase-frame-receipt-kit
phantom-command-phase-observation-kit
phantom-command-phase-journal-kit
phantom-command-paused-terminal-mutation-fixture-kit
phantom-command-wave-admission-fixture-kit
phantom-command-build-phase-policy-fixture-kit
phantom-command-phase-frame-smoke-kit
```

## Required phase model

Recommended canonical phases:

```txt
BOOT
PLANNING
RUNNING_WAVE
PAUSED_PLANNING
PAUSED_WAVE
WON
LOST
DISPOSED
```

The exact build-during-wave policy is a product decision. It must be represented explicitly in the policy matrix rather than inferred from booleans.

## Required action policy

```txt
START_WAVE
  -> only admitted from PLANNING

TOGGLE_PAUSE
  -> admitted from PLANNING, RUNNING_WAVE, PAUSED_PLANNING, PAUSED_WAVE
  -> rejected from WON, LOST, DISPOSED

BUILD
  -> admitted only from declared buildable phases
  -> rejected from paused and terminal phases unless policy explicitly says otherwise

ORDER_UNITS
  -> admitted only from declared commandable phases
  -> rejected from paused and terminal phases

SELECT / SET_TOWER_TYPE / CAMERA
  -> classified separately as gameplay, planning or presentation-only actions
  -> each receives an explicit phase policy
```

## Required action transaction

```txt
CampaignAction
  -> validate runtime session and actor/capability
  -> snapshot campaignPhaseId and phaseRevision
  -> validate command ID and finite payload
  -> evaluate action-kind policy against phase
  -> stage mutation without publishing owners
  -> commit gameplay mutation and phase transition atomically
  -> publish typed action result
  -> correlate result with committed tick and terminal revision
  -> acknowledge first visible phase/action frame
  -> append bounded detached observation
```

## Required result classes

```txt
ACCEPTED
REJECTED_PAUSED
REJECTED_TERMINAL
REJECTED_ACTIVE_WAVE
REJECTED_NOT_BUILDABLE_PHASE
REJECTED_NOT_COMMANDABLE_PHASE
REJECTED_INSUFFICIENT_SOULS
REJECTED_INVALID_TARGET
REJECTED_STALE_PHASE
REJECTED_DUPLICATE_ACTION
REJECTED_DISPOSED_SESSION
```

## Required invariants

```txt
paused gameplay actions perform zero durable mutation unless explicitly policy-admitted
terminal state is mutation-closed
one action consumes one immutable phase snapshot
one accepted action returns one typed result
one rejected action performs zero mutation
phase transitions are legal-table checked
public host adapters cannot bypass phase admission
render overlays cite the committed phase revision
first visible action frame cites actionResultId and phaseRevision
```

## Validation boundary

Documentation only. Runtime source, gameplay behavior, input behavior, rendering, persistence, package scripts, dependencies and deployment were not changed. Phase admission, paused mutation fencing, terminal immutability, stale rejection and frame correlation remain unproved until the documented fixtures exist and pass.