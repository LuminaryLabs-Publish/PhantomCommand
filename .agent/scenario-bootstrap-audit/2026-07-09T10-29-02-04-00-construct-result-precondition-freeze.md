# Scenario Bootstrap Audit: Construct Result Precondition Freeze

**Timestamp:** `2026-07-09T10-29-02-04-00`

## Scenario state

Scenario bootstrap is intentionally not implemented yet.

The repo currently shows a construct proof. The `command online` phase is a visual/HUD state, not a source-owned result that can safely unlock RTS gameplay.

## Current state path

```txt
construct(seq)
  -> counts settled pieces
  -> sets progress
  -> sets phase text
  -> mutates HUD
  -> GameHost getState reports phase/progress/pieces
```

## Missing result contract

```txt
ConstructEventEnvelope
ConstructEventResult
ConstructCompletionSnapshot
ConstructCompletionJournal
ScenarioBootstrapCommand
ScenarioBootstrapResult
ScenarioBootstrapSnapshot
ScenarioBootstrapJournal
```

## Required preconditions

```txt
sourceProfile parity fixture passes
GameHost sourceProfile readback is additive
legacy GameHost fields remain unchanged
construct_complete emitted exactly once
duplicate construct_complete rejected
scenario_bootstrap blocked while construct incomplete
scenario_bootstrap accepted after construct complete
duplicate scenario_bootstrap rejected
```

## Do not cross yet

```txt
- No units.
- No economy.
- No wave manager.
- No building placement.
- No combat resolver.
- No scenario map bootstrap.
```

## Next safe handoff

After source-profile parity passes, add a construct result kit that emits a typed, idempotent `construct_complete` result. Only then should scenario bootstrap become a consumer.
