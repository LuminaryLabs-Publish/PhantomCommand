# Project Breakdown: PhantomCommand Continue and Checkpoint Admission

**Timestamp:** `2026-07-11T21-31-19-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Branch:** `main`

## Summary

PhantomCommand exposes Continue from raw storage presence, but the campaign ignores the Continue route and always constructs a fresh default run. The current save is a partial victory summary, not a resumable checkpoint. This audit defines the authority boundary needed to select, validate, migrate and atomically hydrate one checkpoint before acknowledging a resumed frame.

## Plan ledger

**Goal:** document the complete product loop, domains, kits and services, then define one trustworthy Continue and resume transaction.

- [x] Compare the complete Publish inventory with the central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all eligible repositories have root `.agent` state.
- [x] Select only `PhantomCommand`.
- [x] Read `index.html`, `game.html`, `src/menu/graveyard-menu.js` and `src/campaign/campaign-scene.js`.
- [x] Identify the interaction loop.
- [x] Identify all domains in use.
- [x] Identify all implemented kits and offered services.
- [x] Define candidate resolution, resume admission and first-frame fixtures.
- [x] Refresh required root `.agent` files.
- [x] Add timestamped audit files.
- [ ] Runtime implementation remains future work.

## Selection

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

Only `LuminaryLabs-Publish/PhantomCommand` is in scope for Publish changes.

## Interaction loop

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

## Domains

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

## Main finding

```txt
raw storage presence
  -> false Continue capability
  -> ignored campaign=continue intent
  -> fresh default run
```

The menu accepts any non-empty bytes across three keys and two storage scopes. It does not return a selected candidate or preserve source provenance. The campaign does not consume the route or storage. The current victory writer emits only a partial summary and cannot restore a campaign graph.

## Required domain

```txt
phantom-command-continue-checkpoint-admission-authority-domain
```

## Candidate kits

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

## Required proof

```txt
Continue is disabled without one RESUMABLE candidate
malformed and foreign candidates are rejected without mutation
multiple candidates resolve through deterministic precedence
legacy terminal summaries remain non-resumable
NEW never hydrates storage
RESUME never silently falls back to NEW
hydration is staged and atomic
derived references and IDs are rebuilt and validated
first visible frame matches checkpoint fingerprint and run epoch
```

## Validation

Documentation only. No runtime, persistence, gameplay, rendering or deployment behavior changed.
