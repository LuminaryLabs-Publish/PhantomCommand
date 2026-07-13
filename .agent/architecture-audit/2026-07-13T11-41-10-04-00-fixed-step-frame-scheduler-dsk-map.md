# Fixed-Step Frame Scheduler DSK Map

**Timestamp:** `2026-07-13T11-41-10-04-00`

## Summary

The campaign currently combines wall-time sampling, camera integration, fixed-step simulation, mutable state rendering and CRT submission inside one route function without typed temporal identities or results. The correct boundary is a composed scheduler authority, not additional logic inside rendering or combat.

## Plan ledger

**Goal:** separate temporal admission, simulation advancement, presentation construction and visible proof into bounded domains while preserving existing gameplay and rendering ownership.

- [x] Map current owners.
- [x] Identify the missing parent authority.
- [x] Preserve the 20 implemented kits.
- [x] Define minimal subordinate kits and their service boundaries.
- [x] Keep browser RAF and WebGL as adapters.
- [ ] Implement and prove later.

## Current ownership

```txt
browser RAF adapter
  owns callback delivery and wall timestamp

pixel-campaign-runtime-kit
  owns mutable camera/input/campaign state

fixed-step-campaign-simulation-kit
  owns 1/60 simulation updates

pixel-campaign-render-kit
  reads mutable state and draws Canvas2D

crt-renderer-kit
  uploads source canvas and submits WebGL CRT pass
```

## Missing parent domain

```txt
phantom-command-fixed-step-frame-scheduler-authority-domain
```

It owns temporal identity and admission only. It does not own combat rules, camera semantics, Canvas2D drawing or WebGL implementation.

## Required subordinate domains

```txt
Frame Scheduler Identity
  services: scheduler ID, generation, lifecycle state

Wall Time Admission
  services: sample identity, elapsed classification, clamp and dropped-time result

Fixed-Step Drain
  services: step budget, drain command, step count, simulation revision

Temporal State Pair
  services: previous/current immutable snapshots, interpolation alpha

Presentation Frame
  services: frame identity, camera/state revisions, fingerprint

Visibility Transition
  services: hidden/resumed generation, first-resume policy, stale callback rejection

Projection Admission
  services: source projection result, CRT result, complete/partial/failed classification

Visible Frame Proof
  services: public readback, first matching frame acknowledgement
```

## Candidate kits

```txt
frame-scheduler-id-kit
frame-scheduler-generation-kit
frame-scheduler-state-kit
wall-time-sample-kit
wall-time-clamp-policy-kit
dropped-time-result-kit
fixed-step-budget-kit
fixed-step-drain-command-kit
fixed-step-drain-result-kit
simulation-revision-kit
temporal-state-pair-kit
camera-frame-state-kit
interpolation-alpha-kit
campaign-presentation-frame-kit
presentation-frame-fingerprint-kit
visibility-transition-kit
resume-frame-policy-kit
stale-raf-rejection-kit
frame-projection-command-kit
frame-projection-result-kit
frame-presentation-journal-kit
public-frame-readback-kit
first-visible-frame-ack-kit
high-refresh-cadence-fixture-kit
hitch-drop-time-fixture-kit
visibility-resume-fixture-kit
source-build-pages-scheduler-fixture-kit
```

## Composition

```txt
RAF callback
  -> WallTimeAdmissionResult
  -> FixedStepDrainResult
  -> TemporalStatePair
  -> CampaignPresentationFrame
  -> CanvasProjectionResult
  -> CrtPresentationResult
  -> FrameCommitResult
  -> VisibleFrameAck
```

## Boundaries

```txt
combat remains in fixed-step-campaign-simulation-kit
camera policy remains in pixel-campaign-runtime-kit
Canvas2D drawing remains in pixel-campaign-render-kit
GPU lifecycle remains in crt-renderer-kit and the retained WebGL lifecycle authority
scheduler authority coordinates revisions and results but does not absorb those domains
```

## Failure contract

A stale, hidden, superseded or failed frame cannot mutate the committed scheduler generation or claim visible completion. Dropped wall time must be explicit and bounded. A partial Canvas2D/CRT result must retain the last complete visible frame or publish a degraded result.