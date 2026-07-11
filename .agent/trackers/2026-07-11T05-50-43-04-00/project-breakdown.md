# PhantomCommand Project Breakdown

**Timestamp:** `2026-07-11T05-50-43-04-00`

## Summary

This run selected `LuminaryLabs-Publish/PhantomCommand` as the oldest eligible documented repository after confirming that all ten accessible Publish repositories are tracked, all nine non-Cavalry repositories have root `.agent` state, and no newer undocumented repository took priority. The new breakdown maps the fourth implementation gate: a versioned campaign checkpoint and atomic resume transaction.

## Plan ledger

**Goal:** define the authoritative checkpoint, validation, hydration, rollback and first-frame proof needed for Continue to restore a complete campaign instead of starting a fresh run from a three-field completion summary.

- [x] Compare the full accessible Publish repository list with the central ledger.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have root `.agent` state.
- [x] Select only `LuminaryLabs-Publish/PhantomCommand` by the oldest documented-selection rule.
- [x] Re-read the menu, campaign, CRT, package and current `.agent` state.
- [x] Identify the active interaction loop.
- [x] Identify all active and missing domains.
- [x] Identify implemented, planned and newly required kits and services.
- [x] Map durable campaign state, transient state and relational invariants.
- [x] Define checkpoint admission, schema, migration, atomic hydration, rollback and resume epoch requirements.
- [x] Define render and deployment proof gates.
- [x] Update required root `.agent` files.
- [x] Add timestamped architecture, render, gameplay, interaction, persistence and deploy audits.
- [ ] Implement the four ordered authority gates.
- [ ] Add executable fixtures and browser smoke coverage.

## Repository selection

```txt
accessible repositories: 10
eligible non-Cavalry repositories: 9
central ledger entries: 9/9
root .agent state: 9/9
selected: LuminaryLabs-Publish/PhantomCommand
excluded: LuminaryLabs-Publish/TheCavalryOfRome
```

Selection timestamps before this run:

```txt
PhantomCommand       2026-07-11T03-41-49-04-00  selected
ZombieOrchard        2026-07-11T03-48-31-04-00
TheUnmappedHouse     2026-07-11T04-00-07-04-00
AetherVale           2026-07-11T04-28-33-04-00
IntoTheMeadow        2026-07-11T04-49-30-04-00
MyCozyIsland         2026-07-11T05-10-36-04-00
TheOpenAbove         2026-07-11T05-25-29-04-00
HorrorCorridor       2026-07-11T05-28-29-04-00
PrehistoricRush      2026-07-11T05-39-11-04-00
TheCavalryOfRome     excluded
```

## Product interaction loop

```txt
menu module evaluates
  -> reads settings
  -> scans three save keys across localStorage and sessionStorage
  -> reduces all save evidence to Boolean presence
  -> Begin emits game.html?campaign=new
  -> Continue emits game.html?campaign=continue

campaign module evaluates
  -> ignores campaign mode and candidate identity
  -> creates fresh pads, units, counters, camera, input and mutable state
  -> browser/GameHost actions mutate live state
  -> fixed 1/60 simulation advances spawning, AI, combat and economy
  -> world, HUD, minimap, overlay and CRT render
  -> victory writes { scene, souls, wave }
```

Target resume loop:

```txt
Continue command
  -> resolve one typed candidate with provenance
  -> parse and validate envelope
  -> migrate schema/content version when supported
  -> stage immutable descriptors and mutable checkpoint state
  -> rebuild ID indexes and relational references
  -> validate counters, targets, pad ownership and terminal invariants
  -> commit one new session/resume epoch atomically
  -> reset transient input, accumulator and browser-owned resources
  -> publish typed resume result
  -> render first frame with checkpoint fingerprint acknowledgement
```

## Domains in use

```txt
route shell, menu selection, panels, settings and transitions
save presence, Continue capability and candidate provenance
procedural menu audio and graveyard art
source-canvas and CRT presentation
ring, lane, pad, unit, tower and wave content
souls economy, sanctum health, selection, terminal state and camera
build, order, wave-start, spawn, AI, targeting, projectile, damage and reward
fixed-step simulation and victory summary persistence
world, HUD, minimap, overlay, CRT and host observation
runtime lifecycle, resource ownership and navigation teardown
static checks, static build, Pages deployment and central sync
```

Missing persistence authority domains:

```txt
checkpoint boundary and committed-tick admission
save schema and content identity
canonical checkpoint capture and fingerprint
candidate parse/admission and migration
checkpoint invariant validation
staged hydration and reference rebuilding
atomic resume commit and rollback
resume epoch and stale-callback rejection
storage adapter and typed results
resume journal and first-frame acknowledgement
roundtrip and corruption fixtures
```

## Implemented kits and services

```txt
crt-renderer-kit
  WebGL CRT allocation, upload, draw, resize and coordinate projection

graveyard-art-kit
  procedural menu composition and animation

menu-route-kit
  menu state, selection, panels, activation, fade and route choice

menu-settings-persistence-kit
  read/write CRT, grain and ambience preferences

menu-save-presence-kit
  Boolean scan of three keys across two browser storage layers

menu-audio-kit
  lazy AudioContext, ambience graph, UI tones and close request

campaign-route-shell-kit
  campaign route boot

pixel-campaign-runtime-kit
  content descriptors, mutable state, actions and browser input integration

fixed-step-campaign-simulation-kit
  exact 1/60 spawn, AI, combat, economy and terminal updates

pixel-campaign-render-kit
  world, entity, HUD, minimap, modal and CRT source drawing

legacy-gamehost-diagnostics-kit
  mutable state/camera exposure, direct actions and aggregate clone

menu-static-check-kit
campaign-static-check-kit
static-build-copy-kit
pages-deploy-kit
retained construct kits
```

The exact current and planned kit census is maintained in `.agent/kit-registry.json`.

## Main finding

The current victory save is not a campaign checkpoint:

```json
{"scene":"grave-ring","souls":0,"wave":6}
```

It cannot reconstruct units, towers, pad ownership, spawn queue, projectiles, counters, selection, camera, terminal state or fixed-step identity. The campaign does not read `campaign=continue`, has no load path and always starts from fresh module-scope state.

A trustworthy checkpoint must preserve relational invariants such as:

```txt
pad.tower references an existing tower
selected IDs reference live player units
projectile targets reference live units
spawn rows retain deterministic order
uid/pid/tid exceed every restored identifier
waveActive agrees with spawn/enemy state
terminal flags are mutually valid
checkpoint fingerprint matches canonical payload
```

Hydration must be staged and validated before replacing the live session. A rejected or corrupted candidate must leave the current session unchanged.

## Ordered implementation queue

```txt
1. Continue Capability Resolver + Save Candidate Precedence Fixture Gate
2. Campaign Action Result Authority + Fixed-Step Replay/Frame Fixture Gate
3. Runtime Session Lifecycle Authority + Menu/Campaign Teardown Fixture Gate
4. Versioned Campaign Checkpoint Authority + Atomic Resume/First-Frame Fixture Gate
```

## Validation

```txt
runtime source changed: no
package scripts changed: no
dependencies changed: no
routes changed: no
gameplay changed: no
rendering changed: no
persistence changed: no
deployment changed: no
branch created: no
pull request created: no
npm run check: not run
npm run build: not run
browser smoke: not run
resume fixtures: absent
```
