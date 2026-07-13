# PhantomCommand Project Breakdown

**Timestamp:** `2026-07-13T00-40-00-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Branch:** `main`  
**Status:** `combat-modifier-application-central-reconciled`

## Summary

PhantomCommand is a static pixel-isometric campaign with a procedural graveyard menu, CRT presentation, fixed-step combat, browser persistence and public diagnostics. This run reconciles the completed repo-local Combat Modifier Application audit with central tracking. The Grave Ward declares `slow: 0.34` and projectiles retain it, but impact applies only damage and a transient effect; target movement never consumes a modifier state.

## Plan ledger

**Goal:** keep one source-backed repo and central record for the interaction loop, domains, kits, services and missing authority required to make authored combat modifiers affect deterministic gameplay and visible frames.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Detect PhantomCommand repo-local combat-modifier documentation newer than central tracking.
- [x] Select and modify only `LuminaryLabs-Publish/PhantomCommand`.
- [x] Re-read tower specifications, projectile creation, impact, movement, rendering and static checks.
- [x] Identify the complete interaction loop, domains, all 20 implemented kits and offered services.
- [x] Preserve the original combat-modifier audit family.
- [x] Add this timestamped reconciliation family and refresh root `.agent` state.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Runtime modifier application and executable fixtures remain future work.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0
unsynchronized eligible repositories: 1

PhantomCommand     selected, repo-local 00:31 combat audit newer than central 22:15 state
PrehistoricRush    synchronized at 2026-07-12T22-18-39-04-00
HorrorCorridor     synchronized at 2026-07-12T22-44-30-04-00
ZombieOrchard      synchronized at 2026-07-12T23-00-53-04-00
MyCozyIsland       synchronized at 2026-07-12T23-08-37-04-00
TheUnmappedHouse   synchronized at 2026-07-12T23-20-51-04-00
AetherVale         synchronized at 2026-07-12T23-40-11-04-00
TheOpenAbove       synchronized at 2026-07-13T00-00-02-04-00
IntoTheMeadow      synchronized at 2026-07-13T00-18-48-04-00
TheCavalryOfRome   excluded
```

Only `LuminaryLabs-Publish/PhantomCommand` was modified in the Publish organization.

## Complete interaction loop

```txt
menu boot
  -> read settings and raw save presence
  -> choose New, Continue, Settings or Credits
  -> fade and navigate

campaign boot
  -> create rings, pads, archetypes, tower specs, waves and mutable state
  -> create six allied units
  -> attach pointer, wheel, keyboard and blur listeners
  -> expose window.GameHost
  -> start recursive RAF

player command
  -> pan or zoom camera
  -> select units or an empty pad
  -> build Bone Spire, Soul Lantern or Grave Ward
  -> issue order or start wave

fixed-step combat
  -> spawn enemies
  -> acquire targets and move units
  -> fire towers and create projectiles
  -> move projectiles and resolve damage
  -> award souls and resolve wave or terminal outcome

Grave Ward path
  -> spend 55 souls
  -> tower spec supplies slow = 0.34
  -> projectile stores slow = 0.34
  -> impact applies damage and transient visual effect
  -> projectile retires
  -> target keeps unchanged authored speed

render
  -> draw world, entities, towers, projectiles, effects, HUD and minimap
  -> upload source canvas to WebGL
  -> present CRT frame
```

## Source-backed finding

```txt
Ward slow declaration: yes, 0.34
projectile transport: yes
impact reads p.slow: no
active target modifier state: no
duration: no
stacking or refresh policy: no
movement derivation: direct u.speed only
expiry and retirement: no
typed modifier result: no
visible modifier-frame acknowledgement: no
```

The missing boundary is impact admission and target-state ownership. A distinct projectile color and impact ring are presentation cues, not proof of a gameplay slow.

## Domains in use

```txt
menu and campaign route shells
menu settings, save presence, panels, fade, navigation and audio
browser document, canvas and hidden accessibility surfaces
CRT containment, projection, curvature, aberration, grain, vignette and fade
keyboard, pointer, wheel, blur and context-menu input
campaign bootstrap, mutable run state and public host readback
campaign phase, pause, restart and terminal outcomes
camera pan, focus and zoom
selection, pad selection, construction and orders
economy, tower types, pad occupancy and build costs
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
menu-audio-kit: AudioContext ambience, wind, drone, tones and delayed close
campaign-route-shell-kit: campaign document and canvas route
pixel-campaign-runtime-kit: mutable state, input, selection, building, orders, pause and camera
fixed-step-campaign-simulation-kit: spawning, movement, targeting, towers, projectiles, damage, rewards and outcomes
pixel-campaign-render-kit: world, entities, projectiles, effects, HUD, minimap and terminal overlays
legacy-gamehost-diagnostics-kit: public state and zoom access
menu-static-check-kit: menu source-marker checks
campaign-static-check-kit: campaign source-marker checks
static-build-copy-kit: deployable static copy into dist
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

Required transaction:

```txt
ProjectileImpactCommand
  -> bind runtime session, run, projectile and target generations
  -> validate projectile, source, target and phase liveness
  -> resolve one immutable damage/effect specification
  -> interpret modifier magnitude, duration, stacking, refresh and resistance policy
  -> atomically commit damage plus accepted target modifier state
  -> return Applied, Refreshed, Stacked, Resisted, Immune, Rejected, Stale or Duplicate
  -> derive movement speed from immutable base speed and active modifiers
  -> expire and retire modifiers exactly once
  -> publish bounded observations and journal evidence
  -> acknowledge the first visible frame citing the modifier revision
```

## Output

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
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

Documentation only. Runtime, combat balance, movement, rendering, input, dependencies, package scripts and deployment were not changed. Existing checks were inspected but not executed. No slow-application, duration, stacking, expiry, visible-frame or deployed parity fixture currently exists.