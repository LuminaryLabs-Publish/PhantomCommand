# Campaign Bootstrap and Continue Resume Authority DSK Map

**Timestamp:** `2026-07-12T13-59-50-04-00`

## Summary

The menu, storage probe, campaign constructor, save writer, renderer and public host currently form an implicit bootstrap pipeline. They need one composed authority that decides whether the route is New or Continue, validates the selected save, constructs a detached candidate, commits it atomically and correlates the first visible frame.

## Plan ledger

**Goal:** define the bounded domain and service-kit composition required for deterministic New and Continue startup.

- [x] Identify existing owners.
- [x] Separate save presence from save admissibility.
- [x] Define launch, read, migration, candidate, hydration, commit and frame-result services.
- [x] Preserve runtime lifecycle, checkpoint and fixed-step authorities as dependencies.
- [ ] Implement the composition.

## Parent domain

```txt
phantom-command-campaign-bootstrap-continue-resume-authority-domain
```

### Domain owns

```txt
launch intent identity and admission
save-key ownership and storage-scope selection
save schema, version and fingerprint
parse, validation and migration results
detached new-session and hydrated candidate construction
atomic bootstrap commit and revision
stale bootstrap rejection
bootstrap observations and journal
first visible campaign-frame acknowledgement
```

### Domain does not own

```txt
menu visual styling
campaign combat rules
CRT shader implementation
runtime resource retirement
full checkpoint capture policy
GitHub Pages infrastructure
```

## Existing owners to update

```txt
menu-save-presence-kit
menu-route-kit
campaign-route-shell-kit
pixel-campaign-runtime-kit
fixed-step-campaign-simulation-kit
pixel-campaign-render-kit
legacy-gamehost-diagnostics-kit
menu-static-check-kit
campaign-static-check-kit
static-build-copy-kit
pages-deploy-kit
src/menu/graveyard-menu.js
src/campaign/campaign-scene.js
window.PhantomMenu
window.GameHost
```

## Coordinating kits

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

## Service contracts

### Launch intent

```txt
CampaignLaunchIntent
  intentId
  mode: New | Continue
  selectedSaveKey
  selectedStorageScope
  expectedSaveFingerprint
  requestedAtMs
```

### Save probe

```txt
CampaignSaveProbeResult
  status: Admissible | Missing | Malformed | Foreign | UnsupportedVersion | StorageUnavailable
  saveKey
  storageScope
  schema
  version
  fingerprint
  summary
  reason
```

### Bootstrap command

```txt
CampaignBootstrapCommand
  commandId
  launchIntent
  expectedRuntimeGeneration
  expectedPredecessorBootstrapRevision
```

### Bootstrap result

```txt
CampaignBootstrapResult
  status: CommittedNew | CommittedContinue | RejectedInvalidSave | RejectedStale | FailedCandidate | FailedCommit
  bootstrapRevision
  runtimeGeneration
  saveFingerprint
  migratedFromVersion
  stateFingerprint
  firstFrameReceiptId
  reason
```

## Candidate graph

A Continue candidate must reconstruct at minimum:

```txt
simulation time
souls and core health
wave index and active state
spawn queue
units and stable IDs
towers and stable IDs
pad occupancy
projectiles and stable IDs
effects or explicit transient-drop policy
selection and selected pad
tower type
camera position, velocity and zoom
paused/won/lost phase
message or derived projection state
next unit/projectile/tower IDs
```

The candidate remains detached until schema, referential integrity, numeric bounds, ID uniqueness, pad/tower relationships, phase legality and content compatibility all pass.

## Dependency map

```txt
Versioned Full Campaign Checkpoint Capture Authority
  -> produces complete versioned payloads

Campaign Bootstrap and Continue Resume Authority
  -> probes, validates, migrates, hydrates and commits

Runtime Session Resource Lifecycle Authority
  -> provides route/runtime generation and retirement fence

Fixed-Step Scheduling and Committed Frames Authority
  -> resumes from a committed simulation boundary

CRT Display/Input Projection Authority
  -> presents and acknowledges the first restored frame

Public Host Committed Read Model
  -> exposes bootstrap revision and immutable restored snapshot
```

## Required invariants

```txt
Presence is never treated as validity.
New and Continue produce distinct typed results.
Continue never mutates the live graph before candidate validation succeeds.
A failed Continue cannot partially hydrate state.
Every admitted save has one schema, version and fingerprint.
Legacy keys require explicit adapters or are rejected as foreign.
IDs remain unique after hydration and subsequent simulation.
The first visible canvas, HUD and public read model cite one bootstrap revision.
```

## Completion boundary

Do not claim Continue support because the menu item is enabled or the query string exists. Completion requires complete save capture, typed probing, atomic hydration, migration policy, stale-result rejection and visible-frame proof in local, built and deployed environments.