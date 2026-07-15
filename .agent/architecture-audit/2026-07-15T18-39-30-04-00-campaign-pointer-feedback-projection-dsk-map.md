# Campaign Pointer Feedback Projection DSK Map

**Timestamp:** `2026-07-15T18-39-30-04-00`  
**Status:** `campaign-pointer-feedback-projection-authority-audited`

## Summary

The current campaign input and render kits know the pointer position and accepted campaign state, but no coordinating domain turns an admitted pointer sample into visible candidate feedback before commands commit.

## Plan ledger

**Goal:** map existing owners and the minimum coordinating DSK family needed for revision-bound pointer feedback.

- [x] Preserve existing input, camera, gameplay and render ownership.
- [x] Identify the missing projection boundary.
- [x] Define command, result, frame-plan and acknowledgement surfaces.
- [ ] Implement the coordinating domain.
- [ ] Prove source, build and Pages behavior.

## Existing ownership

```txt
crt-renderer-kit
  owns screen containment, source texture presentation and screenToSource

pixel-campaign-runtime-kit
  owns pointer samples, camera, selection, pad state, orders and input mutation

fixed-step-campaign-simulation-kit
  owns campaign truth advancement

pixel-campaign-render-kit
  owns accepted world, HUD, minimap, drag outline and CRT submission

campaign-route-shell-kit
  hides the native cursor and owns the public canvas route
```

## Missing parent domain

```txt
phantom-command-campaign-pointer-feedback-projection-authority-domain
```

## Proposed DSK hierarchy

```txt
campaign-pointer-feedback-projection-authority-domain

  policy
    campaign-pointer-feedback-policy-kit
    pointer-visibility-mode-kit
    cursor-contrast-policy-kit

  identity and revisions
    campaign-input-surface-generation-kit
    pointer-sample-revision-kit

  observation and projection
    pointer-presence-observer-kit
    screen-source-pointer-projection-kit
    pointer-hover-query-kit
    pointer-hover-target-result-kit

  semantic previews
    selection-candidate-preview-kit
    order-target-preview-kit
    build-pad-hover-preview-kit
    drag-selection-preview-kit

  presentation
    pointer-reticle-descriptor-kit
    pointer-feedback-frame-plan-kit
    pointer-feedback-result-kit
    first-pointer-feedback-frame-ack-kit

  lifecycle and proof
    stale-pointer-feedback-rejection-kit
    browser-pointer-feedback-fixture-kit
```

## Command and result map

```txt
PointerSampleCommand
  input:
    InputSurfaceGeneration
    PointerSampleRevision
    ViewportRevision
    CrtTransformRevision
    CameraRevision
    EntitySetRevision
    PadSetRevision
    SelectionRevision

  output:
    PointerFeedbackResult
      status
      sourcePoint
      worldPoint
      inside
      hoverTarget
      selectionCandidates
      buildCandidate
      orderCandidate
      reticleDescriptor
      cited revisions

PointerFeedbackFrameCommand
  input:
    accepted PointerFeedbackResult
    RenderFrameRevision

  output:
    PointerFeedbackFrameResult
    FirstPointerFeedbackFrameAck
```

## Admission rules

```txt
outside source bounds -> explicit outside result and no gameplay candidate
stale surface generation -> reject
stale camera or CRT transform -> recompute or reject
stale entity or pad set -> reject candidate
retired route -> reject
no target -> publish explicit ground or miss feedback
hidden pointer policy -> require an equivalent rendered reticle
native pointer policy -> do not render a duplicate unless requested
command commit -> cite the feedback revision when policy requires preview continuity
```

## Ownership constraint

The new domain may derive and project feedback only. It must not mutate campaign truth, select units, build towers, issue orders, move the camera or replace the prior spatial-input admission authority.