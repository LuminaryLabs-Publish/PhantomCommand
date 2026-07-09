# PhantomCommand Gameplay Audit: Construct Result Blocker Loop

**Timestamp:** `2026-07-09T01-20-59-04-00`

## Current gameplay loop

```txt
player opens menu
  -> enters construct scene
  -> watches smooth-ring-handoff-v6 platform build
  -> pans camera
  -> zooms camera
  -> skips or restarts build
  -> reaches phase: command online
```

This is currently a construct-viewer loop, not an RTS command loop.

## Current gameplay domains

```txt
menu-start-flow
construct-viewer-flow
camera-pan-flow
camera-zoom-flow
skip-construct-flow
restart-construct-flow
hud-progress-flow
gamehost-diagnostics-flow
```

## Deferred gameplay domains

```txt
construct-complete-event
construct-complete-result
scenario-bootstrap-command
scenario-bootstrap-result
scenario-bootstrap-snapshot
necropolis-command-loop
unit-command-loop
resource-loop
wave-loop
objective-loop
replay-journal-loop
```

## Blocker

`construct(seq)` currently mutates phase/progress/HUD and flips `complete` inline.

That is enough for the visual, but not enough for a deterministic gameplay transition. The next runtime implementation should keep construct result authority blocked until sourceProfile parity proves the construct source can be reproduced outside the browser route.

## Result chain that should remain blocked

```txt
sourceProfile parity missing
  -> ConstructEventEnvelope blocked
  -> ConstructEventResult blocked
  -> ConstructEventJournal blocked
  -> ScenarioBootstrapCommand blocked
  -> ScenarioBootstrapResult blocked
  -> RTS gameplay boundary blocked
```

## First allowed gameplay proof after sourceProfile parity

```txt
ConstructCompleteCandidate
  -> preflight sourceProfile parity
  -> accepted construct_complete result
  -> duplicate construct_complete rejected with duplicate_construct_complete
  -> ScenarioBootstrapCommand rejected until construct_complete exists
  -> duplicate scenario bootstrap rejected with duplicate_scenario_bootstrap
```

## Do not implement yet

```txt
- unit movement
- economy
- waves
- objectives
- necropolis build loop
- command replay loop
- enemy AI
```

The current visible build should stay stable while the source/readback fixture gate is closed.
