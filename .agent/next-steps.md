# PhantomCommand Next Steps

**Timestamp:** `2026-07-14T18-41-11-04-00`

## Summary

Implement Pause Input Command Admission Authority before treating the visible paused state as proof that campaign and camera mutation has stopped.

## Plan ledger

**Goal:** make strict pause deterministic while retaining an option for a separately named tactical-planning mode.

- [ ] Add `RunId`, `CommandId`, `InputRevision`, `PauseStateRevision` and `PausePolicyRevision`.
- [ ] Replace raw `state.paused` toggling with `CampaignPauseCommand` and `CampaignResumeCommand`.
- [ ] Settle held keys, drag and middle-button state at pause adoption.
- [ ] Define strict-pause allowed, blocked and deferred command classes.
- [ ] Block wave start, tower build and unit orders under strict pause.
- [ ] Freeze camera pan, zoom and focus under strict pause.
- [ ] Decide whether selection is blocked or belongs to an explicit tactical-planning mode.
- [ ] Route pointer, wheel, keyboard and GameHost actions through one admission service.
- [ ] Publish typed accepted, rejected and deferred results.
- [ ] Journal blocked commands with the active pause revision.
- [ ] Reject stale pre-pause input after resume.
- [ ] Publish `FirstPausedFrameAck`.
- [ ] Publish `FirstResumedCampaignFrameAck`.
- [ ] Add headless pause command matrices.
- [ ] Add browser keyboard, pointer, wheel and GameHost fixtures.
- [ ] Add source, `dist` and GitHub Pages parity.

## Do not claim complete until

```txt
PAUSED frame and authoritative pause state cite one revision
strict pause blocks every campaign and camera mutation not explicitly allowed
public GameHost capabilities follow the same policy
resume rejects stale held input
tactical planning, if retained, is separately named and versioned
source, build and Pages pass the same pause matrix
```

## Retained work

Terminal settlement, browser startup, settings, durable save/resume, route retirement, scheduler, WebGL recovery, accessibility, input and combat plans remain active and are not superseded.
