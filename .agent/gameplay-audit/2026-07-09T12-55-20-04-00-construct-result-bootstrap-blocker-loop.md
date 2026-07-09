# Gameplay Audit: Construct Result Bootstrap Blocker Loop

**Timestamp:** `2026-07-09T12-55-20-04-00`

## Current player loop

```txt
load menu
  -> start scene
  -> watch ritual construct form
  -> pan with WASD/arrows
  -> zoom with mouse wheel
  -> skip with Space or button
  -> restart with R or button
  -> reach command online phase
```

## Current gameplay state

The current route is a construct proof, not a complete RTS loop.

The construct reaches `phase = command online` after all pieces settle. That phase is a visual/HUD state, not a typed gameplay event result.

## Current blockers

```txt
construct completion is not an idempotent event result
construct completion duplicate behavior is not typed
scenario bootstrap does not exist as a command/result gate
scenario bootstrap cannot safely depend on HUD phase yet
unit selection / RTS commands are intentionally deferred
source profile parity is not fixture-proven
```

## Required before scenario bootstrap

```txt
source profile fixture passes
GameHost sourceProfile readback exists
legacy GameHost state remains compatible
construct completion event envelope exists
construct completion result exists
construct completion duplicate result is stable
scenario bootstrap preflight can read construct completion result
```

## Next gameplay-facing result model

```txt
ConstructEventEnvelope
  -> construct_completion_requested
  -> ConstructEventResult
     -> status: accepted | rejected | noop
     -> reason: construct_completed | duplicate_construct_completion | construct_incomplete | source_profile_unproven
     -> snapshotBefore
     -> snapshotAfter
     -> replayRow

ScenarioBootstrapEnvelope
  -> scenario_bootstrap_requested
  -> ScenarioBootstrapResult
     -> status: accepted | rejected | noop
     -> reason: bootstrap_started | construct_incomplete | duplicate_scenario_bootstrap | source_profile_unproven
```

## Gameplay recommendation

Keep the visible construct loop unchanged and do not add units, resources, enemies, selection, or RTS objectives until source-profile parity and construct result authority are implemented.
