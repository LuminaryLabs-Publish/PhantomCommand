# PhantomCommand Project Breakdown

**Timestamp:** `2026-07-11T16-49-51-04-00`

**Repository:** `LuminaryLabs-Publish/PhantomCommand`

## Summary

PhantomCommand uses an exact `1/60` combat step, but entity resolution inside that step is not yet an explicit deterministic contract. `update()` snapshots `Object.values(state.units)` and then mutates and deletes those same entities during iteration. A unit killed by an earlier actor remains in the captured array and can still move, attack, launch a projectile, or damage the sanctum later in the same tick. The visible frame can therefore show damage with no surviving source entity.

## Plan ledger

**Goal:** document the complete runtime and define one combat-resolution and entity-liveness authority so every spawn, target, attack, damage, retirement, reward, core-breach and wave-clear effect belongs to a deterministic committed tick.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories are centrally tracked with root `.agent` state.
- [x] Select only `PhantomCommand` as the oldest eligible central-ledger entry.
- [x] Read campaign state construction, spawn, AI, targeting, damage, cleanup, wave completion, rendering and current checks.
- [x] Identify the interaction loop.
- [x] Identify all domains in use.
- [x] Identify every implemented kit and its offered services.
- [x] Prove the dead-entity same-tick action path.
- [x] Define deterministic entity order, liveness, staged damage, retirement, reference cleanup and fixture contracts.
- [x] Add timestamped architecture and system audits.
- [ ] Runtime implementation and executable combat-order fixtures remain future work.

## Selection

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
central ledger entries: 9/9
root .agent state: 9/9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-undocumented eligible repositories: 0

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

Only `LuminaryLabs-Publish/PhantomCommand` is in scope for this breakdown.

## Product interaction loop

```txt
menu boot
  -> construct graveyard source canvas, CRT, settings and audio
  -> scan raw save presence
  -> route Begin or Continue to game.html

campaign boot
  -> construct rings, lanes, pads, archetypes, waves, camera and mutable state
  -> create six allied units
  -> install pointer, keyboard, wheel, blur and context-menu listeners
  -> expose mutable GameHost
  -> request RAF

browser input
  -> mutate selection, build state, orders, wave state, pause state or camera immediately

RAF
  -> sample and clamp wall-clock delta
  -> advance variable-delta camera
  -> run zero or more exact 1/60 simulation updates
  -> draw world, HUD, minimap and overlay
  -> upload source canvas through CRT
  -> request next frame
```

## Combat-resolution loop

```txt
fixed update begins
  -> decrement spawn timers
  -> spawn all rows whose timer is <= 0
  -> capture Object.values(state.units)
  -> update captured units in insertion order
       target selection
       movement or attack
       immediate melee damage or projectile creation
       immediate deletion and reward on lethal damage
       possible sanctum damage and self-deletion
  -> update towers
  -> update projectiles and apply more immediate damage
  -> age and remove effects
  -> evaluate wave-clear and terminal state
```

## Concrete liveness defect

```txt
unit array is captured
  -> earlier allied unit kills enemy
  -> damage() deletes enemy from state.units
  -> captured array still contains enemy object
  -> updateUnit(deadEnemy) runs later in the same tick
  -> dead enemy may attack, move, launch a projectile or damage the sanctum
  -> render reads state.units and does not draw the retired enemy
```

The simulation can therefore produce an invisible or causally unexplained action.

## Determinism gaps

```txt
entity order is implicit object insertion order
nearest-target ties resolve by first encountered entry
newly spawned enemies act during their spawn tick
lethal damage mutates state immediately during iteration
dead entities are not rejected at updateUnit entry
retired target references are cleaned lazily
projectile and unit damage use different temporal phases
reward settlement occurs inside damage mutation
core breach mutates terminal evidence inside entity iteration
wave completion runs after mutable subsystems rather than from a committed resolution result
no combat tick input, resolution ID, event sequence or combat fingerprint exists
```

## Domains in use

```txt
static route and page shell
menu selection, panels, settings, save presence, audio and transitions
procedural graveyard art and source-canvas presentation
CRT containment, curvature, upload, draw and pointer projection
campaign map, rings, lanes, pads, archetypes and wave scripts
souls economy, sanctum health, selection, messages and camera
browser input and mutable GameHost actions
spawn queue and spawn admission
entity identity, liveness and reference graph
target selection and tie-breaking
unit AI, movement and attack intent
immediate melee damage and projectile creation
projectile travel, hit and splash resolution
entity retirement, rewards and reference cleanup
core-breach, wave-clear and terminal predicates
fixed-step clock, command scheduling and replay planning
world, HUD, minimap, overlay and CRT frame presentation
save candidate, lifecycle and checkpoint planning
validation, build, Pages deployment and central tracking
```

## Implemented kits and services

| Kit | Current services |
|---|---|
| `crt-renderer-kit` | WebGL setup, source upload, contain framing, CRT curvature, resize, draw and contain-only coordinate projection |
| `graveyard-art-kit` | Procedural graveyard composition and animated menu drawing |
| `menu-route-kit` | Selection, panels, Begin/Continue routing and fade timing |
| `menu-settings-persistence-kit` | Read, normalize and write CRT, grain and ambience settings |
| `menu-save-presence-kit` | Scan three keys across local and session storage and return Boolean presence |
| `menu-audio-kit` | Lazy AudioContext, ambience, UI tones and delayed close |
| `campaign-route-shell-kit` | Campaign canvas boot and module execution |
| `pixel-campaign-runtime-kit` | Content descriptors, mutable state, selection, construction, orders, wave and camera input |
| `fixed-step-campaign-simulation-kit` | Spawn timers, unit AI, pathing, targeting, towers, projectiles, damage, rewards, core damage and wave completion |
| `pixel-campaign-render-kit` | World, HUD, minimap, terminal overlay and source-frame drawing |
| `legacy-gamehost-diagnostics-kit` | Live state/camera exposure and direct start-wave, build and zoom actions |
| `menu-static-check-kit` | Menu source-pattern validation |
| `campaign-static-check-kit` | Campaign source-pattern validation |
| `static-build-copy-kit` | Static artifact assembly |
| `pages-deploy-kit` | GitHub Pages artifact deployment |
| `construct-spiral-intro-kit` | Retained intro construction scheduling |
| `construct-spiral-schedule-kit` | Retained per-piece start-time calculation |
| `construct-piece-id-kit` | Retained construction piece identity |
| `construct-piece-state-kit` | Retained construction piece state |
| `construct-sequence-update-kit` | Retained construction sequence updates |

## Required composed domain

```txt
phantom-command-combat-resolution-authority-domain
  -> phantom-command-combat-frame-input-kit
  -> phantom-command-entity-liveness-index-kit
  -> phantom-command-deterministic-entity-order-kit
  -> phantom-command-spawn-admission-phase-kit
  -> phantom-command-unit-intent-kit
  -> phantom-command-target-selection-policy-kit
  -> phantom-command-attack-intent-kit
  -> phantom-command-damage-intent-kit
  -> phantom-command-damage-resolution-policy-kit
  -> phantom-command-entity-retirement-kit
  -> phantom-command-reference-cleanup-kit
  -> phantom-command-reward-settlement-kit
  -> phantom-command-core-breach-event-kit
  -> phantom-command-wave-clear-evaluation-kit
  -> phantom-command-combat-resolution-result-kit
  -> phantom-command-combat-resolution-journal-kit
  -> phantom-command-dead-entity-no-action-fixture-kit
  -> phantom-command-combat-order-parity-fixture-kit
  -> phantom-command-checkpoint-order-parity-fixture-kit
  -> phantom-command-ghost-action-frame-smoke-kit
```

## Required resolution pipeline

```txt
committed command set
  -> freeze CombatFrameInput
  -> admit due spawns
  -> create alive-entity index
  -> sort entities by declared stable policy
  -> collect movement, targeting and attack intents from alive entities only
  -> resolve attacks and projectile emissions
  -> collect damage intents
  -> apply declared damage-order or simultaneous-damage policy
  -> retire dead entities exactly once
  -> clean selection, target, projectile and pad references
  -> settle rewards exactly once
  -> evaluate core-breach and wave-clear evidence
  -> publish CombatResolutionResult
  -> feed terminal arbitration
  -> render immutable committed state
```

## Fixture gate

```txt
dead entity cannot act later in the same tick
lethal melee cannot create an invisible counterattack
lethal ranged hit cannot create a post-death projectile
new spawn first-action policy is explicit and stable
equidistant target ties resolve by declared stable identity
same state with different object insertion order produces the same result
checkpoint hydration order does not change combat outcome
reward is granted exactly once per retired enemy
retired references are absent before committed-frame publication
visible core damage has a retained event/source provenance row
```

## Implementation order

```txt
1. Continue Capability Resolver
2. Campaign Action Result Authority
   2a. CRT Display/Input Projection Authority
   2b. Campaign Phase Admission Authority
   2c. Fixed-Step Command Scheduling, Replay and Committed Frame Authority
   2d. Combat Resolution and Entity Liveness Authority
   2e. Exclusive Terminal Outcome Transaction
3. Runtime Session Lifecycle Authority
4. Versioned Campaign Checkpoint Authority
```

Combat resolution belongs after fixed-step command admission and before terminal arbitration because terminal evidence must be derived from one complete, deterministic combat result.

## Validation boundary

```txt
runtime source changed: no
gameplay behavior changed: no
rendering behavior changed: no
package scripts changed: no
dependencies changed: no
deployment workflow changed: no
branch created: no
pull request created: no
npm run check: not run
npm run build: not run
browser smoke: not run
combat-order fixture: absent
dead-entity fixture: absent
checkpoint-order parity fixture: absent
ghost-action frame smoke: absent
```
