# PhantomCommand Construct SourceProfile Gameplay Loop

**Timestamp:** `2026-07-09T18-41-55-04-00`

## Current player loop

```txt
open menu
  -> start scene
  -> watch command platform assemble
  -> pan with WASD/arrows
  -> zoom with wheel
  -> skip with Space or button
  -> restart with R or button
  -> finish when all pieces settle
```

## Current runtime loop

```txt
BUILD_ID smooth-ring-handoff-v6
  -> compute ringStartTimes
  -> compute ring widths and zero gaps
  -> compute ringParts(inner, outer)
  -> create 92 pieces
  -> construct(seq)
  -> update phase/progress/HUD
  -> render frame
  -> expose GameHost state
```

## Gameplay read

This is not yet an RTS loop, command loop, resource loop, or scenario bootstrap.

It is a construct-proof loop. Its value is the exact cinematic handoff profile, so the next gameplay work is source-profile proof, not new gameplay systems.

## Blockers before scenario gameplay

```txt
source-owned live profile: missing
ring descriptor parity: missing
piece descriptor parity: missing
timeline parity: missing
profile fixture rows: missing
GameHost sourceProfile readback: missing
build fixture gate: missing
```

## Next gameplay-safe ledge

```txt
PhantomCommand SourceProfile Handoff Ledger Refresh + GameHost Fixture Gate
```

After that passes, construct result authority and scenario bootstrap can be reconsidered.
