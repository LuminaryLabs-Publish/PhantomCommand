# PhantomCommand Construct To Bootstrap Consumer Gate

**Timestamp:** `2026-07-08T15-58-59-04-00`

## Goal

Keep the current construct viewer stable while defining the proof gate required before any scenario bootstrap or RTS-style gameplay systems are added.

## Current gameplay loop

```txt
open menu
  -> enter construct scene
  -> watch command platform form
  -> pan and zoom around construct
  -> skip or restart animation
  -> finish at command online
```

## Current gameplay state

```txt
construct viewer: implemented
construct completion phase: visual/HUD state
GameHost readback: implemented for construct-only diagnostics
scenario bootstrap: not implemented
unit commands: not implemented
resource loop: not implemented
objective loop: not implemented
```

## Gameplay risk

Starting scenario bootstrap before source-profile proof would make the next gameplay layer depend on inline visual constants. That would make construct completion, replay, and bootstrap acceptance hard to verify.

## Required gate before scenario bootstrap

```txt
source profile module exists
ring descriptors match game.html
piece descriptors match 92 live pieces
timeline descriptors match totalBuildSeconds 19.923
source fingerprint is stable
source snapshot is serializable
profile parity report has no errors
GameHost sourceProfile diagnostics are additive
DOM-free source-profile fixture passes
```

## Later bootstrap result matrix

```txt
construct_incomplete_bootstrap_rejected
construct_complete_event_accepted_once
duplicate_construct_complete_rejected
scenario_bootstrap_accepted_after_construct_complete
duplicate_scenario_bootstrap_rejected
scenario_snapshot_emits_boundary_placeholders
legacy_gamehost_surface_remains_available
```

## Gameplay domains deferred

```txt
scenario objective
unit selection
roster state
base building state
resource state
wave state
camera command mode
command journal replay
```

## Next safe gameplay handoff

```txt
source-profile consumer splice passes
  -> ConstructEventResult
  -> ConstructSnapshot
  -> ScenarioBootstrapCommand
  -> ScenarioBootstrapResult
  -> ScenarioBootstrapSnapshot
  -> first playable RTS boundary
```

## Main finding

Do not add new gameplay systems yet. The source-profile consumer proof is the blocking gameplay dependency because it makes the current construct completion state explainable and replayable.
