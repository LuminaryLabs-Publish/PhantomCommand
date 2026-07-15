# PhantomCommand Next Steps

**Timestamp:** `2026-07-15T18-39-30-04-00`

## Summary

Add one campaign pointer-feedback authority that observes pointer presence, derives immutable hover candidates, renders a visible reticle or equivalent affordance, and binds committed commands to the feedback revision the player saw.

## Plan ledger

**Goal:** make hidden-cursor pointer play legible, revision-correct and lifecycle-safe without moving campaign truth into presentation.

- [ ] Add `CampaignPointerFeedbackPolicy` and `InputSurfaceGeneration`.
- [ ] Publish monotonic `PointerSampleRevision` values.
- [ ] Observe pointer enter, move, leave, cancel, blur and route retirement.
- [ ] Reuse the accepted spatial-input projection result rather than creating a second coordinate authority.
- [ ] Query immutable ally, pad, enemy, ground and drag candidates.
- [ ] Publish explicit outside and no-candidate results.
- [ ] Add selection-candidate preview.
- [ ] Add build-pad hover and availability preview.
- [ ] Add enemy order and ground-anchor preview.
- [ ] Add drag candidate membership preview.
- [ ] Add a rendered reticle whenever the native cursor remains hidden.
- [ ] Define contrast-safe semantic roles for reticle and candidate marks.
- [ ] Settle feedback under pause, terminal, blur, pointerleave, pointercancel and route exit policy.
- [ ] Reject stale surface, projection, camera, entity-set and pad-set evidence.
- [ ] Require pointer commands to cite the accepted feedback revision where continuity is required.
- [ ] Publish `PointerFeedbackResult` and `PointerFeedbackFrameResult`.
- [ ] Publish `FirstPointerFeedbackFrameAck`.
- [ ] Extend static checks only after implementation markers exist.
- [ ] Execute source, built-output and Pages browser fixtures.

## Completion gate

```txt
one pointer feedback policy revision
one active input surface generation
one accepted projection authority
one immutable candidate result per admitted sample
one visible pointer affordance under hidden-cursor policy
explicit outside and miss results
candidate preview agrees with committed command
stale feedback cannot mutate a successor state
blocking overlays settle feedback explicitly
one matching pointer-feedback frame acknowledgement
source build and Pages fixtures pass
```

Do not claim pointer-feedback correctness until candidate-to-command continuity, lifecycle, contrast and deployed-origin fixtures pass.