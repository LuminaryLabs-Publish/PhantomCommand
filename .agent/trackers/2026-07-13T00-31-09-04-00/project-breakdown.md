# PhantomCommand Project Breakdown

**Timestamp:** `2026-07-13T00-31-09-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Branch:** `main`  
**Status:** `combat-modifier-application-authority-audited`

## Summary

PhantomCommand is a static pixel-isometric campaign with a procedural graveyard menu, CRT presentation, fixed-step combat, browser persistence and public diagnostics. The current source-backed boundary is Combat Modifier Application Authority: the Grave Ward declares `slow: .34`, projectiles retain that value, but projectile impact applies only damage and visual effects. Enemy movement never consumes a slow state, duration, stacking rule or expiry result.

## Plan ledger

**Goal:** make every authored combat modifier produce one typed, target-bound and time-bounded gameplay result before the visible frame presents the effect.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Compare all nine eligible repos against central ledger entries and root `.agent/START_HERE.md` files.
- [x] Confirm no eligible repo is new, ledger-missing or root-agent-missing.
- [x] Select only `LuminaryLabs-Publish/PhantomCommand`, the oldest eligible central entry.
- [x] Inspect tower specs, projectile creation, projectile impact, unit movement, rendering and static checks.
- [x] Identify the complete interaction loop, domains, all 20 implemented kits and offered services.
- [x] Add the timestamped tracker, turn ledger and system audit family.
- [x] Refresh all required root `.agent` files and machine registry.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Runtime modifier application and executable fixtures remain future work.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

PhantomCommand     2026-07-12T22-15-00-04-00 selected oldest
PrehistoricRush    2026-07-12T22-18-39-04-00
HorrorCorridor     2026-07-12T22-44-30-04-00
ZombieOrchard      2026-07-12T23-00-53-04-00
MyCozyIsland       2026-07-12T23-08-37-04-00
TheUnmappedHouse   2026-07-12T23-20-51-04-00
AetherVale         2026-07-12T23-40-11-04-00
TheOpenAbove       2026-07-13T00-00-02-04-00
IntoTheMeadow      2026-07-13T00-18-48-04-00
TheCavalryOfRome   excluded
```

Only `LuminaryLabs-Publish/PhantomCommand` was modified in the Publish organization.

## Complete interaction loop

```txt
menu boot
  -> read menu settings and save presence
  -> select New, Continue, Settings or Credits
  -> fade and navigate to campaign

campaign boot
  -> create rings, pads, tower and unit archetypes
  -> create six allied units and mutable campaign state
  -> attach pointer, wheel, keyboard and blur listeners
  -> expose window.GameHost
  -> start recursive RAF

campaign command
  -> select units or pad
  -> build Bone Spire, Soul Lantern or Grave Ward
  -> start wave
  -> issue move or attack order

fixed-step simulation
  -> spawn enemies
  -> move and target units
  -> update towers
  -> create projectiles
  -> resolve impact damage
  -> update rewards, wave and terminal outcomes

Grave Ward path
  -> tower spec declares slow = 0.34
  -> projectile copies slow = 0.34
  -> impact applies damage and visual effect only
  -> enemy retains unchanged base speed

render
  -> draw world, entities, projectiles, effects, HUD and minimap
  -> upload source canvas to CRT renderer
  -> present WebGL frame
```

## Source-backed findings

```txt
Grave Ward authored slow value: 0.34
projectile stores slow value: yes
impact reads p.slow: no
unit status/modifier collection: no
slow duration: no
stacking or refresh policy: no
movement speed derivation from active modifiers: no
modifier application result: no
modifier expiry/retirement result: no
visible slow-state indicator: no
static or browser modifier fixture: no
```

The tower therefore spends 55 souls and fires a distinct projectile, but its advertised control function is not represented in simulation truth.

## Domains in use

```txt
menu and campaign route shells
menu settings, save-presence scanning, panels, fade, navigation and audio
browser document, canvas and hidden accessibility surfaces
CRT source containment, curvature, aberration, grain, vignette and fade
browser keyboard, pointer, wheel, blur and context-menu input
campaign bootstrap, mutable state and public GameHost readback
campaign phase, pause, restart and terminal outcomes
camera pan, focus and zoom
selection, selected-pad state, construction and orders
economy, tower type, pad occupancy and build cost
wave phase, spawn queue and progression
unit identity, liveness, targeting, movement and attack cooldowns
projectile identity, travel, impact, splash and retirement
combat damage, rewards and core damage
combat modifier declaration, application, duration, stacking and expiry
world, HUD, minimap and terminal rendering
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
pixel-campaign-runtime-kit: mutable state, input, selection, building, orders and camera
fixed-step-campaign-simulation-kit: wave spawning, movement, targeting, combat, projectiles, rewards and outcomes
pixel-campaign-render-kit: world, entities, HUD, minimap and terminal overlays
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
  -> validate projectile and target liveness
  -> resolve damage and declared modifiers from one immutable effect spec
  -> calculate stacking, refresh, resistance and duration policy
  -> atomically commit damage plus accepted modifier state
  -> return Applied, Resisted, Refreshed, Stacked, Rejected, Stale or Duplicate
  -> derive movement speed from active modifier state
  -> expire and retire modifiers exactly once
  -> publish bounded combat observations
  -> acknowledge the first visible frame citing the modifier revision
```

## Candidate coordinating kits

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

## Output

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
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

Documentation only. Runtime, combat, economy, rendering, input, package scripts, dependencies and deployment were not changed. Existing source checks were inspected but not executed. No Grave Ward slow, duration, stacking, expiry, visible-frame or Pages fixture exists or was run.