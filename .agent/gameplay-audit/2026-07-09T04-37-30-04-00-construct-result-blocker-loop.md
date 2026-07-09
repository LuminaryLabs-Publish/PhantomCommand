# PhantomCommand Gameplay Audit: Construct Result Blocker Loop

**Timestamp:** `2026-07-09T04-37-30-04-00`

## Current gameplay loop

`PhantomCommand` is currently a construct-viewer proof, not yet a full RTS loop.

```txt
open index.html
  -> choose Start or Open Scene
  -> enter game.html
  -> watch inner-to-outer stone construct assemble
  -> pan with WASD or arrow keys
  -> zoom with mouse wheel
  -> skip with Space or Skip button
  -> restart with R or Restart button
  -> finish when phase becomes command online
```

## Current gameplay state

```txt
active:
  - construct build id
  - progress
  - phase
  - total pieces
  - ring count
  - ring part counts
  - ring gaps
  - ring start times
  - animation constants

deferred:
  - player command economy
  - units
  - waves
  - objectives
  - resources
  - enemy AI
  - scenario bootstrap
  - construct completion result journal
```

## Gameplay authority problem

```txt
- Completion is a visual/HUD phase, not a typed ConstructEventResult.
- Duplicate completion cannot be rejected through a stable reason yet.
- Scenario bootstrap has no command/result gate.
- RTS gameplay has no safe starting snapshot.
- The sourceProfile parity proof is a prerequisite for any construct result.
```

## Required precondition loop

```txt
sourceProfile fixture passes
  -> source snapshot is serializable
  -> source fingerprint is stable
  -> live ring/piece/timeline descriptors match fixture rows
  -> GameHost sourceProfile readback is additive
  -> legacy GameHost fields remain compatible
  -> central ledger points at latest tracker/audit
  -> only then introduce ConstructEventEnvelope
  -> only then introduce ConstructEventResult
  -> only then introduce ScenarioBootstrapCommand
```

## Construct result blocker rows

```txt
construct_result_blocked_without_source_profile_fixture
construct_result_blocked_when_profile_has_parity_errors
construct_result_blocked_when_gamehost_source_profile_missing
construct_result_blocked_when_legacy_gamehost_fields_changed
construct_result_blocked_when_central_ledger_pointer_stale
scenario_bootstrap_blocked_without_construct_complete_result
scenario_bootstrap_blocked_on_duplicate_construct_complete
```

## Gameplay domains

```txt
current:
  - static-menu-route
  - construct-viewer-loop
  - pan-input
  - zoom-input
  - skip-input
  - restart-input
  - hud-phase-projection
  - gamehost-diagnostics

next pre-gameplay:
  - construct-source-profile-proof
  - construct-source-fixture
  - GameHost sourceProfile diagnostics
  - construct-result-precondition

later:
  - construct-completion-result
  - scenario-bootstrap-result
  - RTS command loop
  - unit command domain
  - enemy wave domain
  - objective domain
```

## Gameplay verdict

The next pass should not try to make the RTS playable. It should prove that the construct's source profile is stable, fixture-readable, and browser-consumed before creating a typed transition from construct proof to gameplay state.
