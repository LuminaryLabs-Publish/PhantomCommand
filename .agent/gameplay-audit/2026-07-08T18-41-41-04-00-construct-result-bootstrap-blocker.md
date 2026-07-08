# Gameplay Audit: Construct Result Bootstrap Blocker

**Timestamp:** `2026-07-08T18-41-41-04-00`

## Current gameplay loop

```txt
open menu
  -> enter construct scene
  -> watch smooth-ring-handoff-v6 platform form
  -> pan / zoom / skip / restart
  -> phase becomes command online
```

## Current gameplay authority

The route has a construct-viewer loop, not an RTS command loop.

Current completion authority is visual/HUD state:

```txt
if all pieces are done:
  complete = true
  phase = command online
```

## Missing result authority

```txt
- No ConstructCommandEnvelope.
- No ConstructEventResult.
- No ConstructEventJournal.
- No ConstructSnapshot independent of game.html.
- No idempotent construct_complete result.
- No duplicate-complete rejection reason.
- No ScenarioBootstrapCommand.
- No ScenarioBootstrapResult.
- No scenario_bootstrap_blocked_until_construct_complete gate.
```

## Why source-profile proof comes first

Construct results should not be implemented until the source profile is canonical. Otherwise the result/journal layer would depend on inline browser math and could drift from the visible construct.

## Required blocker state

```txt
sourceProfileFixtureStatus: missing | failing | passing
constructResultAuthority: blocked_until_source_profile_fixture_passing
scenarioBootstrapAuthority: blocked_until_construct_event_result_exists
rtsGameplayExpansion: deferred
```

## Next safe sequence

```txt
source-profile fixture passes
  -> GameHost sourceProfile readback passes
  -> central ledger pointer parity passes
  -> ConstructEventEnvelope
  -> ConstructEventResult
  -> ConstructEventJournal
  -> ScenarioBootstrapCommand
  -> ScenarioBootstrapResult
```
