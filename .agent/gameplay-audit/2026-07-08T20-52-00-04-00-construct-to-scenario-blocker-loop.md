# PhantomCommand Construct to Scenario Blocker Loop

**Timestamp:** `2026-07-08T20-52-00-04-00`

## Current gameplay loop

The current live loop is not yet an RTS gameplay loop. It is a construct-viewer loop:

```txt
menu
  -> construct scene
  -> watch 92-piece smooth-ring-handoff-v6 command platform assemble
  -> pan, zoom, skip, or restart
  -> complete when phase becomes command online
```

## Existing gameplay authority

```txt
construct progress: inline construct(seq)
completion flag: complete boolean in game.html
phase: forming / ring N of 10 / command online
skip: mutates startedAt to force completion
restart: resets startedAt, complete, progress, and phase
HUD: immediate DOM mutation
GameHost: exposes current construct snapshot only
```

## Missing gameplay authority

```txt
ConstructEventEnvelope
ConstructEventResult
ConstructEventJournal
ConstructSnapshot
ScenarioBootstrapCommand
ScenarioBootstrapResult
ScenarioBootstrapSnapshot
RTSScenarioSeed
RTSCommandJournal
```

## Required blocker rule

Scenario bootstrap must stay blocked until two proofs exist:

```txt
sourceProfile parity passes
construct_complete typed result exists
```

Before then, the only safe scenario-bootstrap response is a documented rejection contract:

```txt
{
  "ok": false,
  "reason": "construct_source_profile_unproven"
}
```

After sourceProfile parity exists but before typed construct completion exists, the rejection should narrow to:

```txt
{
  "ok": false,
  "reason": "construct_result_missing"
}
```

## Gameplay fixture rows

```txt
scenario_bootstrap_rejected_when_sourceprofile_missing
scenario_bootstrap_rejected_when_sourceprofile_has_error_rows
scenario_bootstrap_rejected_when_construct_result_missing
scenario_bootstrap_acceptance_deferred_until_construct_complete_result
skipConstruct_preserves_legacy_completion_behavior
restartConstruct_preserves_legacy_reset_behavior
sourceProfile_fixtures_do_not_start_rts_gameplay
```

## Main finding

The next work should not add units, enemies, economy, necropolis resources, waves, or objectives. The right next step is to prove that the construct source profile is stable and that a future scenario bootstrap cannot run before construct completion is represented by a typed result.
