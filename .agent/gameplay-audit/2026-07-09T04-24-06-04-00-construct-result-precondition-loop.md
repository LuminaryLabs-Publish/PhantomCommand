# Gameplay Audit: Construct Result Precondition Loop

**Timestamp:** `2026-07-09T04-24-06-04-00`

## Summary

`PhantomCommand` currently plays as a construct viewer, not yet an RTS command loop.

The next gameplay-safe step is still pre-gameplay proof: lock sourceProfile parity before introducing construct completion results, scenario bootstrap, units, waves, objectives, economy, or command replay.

## Current gameplay loop

```txt
open menu
  -> press Start or Open Scene
  -> watch construct assemble
  -> pan with WASD/arrows
  -> zoom with mouse wheel
  -> Space or Skip completes construct
  -> R or Restart resets construct
  -> phase becomes command online after all 92 pieces settle
```

## Current player actions

```txt
Start
Open Scene
Pan camera
Zoom camera
Skip construct
Restart construct
```

## Current gameplay state

```txt
phase
progress
pieces
rings
ringParts
ringGaps
ringStartTimes
animation config
```

## Not gameplay authority yet

```txt
construct_complete is not a typed event
construct_complete is not idempotent
skip does not emit a command result
restart does not emit a command result
scenario bootstrap does not exist
units do not exist
resources do not exist
enemy waves do not exist
objectives do not exist
RTS command replay does not exist
```

## Construct result precondition

Before adding gameplay authority, sourceProfile must prove:

```txt
build id parity
ring count parity
zero-gap policy
ring part counts [5,5,5,5,6,8,10,12,16,20]
92 total pieces
19.923 total build seconds
ring handoff 0.72
part stagger 0.025
ring start times
serializable source snapshot
stable source fingerprint
GameHost additive diagnostics
legacy GameHost compatibility
build fixture integration
central ledger pointer parity
```

## Deferred gameplay contracts

```txt
ConstructEventEnvelope
ConstructEventResult
ConstructEventJournal
ConstructSnapshot
ScenarioBootstrapCommand
ScenarioBootstrapResult
ScenarioBootstrapSnapshot
RtsBoundaryPlaceholder
```

## Safe acceptance rule

```txt
if sourceProfile parity is missing:
  reject construct result implementation
  reject scenario bootstrap implementation
  reject RTS gameplay implementation
  continue using construct viewer loop only
```

## Next ledge

```txt
PhantomCommand SourceProfile Consumer Cutover Map + Legacy GameHost Fixture Gate
```
