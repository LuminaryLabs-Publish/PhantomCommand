# PhantomCommand Current Audit

**Timestamp:** `2026-07-12T13-59-50-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`

## Summary

The current audit isolates Campaign Bootstrap and Continue Resume Authority. `graveyard-menu.js` enables Continue when any configured local or session storage key contains any truthy string and navigates to `game.html?campaign=continue`. `campaign-scene.js` never consumes the query, never reads a save and always constructs the same default campaign. The only campaign writer runs after victory and stores an incomplete unversioned payload.

## Plan ledger

**Goal:** make menu save admission, New/Continue launch, complete campaign construction and the first visible frame one typed, revisioned transaction.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central and root `.agent` coverage.
- [x] Select only `PhantomCommand` as the oldest eligible central-ledger entry.
- [x] Inspect save keys, storage scopes, launch URLs, default construction, victory persistence and checks.
- [x] Identify the complete interaction loop, domains, 20 implemented kits and offered services.
- [x] Define save probing, schema/versioning, migration, candidate hydration, bootstrap results and frame receipts.
- [x] Change documentation only on `main`.
- [ ] Implement and execute the authority.

## Selection state

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new/ledger-missing/root-agent-missing eligible repositories: 0
selected repository: LuminaryLabs-Publish/PhantomCommand
selection reason: oldest eligible central ledger and highest queued unimplemented authority
prior central timestamp: 2026-07-12T11-48-43-04-00
excluded repository: LuminaryLabs-Publish/TheCavalryOfRome
```

## Complete interaction loop

```txt
menu startup
  -> read menu settings
  -> probe phantomCommand.save, nexus.sceneSnapshot and phantom.command.campaign
  -> check both localStorage and sessionStorage
  -> enable Continue for any truthy bytes
  -> retain no matched key, scope, version or fingerprint

menu launch
  -> Begin emits game.html?campaign=new
  -> Continue emits game.html?campaign=continue
  -> transition fades and navigates

campaign startup
  -> ignore URL query
  -> allocate rings, lanes, pads, camera, input and default state
  -> initialize souls=145, core=24, wave=0
  -> create six default allied units and fresh ID counters
  -> publish GameHost and start RAF

campaign victory
  -> set won and terminal message
  -> write phantomCommand.save with scene, souls and wave only
  -> swallow storage failure

resume attempt
  -> read no save
  -> perform no migration or hydration
  -> render default source canvas and CRT frame
```

## Source-backed findings

```txt
save keys probed: 3
storage scopes probed: 2
matched key/scope retained: no
payload parsed by menu: no
campaign compatibility validated: no
launch query emitted: yes
launch query consumed: no
save read by campaign: no
save payload complete: no
schema/version/fingerprint: no
migration policy: no
candidate graph: no
atomic hydration: no
save write receipt: no
bootstrap revision: no
visible restored-frame acknowledgement: no
resume fixtures: no
```

### Save presence is not save admissibility

`hasCampaignSave()` returns true for any truthy value under any configured key in either storage scope. Malformed JSON, unrelated legacy state or an incomplete payload can mark Continue as `BOUND`.

### New and Continue are the same runtime path

The campaign module never reads `location.search`, `URLSearchParams` or a launch command. Both menu choices create the same default state, entities, camera and counters.

### The victory payload cannot reconstruct the campaign

The write omits core health, active-wave state, spawn queue, units, towers, pad occupancy, projectiles, selection, camera, simulation time, phases and next-ID counters.

### Storage success is not reported

The victory write is wrapped in a silent `try/catch`. The UI and future menu receive no typed result indicating whether bytes were committed or which save is valid.

## Domains in use

```txt
static menu and campaign route shells
menu settings, save presence, selection, panels, fade and navigation
campaign launch intent and route admission
browser storage capability, key ownership and scope selection
save schema, version, fingerprint, validation and migration
new-session default candidate construction
continue-session candidate hydration and atomic commit
campaign rings, lanes, pads, units, towers, economy and camera
selection, build, orders, waves, pause and restart
fixed-step spawning, movement, targeting, projectiles, damage, rewards and terminal state
procedural graveyard and campaign world/HUD/minimap rendering
CRT WebGL presentation and visible-frame acknowledgement
public PhantomMenu and GameHost capabilities
runtime-session and browser-resource lifecycle
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
menu routing, selection, panels, settings persistence, save-presence scanning, fade and hidden-button activation
pointer, keyboard, wheel, drag, focus and route interactions
procedural graveyard and campaign source rendering
WebGL compile/link, buffer/texture upload, containment, curve, grain, fade and draw
AudioContext ambience, UI tones and delayed close
campaign state, selection, building, orders, waves, pause, camera, restart and navigation
fixed-step spawning, movement, targeting, projectiles, damage, rewards and terminal mutation
public state snapshots and direct mutation capabilities
construction intro sequencing
source checks, static build and GitHub Pages deployment
```

## Required parent domain

```txt
phantom-command-campaign-bootstrap-continue-resume-authority-domain
```

## Candidate kits

```txt
campaign-launch-intent-kit
campaign-launch-intent-id-kit
campaign-launch-intent-admission-kit
campaign-save-key-registry-kit
campaign-save-probe-result-kit
campaign-save-schema-kit
campaign-save-version-kit
campaign-save-fingerprint-kit
campaign-save-read-result-kit
campaign-save-validation-kit
campaign-save-migration-kit
campaign-save-candidate-kit
campaign-hydration-plan-kit
campaign-hydration-result-kit
campaign-new-session-bootstrap-kit
campaign-continue-session-bootstrap-kit
campaign-bootstrap-command-kit
campaign-bootstrap-result-kit
campaign-bootstrap-revision-kit
stale-campaign-bootstrap-rejection-kit
campaign-bootstrap-journal-kit
campaign-visible-frame-ack-kit
campaign-save-browser-fixture-kit
campaign-continue-browser-fixture-kit
campaign-invalid-save-fixture-kit
campaign-pages-resume-smoke-kit
```

## Required invariants

```txt
Storage presence never equals save validity.
New and Continue return distinct typed results.
Every admitted save identifies one key, scope, schema, version and fingerprint.
Hydration constructs and validates a detached candidate before live mutation.
Failed hydration leaves the live/default graph untouched.
IDs and references remain valid after resume and subsequent ticks.
The first canvas, HUD and GameHost read model acknowledge one bootstrap revision.
```

## Retained dependencies

```txt
Versioned Full Campaign Checkpoint Capture Authority
Runtime Session Resource Lifecycle Authority
Fixed-Step Scheduling Replay and Committed Frames
CRT Display/Input Projection Authority
Public Host Committed Read Model
Campaign Phase and Action Result Authorities
```

## Validation boundary

Documentation only. Runtime, menu, campaign, persistence, input, camera, simulation, rendering, audio, package scripts, dependencies and deployment were not changed.