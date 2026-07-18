# Project Breakdown — Campaign Target Query Work Budget

**Timestamp:** `2026-07-18T10-38-06-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Branch:** `main`  
**Selection:** oldest synchronized eligible repository  
**Reviewed pre-audit repository head:** `b1293276a98e9279f3bf02f88d6a4b0d1ce87824`  
**Reviewed runtime source revision:** `e92f61c79ed20998fdb4edfb962cac3754d3a651`  
**Campaign source blob:** `a3aec0130982e312280ea49d9d1720f435445fd6`  
**Status:** `campaign-target-query-work-budget-authority-audited`

## Summary

The complete `LuminaryLabs-Publish` inventory contains 11 repositories. Ten are eligible after excluding `LuminaryLabs-Publish/TheCavalryOfRome`. All ten have a central ledger, root `.agent` state and a `main` head matching the documented repo-local head. PhantomCommand had the oldest synchronized central timestamp and is the only selected project.

The focused finding is repeated combat-team query construction inside the fixed-step campaign simulation. `enemies()` and `allies()` each rebuild an `Object.values(state.units)` array and then a filtered team array. Player units without a live target call `enemies()` individually. Enemy units without a live target call `allies()` individually. Every tower calls `enemies()` every fixed tick before nearest-target selection.

At the initial pre-wave state there are six player units and no enemies. Each accepted simulation tick therefore executes six `enemies()` calls. Each call source-visibly creates two arrays, giving a minimum of 12 query arrays per tick, or 720 arrays per second at 60 accepted ticks. Every constructed tower adds one further `enemies()` call and two further arrays per tick. This is source arithmetic, not a heap profile, GC trace, frame-time measurement or demonstrated user-visible regression.

## Intent

Give campaign combat one generation-owned team index and target-query authority so units and towers consume stable enemy/ally views, query work is admitted and observed, stale indexes are rejected, deterministic targeting is preserved and the presented frame can be bound to the accepted combat-query generation.

## Checklist

- [x] Compare all 11 Publish repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm ten eligible central ledgers and root `.agent` states.
- [x] Confirm all eligible `main` heads match documented repo-local heads.
- [x] Select only PhantomCommand through the oldest documented-selection rule.
- [x] Identify the full menu, campaign, simulation and presentation loops.
- [x] Preserve all 20 implemented kits and offered services.
- [x] Trace unit, tower and projectile target-query paths.
- [x] Derive the source-visible idle-state query construction floor.
- [x] Define 20 proposed campaign target-query authority surfaces.
- [x] Add a new timestamped tracker and focused audit family.
- [ ] Implement indexed team views, budget settlement and executable fixtures.

## Selection comparison

```txt
accessible Publish repositories: 11
eligible after Cavalry exclusion: 10
central ledger entries: 10
root .agent states: 10
new or ledger-missing: 0
root-agent-missing: 0
undocumented: 0
runtime-ahead: 0
selected: LuminaryLabs-Publish/PhantomCommand
selected prior central timestamp: 2026-07-17T23-41-44-04-00
selection rule: oldest synchronized eligible repository
excluded: LuminaryLabs-Publish/TheCavalryOfRome
```

## Complete interaction loop

```txt
menu
  -> restore settings and save presence
  -> render procedural Canvas2D art and WebAudio
  -> present through WebGL CRT
  -> navigate into campaign

campaign input
  -> select units or pads
  -> build towers
  -> issue movement or attack orders
  -> start a wave

fixed-step campaign simulation
  -> advance spawn queue
  -> update every unit
  -> rebuild enemy or ally arrays when a unit needs a target
  -> rebuild the enemy array once per tower every tick
  -> choose nearest targets
  -> advance movement, attacks, projectiles, damage, rewards and outcomes
  -> render world, entities, HUD, minimap and CRT frame
  -> repeat without a shared team-index result, query budget or frame digest
```

## Domains in use

```txt
static HTML routes and ES modules
browser document, RAF, focus, blur, pointer, keyboard, wheel and storage lifecycle
procedural menu, settings, save presence, audio and route transition
CRT browser-screen containment, source mapping and visible presentation
Canvas2D world, HUD, controls, minimap, overlays and pixel typography
WebGL context, shaders, source texture upload, viewport and CRT
campaign rings, lanes, pads, towers, units, waves, resources and outcomes
fixed-step spawn, movement, targeting, projectiles, combat, rewards and effects
combat team membership, target indexes, nearest-target queries and work budgets
camera, selection, building, orders, persistence and diagnostics
static checks, static build, Pages delivery, repo-local governance and central reconciliation
```

## Implemented kits and offered services

| Kit | Services |
|---|---|
| `crt-renderer-kit` | WebGL context, shader compile/link, source texture upload, DPR-capped resize, CRT effects, contain mapping and browser-screen to source mapping. |
| `graveyard-art-kit` | Procedural graveyard, fog, twinkle, characters, pointer parallax, menu panels and selection pulse. |
| `menu-route-kit` | Menu selection, panels, enabled-state handling, transition flash/fade and campaign navigation. |
| `menu-settings-persistence-kit` | Settings parsing/defaults, CRT/grain/ambience mutation and localStorage write. |
| `menu-save-presence-kit` | Save-key probing and Continue availability projection. |
| `menu-audio-kit` | AudioContext, master bus, drone, generated wind, UI tones and ambience retirement. |
| `campaign-route-shell-kit` | Campaign document, application canvas, semantic fallback and module bootstrap. |
| `pixel-campaign-runtime-kit` | Rings, lanes, pads, camera, input, units, towers, projectiles, effects, selection, building and orders. |
| `fixed-step-campaign-simulation-kit` | Accumulator, waves, spawning, movement, targeting, combat, rewards, loss and victory. |
| `pixel-campaign-render-kit` | Isometric world projection, entities, effects, HUD, minimap, drag rectangle, selection rings and overlays. |
| `legacy-gamehost-diagnostics-kit` | State readback, camera references, wave/build commands and controlled zoom mutation. |
| `menu-static-check-kit` | Menu entry and source-marker assertions. |
| `campaign-static-check-kit` | Campaign entry and source-marker assertions. |
| `static-build-copy-kit` | Dist cleanup, directory creation and deployable file copy. |
| `pages-deploy-kit` | Install, build, Pages artifact upload and deployment. |
| `construct-spiral-intro-kit` | Construct opening choreography. |
| `construct-spiral-schedule-kit` | Timed construct schedule. |
| `construct-piece-id-kit` | Stable construct-piece identity. |
| `construct-piece-state-kit` | Construct-piece state and visibility. |
| `construct-sequence-update-kit` | Construction sequence advancement and settlement. |

```txt
implemented source-backed kits: 20
proposed campaign target-query authority surfaces: 20
```

## Source-backed finding

```txt
enemies(): Object.values(state.units).filter(team === enemy)
allies(): Object.values(state.units).filter(team === player)
arrays created per enemies/allies call: 2 source-visible arrays
initial player units: 6
initial enemies: 0
player queries during pre-wave idle: 6 per accepted tick
source-visible query arrays during pre-wave idle: 12 per accepted tick
conditional query arrays at 60 accepted ticks: 720 per second
tower query cadence: one enemies() call per tower per accepted tick
shared team index: absent
generation-bound query result: absent
query-work observation and budget settlement: absent
CombatTargetQueryDigest: absent
FirstTargetQueryBoundFrameAck: absent
```

The campaign exposes 58 structurally available tower pads. That is a capacity bound, not a claim that one ordinary playthrough can afford every tower. Each occupied pad adds two source-visible query arrays per accepted tick because `updateTowers()` calls `enemies()` unconditionally.

## Required authority

**Proposed only; no runtime implementation was added:**

`phantom-command-campaign-target-query-work-budget-authority-domain`

```txt
CampaignCombatGenerationAdmissionCommand
  -> CampaignCombatGenerationResult

CombatTeamIndexSettlementCommand
  -> CombatTeamIndexResult

TargetQueryCommand
  -> TargetQueryResult

TargetQueryBudgetSettlementCommand
  -> TargetQueryBudgetResult

CombatProjectionCommitCommand
  -> CombatTargetQueryDigest
  -> FirstTargetQueryBoundFrameAck
```

## Proposed authority surfaces

```txt
phantom-command-campaign-target-query-work-budget-authority-domain
campaign-combat-generation-admission-kit
campaign-unit-membership-revision-kit
campaign-combat-team-index-kit
campaign-enemy-query-view-kit
campaign-ally-query-view-kit
campaign-target-query-scratch-lease-kit
campaign-target-query-admission-kit
campaign-nearest-target-selection-kit
campaign-unit-target-query-kit
campaign-tower-target-query-kit
campaign-projectile-splash-query-kit
campaign-stale-team-index-rejection-kit
campaign-target-query-work-observation-kit
campaign-target-query-budget-policy-kit
campaign-target-query-budget-settlement-kit
campaign-combat-target-query-digest-kit
first-target-query-bound-frame-ack-kit
campaign-target-query-determinism-fixture-kit
campaign-target-query-deployment-parity-kit
```

## Validation boundary

Documentation only. Runtime JavaScript, HTML, CSS, menu behavior, campaign state, combat, targeting, rendering, audio, persistence, packages, dependencies, tests, workflows, build and deployment remain unchanged. No allocation amount beyond source-visible construction arithmetic, performance regression, performance improvement, deterministic parity, artifact parity, Pages parity or production readiness is claimed.