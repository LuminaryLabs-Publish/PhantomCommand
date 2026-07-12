# Render Audit: Continue First-Frame Provenance Gap

**Timestamp:** `2026-07-11T21-31-19-04-00`

## Summary

The menu can display `CONTINUE` with the note `BOUND`, but the first campaign frame has no evidence that any checkpoint was consumed. The campaign constructs default state before rendering and the public host exposes no route intent, checkpoint identity, fingerprint, run epoch or frame ID.

## Plan ledger

**Goal:** ensure the first frame after Continue is visibly and diagnostically bound to the selected checkpoint.

- [x] Trace the menu Continue projection.
- [x] Trace campaign default-state construction.
- [x] Trace HUD, overlay, CRT and GameHost projection.
- [x] Define required frame evidence.
- [ ] Add first resumed-frame acknowledgement.

## Current gap

```txt
menu frame
  -> CONTINUE / BOUND

navigation
  -> campaign=continue

campaign frame
  -> default souls 145
  -> default core 24
  -> default wave 0
  -> default units and camera
  -> no checkpoint provenance
```

A screenshot, HUD row or `GameHost.getState()` sample cannot distinguish Continue from Begin Campaign.

## Required frame record

```txt
ResumeFrameReceipt
  frameId
  routeIntent = RESUME
  candidateId
  candidateKey
  storageScope
  checkpointId
  checkpointFingerprint
  stateRevision
  runEpoch
  presentationFingerprint
  renderResult
  hudCommitResult
```

## Invariants

```txt
Continue readiness is not published before a matching frame
the frame and GameHost read model use the same checkpoint fingerprint
a failed render does not report resume success
a failed HUD commit does not report resume success
a stale candidate cannot produce a resumed frame
NEW frames carry no checkpoint identity
```

## Fixture requirement

Capture one Begin frame and one Continue frame from distinct checkpoint state. Assert the Continue frame, HUD and host read model all correlate to the selected checkpoint and are observably different from defaults.
