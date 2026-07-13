# PhantomCommand Current Audit

**Timestamp:** `2026-07-13T00-40-00-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Status:** `combat-modifier-application-central-reconciled`

## Summary

The Grave Ward declares `slow: 0.34`. Projectile construction copies that value into live projectile state, but impact never reads it. Impact applies damage, emits a transient visual effect and deletes the projectile. Units have no active modifier state, movement uses unchanged authored speed, and rendering cannot cite a modifier result or remaining duration. This run reconciles that completed repo-local audit with central tracking.

## Plan ledger

**Goal:** preserve one complete source-backed breakdown while requiring every authored combat modifier to pass a deterministic damage-plus-effect transaction and reach a correlated visible frame.

- [x] Compare all accessible Publish repositories and central ledger entries.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only PhantomCommand because repo-local combat documentation was newer than central state.
- [x] Inspect tower specs, projectiles, impact, movement, rendering and static checks.
- [x] Identify the complete interaction loop and active/missing domains.
- [x] Preserve all 20 implemented kits and offered services.
- [x] Define modifier identity, duration, stacking, application, expiry and frame-proof boundaries.
- [x] Add the timestamped reconciliation tracker and system audits.
- [x] Refresh root `.agent` state and machine registry.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Implement and execute the authority later.

## Selection

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0
unsynchronized eligible repositories: 1
selected repository: LuminaryLabs-Publish/PhantomCommand
selection reason: repo-local combat modifier audit newer than central tracking
excluded repository: LuminaryLabs-Publish/TheCavalryOfRome
```

## Complete interaction loop

```txt
menu boot
  -> read settings and save presence
  -> select New, Continue, Settings or Credits
  -> fade and navigate

campaign bootstrap
  -> create rings, pads, archetypes, tower specs and waves
  -> create mutable state and six allied units
  -> attach input and expose GameHost
  -> start recursive RAF

player loop
  -> pan/zoom camera
  -> select units or empty pad
  -> build tower or issue order
  -> start wave

fixed-step combat
  -> spawn enemies
  -> acquire targets
  -> move units
  -> update tower cooldowns
  -> create and move projectiles
  -> apply damage and rewards
  -> resolve wave and terminal outcomes

Grave Ward path
  -> spend 55 souls
  -> build tower with range 52, damage 7, rate 1.45, projectile speed 138 and slow 0.34
  -> create projectile retaining slow 0.34
  -> impact applies damage only
  -> impact effect is drawn
  -> projectile is deleted
  -> target movement still uses archetype speed

render loop
  -> draw world, units, towers, projectiles, effects, HUD and minimap
  -> upload source canvas to WebGL texture
  -> present CRT frame
```

## Source-backed findings

```txt
Ward slow declaration: 0.34
projectile carries spec.slow: yes
impact branch reads p.slow: no
unit active modifier collection: no
slow magnitude interpretation: undefined
slow duration: undefined
stacking policy: undefined
refresh policy: undefined
resistance/immunity policy: undefined
movement derives current speed from modifiers: no
expiry and exactly-once retirement: no
modifier application result: no
modifier observation/journal: no
visible modifier frame acknowledgement: no
```

### Authored control value is discarded

The payload reaches the exact impact boundary where damage is resolved and is ignored. The missing owner is not tower selection or projectile transport; it is target-bound modifier admission and state.

### Movement has no effect-consumption surface

`moveToward()` reads `u.speed` directly. There is no immutable base-speed versus derived-current-speed boundary. Directly mutating `u.speed` would make stacking, expiry, restoration, replay and restart semantics unsafe.

### Visual feedback is not simulation proof

Ward projectiles and impact rings have distinct colors, but entities, HUD and minimap carry no modifier identity, revision or duration. A special-looking shot can imply a control effect that never occurs.

### Static proof gap

The campaign checker verifies source markers. It does not execute impact, speed comparison, duration, stacking, expiry, target retirement or visible-frame correlation.

## Domains in use

```txt
menu and campaign route shells
menu settings, save presence, panels, fade, navigation and audio
browser document, canvas and hidden accessibility surfaces
CRT containment, source projection, curvature, aberration, grain, vignette and fade
browser keyboard, pointer, wheel, blur and context-menu input
campaign bootstrap, run state and public host readback
campaign phase, pause, restart and terminal outcomes
camera pan, focus and zoom
selection, pad selection, tower construction and orders
economy, build costs, tower types and pad occupancy
wave phase, spawn queue and progression
unit identity, liveness, targeting, cooldowns and movement
projectile identity, target binding, travel, impact and retirement
combat damage, splash, rewards and sanctum damage
combat modifier specification, admission, target state, duration, stacking, expiry and retirement
world, HUD, minimap, projectile/effect and terminal rendering
source checks, static build, Pages deployment and audit tracking
```

## Implemented kits and offered services

```txt
crt-renderer-kit: WebGL context, CRT program, source texture, containment and screen-to-source projection
graveyard-art-kit: procedural graveyard menu drawing
menu-route-kit: selection, panels, fade and navigation
menu-settings-persistence-kit: settings read and write
menu-save-presence-kit: localStorage and sessionStorage presence scan
menu-audio-kit: AudioContext ambience, wind, drone, UI tones and delayed close
campaign-route-shell-kit: campaign document and canvas route
pixel-campaign-runtime-kit: mutable state, input, selection, building, orders, pause and camera
fixed-step-campaign-simulation-kit: wave spawning, movement, targeting, towers, projectiles, damage, rewards and outcomes
pixel-campaign-render-kit: world, entities, projectiles, effects, HUD, minimap and terminal overlays
legacy-gamehost-diagnostics-kit: public state and zoom access
menu-static-check-kit: menu source-marker checks
campaign-static-check-kit: campaign source-marker checks
static-build-copy-kit: static deployable copy into dist
pages-deploy-kit: GitHub Pages build and deployment
construct-spiral-intro-kit: concentric construct intro choreography
construct-spiral-schedule-kit: ring and piece timing schedule
construct-piece-id-kit: stable construct piece identity
construct-piece-state-kit: construct piece state projection
construct-sequence-update-kit: construct sequence advancement
```

## Required authority

```txt
phantom-command-combat-modifier-application-authority-domain
```

### Required transaction

```txt
ProjectileImpactCommand
  -> bind runtime session, run generation, projectile generation and target generation
  -> validate projectile, source, target and phase liveness
  -> resolve one immutable damage/effect specification
  -> interpret modifier magnitude explicitly
  -> evaluate duration, stacking, refresh, resistance and immunity policy
  -> atomically commit damage plus accepted target modifier state
  -> return Applied, Refreshed, Stacked, Resisted, Immune, Rejected, Stale or Duplicate
  -> derive movement speed from immutable base speed and active modifiers
  -> expire or retire modifiers exactly once
  -> publish bounded observations and journal evidence
  -> acknowledge the first visible frame citing the modifier revision
```

## Candidate kits

```txt
combat-effect-spec-id-kit
combat-effect-spec-version-kit
projectile-impact-command-id-kit
projectile-impact-envelope-kit
projectile-generation-kit
combat-target-generation-kit
combat-modifier-kind-kit
combat-modifier-magnitude-kit
combat-modifier-duration-kit
combat-modifier-stacking-policy-kit
combat-modifier-refresh-policy-kit
combat-modifier-resistance-policy-kit
combat-modifier-application-kit
combat-modifier-result-kit
unit-active-modifier-set-kit
unit-derived-movement-speed-kit
combat-modifier-expiry-kit
combat-modifier-retirement-kit
stale-impact-rejection-kit
duplicate-impact-rejection-kit
combat-effect-observation-kit
combat-effect-journal-kit
combat-modifier-visible-frame-ack-kit
grave-ward-slow-application-fixture-kit
grave-ward-slow-duration-fixture-kit
grave-ward-refresh-stacking-fixture-kit
modifier-target-retirement-fixture-kit
combat-effect-build-pages-parity-fixture-kit
```

## Current output

```txt
.agent/trackers/2026-07-13T00-40-00-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-13T00-40-00-04-00.md
.agent/architecture-audit/2026-07-13T00-40-00-04-00-combat-modifier-central-reconciliation-dsk-map.md
.agent/render-audit/2026-07-13T00-40-00-04-00-modifier-visible-frame-central-reconciliation-gap.md
.agent/gameplay-audit/2026-07-13T00-40-00-04-00-grave-ward-slow-central-reconciliation.md
.agent/interaction-audit/2026-07-13T00-40-00-04-00-projectile-impact-admission-central-reconciliation.md
.agent/combat-effect-audit/2026-07-13T00-40-00-04-00-effect-state-central-reconciliation-contract.md
.agent/deploy-audit/2026-07-13T00-40-00-04-00-combat-modifier-central-fixture-gate.md
.agent/central-sync-audit/2026-07-13T00-40-00-04-00-repo-ledger-combat-modifier-reconciliation.md
```

## Validation boundary

Documentation only. Runtime, combat, economy, rendering, input, package scripts, dependencies and deployment were not changed. Existing source checks were inspected but not executed. No combat-modifier fixture currently exists.