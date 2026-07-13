# PhantomCommand Project Breakdown

**Timestamp:** `2026-07-12T22-15-00-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Branch:** `main`  
**Status:** `campaign-bootstrap-resume-central-reconciled`

## Summary

PhantomCommand is a static pixel-isometric campaign with a procedural graveyard menu, CRT presentation, fixed-step combat, browser storage and public diagnostics. The current source-backed boundary is Campaign Bootstrap and Continue Resume Authority: the menu enables Continue from raw storage presence and routes to `game.html?campaign=continue`, but the campaign ignores the route intent and every saved value, always constructing the same fresh campaign.

This run reconciles the completed `22-05-12` repo-local audit with the older central ledger while retaining all existing root documentation.

## Plan ledger

**Goal:** make New and Continue explicit, revisioned bootstrap transactions and synchronize the completed repo-local finding with central tracking.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have ledger and root `.agent` coverage.
- [x] Select only `LuminaryLabs-Publish/PhantomCommand`, the oldest eligible central entry.
- [x] Inspect menu save presence, route intent, campaign construction, final save output and proof surfaces.
- [x] Identify the complete interaction loop and domains.
- [x] Preserve all 20 implemented kits and offered services.
- [x] Add this timestamped tracker and audit family.
- [x] Synchronize the central ledger and internal change log.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Runtime bootstrap, checkpoint and executable resume fixtures remain future work.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

PhantomCommand   2026-07-12T19-58-07-04-00 selected oldest
PrehistoricRush  2026-07-12T20-10-25-04-00
HorrorCorridor   2026-07-12T20-20-02-04-00
ZombieOrchard    2026-07-12T20-31-27-04-00
MyCozyIsland     2026-07-12T20-40-56-04-00
TheUnmappedHouse 2026-07-12T20-51-16-04-00
AetherVale       2026-07-12T21-15-06-04-00
TheOpenAbove     2026-07-12T21-31-40-04-00
IntoTheMeadow    2026-07-12T21-40-09-04-00
```

## Complete interaction loop

```txt
menu boot
  -> read menu settings
  -> scan phantomCommand.save, nexus.sceneSnapshot and phantom.command.campaign
  -> any truthy string enables Continue

New
  -> fade and navigate to game.html?campaign=new

Continue
  -> same fade and navigate to game.html?campaign=continue

campaign module evaluation
  -> parse no query intent
  -> read no campaign checkpoint
  -> create rings, pads, waves and six starting allies
  -> install souls=145, core=24, wave=0 and empty mutable collections
  -> attach input, expose GameHost and start RAF

final victory
  -> write only scene, souls and wave
  -> menu later advertises Continue
  -> Continue still starts the same fresh campaign
```

## Source-backed findings

```txt
Continue availability validates storage: no
campaign parses campaign=new/continue: no
campaign reads a checkpoint: no
New and Continue produce different state: no
canonical save slot: no
schema/version/checksum: no
migration registry: no
complete participant capture: no
detached hydration and validation: no
atomic bootstrap commit/rollback: no
run/checkpoint generation: no
typed bootstrap result: no
first visible bootstrap-frame acknowledgement: no
```

The final writer persists only `scene`, `souls` and `wave`. It omits core, wave activity, spawn queue, units, towers, pad occupancy, projectiles, effects, selection, camera, ID counters, phase, run identity and deterministic step state.

## Domains in use

```txt
menu and campaign route shells
menu settings, save-presence scanning, panels, fade, navigation and audio
campaign entry intent and route query
browser storage keys and save availability
campaign bootstrap and mutable aggregate construction
checkpoint capture, schema, version, checksum and migration policy
run identity, generation and predecessor retirement
candidate hydration and cross-participant validation
economy, wave progression, units, towers, pads and combat
camera, selection and presentation state
fixed-step simulation and terminal outcomes
world, HUD, minimap and CRT rendering
public GameHost commands and readback
source checks, static build, Pages deployment and audit tracking
```

## Implemented kits and offered services

```txt
crt-renderer-kit: WebGL context, CRT shaders, source texture, containment and screen-to-source projection
graveyard-art-kit: procedural graveyard menu drawing
menu-route-kit: selection, panels, fade and navigation
menu-settings-persistence-kit: settings read/write
menu-save-presence-kit: browser storage presence scan
menu-audio-kit: AudioContext ambience, tones and delayed close
campaign-route-shell-kit: game document and canvas route
pixel-campaign-runtime-kit: campaign state, input, selection, building, orders and camera
fixed-step-campaign-simulation-kit: spawn, movement, targeting, combat, projectiles, rewards and outcomes
pixel-campaign-render-kit: world, entities, HUD, minimap, overlays and CRT presentation
legacy-gamehost-diagnostics-kit: public snapshot and mutation capabilities
menu-static-check-kit: menu source assertions
campaign-static-check-kit: campaign source assertions
static-build-copy-kit: static dist assembly
pages-deploy-kit: GitHub Pages publication
construct-spiral-intro-kit: construction intro composition
construct-spiral-schedule-kit: construction timing schedule
construct-piece-id-kit: stable construction piece identity
construct-piece-state-kit: construction piece state
construct-sequence-update-kit: construction sequence progression
```

## Required parent domain

```txt
phantom-command-campaign-bootstrap-resume-authority-domain
```

## Required transaction

```txt
CampaignEntryIntent(new | continue)
  -> bind route, runtime session and command ID
  -> admit one run generation

new
  -> construct all participants from an authored preset in detached state

continue
  -> resolve canonical save slot
  -> parse typed envelope
  -> validate schema, version, checksum and source compatibility
  -> migrate only through an explicit registry
  -> hydrate every declared participant in detached state

candidate
  -> validate references, balances, occupancy, counters, phase and camera
  -> atomically commit or preserve predecessor
  -> publish CampaignBootstrapResult
  -> reject unavailable, malformed, unsupported, stale or duplicate input with zero mutation
  -> acknowledge the first visible world/HUD/minimap/CRT frame
```

## Validation boundary

Documentation only. Runtime, menu, campaign, persistence, rendering, package scripts, dependencies and deployment were unchanged. No New/Continue, checkpoint, browser or Pages fixture was executed.
