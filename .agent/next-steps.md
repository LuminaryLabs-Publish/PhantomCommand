# PhantomCommand Next Steps

**Timestamp:** `2026-07-15T13-41-25-04-00`

## Summary

Add one menu-audio lifecycle authority that owns browser capability, context generation, unlock/resume, persistent ambience, transient cues, route settlement and exact retirement.

## Plan ledger

**Goal:** make every audio resource and callback belong to one accepted generation and terminate with an immutable result.

- [ ] Add `MenuAudioPolicy` and `AudioContextGeneration`.
- [ ] Observe `AudioContext.state` and browser capability.
- [ ] Resume an existing suspended context after an accepted gesture.
- [ ] Add stable persistent-source and transient-cue leases.
- [ ] Separate ambience preference from UI-cue policy if product intent requires it.
- [ ] Bind every cue to route, interaction and audio generations.
- [ ] Deduplicate stale and duplicate cue requests.
- [ ] Add explicit hidden-document suspend or silence policy.
- [ ] Add route-transition audio settlement.
- [ ] Add `pagehide` retirement.
- [ ] Stop and disconnect persistent and transient nodes exactly once.
- [ ] Bind delayed callbacks to the originating generation.
- [ ] Reject late callbacks after a successor generation is adopted.
- [ ] Publish `MenuAudioUnlockResult`, `MenuAudioProjectionResult` and `MenuAudioSettlementResult`.
- [ ] Publish `FirstAudibleMenuFrameAck` and `FirstSilentRouteTransitionAck`.
- [ ] Extend static checks with lifecycle markers only after runtime implementation.
- [ ] Execute source, built-output and Pages browser fixtures.

## Completion gate

```txt
one audio policy revision
one active context generation
accepted gesture required for unlock or resume
one lease per persistent source
one lease per transient cue
one terminal result per command
one declared visibility policy
one route-settlement result
one page-retirement receipt
no stale callback can affect a successor
one audible acknowledgement
one silent transition acknowledgement
```

Do not claim browser-audio correctness until suspended-context, visibility, route, retirement and stale-callback fixtures pass.