# Scenario Bootstrap Audit: Blocked Until Construct Result

**Timestamp:** `2026-07-09T12-50-00-04-00`

## Current state

Scenario bootstrap is not implemented in the live route.

The project is still at construct proof stage:

```txt
menu route
  -> construct scene
  -> visual build completion
  -> command online phase
```

## Why bootstrap remains blocked

The scene does not yet emit a typed construct result.

The route has no sourceProfile fixture status, no construct completion envelope, no duplicate-completion protection, and no stable reject reasons for early bootstrap.

## Bootstrap preconditions

Do not add scenario bootstrap until all rows are true:

```txt
source_profile_fixture_passes
sourceprofile_consumer_readback_matches_fixture
legacy_gamehost_fields_are_unchanged
construct_complete_result_exists
construct_complete_result_is_idempotent
construct_snapshot_is_serializable
```

## Future bootstrap command

```txt
ScenarioBootstrapCommand
  type: scenario.bootstrap
  requestedAt
  sourceProfileFingerprint
  constructResultId
```

## Future bootstrap result

```txt
ScenarioBootstrapResult
  ok
  reason
  scenarioId
  constructResultId
  sourceProfileFingerprint
  snapshot
```

## Required reason codes

```txt
scenario_bootstrap_started
construct_incomplete
construct_profile_parity_missing
construct_profile_fixture_failed
construct_result_missing
duplicate_scenario_bootstrap
unsupported_scenario_bootstrap
```

## Do not do yet

```txt
- Do not add units.
- Do not add economy.
- Do not add enemy waves.
- Do not add AI commands.
- Do not add RTS simulation.
- Do not treat visual phase text as source authority.
```
