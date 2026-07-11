# Render Audit: Dual Terminal Frame and Persistence Gap

**Timestamp:** `2026-07-11T18-21-09-04-00`

## Summary

The campaign frame is rendered directly from mutable `state`. When both terminal Booleans are true, the overlay displays victory because `state.won` is evaluated first. No frame identity proves which terminal decision, message or storage effect produced the visible frame.

## Plan ledger

**Goal:** make world, HUD, minimap, overlay, CRT, GameHost and storage acknowledge one committed terminal result.

- [x] Trace terminal state into `drawUI()`.
- [x] Trace source-canvas render into CRT upload.
- [x] Trace terminal state into GameHost.
- [x] Identify missing result and frame provenance.
- [ ] Add terminal projections and browser smoke fixtures.

## Current consumer split

```txt
world and minimap
  -> live unit/tower/projectile maps

HUD message
  -> last mutable state.message write

terminal overlay
  -> state.won ? victory : state.lost ? defeat : paused

CRT
  -> uploads the resulting source canvas

GameHost
  -> returns independent won and lost flags

localStorage
  -> victory summary written inside final-wave branch
```

## Failure case

```txt
lost = true
won = true
message = victory
save = victory summary
overlay = victory
GameHost = { won:true, lost:true }
```

The screen appears internally coherent only because one consumer gives victory precedence. It does not prove that victory was the authoritative result.

## Missing frame fields

```txt
runEpoch
simulationTickId
combatResultId
terminalResultId
terminalPolicyId/version
outcome
terminalStateFingerprint
persistenceResultId
renderFrameId
sourceCanvasAck
crtUploadAck
crtDrawAck
GameHostAck
```

## Required projection model

```txt
TerminalOutcomeResult
  -> TerminalPresentationSnapshot
       outcome
       headline
       body/message
       persistence status
       allowed actions
  -> world/HUD/minimap/overlay draw
  -> sourceCanvasFrameAck
  -> crtUploadAck
  -> crtDisplayFrameAck
  -> detached GameHost observation
```

## Required invariants

```txt
one terminal result per run epoch
one terminal headline and message per result
no consumer derives precedence from Boolean flags
storage result is visible as admitted/rejected, not inferred
all terminal consumers report the same outcome and resultId
a later stale callback cannot replace the committed terminal frame
```

## Browser smoke

```txt
load simultaneous-evidence fixture
commit one TerminalOutcomeResult
render one frame
read world/HUD/overlay/CRT/GameHost acknowledgements
assert same runEpoch, resultId, outcome, frameId and fingerprint
assert storage state matches persistenceDecision
```