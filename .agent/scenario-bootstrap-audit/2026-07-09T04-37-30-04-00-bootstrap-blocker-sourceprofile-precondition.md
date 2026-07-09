# PhantomCommand Scenario Bootstrap Audit: Bootstrap Blocker SourceProfile Precondition

**Timestamp:** `2026-07-09T04-37-30-04-00`

## Status

Scenario bootstrap remains deferred.

The current route reaches `command online` visually, but it does not yet emit a stable typed `ConstructEventResult`. Without that result, there is no safe handoff into a scenario snapshot, RTS command loop, or unit/resource system.

## Required preconditions before bootstrap

```txt
1. SourceProfile fixture rows pass.
2. GameHost exposes additive sourceProfile diagnostics.
3. Legacy GameHost fields are unchanged.
4. Central ledger points at the latest sourceProfile tracker.
5. ConstructEventEnvelope exists.
6. ConstructEventResult exists.
7. Duplicate construct completion is idempotently rejected.
8. ScenarioBootstrapCommand exists.
9. ScenarioBootstrapResult exists.
10. Early bootstrap is rejected when construct_complete is missing.
```

## Bootstrap blocker reasons

```txt
source_profile_fixture_missing
source_profile_parity_failed
gamehost_source_profile_missing
legacy_gamehost_shape_changed
central_ledger_pointer_stale
construct_event_envelope_missing
construct_complete_result_missing
construct_complete_duplicate
scenario_bootstrap_command_missing
scenario_bootstrap_already_started
```

## Deferred scenario domains

```txt
scenario-bootstrap-domain
scenario-command-domain
necropolis-base-domain
resource-domain
unit-command-domain
enemy-wave-domain
objective-domain
victory-loss-domain
rts-camera-domain
```

## Do not implement yet

```txt
- Do not add scenario bootstrap reducers in the source-profile gate.
- Do not add RTS units.
- Do not add economy.
- Do not add waves.
- Do not create objectives.
- Do not treat visual completion alone as an authoritative bootstrap event.
```

## Bootstrap verdict

Bootstrap should stay blocked until sourceProfile parity and construct result authority are both fixture-proven. This keeps `PhantomCommand` from layering RTS state on top of inline construct constants that cannot yet be reproduced outside the browser route.
