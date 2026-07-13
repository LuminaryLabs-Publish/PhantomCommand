# PhantomCommand Current Audit

**Timestamp:** `2026-07-12T22-05-12-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Status:** `campaign-bootstrap-resume-authority-audited`

## Summary

The menu enables Continue when any of three browser-storage keys contains a truthy string and navigates to `game.html?campaign=continue`. The campaign module never parses that intent or reads a checkpoint; it always constructs the same fresh defaults. The only writer stores a final-victory marker containing `scene`, `souls` and `wave`, not a resumable campaign state.

## Plan ledger

**Goal:** admit New or Continue through one typed bootstrap command, build a complete detached candidate, validate every participant and install one run generation atomically before simulation or rendering begins.

- [x] Compare all eligible Publish repositories and select only `PhantomCommand`.
- [x] Inspect menu storage, route, campaign bootstrap, save writer, reload, render and check paths.
- [x] Identify the complete interaction loop and all active and missing domains.
- [x] Preserve all 20 implemented kits and offered services.
- [x] Define intent, checkpoint, hydration, validation, commit, rollback and frame-proof boundaries.
- [x] Add the timestamped tracker and system audits.
- [x] Preserve the `22-00-46` keyboard-admission audit family.
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
  -> read menu settings
  -> scan phantomCommand.save, nexus.sceneSnapshot and phantom.command.campaign
  -> any truthy localStorage/sessionStorage string enables Continue

menu action
  -> New routes to game.html?campaign=new
  -> Continue routes to game.html?campaign=continue
  -> fade completes and location.href changes

campaign module evaluation
  -> create source canvas and CRT renderer
  -> create rings, pads, archetypes and waves
  -> create camera defaults and mutable state
  -> create six starting allies
  -> attach pointer, wheel, keyboard and blur listeners
  -> expose window.GameHost
  -> start recursive RAF

missing bootstrap work
  -> no location.search or URLSearchParams parse
  -> no campaign entry-intent admission
  -> no read of any campaign save key
  -> no checkpoint parse, migration or hydration
  -> no candidate validation or atomic installation

terminal victory
  -> write phantomCommand.save = { scene, souls, wave }
  -> omit nearly all campaign participants
  -> menu later advertises Continue from string presence
  -> Continue still installs fresh defaults
```

## Source-backed findings

```txt
Continue keys scanned: 3
raw truthiness used as validity: yes
route differentiates new/continue: query string only
campaign parses query: no
campaign reads checkpoint: no
initial souls/core/wave: 145 / 24 / 0
initial starting allies: 6
victory save fields: scene, souls, wave
checkpoint schema/version/checksum: no
migration registry: no
participant manifest: no
atomic bootstrap commit/rollback: no
run/checkpoint generation: no
first visible bootstrap-result frame acknowledgement: no
```

### Continue is presentation-only

The menu has distinct labels and URLs, but the runtime path converges on the same module-level construction. A valid checkpoint, malformed JSON, a foreign `nexus.sceneSnapshot`, an unsupported version and an empty compatible state all lack typed classification.

### Save presence is not save compatibility

`hasCampaignSave()` does not parse or validate the stored value. Any non-empty string under any accepted key can enable Continue. No canonical slot, schema, checksum, source fingerprint or migration policy exists.

### The victory record is not resumable

The three-field output omits:

```txt
run/checkpoint identity and revision
campaign time and fixed-step boundary
core, waveActive and spawn queue
units, HP, targets, movement and IDs
towers, cooldowns and pad occupancy
projectiles and effects
uid, pid and tid counters
selection, selected pad and tower type
camera state
pause, win, loss and message
source/content fingerprint
```

### No typed bootstrap failure exists

Continue cannot report Missing, Malformed, Unsupported, Incompatible, InvariantFailed, Stale, Duplicate or RolledBack. The current behavior silently creates a fresh campaign, making failure look like success.

### Static proof gap

The campaign checker asserts source tokens. It does not execute route intent, storage reads, full-state roundtrips, migration, hydration, rollback or visible-frame correlation.

## Domains in use

```txt
menu and campaign route shells
menu settings, save presence, panels, fade, navigation and audio
browser document, canvas and hidden accessibility surfaces
campaign entry intent and route query
browser storage slot discovery and checkpoint compatibility
checkpoint schema, version, checksum, migration and source fingerprint
campaign run/checkpoint identity and generations
campaign participant registry, candidate state and hydration
cross-participant validation, atomic commit, rollback and retirement
CRT aspect containment, curvature, aberration, grain, vignette and fade
browser keyboard, pointer, wheel, blur and context-menu input
campaign phase, pause, restart and terminal outcomes
camera pan, focus and zoom
selection, selected-pad state, building and orders
economy, tower type, pad occupancy and construction
wave phase, spawn queue and progression
fixed-step spawning, movement, targeting, combat, projectiles, damage and rewards
world, HUD, minimap and terminal rendering
public GameHost commands and readback
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
keyboard, pointer, wheel and hidden-control activation
AudioContext ambience, UI tones and delayed close
campaign state, selection, building, orders, waves, pause, camera and restart
fixed-step spawning, movement, targeting, projectiles, damage, rewards and terminal mutation
world, HUD, minimap and overlay rendering
minimal victory-marker persistence
public snapshots and direct mutation capabilities
construction intro scheduling and piece-state updates
source checks, static build and GitHub Pages deployment
```

## Required authority

```txt
phantom-command-campaign-bootstrap-resume-authority-domain
```

### Required transaction

```txt
CampaignEntryIntent(new | continue)
  -> route, runtime-session and command admission
  -> allocate candidate run generation

new
  -> construct all participants from one authored NewRunPreset

continue
  -> resolve canonical slot and typed read result
  -> validate envelope schema, version, checksum and source compatibility
  -> migrate only through an explicit registry
  -> hydrate all declared participants into detached candidate state

candidate
  -> validate identities, references, balances, wave phase, pad occupancy,
     camera, selection and deterministic step boundary
  -> atomically install every participant or preserve predecessor
  -> retire predecessor generation exactly once
  -> publish one terminal CampaignBootstrapResult
  -> reject unavailable, malformed, unsupported, stale or duplicate input with zero mutation
  -> acknowledge the first visible world/HUD/minimap/CRT frame citing the result
```

## Candidate kits

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

## Current output

```txt
.agent/trackers/2026-07-12T22-05-12-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-12T22-05-12-04-00.md
.agent/architecture-audit/2026-07-12T22-05-12-04-00-campaign-bootstrap-resume-authority-dsk-map.md
.agent/render-audit/2026-07-12T22-05-12-04-00-continue-visible-frame-provenance-gap.md
.agent/gameplay-audit/2026-07-12T22-05-12-04-00-continue-starts-fresh-campaign-loop.md
.agent/interaction-audit/2026-07-12T22-05-12-04-00-new-continue-bootstrap-admission-map.md
.agent/campaign-resume-audit/2026-07-12T22-05-12-04-00-checkpoint-schema-hydration-commit-contract.md
.agent/deploy-audit/2026-07-12T22-05-12-04-00-campaign-resume-fixture-gate.md
```

Retained predecessor:

```txt
.agent/trackers/2026-07-12T22-00-46-04-00/project-breakdown.md
  -> Campaign Keyboard Command Admission Authority
```

## Validation boundary

Documentation only. Runtime, menu, campaign, checkpoint, storage, input, rendering, package scripts, dependencies and deployment were not changed. No executable New/Continue, checkpoint, browser or Pages fixture was run.