# PhantomCommand Project Breakdown

**Timestamp:** `2026-07-10T23-40-35-04-00`

**Repository:** `LuminaryLabs-Publish/PhantomCommand`

## Plan ledger

**Goal:** map the complete live interaction, domain, kit, and service surface, then define the deterministic command-admission boundary required between browser input and the fixed-step campaign simulation.

- [x] Enumerate the complete accessible `LuminaryLabs-Publish` repository inventory.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Compare all eligible repositories with `LuminaryLabs-Dev/LuminaryLabs/repo-ledger`.
- [x] Confirm all nine eligible repositories are tracked and have root `.agent` state.
- [x] Select only `LuminaryLabs-Publish/PhantomCommand` as the oldest eligible documented repository.
- [x] Read the menu route, campaign route, CRT renderer, package checks, central ledger, and current `.agent` state.
- [x] Identify the interaction loop.
- [x] Identify all active domains.
- [x] Identify all current kit services.
- [x] Identify implemented, candidate, follow-on, and deferred kits.
- [x] Add timestamped architecture, render, gameplay, interaction, action-authority, and deploy audits.
- [x] Refresh the required root `.agent` documents.
- [x] Push documentation only to `main`.
- [ ] Runtime implementation remains future work.

## Repository selection

The accessible Publish inventory contains ten repositories:

```txt
AetherVale
HorrorCorridor
IntoTheMeadow
MyCozyIsland
PhantomCommand
PrehistoricRush
TheCavalryOfRome
TheOpenAbove
TheUnmappedHouse
ZombieOrchard
```

`TheCavalryOfRome` is excluded by rule. All nine eligible repositories are centrally tracked and expose root `.agent` state. `PhantomCommand` had the oldest current ledger timestamp, `2026-07-10T21-49-26-04-00`, so the documented-selection fallback applied.

Only `LuminaryLabs-Publish/PhantomCommand` is changed in this pass.

## Product interaction loop

```txt
index.html loads graveyard-menu.js
  -> read menu settings
  -> scan three save keys in localStorage and sessionStorage
  -> construct source canvas, procedural art, CRT renderer, menu state, listeners, and optional audio
  -> pointer, keyboard, or hidden-button activation selects a menu item
  -> Begin or Continue starts a timed fade and navigates to game.html
  -> game.html loads campaign-scene.js
  -> construct campaign descriptors, mutable state, source canvas, CRT renderer, listeners, and RAF loop
  -> pointer and keyboard callbacks directly mutate camera or campaign state
  -> accumulator advances update() in fixed 1/60 steps
  -> unit AI, towers, projectiles, damage, economy, wave and terminal state mutate
  -> world, HUD, minimap, modal, and CRT render from the same mutable objects
  -> win/loss stops simulation updates
  -> R reloads the page or Escape navigates back to the menu
```

## Active domains

### Route, menu, and presentation

```txt
static route shell
menu route
campaign route
menu selection
settings panel
credits panel
menu settings persistence
save-candidate discovery
Continue capability projection
fade transition
procedural audio
graveyard art
source-canvas presentation
CRT display
```

### Campaign content and state

```txt
ring map
lane map
build pads
unit archetypes
tower archetypes
wave scripts
souls economy
sanctum health
selection
camera pan, zoom, and focus
campaign message and terminal state
```

### Commands and simulation

```txt
select-at request
build request
order request
wave-start request
fixed-step accumulator
spawn queue
unit AI and pathing
ally and tower targeting
projectiles
damage and rewards
effects
win/loss
victory summary persistence
```

### Input, render, proof, and deploy

```txt
pointer coordinate conversion
pointer selection and drag selection
right-click orders
keyboard movement and actions
world render
entity render
HUD
minimap
modal overlay
CRT post-process
PhantomMenu diagnostics
GameHost diagnostics
source-pattern checks
static artifact build
GitHub Pages deployment
central ledger synchronization
```

## Implemented kits and services

| Kit | Services |
| --- | --- |
| `crt-renderer-kit` | WebGL creation, source texture upload, nearest filtering, contain mapping, CRT curve, aberration, grain, fade, resize, pointer conversion |
| `graveyard-art-kit` | deterministic procedural menu composition and animation |
| `menu-route-kit` | menu selection, settings and credits panels, activation, fade, route emission |
| `menu-settings-persistence-kit` | CRT, grain, and ambience read/write |
| `menu-save-presence-kit` | raw six-slot save-key presence scan |
| `menu-audio-kit` | lazy audio graph, ambience, and UI tones |
| `campaign-route-shell-kit` | campaign canvas route entry |
| `pixel-campaign-runtime-kit` | descriptors, state, input, action mutation, simulation, persistence, render, diagnostics |
| `fixed-step-campaign-simulation-kit` | accumulator and exact `1/60` update admission |
| `pixel-campaign-render-kit` | world, entities, HUD, minimap, modal, selection rectangle, CRT projection |
| `legacy-gamehost-diagnostics-kit` | mutable state/camera exposure, `startWave`, `build`, aggregate state clone, zoom control |
| `campaign-static-check-kit` | source-shape assertions for campaign route |
| `menu-static-check-kit` | source-shape assertions for menu route |
| `static-build-copy-kit` | static artifact creation |
| retained construct kits | historical construct-profile proof, not live campaign authority |

## Main finding

The campaign has a fixed-step simulation but no fixed-step command authority.

```txt
DOM callback or GameHost method
  -> direct live-state mutation
  -> no command identity
  -> no preflight result
  -> no target tick
  -> no deterministic ordering against other requests
  -> no accepted/rejected/no-op result
  -> no command/result/event journal
  -> render reads mutable state without a committed-frame identity
```

Concrete source paths:

```txt
selectAt() may select a pad or call build() on a second click
build() silently returns for missing pad, occupied pad, or insufficient souls
order() silently returns when no units are selected
startWave() silently returns when active, terminal, or out of waves
window.GameHost calls startWave() and build() directly
frame() drains the accumulator after browser callbacks have already mutated state
render() consumes live state and returns no frame-consumption result
```

The browser event-loop timing therefore decides whether a request lands before or after a simulation step. The same request sequence cannot yet be replayed independently of browser timing, and rejection cannot prove state immutability because no canonical fingerprint exists.

## Required authority boundary

```txt
raw browser or host request
  -> typed CampaignCommand
  -> monotonic command sequence
  -> deterministic target tick
  -> pure preflight
  -> accepted, rejected, or no-op CampaignCommandResult
  -> queued mutation at the target tick
  -> ordered domain events
  -> canonical state fingerprint
  -> immutable CommittedCampaignFrame
  -> render and GameHost consumption rows
```

## Candidate kits

```txt
phantom-command-action-command-kit
phantom-command-command-source-adapter-kit
phantom-command-action-sequence-kit
phantom-command-target-tick-kit
phantom-command-action-preflight-kit
phantom-command-action-result-kit
phantom-command-fixed-step-command-queue-kit
phantom-command-command-application-kit
phantom-command-action-journal-kit
phantom-command-event-journal-kit
phantom-command-state-fingerprint-kit
phantom-command-committed-frame-kit
phantom-command-render-consumption-kit
phantom-command-gamehost-observation-kit
phantom-command-action-fixture-kit
phantom-command-fixed-step-replay-fixture-kit
```

## Dependency order

The current queue remains:

```txt
1. Continue Capability Resolver + Save Candidate Precedence Fixture Gate
2. Campaign Action Result Authority + Fixed-Step Replay/Frame Fixture Gate
3. Runtime Session Lifecycle Authority + Menu/Campaign Teardown Fixture Gate
4. Versioned Save Envelope + Atomic Resume Fidelity Gate
```

The action slice may be designed now, but its implementation must consume the resolved campaign session mode rather than introducing a second startup authority.

## Validation status

```txt
runtime source changed: no
package scripts changed: no
dependencies changed: no
branch created: no
pull request created: no
npm run check: not run
npm run build: not run
browser smoke: not run
action-result fixture: absent / not run
fixed-step replay fixture: absent / not run
frame-consumption fixture: absent / not run
```
