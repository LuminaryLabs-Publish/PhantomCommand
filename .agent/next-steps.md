# PhantomCommand Next Steps

**Timestamp:** `2026-07-12T13-59-50-04-00`

## Goal

Implement one Campaign Bootstrap and Continue Resume Authority so the menu admits only valid saves, New and Continue are distinct transactions, hydration is atomic, and the first visible frame proves which bootstrap revision was committed.

## Plan ledger

- [ ] Replace boolean save presence with typed `CampaignSaveProbeResult`.
- [ ] Define one owned primary save key and explicit legacy adapters.
- [ ] Separate localStorage and sessionStorage policies.
- [ ] Add campaign save schema, version, content fingerprint and state fingerprint.
- [ ] Capture the complete campaign graph at a committed fixed-step boundary.
- [ ] Parse and validate the `campaign` launch intent before constructing live state.
- [ ] Add `CampaignBootstrapCommand` and typed terminal result.
- [ ] Build New and Continue candidates off to the side.
- [ ] Validate unit/tower/projectile IDs and all references before commit.
- [ ] Preserve or explicitly reset camera, selection, pause and transient effects by policy.
- [ ] Make candidate commit atomic and stale-generation aware.
- [ ] Add migration or quarantine for existing keys and minimal victory payloads.
- [ ] Return typed save-write receipts instead of swallowing storage failures.
- [ ] Expose bootstrap revision and immutable state fingerprint through GameHost.
- [ ] Correlate source canvas, HUD, minimap and CRT frame with the bootstrap revision.
- [ ] Add local, built and Pages New/Continue fixtures.
- [ ] Add malformed, foreign, unsupported, unavailable-storage and failed-hydration fixtures.
- [ ] Run `npm run check` and `npm run build` after fixture wiring.

## Existing owners to update

```txt
src/menu/graveyard-menu.js
src/campaign/campaign-scene.js
menu-save-presence-kit
menu-route-kit
campaign-route-shell-kit
pixel-campaign-runtime-kit
fixed-step-campaign-simulation-kit
pixel-campaign-render-kit
legacy-gamehost-diagnostics-kit
menu-static-check-kit
campaign-static-check-kit
package.json
window.PhantomMenu
window.GameHost
```

## Save-probe contract

```txt
CampaignSaveProbeCommand
  commandId
  candidateKeys
  allowedStorageScopes
  expectedSchema
  supportedVersions

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

## Bootstrap contract

```txt
CampaignBootstrapCommand
  commandId
  launchIntentId
  mode: New | Continue
  selectedSaveKey
  selectedStorageScope
  expectedSaveFingerprint
  expectedRuntimeGeneration
  expectedPredecessorBootstrapRevision

CampaignBootstrapResult
  status: CommittedNew | CommittedContinue | RejectedInvalidSave | RejectedStale | FailedCandidate | FailedCommit
  bootstrapRevision
  runtimeGeneration
  stateFingerprint
  saveFingerprint
  migratedFromVersion
  firstFrameReceiptId
  reason
```

## Required save envelope

```txt
schema
version
saveId
createdAtMs
updatedAtMs
contentFingerprint
committedTick
bootstrapRevision
stateFingerprint
payload
```

## Required campaign payload

```txt
phase and simulation time
souls and sanctum core
wave, waveActive and spawn queue
units, targets, movement and cooldowns
towers, pad occupancy and cooldowns
projectiles and target references
selection, selected pad and tower type
camera state
next unit/projectile/tower IDs
explicit transient-effect policy
```

## Fixture gate

```txt
Continue disabled for malformed or foreign saves
valid current save produces CommittedContinue
valid legacy save produces migration receipt
invalid hydration performs zero live mutation
New applies an explicit predecessor-save policy
resumed IDs remain unique after new spawns/builds
HUD and GameHost match the hydrated state fingerprint
first CRT-presented frame cites the bootstrap revision
local, built and Pages results match
```

## Dependency order

```txt
Versioned Full Campaign Checkpoint Capture Authority
  -> Campaign Bootstrap and Continue Resume Authority
  -> Fixed-Step Committed Frames
  -> CRT Display/Input Projection Authority
  -> Public Host Committed Read Model
```

Do not implement Continue as best-effort mutation of the live `state` object. Hydrate and validate a complete detached candidate, then commit once.