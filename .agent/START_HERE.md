# PhantomCommand Agent Start

**Repository:** `LuminaryLabs-Publish/PhantomCommand`

**Last aligned:** `2026-07-11T13-28-37-04-00`

## Summary

PhantomCommand is a static pixel-isometric RTS with a procedural graveyard menu and a `640 x 360` grave-ring campaign. This audit isolates a terminal-outcome transaction defect: the final enemy can destroy the sanctum and then satisfy the final-wave-clear branch during the same fixed update, leaving `state.lost === true` and `state.won === true` while the UI and save path report victory.

## Plan ledger

**Goal:** make campaign completion one exclusive, monotonic, fixed-step transaction so defeat and victory cannot both commit, success persistence cannot follow defeat, and every terminal frame exposes one authoritative outcome receipt.

- [x] Compare the current ten-repository Publish inventory with the central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories remain centrally tracked with root `.agent` state.
- [x] Skip the same-window active `HorrorCorridor` documentation write.
- [x] Select only `PhantomCommand` as the oldest stable eligible repository.
- [x] Trace core damage, enemy deletion, wave completion, terminal rendering, persistence, restart and `GameHost` observation.
- [x] Identify the interaction loop, domains, kits and offered services.
- [x] Define an exclusive terminal-outcome authority and fixture gate.
- [x] Push documentation directly to `main`.
- [ ] Runtime implementation and executable outcome fixtures remain future work.

## Current implementation queue

```txt
1. Continue Capability Resolver + Save Candidate Precedence Fixture Gate
2. Campaign Action Result Authority
   2a. CRT Display/Input Projection Authority + CPU/GLSL Parity Fixture Gate
   2b. Campaign Phase Admission + Paused/Terminal Mutation Fixture Gate
   2c. Fixed-Step Command Scheduling, Replay and Committed Frame Authority
   2d. Exclusive Terminal Outcome Transaction + Win/Loss Arbitration Fixture Gate
3. Runtime Session Lifecycle Authority + Menu/Campaign Teardown Fixture Gate
4. Versioned Campaign Checkpoint Authority + Atomic Resume/First-Frame Fixture Gate
```

Terminal arbitration belongs inside the fixed-step command/phase boundary. It must be designed now so the future replay journal, checkpoint writer and committed-frame receipt have one canonical terminal result to record.

## Product route

```txt
index.html
  -> src/menu/graveyard-menu.js
  -> Begin or Continue route
  -> game.html
  -> src/campaign/campaign-scene.js
```

## Current interaction loop

```txt
menu
  -> render graveyard source canvas through CRT
  -> detect raw save-key presence
  -> route to new or continue campaign

campaign input
  -> mutate selection, build, order, wave, pause, tower or camera state

fixed campaign update
  -> spawn and move units
  -> enemy may reach sanctum
  -> core damage may set lost = true
  -> update continues through towers, projectiles and wave-clear evaluation
  -> final-wave clear may set won = true and write a victory save

render and observation
  -> overlay chooses won before lost
  -> GameHost exposes both booleans
  -> R reloads the page without a typed terminal-reset transaction
```

## Main finding

The terminal state is represented by independent booleans:

```txt
paused
won
lost
```

A reachable same-tick path is:

```txt
final wave active
  -> last enemy reaches the sanctum
  -> core becomes 0
  -> lost = true
  -> enemy is deleted
  -> update continues
  -> spawn queue is empty and enemies() is empty
  -> wave increments to waves.length
  -> won = true
  -> victory message and success save are written
```

The committed state can therefore become:

```txt
core: 0
lost: true
won: true
```

Presentation then resolves the conflict by checking `won` first, so the player sees `GRAVE RING SECURED`. Persistence also writes the victory summary despite the defeated sanctum.

## Domains in use

```txt
static route and page shell
menu selection panels settings audio and save presence
procedural graveyard art and source canvas
CRT contain curve upload display and pointer projection
campaign ring map lanes pads archetypes waves economy and core health
selection building orders wave start pause camera and identity counters
spawn queue unit AI enemy pathing targeting projectiles damage rewards and effects
fixed-step simulation and wall-clock frame sampling
terminal predicate evaluation outcome arbitration phase latching and persistence
world HUD minimap modal overlay and CRT presentation
GameHost diagnostics and direct mutation bypasses
runtime lifecycle checkpoint resume validation build deploy and central synchronization
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

## Required composed domain

```txt
phantom-command-terminal-outcome-authority-domain
  -> phantom-command-terminal-evaluation-input-kit
  -> phantom-command-defeat-predicate-kit
  -> phantom-command-victory-predicate-kit
  -> phantom-command-outcome-priority-policy-kit
  -> phantom-command-exclusive-outcome-arbitration-kit
  -> phantom-command-terminal-transition-kit
  -> phantom-command-terminal-latch-kit
  -> phantom-command-terminal-result-kit
  -> phantom-command-terminal-persistence-policy-kit
  -> phantom-command-terminal-frame-receipt-kit
  -> phantom-command-terminal-observation-kit
  -> phantom-command-terminal-outcome-fixture-kit
```

## Required invariant

```txt
for every campaign run and fixed tick:
  terminalOutcome is exactly one of ACTIVE | VICTORY | DEFEAT

once terminalOutcome is VICTORY or DEFEAT:
  it cannot transition to another outcome in the same run epoch

victory persistence is allowed only when:
  terminalOutcome == VICTORY
  core > 0
  terminal receipt and state fingerprint agree
```

## Read first

```txt
.agent/trackers/2026-07-11T13-28-37-04-00/project-breakdown.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/turn-ledger/2026-07-11T13-28-37-04-00.md
.agent/architecture-audit/2026-07-11T13-28-37-04-00-terminal-outcome-authority-dsk-map.md
.agent/render-audit/2026-07-11T13-28-37-04-00-terminal-overlay-committed-outcome-gap.md
.agent/gameplay-audit/2026-07-11T13-28-37-04-00-simultaneous-win-loss-loop.md
.agent/interaction-audit/2026-07-11T13-28-37-04-00-terminal-restart-command-map.md
.agent/outcome-authority-audit/2026-07-11T13-28-37-04-00-exclusive-terminal-outcome-contract.md
.agent/deploy-audit/2026-07-11T13-28-37-04-00-terminal-outcome-fixture-gate.md
```

## Guardrails

```txt
Push only to main.
Create no branches or pull requests.
Do not work on TheCavalryOfRome.
Do not preserve independent won/lost booleans as terminal authority.
Do not evaluate wave victory after defeat has been admitted in the same tick.
Do not write a success checkpoint from a conflicting terminal state.
Do not claim terminal correctness without breach, clear, simultaneous, persistence, replay and frame fixtures.
```