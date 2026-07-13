# PhantomCommand Project Breakdown

**Timestamp:** `2026-07-12T22-05-12-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Branch:** `main`  
**Status:** `campaign-bootstrap-resume-authority-audited`

## Summary

PhantomCommand is a static pixel-isometric campaign game with a procedural graveyard menu, CRT presentation, browser storage, fixed-step combat and public diagnostics. This breakdown isolates Campaign Bootstrap and Continue Resume Authority: the menu advertises Continue when any truthy value exists under three storage keys, routes to `game.html?campaign=continue`, and the campaign then ignores both the route intent and every saved value, always constructing the same fresh mutable state.

## Plan ledger

**Goal:** make New Campaign and Continue explicit, revisioned bootstrap transactions that either install a validated fresh or restored campaign generation atomically or return a typed zero-mutation failure before the first gameplay frame.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger entries and root `.agent` state.
- [x] Confirm no new, ledger-missing or root-agent-missing repository takes priority.
- [x] Select only `LuminaryLabs-Publish/PhantomCommand` as the oldest eligible central entry.
- [x] Inspect menu save-presence detection, New/Continue routing, campaign construction, victory save output, reload behavior, checks and deployment surfaces.
- [x] Identify the complete interaction loop and all domains in use.
- [x] Preserve all 20 implemented kits and their offered services.
- [x] Define Campaign Bootstrap and Continue Resume Authority and its candidate kit family.
- [x] Add timestamped architecture, render, gameplay, interaction, campaign-resume and deploy audits.
- [x] Refresh every required root `.agent` document and machine registry.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Runtime bootstrap, checkpoint and executable resume fixtures remain future work.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

central last-updated order at selection:
  PhantomCommand   2026-07-12T19-58-07-04-00 selected oldest
  PrehistoricRush  2026-07-12T20-10-25-04-00
  HorrorCorridor   2026-07-12T20-20-02-04-00
  ZombieOrchard    2026-07-12T20-31-27-04-00
  MyCozyIsland     2026-07-12T20-40-56-04-00
  TheUnmappedHouse 2026-07-12T20-51-16-04-00
  AetherVale       2026-07-12T21-15-06-04-00
  TheOpenAbove     2026-07-12T21-31-40-04-00
  IntoTheMeadow    2026-07-12T21-40-09-04-00

selected: LuminaryLabs-Publish/PhantomCommand
excluded: LuminaryLabs-Publish/TheCavalryOfRome
```

Only `LuminaryLabs-Publish/PhantomCommand` is modified in the Publish organization.

## Complete interaction loop

```txt
menu boot
  -> read menu settings
  -> scan phantomCommand.save, nexus.sceneSnapshot and phantom.command.campaign
  -> treat any truthy stored string as a Continue-capable save
  -> enable or disable Continue

New Campaign
  -> begin fade transition
  -> navigate to game.html?campaign=new

Continue
  -> begin the same fade transition
  -> navigate to game.html?campaign=continue

campaign module evaluation
  -> never parse location.search or URLSearchParams
  -> never read any campaign save key
  -> create authored rings, pads, archetypes, waves and six starting units
  -> initialize souls=145, core=24, wave=0 and all mutable collections
  -> attach input listeners, expose GameHost and start RAF

campaign completion
  -> on final victory write only { scene, souls, wave }
  -> omit schema, version, checksum, run identity and most mutable state
  -> menu later sees the truthy string and advertises Continue
  -> Continue still constructs the same fresh campaign
```

## Source-backed findings

### Continue is presentation-only

`src/menu/graveyard-menu.js` differentiates New and Continue only by query string:

```txt
new      -> ./game.html?campaign=new
continue -> ./game.html?campaign=continue
```

`src/campaign/campaign-scene.js` never reads `location.search`, `URLSearchParams`, `campaign=new`, `campaign=continue`, `phantomCommand.save`, `nexus.sceneSnapshot` or `phantom.command.campaign`.

### Save presence is not save validity

The menu enables Continue when any of three keys contains any non-empty string. It does not parse, validate, version, checksum, migrate or bind the value to PhantomCommand's current campaign schema. Malformed JSON, stale foreign snapshots and unsupported data can therefore advertise Continue.

### The campaign always starts fresh

Every campaign module load creates:

```txt
souls: 145
core: 24
wave: 0
waveActive: false
spawn: []
units: six authored starting allies
towers: {}
projectiles: {}
effects: []
selected: []
selectedPad: null
camera: authored defaults
uid/pid/tid: reset module counters
```

The route intent does not alter this construction.

### Victory output is not a resumable checkpoint

The only campaign save writer runs after the final wave and stores:

```json
{"scene":"grave-ring","souls":0,"wave":6}
```

The actual souls value varies, but the shape contains only `scene`, `souls` and `wave`. It omits run identity, schema/version, core, wave activity, spawn queue, units, towers, pad occupancy, projectiles, effects, selection, camera, ID counters, pause/outcome state, deterministic step boundary and source-build fingerprint.

### Restart and bootstrap have no typed result

`R` calls `location.reload()`. There is no bootstrap command, candidate state, participant registry, validation result, rollback, stale-result rejection or first-campaign-frame acknowledgement.

### Existing checks do not exercise persistence

`scripts/check-campaign.mjs` checks source strings and basic scene construction markers. It does not execute New, Continue, storage parsing, checkpoint roundtrip, invalid-save rejection, unsupported-version behavior or source/build/Pages parity.

## Domains in use

```txt
menu and campaign route shells
menu settings, save-presence scanning, panels, fade, navigation and audio
campaign entry intent and route query
browser storage keys and save availability
campaign bootstrap and mutable aggregate construction
checkpoint capture and persistence
schema/version/checksum/migration policy
run identity, generation and predecessor retirement
campaign state hydration and cross-participant validation
economy, wave progression, units, towers, pads and combat state
camera, selection and user presentation state
fixed-step simulation and terminal outcomes
world, HUD, minimap and CRT rendering
public GameHost commands and readback
source checks, static build, Pages deployment and audit tracking
```

Missing authority:

```txt
campaign entry-intent parser
new-versus-continue admission
canonical save slot and envelope
schema version and migration registry
checksum and source-build fingerprint
run ID, generation and checkpoint revision
complete participant manifest
candidate hydration and invariant validation
atomic bootstrap install and rollback
stale/duplicate bootstrap rejection
typed unavailable/invalid/unsupported results
first visible campaign-generation frame acknowledgement
```

## Implemented kits and offered services

```txt
crt-renderer-kit: WebGL context, shader program, source texture, aspect containment, CRT effects, screen-to-source projection
graveyard-art-kit: procedural graveyard menu drawing
menu-route-kit: menu state, selection, panels, fade and navigation
menu-settings-persistence-kit: settings read/write and presentation options
menu-save-presence-kit: browser storage presence scan
menu-audio-kit: AudioContext, ambience, tones and delayed close
campaign-route-shell-kit: game document and canvas route
pixel-campaign-runtime-kit: authored campaign state, pointer/keyboard ingress, selection, building, orders and camera
fixed-step-campaign-simulation-kit: spawn, movement, targeting, combat, projectiles, rewards and outcomes
pixel-campaign-render-kit: world, entities, HUD, minimap, overlays and CRT presentation
legacy-gamehost-diagnostics-kit: public snapshot and direct mutation capabilities
menu-static-check-kit: static menu source assertions
campaign-static-check-kit: static campaign source assertions
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

This domain coordinates menu intent, persistence, campaign participant construction, atomic installation and visible-frame proof. It does not own combat simulation, campaign actions, spatial input or CRT rendering semantics.

## Candidate coordinating kits

```txt
campaign-entry-intent-kit
campaign-bootstrap-command-id-kit
campaign-bootstrap-command-kit
campaign-bootstrap-admission-kit
campaign-run-id-kit
campaign-run-generation-kit
campaign-checkpoint-id-kit
campaign-checkpoint-revision-kit
campaign-save-slot-id-kit
campaign-save-envelope-kit
campaign-save-schema-version-kit
campaign-save-checksum-kit
campaign-save-source-fingerprint-kit
campaign-save-read-result-kit
campaign-save-migration-registry-kit
campaign-new-run-preset-kit
campaign-continue-availability-kit
campaign-participant-registry-kit
campaign-participant-snapshot-kit
campaign-candidate-state-kit
campaign-state-hydration-kit
campaign-state-validation-kit
campaign-bootstrap-commit-kit
campaign-bootstrap-rollback-kit
campaign-predecessor-retirement-kit
stale-campaign-bootstrap-rejection-kit
duplicate-campaign-bootstrap-rejection-kit
campaign-bootstrap-result-kit
campaign-bootstrap-observation-kit
campaign-bootstrap-journal-kit
first-campaign-generation-frame-ack-kit
campaign-fresh-run-fixture-kit
campaign-continue-roundtrip-fixture-kit
campaign-invalid-save-fixture-kit
campaign-unsupported-version-fixture-kit
campaign-partial-checkpoint-rejection-fixture-kit
campaign-build-pages-resume-parity-fixture-kit
```

## Required transaction

```txt
CampaignEntryIntent(new | continue)
  -> bind runtime session, route and bootstrap command ID
  -> allocate or validate run generation

new
  -> select authored NewRunPreset
  -> construct every participant in detached candidate state

continue
  -> resolve canonical save slot
  -> read typed durable result
  -> parse envelope
  -> validate schema, version, checksum and source compatibility
  -> migrate through an explicit registry when required
  -> hydrate every declared participant into detached candidate state

candidate
  -> validate IDs, pad occupancy, unit/tower references, balances, wave phase,
     spawn queue, camera, selection and terminal-state invariants
  -> commit all participants atomically or preserve the predecessor
  -> retire predecessor generation exactly once
  -> publish CampaignBootstrapResult
  -> reject stale, duplicate, unavailable, malformed or unsupported inputs with zero mutation
  -> acknowledge the first visible world/HUD/minimap/CRT frame citing the committed generation
```

## Required invariants

```txt
Continue is enabled only from a validated compatible checkpoint receipt
New never hydrates predecessor campaign state
Continue never silently falls back to New
one bootstrap command produces at most one terminal result
all participants cite one run ID and generation
pad occupancy and tower records agree
selected IDs reference existing allied units
ID counters cannot collide with restored entities
checkpoint policy explicitly includes or resets transient projectiles/effects
failed hydration leaves the predecessor untouched
first visible frame cites the committed bootstrap result
source, built output and Pages behavior agree
```

## Validation boundary

Documentation only. Runtime, menu, campaign, persistence, rendering, package scripts, dependencies and deployment were not changed. No New/Continue or checkpoint fixture was executed.