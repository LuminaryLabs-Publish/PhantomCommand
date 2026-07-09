# PhantomCommand Gameplay Audit: Construct Result Blocker Loop

**Timestamp:** `2026-07-09T04-38-39-04-00`

## Current gameplay loop

```txt
open index.html
  -> choose Start or Open Scene
  -> enter game.html
  -> watch smooth-ring-handoff-v6 construct assemble
  -> pan with WASD/arrows
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
  - typed ConstructEventResult
  - scenario bootstrap
  - RTS command loop
  - units
  - resources
  - enemies
  - waves
  - objectives
```

## Blocker

The route reaches `command online` visually, but completion is not yet a typed idempotent result. A sourceProfile fixture gate must prove the live construct source before a construct-complete event can safely bootstrap gameplay.

## Required precondition loop

```txt
sourceProfile fixture passes
  -> source snapshot is serializable
  -> source fingerprint is stable
  -> live ring/piece/timeline descriptors match fixture rows
  -> GameHost sourceProfile readback is additive
  -> legacy GameHost fields remain compatible
  -> central ledger points at latest tracker/audit
  -> ConstructEventEnvelope may be added
  -> ConstructEventResult may be added
  -> ScenarioBootstrapCommand may be added
```

## Verdict

Do not start RTS gameplay next. Close sourceProfile proof first, then add construct result authority, then scenario bootstrap.
