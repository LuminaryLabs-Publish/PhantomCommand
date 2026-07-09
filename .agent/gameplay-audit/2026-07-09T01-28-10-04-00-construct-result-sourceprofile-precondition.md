# PhantomCommand Gameplay Audit: Construct Result SourceProfile Precondition

**Timestamp:** `2026-07-09T01-28-10-04-00`

## Current gameplay loop

```txt
open menu
  -> enter construct scene
  -> watch ritual platform form
  -> pan with WASD/arrows
  -> zoom with mouse wheel
  -> skip with Space/Skip
  -> restart with R/Restart
  -> finish at command online
```

## Current gameplay authority

The route is not yet a command loop. It is a construct-viewer loop backed by inline browser state.

```txt
startedAt
complete
progress
phase
parts[]
rings[]
ringStartTimes[]
input state
HUD DOM state
```

## Gameplay domains present

```txt
construct-viewer-loop
camera-pan-control
camera-zoom-control
skip-construct-control
restart-construct-control
hud-progress-reporting
construct-completion-visual-state
```

## Deferred gameplay domains

```txt
construct-event-envelope
construct-event-result
construct-completion-idempotency
scenario-bootstrap-command
scenario-bootstrap-result
rts-unit-control
resource-economy
wave-director
objective-director
command-journal-replay
```

## Blocker

`ConstructEventResult` should not be implemented until sourceProfile parity is proven. A typed construct completion result would otherwise depend on inline browser constants instead of a stable source snapshot.

## Required preconditions before gameplay cutover

```txt
source-owned smooth-ring-handoff-v6 profile exists
ring descriptors match live route
piece descriptors match live route
timeline descriptors match live route
source fingerprint is stable
source snapshot is serializable
GameHost sourceProfile diagnostics are additive
central ledger points to latest source-profile tracker
fixture runs without DOM/canvas/Three.js
```

## Next gameplay-safe result shape

```txt
ConstructEventEnvelope
  -> kind: construct_complete
  -> buildId: smooth-ring-handoff-v6
  -> sourceFingerprint
  -> issuedAtFrame

ConstructEventResult
  -> ok
  -> reason: construct_completed | duplicate_construct_complete | source_profile_unproven
  -> stateChanged
  -> sourceFingerprint
  -> snapshot
```

## Stop line

Keep scenario bootstrap blocked until `ConstructEventResult` can prove `construct_completed` from a source-owned profile snapshot.
