# Terminal Outcome Visible-Frame Gap

**Timestamp:** `2026-07-14T13-40-59-04-00`

## Summary

The campaign renders terminal state from mutable `won` and `lost` flags. The overlay checks victory first, so a conflicting `won=true` and `lost=true` state is displayed as victory. No frame identifies the accepted terminal step or outcome artifact.

## Plan ledger

**Goal:** require every terminal frame to cite one exclusive accepted campaign outcome.

- [x] Trace terminal state into Canvas2D and CRT submission.
- [x] Identify the conflict masking order.
- [x] Define required frame evidence.
- [ ] Add executable terminal-frame fixtures later.

## Current projection

```txt
mutable campaign state
  -> drawUI()
  -> if paused || won || lost, draw terminal veil
  -> choose won label before lost label
  -> crt.render()
  -> no frame ID or outcome revision is published
```

## Gap

```txt
accepted CampaignOutcomeArtifact: absent
terminal projection descriptor: absent
terminal step ID in frame: absent
outcome fingerprint in frame: absent
first matching frame acknowledgement: absent
conflict-visible fallback: absent
Canvas2D/CRT parity receipt: absent
```

## Required frame contract

```txt
TerminalFrameDescriptor {
  runId
  stepId
  outcomeId
  outcomeFingerprint
  outcome: victory | defeat
  core
  wave
  souls
  saveCommitStatus
}

FirstTerminalFrameAck {
  frameId
  descriptorFingerprint
  sourceCanvasRevision
  crtPresentationRevision
}
```

## Required fixtures

```txt
victory artifact -> victory overlay only
defeat artifact -> defeat overlay only
conflicting raw proposals -> no frame until settlement
accepted defeat at final-wave boundary -> no victory label
GameHost outcome matches visible descriptor
source Canvas2D and CRT output cite the same outcome
source, dist and Pages produce matching terminal projection
```

No visible-frame correctness claim is made.