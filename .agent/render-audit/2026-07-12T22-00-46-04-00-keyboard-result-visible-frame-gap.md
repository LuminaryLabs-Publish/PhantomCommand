# Keyboard Result Visible-Frame Gap

**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Timestamp:** `2026-07-12T22-00-46-04-00`

## Summary

Keyboard actions mutate campaign, camera and navigation state before rendering, but the rendered source frame and CRT-presented frame carry no keyboard command identity, terminal result or consumer receipt. A visible pause overlay, camera move or tower-type highlight cannot prove which key event produced it.

## Plan ledger

**Goal:** correlate every accepted keyboard command with the committed campaign/camera revision and the first visible successor frame.

- [x] Trace keydown through immediate mutation and RAF rendering.
- [x] Identify missing command, revision and frame identities.
- [x] Separate source-canvas rendering from CRT presentation proof.
- [x] Define zero-frame proof for rejected or repeated commands.
- [ ] Implement frame correlation later.

## Current render path

```txt
keydown
  -> direct state/camera/navigation mutation
  -> RAF reads current mutable state
  -> drawWorld + drawUI
  -> crt.render
  -> no command/result provenance
```

## Missing frame evidence

```txt
keyboard command ID
keyboard session and focus generation
campaign predecessor/successor revision
camera predecessor/successor revision
phase/navigation consumption receipt
source-frame ID
CRT-presented-frame ID
first visible keyboard-result acknowledgement
stale frame rejection
```

## Required projection

```txt
accepted CampaignKeyboardResult
  -> consumer commits identified revisions
  -> render snapshot cites result and revisions
  -> CRT presentation cites source frame
  -> first visible frame acknowledgement closes the transaction

rejected CampaignKeyboardResult
  -> no campaign/camera/navigation mutation
  -> no successor-frame requirement except optional rejection feedback
```

## Validation boundary

No rendering behavior changed. No browser frame probe or screenshot fixture was executed.