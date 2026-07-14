# PhantomCommand Next Steps

**Timestamp:** `2026-07-14T13-40-59-04-00`

## Summary

Implement Campaign Terminal Outcome Conflict Settlement Authority before treating victory, defeat, rewards, persistence or retry as reliable at final-wave boundaries.

## Plan ledger

**Goal:** replace independent terminal flags with one exactly-once result that every downstream participant consumes.

- [ ] Add stable `RunId`, `StepId` and `WaveId` values.
- [ ] Replace direct terminal flag mutation with typed sanctum-loss and final-wave-clear proposals.
- [ ] Define a versioned outcome precedence policy.
- [ ] Classify zero, single, duplicate and conflicting proposals from one fixed step.
- [ ] Settle exactly one immutable `CampaignOutcomeArtifact` per run.
- [ ] Derive wave and terminal rewards from the accepted artifact.
- [ ] Add idempotent reward settlement receipts.
- [ ] Prepare victory persistence only after accepted victory.
- [ ] Add typed storage commit results without changing accepted terminal truth on failure.
- [ ] Replace independent `won` and `lost` public readback with one immutable terminal result.
- [ ] Derive Canvas2D and CRT terminal presentation from the same result fingerprint.
- [ ] Publish `FirstTerminalFrameAck` for the accepted outcome.
- [ ] Replace raw reload retry with `CampaignRetryCommand`.
- [ ] Retain predecessor outcome and retry lineage.
- [ ] Reject late fixed-step work from predecessor runs.
- [ ] Retain a bounded outcome journal.
- [ ] Add headless final-wave breach and conflict fixtures.
- [ ] Add reward idempotency and storage-failure fixtures.
- [ ] Add browser GameHost and terminal-frame fixtures.
- [ ] Require source, `dist` and GitHub Pages terminal parity.

## Do not claim complete until

```txt
won and lost cannot both be accepted
final-wave breach has one policy-defined result
rewards apply exactly once from the accepted artifact
victory persistence cannot occur for accepted defeat
GameHost and visible terminal UI cite one outcome fingerprint
retry retains predecessor evidence and allocates a successor run
late predecessor work cannot mutate the successor
source, build and Pages pass the same terminal conflict matrix
```

## Retained work

The browser-startup, settings, durable save/resume, route retirement, scheduler, WebGL recovery, accessibility, input and combat plans remain active and are not superseded.