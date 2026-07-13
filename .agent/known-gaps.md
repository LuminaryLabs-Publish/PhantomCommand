# PhantomCommand Known Gaps

**Timestamp:** `2026-07-12T22-05-12-04-00`

## Summary

The leading persistence gap is Campaign Bootstrap and Continue Resume Authority. Continue is enabled from unvalidated string presence, but campaign boot ignores route intent and storage, always starts fresh, and has no complete checkpoint, migration, atomic installation, typed result or visible-generation proof.

## Plan ledger

**Goal:** close entry-intent, checkpoint, participant, commit and proof gaps while preserving the keyboard, spatial-input, campaign-action and runtime-lifecycle boundaries.

- [x] Record New/Continue route and storage-admission gaps.
- [x] Record checkpoint schema and participant-coverage gaps.
- [x] Record hydration, validation and atomic-commit gaps.
- [x] Record result, diagnostics and visible-frame gaps.
- [x] Record browser, build and Pages proof gaps.
- [x] Preserve the concurrent keyboard-admission audit.
- [ ] Implement in dependency order.

## Entry and availability gaps

```txt
CampaignEntryIntent parser
bootstrap command ID and route revision
canonical save slot
legacy-key import policy
validated ContinueAvailabilityResult
typed missing/malformed/unsupported/incompatible feedback
zero-mutation failure route
```

## Checkpoint identity and compatibility gaps

```txt
checkpoint schema and version
checkpoint/run ID and generation
checkpoint revision
checksum
state fingerprint
source and authored-content fingerprint
migration registry
typed storage read/write receipt
```

## Participant gaps

```txt
campaign time and fixed-step boundary
souls and core
wave, waveActive and spawn queue
units and all runtime fields
towers and cooldowns
pad occupancy
projectiles and effects policy
uid, pid and tid counters
selection and selected pad
tower type
camera state
pause, win, loss and message
participant manifest and reset policy
```

## Candidate and commit gaps

```txt
detached fresh candidate
detached restored candidate
per-participant validation
cross-reference validation
atomic multi-participant install
verified rollback
predecessor retirement
stale and duplicate command rejection
one terminal CampaignBootstrapResult
```

## Concrete current risks

```txt
Continue always starts a fresh campaign
malformed JSON can enable Continue
foreign nexus.sceneSnapshot data can enable Continue
unsupported versions cannot be classified
partial three-field victory records look resumable to the menu
checkpoint load failure silently impersonates New
ID and cross-reference corruption would have no admission gate
rendered fresh state can be mistaken for successful restoration
```

## Result and render gaps

```txt
CampaignBootstrapCommand
CampaignBootstrapResult
ContinueAvailabilityResult
participant install receipts
bounded bootstrap observations and journal
run/checkpoint generation in render snapshots
world/HUD/minimap/CRT generation parity
first visible bootstrap-result frame acknowledgement
stale result/frame rejection
```

## Test gaps

```txt
fresh preset fingerprint
full checkpoint roundtrip
non-default economy/wave/entity/camera restore
missing slot
malformed JSON
wrong schema and unsupported version
checksum/source fingerprint mismatch
missing participant and broken reference
ID counter collision
commit failure and rollback
stale/duplicate bootstrap
first visible restored frame
source/build/Pages parity
```

## Retained input and action gaps

```txt
Campaign Keyboard Command Admission Authority
Campaign Action Result Authority
Campaign Spatial Input Admission Authority
Menu Pointer-Hit Admission Authority
Public Host Owner Quarantine and Typed Command Admission
CRT Display/Input Projection Authority
Campaign Phase Admission Authority
Fixed-Step Command Scheduling Replay and Committed Frame Authority
Public Host Committed Read Model
Combat Resolution and Entity Liveness Authority
Exclusive Terminal Outcome Transaction
```

## Retained lifecycle/product gaps

```txt
Runtime Session Resource Lifecycle Authority
Versioned Full Campaign Checkpoint Capture Authority
Menu Audio Activation and Lifecycle Authority
WebGL context loss/restore and disposal
complete campaign replay
source/build/Pages production proof
```

## Completion boundary

An enabled Continue item, parsed JSON, changed HUD values or a successfully drawn campaign is not resume proof. Completion requires compatible checkpoint admission, complete participant hydration, atomic successor commit or verified failure, one terminal result and the first visible frame citing the committed run generation.