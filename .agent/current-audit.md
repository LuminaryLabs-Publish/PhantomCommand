# PhantomCommand Current Audit

**Timestamp:** `2026-07-13T00-31-09-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Status:** `combat-modifier-application-authority-audited`

## Summary

The Grave Ward tower declares `slow: .34`. Projectile construction copies that value into live projectile state, but projectile impact never reads it. Impact applies damage, emits a transient visual effect and deletes the projectile. Units have no active modifier state, movement uses the unchanged authored speed, and rendering cannot cite a modifier result or remaining duration.

## Plan ledger

**Goal:** admit every authored combat modifier through one deterministic damage-plus-effect transaction and prove its simulation and visible consequences.

- [x] Compare all eligible Publish repositories and select only `PhantomCommand`.
- [x] Inspect tower specs, projectiles, impact, movement, rendering and static checks.
- [x] Identify the complete interaction loop and active/missing domains.
- [x] Preserve all 20 implemented kits and offered services.
- [x] Define modifier identity, duration, stacking, application, expiry and frame-proof boundaries.
- [x] Add the timestamped tracker and system audits.
- [x] Preserve bootstrap/resume, keyboard, spatial-input and action-result predecessors.
- [x] Refresh root `.agent` state and central tracking.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Implement and execute the authority later.

## Selection

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new/ledger-missing/root-agent-missing eligible repositories: 0
selected repository: LuminaryLabs-Publish/PhantomCommand
selection reason: oldest eligible central-ledger entry
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
  -> create projectiles
  -> move projectiles
  -> apply damage and rewards
  -> resolve wave and terminal outcomes

Grave Ward path
  -> spend 55 souls
  -> build tower with range 52, damage 7, rate 1.45, speed 138 and slow 0.34
  -> create projectile retaining slow 0.34
  -> impact calls damage only
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

The projectile payload survives creation and travel, so the missing boundary is not tower selection or transport. The gap is impact admission and target-state ownership. The slow value reaches the exact point where damage is resolved and is then ignored.

### Movement has no effect-consumption surface

`moveToward()` reads `u.speed` directly. There is no distinction between immutable archetype base speed and a derived current speed. Mutating `u.speed` directly would also make expiry, stacking, restoration and replay unsafe.

### Visual feedback is not simulation proof

Ward projectiles and impact rings have distinct colors, but entities, HUD and minimap carry no modifier identity, revision or remaining duration. A player can see a special-looking shot without any control effect occurring.

### Static proof gap

The campaign checker verifies source markers such as `towerTypes`, waves, animation, camera target zoom and `window.GameHost`. It does not execute projectile impact, speed comparison, duration, stacking, expiry, target retirement or frame correlation.

## Domains in use

```txt
menu and campaign route shells
menu settings, save presence, panels, fade, navigation and audio
browser document, canvas and hidden accessibility surfaces
CRT containment, curvature, aberration, grain, vignette and fade
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
menu drawing, selection, settings, save-presence scanning, panels, fade and routing
viewport containment, screen-to-source projection and CRT presentation
keyboard, pointer, wheel, drag-selection, order and camera input
AudioContext ambience, wind, drone, UI tones and delayed close
campaign state, selection, construction, orders, waves, pause, camera and restart
fixed-step spawning, movement, targeting, projectile travel, damage, splash, rewards and outcomes
world, entity, projectile, effect, HUD, minimap and terminal rendering
minimal victory-marker persistence
public snapshots and direct mutation capabilities
construction intro scheduling and piece-state updates
source checks, static build and GitHub Pages deployment
```

## Required authority

```txt
phantom-command-combat-modifier-application-authority-domain
```

### Required transaction

```txt
ProjectileImpactCommand
  -> bind runtime session, run generation, projectile generation and target generation
  -> validate projectile, source and target liveness
  -> resolve one immutable damage/effect specification
  -> interpret modifier magnitude explicitly
  -> evaluate duration, stacking, refresh, resistance and phase policy
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
.agent/trackers/2026-07-13T00-31-09-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-13T00-31-09-04-00.md
.agent/architecture-audit/2026-07-13T00-31-09-04-00-combat-modifier-application-dsk-map.md
.agent/render-audit/2026-07-13T00-31-09-04-00-unrepresented-slow-state-visible-frame-gap.md
.agent/gameplay-audit/2026-07-13T00-31-09-04-00-grave-ward-projectile-without-slow-loop.md
.agent/interaction-audit/2026-07-13T00-31-09-04-00-projectile-impact-modifier-admission-map.md
.agent/combat-effect-audit/2026-07-13T00-31-09-04-00-slow-duration-stacking-expiry-contract.md
.agent/deploy-audit/2026-07-13T00-31-09-04-00-combat-modifier-fixture-gate.md
```

## Validation boundary

Documentation only. Runtime, combat balance, tower behavior, movement, rendering, input, package scripts, dependencies and deployment were not changed. Existing checks were inspected but not run. No modifier fixture is currently available.