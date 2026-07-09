# Gameplay Audit: Construct Result Scenario Deferral Loop

**Timestamp:** `2026-07-09T12-50-00-04-00`

## Current gameplay loop

```txt
open menu
  -> start scene
  -> watch command platform construct itself
  -> pan camera with WASD/arrows
  -> zoom with mouse wheel
  -> skip with Space/Skip
  -> restart with R/Restart
  -> finish when phase becomes command online
```

## Current gameplay authority

The live route is a cinematic construct proof, not a complete RTS gameplay loop.

`construct(seq)` currently owns progress, done count, active ring, phase, HUD mutation, and final completion detection inline.

## Current GameHost gameplay surface

```txt
skipConstruct()
restartConstruct()
getState()
  -> buildId
  -> phase
  -> progress
  -> pieces
  -> rings
  -> ringParts
  -> ringGaps
  -> ringStartTimes
  -> animation
```

## Gameplay domains

```txt
menu-route-domain
construct-cinematic-domain
camera-pan-domain
camera-zoom-domain
skip-command-domain
restart-command-domain
phase-projection-domain
hud-progress-domain
gamehost-readback-domain
construct-result-domain-deferred
scenario-bootstrap-domain-deferred
rts-gameplay-domain-deferred
```

## Current blocker

There is no typed construct result.

Completion is currently inferred from visual progress and phase mutation. Scenario bootstrap must not start from this implicit state because duplicate completion, early bootstrap, missing profile parity, and stale GameHost readback have no stable reason codes.

## Required result gate

After sourceProfile parity is implemented, add:

```txt
ConstructEventEnvelope
ConstructEventResult
ConstructCompletionSnapshot
ScenarioBootstrapCommand
ScenarioBootstrapResult
ScenarioBootstrapSnapshot
```

## Required result reasons

```txt
construct_complete
construct_already_complete
construct_profile_parity_missing
construct_profile_fixture_failed
construct_incomplete
scenario_bootstrap_started
duplicate_scenario_bootstrap
scenario_bootstrap_blocked_until_construct_result
```

## Deferral rule

Do not implement RTS unit control, scenario progression, resources, combat, or AI before the sourceProfile fixture and construct result gate exist.
