# Scenario Bootstrap Audit: Blocker Contract

**Timestamp:** `2026-07-08T18-41-41-04-00`

## Current state

`PhantomCommand` does not yet have a real scenario bootstrap. The route stops at the construct scene becoming `command online`.

## Required blocker

Scenario bootstrap must not be implemented before the source-profile fixture and typed construct result layers exist.

## Blocker contract

```txt
ScenarioBootstrapCommand
  requires sourceProfileFixtureStatus === passing
  requires ConstructEventResult(type=construct_complete, status=accepted)
  rejects if construct is incomplete
  rejects if construct result is missing
  rejects if bootstrap already happened
```

## Stable rejection reasons to reserve

```txt
source_profile_fixture_missing
source_profile_fixture_failing
construct_result_missing
construct_incomplete
duplicate_scenario_bootstrap
unsupported_scenario_bootstrap
```

## Deferred kits

```txt
phantom-command-construct-event-envelope-kit
phantom-command-construct-event-result-kit
phantom-command-construct-completion-idempotency-kit
phantom-command-scenario-bootstrap-gate-kit
phantom-command-scenario-bootstrap-blocker-kit
```

## Do not implement yet

```txt
- Do not add undead units.
- Do not add necropolis economy.
- Do not add waves.
- Do not add objective reducers.
- Do not add map capture.
- Do not route game.html into an RTS state machine.
```

## Next safe gate

```txt
sourceProfileFixture passing
  -> GameHost sourceProfile readback stable
  -> central ledger latest tracker aligned
  -> ConstructEventResult implemented
  -> scenario bootstrap can begin
```
