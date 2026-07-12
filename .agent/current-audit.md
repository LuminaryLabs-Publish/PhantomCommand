# PhantomCommand Current Audit

**Timestamp:** `2026-07-11T21-31-19-04-00`

## Summary

The menu and campaign disagree about what Continue means. The menu scans `phantomCommand.save`, `nexus.sceneSnapshot` and `phantom.command.campaign` in both `localStorage` and `sessionStorage`. Any non-empty value enables Continue. The selected action emits `game.html?campaign=continue`, but the campaign never parses the query, never reads storage and immediately constructs its default state. The visible result is a fresh campaign presented as a resume.

## Plan ledger

**Goal:** define one typed authority from raw save discovery through candidate selection, validation, migration, atomic hydration and first resumed-frame proof.

- [x] Compare the current Publish inventory with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `PhantomCommand`.
- [x] Inspect menu save keys, presence checks and route targets.
- [x] Inspect campaign default construction, persistence write and public host.
- [x] Inventory domains, kits and offered services.
- [x] Define Continue and checkpoint admission contracts.
- [ ] Implement and execute the documented fixtures.

## Selection audit

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

PhantomCommand     2026-07-11T19-48-09-04-00 selected oldest
ZombieOrchard      2026-07-11T20-03-22-04-00
TheUnmappedHouse   2026-07-11T20-11-26-04-00
AetherVale         2026-07-11T20-30-33-04-00
IntoTheMeadow      2026-07-11T20-38-07-04-00
MyCozyIsland       2026-07-11T20-51-14-04-00
PrehistoricRush    2026-07-11T21-00-00-04-00
TheOpenAbove       2026-07-11T21-08-57-04-00
HorrorCorridor     2026-07-11T21-21-12-04-00
TheCavalryOfRome   excluded
```

## Complete interaction loop

```txt
menu startup
  -> define three accepted save keys
  -> read localStorage and sessionStorage
  -> treat any truthy value as a campaign save
  -> enable CONTINUE and display BOUND

Begin Campaign
  -> navigate to game.html?campaign=new

Continue
  -> navigate to game.html?campaign=continue

campaign startup
  -> does not parse the campaign query
  -> does not read any save candidate
  -> creates the same default camera, IDs, units and mutable state
  -> starts the same fixed-step and render loop

campaign completion
  -> writes one partial localStorage summary
  -> { scene, souls, wave }

reload or return to menu
  -> no checkpoint admission, hydration result or resumed-frame receipt
```

## Source-backed defects

### Presence is treated as resumability

The menu calls `hasCampaignSave()` twice while constructing the menu. The result is only a Boolean from `localStorage.getItem(key) || sessionStorage.getItem(key)`. The candidate bytes are not parsed, classified or retained.

### Candidate keys have no precedence or ownership rule

Three keys can independently enable Continue:

```txt
phantomCommand.save
nexus.sceneSnapshot
phantom.command.campaign
```

There is no rule for multiple candidates, storage-scope preference, newest revision, game identity, content identity or legacy migration.

### Continue route intent is discarded

The menu emits:

```txt
game.html?campaign=continue
```

The campaign module does not parse `location.search` or `URLSearchParams`. It allocates IDs, camera, starting units and the default campaign state immediately.

### Current save is not a checkpoint

The only write stores:

```json
{"scene":"grave-ring","souls":<number>,"wave":<number>}
```

It does not include a schema version, campaign identity, content revision, checkpoint kind, state fingerprint, core health, towers, pad occupancy, player units, spawn queue, projectiles, camera, IDs, run epoch or terminal result.

### Session and local storage semantics diverge

A value found only in `sessionStorage` enables Continue, while the current writer writes only to `localStorage`. The runtime has no source receipt indicating which scope or key was selected.

### Invalid candidates are silently actionable

Malformed JSON, stale foreign data and legacy summaries all remain truthy. Continue can therefore be enabled even when no resumable state exists.

## Domains in use

```txt
static route and page shell
menu selection, panels, settings, audio and fade transition
save-key discovery and Continue capability projection
procedural graveyard art and source-canvas presentation
CRT WebGL setup, contain mapping, upload, resize and draw
campaign route intent and startup admission
campaign rings, lanes, pads, archetypes, waves, economy and core health
selection, construction, orders, pause, camera and fixed-step simulation
unit, tower, projectile, combat, rewards and terminal mutation
world, HUD, minimap, overlay and GameHost projection
checkpoint schema, version, content identity and candidate precedence: missing
checkpoint migration, semantic validation and quarantine: missing
new-campaign versus resume admission and atomic hydration: missing
resumed-state provenance and first resumed-frame acknowledgement: missing
runtime session lifecycle, validation, static build, Pages deployment and central tracking
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
menu routing, fade and hidden-button activation
settings persistence
raw save-presence scanning across three keys and two storage scopes
procedural graveyard source-canvas drawing
AudioContext ambience and UI tones
CRT WebGL creation, containment mapping, texture upload and rendering
campaign content and default-state construction
selection, building, orders, wave start, pause and camera control
fixed-step spawning, AI, movement, targeting, damage, rewards and terminal mutation
world, HUD, minimap and terminal overlay rendering
mutable GameHost observation and zoom control
source-pattern checks, static build and GitHub Pages deployment
```

## Required parent domain

```txt
phantom-command-continue-checkpoint-admission-authority-domain
```

Candidate kits:

```txt
phantom-command-campaign-route-intent-kit
phantom-command-save-key-registry-kit
phantom-command-save-candidate-read-kit
phantom-command-save-envelope-version-kit
phantom-command-save-content-identity-kit
phantom-command-save-candidate-classification-kit
phantom-command-save-candidate-precedence-kit
phantom-command-save-schema-validator-kit
phantom-command-save-semantic-validator-kit
phantom-command-save-migration-registry-kit
phantom-command-corrupt-save-quarantine-kit
phantom-command-continue-capability-result-kit
phantom-command-new-campaign-admission-kit
phantom-command-resume-admission-kit
phantom-command-checkpoint-kind-policy-kit
phantom-command-checkpoint-fingerprint-kit
phantom-command-atomic-campaign-hydration-kit
phantom-command-resume-result-kit
phantom-command-first-resumed-frame-kit
phantom-command-resume-observation-kit
phantom-command-resume-journal-kit
phantom-command-save-candidate-fixture-kit
phantom-command-continue-route-fixture-kit
phantom-command-resume-first-frame-fixture-kit
```

## Candidate classification

```txt
RESUMABLE
LEGACY_TERMINAL_SUMMARY
REJECTED_MALFORMED
REJECTED_UNSUPPORTED_VERSION
REJECTED_WRONG_GAME
REJECTED_WRONG_CONTENT
REJECTED_SEMANTIC_STATE
REJECTED_AMBIGUOUS
UNAVAILABLE
```

Only `RESUMABLE` may enable Continue. A legacy victory summary may be preserved or migrated into completion metadata, but it must not be presented as a resumable active campaign.

## Required transaction

```txt
ResolveContinueCapability
  -> read exact raw candidates without mutation
  -> attach key and storage-scope provenance
  -> parse detached envelopes
  -> validate version, game and content identity
  -> migrate known versions
  -> structurally and semantically validate payloads
  -> apply deterministic candidate precedence
  -> publish ContinueCapabilityResult

StartCampaign(routeIntent, expectedCandidateId)
  -> admit NEW or RESUME
  -> reject stale candidate selection
  -> stage a complete candidate campaign graph
  -> rebuild references and derived indexes
  -> validate staged state
  -> atomically commit a new run epoch
  -> render one candidate frame
  -> acknowledge the first visible frame
  -> publish CampaignStartResult
```

## Required invariants

```txt
Continue is enabled only for one selected RESUMABLE candidate
raw rejected bytes are never overwritten during discovery
NEW never hydrates a checkpoint
RESUME never falls back silently to a fresh campaign
candidate key, storage scope, version and fingerprint remain observable
atomic hydration publishes either a complete campaign or no campaign
first resumed frame includes candidateId, checkpointFingerprint, runEpoch and frameId
all resume consumers observe the same committed checkpoint revision
```

## Validation boundary

Documentation only. Runtime, persistence, gameplay, rendering, package scripts and deployment were not changed.
