# Gameplay Audit: Construct Profile Gate Loop

**Timestamp:** `2026-07-09T10-20-44-04-00`

## Current gameplay loop

```txt
open menu
  -> start/open game scene
  -> watch construct assemble
  -> pan with WASD/arrows
  -> zoom with wheel
  -> skip to complete
  -> restart construct
  -> read HUD progress and phase
```

This is a construct proof loop, not the full RTS loop implied by menu copy and docs.

## Current win/progress state

```txt
phase: forming | ring N of 10 | command online
progress: done / parts.length
pieces: 92
rings: 10
ringParts: [5,5,5,5,6,8,10,12,16,20]
```

`command online` is a visual/HUD phase, not yet an idempotent gameplay result.

## Gameplay blocker

Scenario bootstrap, combat, unit commands, economy, wave logic, building placement, and RTS control should remain blocked.

The next gameplay-safe work is to make the construct source profile and completion readiness fixture-readable first.

## Required next gameplay records

```txt
ConstructSourceProfile
ConstructRingDescriptor[]
ConstructPieceDescriptor[]
ConstructTimelineDescriptor
ConstructSourceFingerprint
ConstructSourceSnapshot
ConstructProfileParityReport
GameHostSourceProfileReadback
ConstructCompleteBlockedReason
ScenarioBootstrapBlockedReason
```

## Next safe gameplay ledge

```txt
SourceProfile fixture proof first; construct result authority second; scenario bootstrap third.
```
