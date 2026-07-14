# Paused Frame Command Ownership Gap

**Timestamp:** `2026-07-14T18-41-11-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`

## Summary

The renderer correctly draws a `PAUSED` overlay, but that frame does not prove that camera, build, order, selection or wave-start mutation has stopped. A visible paused frame and authoritative paused state can diverge.

## Plan ledger

**Goal:** make the paused frame cite the same accepted pause revision used by input and scheduler admission.

- [x] Trace Canvas2D and CRT paused presentation.
- [x] Trace camera and input mutation that continues before each frame.
- [ ] Add `PausePresentationDescriptor`.
- [ ] Add `FirstPausedFrameAck`.
- [ ] Add `FirstResumedCampaignFrameAck`.

## Current gap

```txt
P toggles state.paused
  -> frame continues
  -> camera integrates held movement keys
  -> wheel and middle-drag can change camera
  -> build, order, selection and startWave can mutate state
  -> render draws PAUSED
```

The overlay is therefore a visual label, not proof of command suspension.

## Required evidence

```txt
PauseStateRevision
PausePolicyRevision
PausePresentationDescriptor
rendered source-frame identity
CRT submission identity
FirstPausedFrameAck
FirstResumedCampaignFrameAck
rejection receipts for blocked commands
```
