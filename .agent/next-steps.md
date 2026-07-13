# PhantomCommand Next Steps

**Timestamp:** `2026-07-13T11-41-10-04-00`

## Summary

Implement Fixed-Step Frame Scheduler Authority before claiming deterministic cadence, smooth high-refresh presentation, explainable hitch handling or visible-frame provenance. Start with scheduler identity and typed wall-time/drain results, then add immutable presentation frames, interpolation, visibility generations and executable browser proof.

## Plan ledger

**Goal:** preserve the existing 60 Hz gameplay model while making every admitted step, discarded duration and visible frame explicit and reproducible.

### Scheduler identity

- [ ] Add a stable scheduler ID and monotonic scheduler generation.
- [ ] Bind scheduler state to route, campaign session and lifecycle generation.
- [ ] Publish Running, Paused, Suspended, Retired and Failed states.
- [ ] Reject callbacks and commands from predecessor generations.

### Wall-time admission

- [ ] Give each RAF timestamp a `WallTimeSampleId`.
- [ ] Replace implicit `Math.min(.05, elapsed)` with a versioned clamp policy.
- [ ] Publish elapsed, admitted and dropped wall time.
- [ ] Decide whether excess debt is retained or dropped under each policy.
- [ ] Record first-frame and first-resume elapsed handling.

### Fixed-step drain

- [ ] Keep the fixed step at exactly `1/60` under a versioned policy.
- [ ] Set an explicit maximum step budget per frame.
- [ ] Return step count, accumulator before/after and simulation revisions.
- [ ] Distinguish NoStep, Advanced, Paused, Terminal, BudgetExhausted, Stale and Failed.
- [ ] Make restart and route exit retire predecessor drain work.

### Camera and presentation

- [ ] Publish a `CameraFrameState` from the same admitted wall-time sample.
- [ ] Retain previous and current immutable simulation snapshots.
- [ ] Calculate a bounded interpolation alpha from accumulator remainder.
- [ ] Build one `CampaignPresentationFrame` with temporal fingerprint.
- [ ] Make Canvas2D and CRT projection cite the exact frame ID.
- [ ] Use the admitted frame time for CRT effects instead of a second untracked sample.

### Visibility and lifecycle

- [ ] Add `visibilitychange` handling before RAF starts.
- [ ] Suspend the active scheduler generation while hidden.
- [ ] Allocate a successor generation or explicit resume transition when visible.
- [ ] Reset or classify elapsed time before admitting the first resumed frame.
- [ ] Reject stale RAF callbacks after suspension, restart or route exit.

### Public diagnostics

- [ ] Replace unversioned GameHost completion claims with typed command results.
- [ ] Expose detached scheduler, drain and presentation receipts.
- [ ] Expose dropped-time totals and last temporal discontinuity.
- [ ] Expose last complete visible frame ID and fingerprint.

### Proof

- [ ] Add deterministic 60, 90, 120 and 144 Hz cadence fixtures.
- [ ] Add 50 ms boundary and 250 ms hitch fixtures.
- [ ] Add pause, hidden/resumed, restart and terminal-state fixtures.
- [ ] Prove zero-step and multi-step frames produce bounded interpolation.
- [ ] Prove Canvas2D and CRT receive the same frame fingerprint.
- [ ] Prove the first visible frame acknowledges the matching scheduler generation.
- [ ] Run `npm run check` and `npm run build` after fixture wiring.
- [ ] Run source, built-output and Pages scheduler fixtures.

## Existing owners to update

```txt
game.html
src/campaign/campaign-scene.js
src/menu/crt-renderer.js
pixel-campaign-runtime-kit
fixed-step-campaign-simulation-kit
pixel-campaign-render-kit
crt-renderer-kit
legacy-gamehost-diagnostics-kit
campaign-static-check-kit
scripts/check-campaign.mjs
package.json
```

## Dependency order

```txt
Scheduler Identity
  -> Wall-Time Admission
  -> Fixed-Step Drain Results
  -> Temporal State Pair
  -> Interpolated Presentation Frame
  -> Canvas2D/CRT Projection Results
  -> Visibility and Resume Generations
  -> Public Readback
  -> source/build/Pages proof
```

The retained WebGL Context Lifecycle work remains required, but it must consume the presentation frame and scheduler identities rather than defining a second independent frame clock.