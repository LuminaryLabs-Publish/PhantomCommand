# PhantomCommand Project Breakdown

**Timestamp:** `2026-07-12T13-59-50-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Branch:** `main`

## Summary

PhantomCommand exposes `BEGIN CAMPAIGN` and `CONTINUE`, but both routes currently construct the same default campaign. The menu enables Continue when any configured storage key contains any truthy string, passes `campaign=continue`, and the campaign module never reads that launch intent or hydrates a save. The only campaign writer runs after victory and stores only `scene`, `souls`, and `wave`, which is insufficient to resume the live campaign graph.

## Plan ledger

**Goal:** make New and Continue distinct, validated bootstrap transactions that either create a clean campaign or atomically hydrate one complete versioned save and then prove the first visible restored frame.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Select only `PhantomCommand` as the oldest eligible central-ledger entry and next ordered architecture item.
- [x] Inspect menu save probing, launch URLs, campaign construction, victory persistence, public diagnostics and static checks.
- [x] Identify the complete interaction loop, domains, all 20 implemented kits and offered services.
- [x] Define the Campaign Bootstrap and Continue Resume Authority and fixture gate.
- [x] Update documentation only on `main`.
- [ ] Implement bootstrap, hydration, migration and visible-frame proof.

## Selection

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0
selected repository: LuminaryLabs-Publish/PhantomCommand
selection reason: oldest eligible central ledger and highest queued unimplemented authority
prior central timestamp: 2026-07-12T11-48-43-04-00
excluded repository: LuminaryLabs-Publish/TheCavalryOfRome
```

Only `LuminaryLabs-Publish/PhantomCommand` was modified in the Publish organization.

## Complete interaction loop

```txt
menu boot
  -> read menu settings
  -> probe three localStorage/sessionStorage keys
  -> enable Continue when any key contains any truthy string
  -> perform no parse, schema, version or campaign compatibility check

menu activation
  -> Begin navigates to game.html?campaign=new
  -> Continue navigates to game.html?campaign=continue
  -> no launch command, save identity or expected revision is carried

campaign boot
  -> ignore location.search and campaign query
  -> allocate rings, lanes, pads, camera, input and default mutable state
  -> create six default allied units
  -> publish GameHost
  -> start fixed-step RAF

campaign completion
  -> set won and terminal message
  -> write phantomCommand.save with scene, souls and wave only
  -> swallow storage failure
  -> publish no typed save or bootstrap result

reload or Continue
  -> reconstruct the same default state
  -> do not read or hydrate the saved payload
  -> render a new default first frame
```

## Source-backed findings

```txt
menu save keys probed: 3
probe parses payload: no
probe validates campaign schema: no
probe distinguishes localStorage from sessionStorage ownership: no
campaign query written by menu: yes
campaign query consumed by campaign: no
new-session clearing policy: no
campaign save read: no
campaign hydration: no
save schema/version: no
save migration: no
save fingerprint/checksum: no
atomic candidate hydration: no
save write receipt: no
first restored-frame acknowledgement: no
continue/new semantic fixtures: no
```

### Continue can be enabled by unusable data

`hasCampaignSave()` treats any truthy string under `phantomCommand.save`, `nexus.sceneSnapshot`, or `phantom.command.campaign` in either storage scope as a valid campaign. Malformed JSON, a save for another runtime, or an incomplete payload can mark Continue as `BOUND`.

### New and Continue are behaviorally identical

The menu sends distinct query values, but `campaign-scene.js` never reads `location.search` or `URLSearchParams`. Both paths allocate the same default state, counters, pads, units and camera.

### The victory save is not resumable

The only campaign write persists `{ scene, souls, wave }`. It omits core health, active wave state, spawn queue, units, towers, pad occupancy, projectiles, effects, selection, tower type, camera, IDs, simulation time and terminal provenance.

### Storage truth is not observable

The victory write is wrapped in a silent `try/catch`. The game can show a secured campaign while persistence failed, and the next menu can probe unrelated legacy keys without a typed result identifying which save was admitted.

## Domains in use

```txt
static menu and campaign route shells
menu settings, save-presence projection, selection, fade and navigation
campaign launch intent and route admission
storage capability, save-key registry and save probing
save schema, versioning, migration, validation and fingerprints
new-session bootstrap and continue-session hydration
campaign rings, lanes, pads, units, towers, economy and camera
selection, construction, orders, waves, pause and restart
fixed-step spawning, movement, targeting, damage, rewards and terminal state
procedural graveyard, campaign world, HUD, minimap and CRT presentation
public PhantomMenu and GameHost capabilities
runtime-session and browser-resource lifecycle
source checks, static build, GitHub Pages and audit tracking
```

## Implemented kits and offered services

Implemented source-backed kits: `20`.

```txt
crt-renderer-kit
  -> WebGL compile/link, source upload, containment, curve, grain, fade and draw

graveyard-art-kit
  -> deterministic procedural menu art and source-canvas drawing

menu-route-kit
  -> menu selection, panels, fade and navigation

menu-settings-persistence-kit
  -> settings read/write with fallback defaults

menu-save-presence-kit
  -> multi-key local/session storage presence probe and Continue enablement

menu-audio-kit
  -> AudioContext ambience, UI tones and delayed close

campaign-route-shell-kit
  -> campaign page boot, listeners, navigation and public host publication

pixel-campaign-runtime-kit
  -> mutable campaign state, selection, build, orders, waves, pause, camera and restart

fixed-step-campaign-simulation-kit
  -> spawn, movement, targeting, projectiles, damage, rewards and terminal mutation

pixel-campaign-render-kit
  -> world, HUD, minimap and overlay source rendering

legacy-gamehost-diagnostics-kit
  -> public state snapshot and direct command capabilities

menu-static-check-kit
campaign-static-check-kit
  -> source-token smoke assertions

static-build-copy-kit
  -> deployable static-output copy

pages-deploy-kit
  -> GitHub Pages publication

construct-spiral-intro-kit
construct-spiral-schedule-kit
construct-piece-id-kit
construct-piece-state-kit
construct-sequence-update-kit
  -> deterministic concentric construction sequencing and state
```

## Required authority

```txt
phantom-command-campaign-bootstrap-continue-resume-authority-domain
  -> campaign-launch-intent-kit
  -> campaign-launch-intent-id-kit
  -> campaign-launch-intent-admission-kit
  -> campaign-save-key-registry-kit
  -> campaign-save-probe-result-kit
  -> campaign-save-schema-kit
  -> campaign-save-version-kit
  -> campaign-save-fingerprint-kit
  -> campaign-save-read-result-kit
  -> campaign-save-validation-kit
  -> campaign-save-migration-kit
  -> campaign-save-candidate-kit
  -> campaign-hydration-plan-kit
  -> campaign-hydration-result-kit
  -> campaign-new-session-bootstrap-kit
  -> campaign-continue-session-bootstrap-kit
  -> campaign-bootstrap-command-kit
  -> campaign-bootstrap-result-kit
  -> campaign-bootstrap-revision-kit
  -> stale-campaign-bootstrap-rejection-kit
  -> campaign-bootstrap-journal-kit
  -> campaign-visible-frame-ack-kit
  -> campaign-save-browser-fixture-kit
  -> campaign-continue-browser-fixture-kit
  -> campaign-invalid-save-fixture-kit
  -> campaign-pages-resume-smoke-kit
```

## Required transaction

```txt
menu save probe
  -> enumerate owned save keys
  -> read bytes with storage-scope identity
  -> parse and validate schema/version
  -> return typed probe result
  -> enable Continue only for one admissible campaign

New
  -> admit launch intent
  -> define save-retention or clearing policy
  -> build detached default candidate
  -> validate complete state graph
  -> commit one bootstrap revision
  -> acknowledge first visible new-campaign frame

Continue
  -> admit launch intent plus selected save identity
  -> read, fingerprint, migrate and validate
  -> build detached hydrated candidate graph
  -> reject partial or stale payloads
  -> atomically commit one bootstrap revision
  -> acknowledge first visible restored frame
```

## Required proof

```txt
Begin and Continue produce distinct typed bootstrap results
malformed or foreign payloads cannot enable Continue
valid save probe identifies one key, scope, schema, version and fingerprint
continue restores complete campaign state, IDs and camera atomically
failed hydration leaves the default/live graph untouched
new-session policy for predecessor saves is explicit
storage failure cannot be reported as a successful save
first canvas, HUD and GameHost snapshot cite the committed bootstrap revision
local, built and Pages fixtures produce equivalent results
```

## Validation boundary

Documentation only. Runtime, menu, campaign, save behavior, input, simulation, rendering, audio, package scripts, dependencies and deployment were not changed. Existing static checks do not execute launch-intent or hydration semantics.