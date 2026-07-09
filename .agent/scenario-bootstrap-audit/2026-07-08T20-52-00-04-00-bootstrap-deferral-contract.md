# PhantomCommand Bootstrap Deferral Contract

**Timestamp:** `2026-07-08T20-52-00-04-00`

## Purpose

Keep scenario bootstrap explicitly deferred while the source-profile fixture and construct result contracts are still missing.

## Current state

```txt
visual construct completion: yes
sourceProfile parity proof: no
ConstructEventResult: no
ScenarioBootstrapCommand: no
ScenarioBootstrapResult: no
RTS gameplay loop: no
```

## Required bootstrap blockers

```txt
source_profile_missing
source_profile_error_rows
construct_result_missing
construct_incomplete
duplicate_scenario_bootstrap
```

## Target ordering

```txt
1. SourceProfile fixture proof.
2. Add additive GameHost sourceProfile diagnostics.
3. Add ConstructEventEnvelope.
4. Add ConstructEventResult.
5. Add ConstructEventJournal.
6. Add ScenarioBootstrapCommand.
7. Add ScenarioBootstrapResult.
8. Add RTS seed placeholder only after scenario bootstrap acceptance is proven.
```

## Deferred contract sketch

```txt
ScenarioBootstrapResult
  ok: boolean
  reason: string
  acceptedAtConstructEventId?: string
  sourceProfileFingerprint?: string
  constructSnapshot?: object
  scenarioSeed?: object
```

## Main finding

The current scene reaches `command online`, but that is not sufficient authority for scenario bootstrap. SourceProfile parity and a typed construct result are required first.
