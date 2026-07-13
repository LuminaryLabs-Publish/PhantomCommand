# Fixed-Step Visible Frame Gap

**Timestamp:** `2026-07-13T11-41-10-04-00`

## Summary

The campaign renders the latest mutable state after draining complete fixed steps. It does not preserve previous/current presentation snapshots, calculate interpolation alpha or prove which simulation and camera revisions reached the visible CRT surface.

## Plan ledger

**Goal:** require every visible campaign frame to cite one admitted temporal envelope and one complete Canvas2D/CRT projection result.

- [x] Trace RAF timestamp, camera update, accumulator drain, source draw and CRT submission.
- [x] Record high-refresh repeated-pose and stepped-pose behavior.
- [x] Record missing interpolation and visible readback.
- [x] Separate this gap from retained WebGL context lifecycle recovery.
- [ ] Implement presentation frames and browser fixtures later.

## Current frame path

```txt
RAF now
  -> variable-dt camera update
  -> zero to three fixed simulation steps
  -> draw mutable latest state
  -> sample performance.now again for CRT time
  -> upload source canvas
  -> draw WebGL display
```

## Visible mismatch

```txt
120/144 Hz
  -> many RAF callbacks drain zero simulation steps
  -> visible pose repeats
  -> next stepped callback exposes a full 1/60 transition

hitch or resumed tab
  -> elapsed time above 50 ms is discarded
  -> up to three steps are exposed in one frame
  -> no dropped-time or discontinuity marker reaches presentation

all refresh rates
  -> camera uses variable dt
  -> gameplay uses fixed dt
  -> CRT shader samples a second clock
  -> no single temporal frame identifies all three
```

## Missing evidence

```txt
scheduler generation
wall-time sample ID
elapsed/clamped/dropped durations
fixed-step drain count
previous and current simulation revisions
camera frame revision
interpolation alpha
presentation frame ID and fingerprint
Canvas2D projection result
CRT submission result
visible display acknowledgement
```

## Required frame

```txt
CampaignPresentationFrame {
  frameId
  schedulerGeneration
  wallTimeSampleId
  simulationPreviousRevision
  simulationCurrentRevision
  cameraRevision
  interpolationAlpha
  droppedTime
  visibilityGeneration
  fingerprint
}
```

## Completion rule

A frame is complete only when both the source-canvas projection and CRT display submission accept the same `CampaignPresentationFrame`, and public readback acknowledges the first visible frame carrying that fingerprint.