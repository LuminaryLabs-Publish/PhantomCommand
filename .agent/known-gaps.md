# PhantomCommand Known Gaps

**Timestamp:** `2026-07-14T13-40-59-04-00`

## Summary

Campaign victory and defeat are independent mutable flags. A final sanctum breach can remove the last enemy, set defeat and then satisfy final-wave clear logic in the same fixed step, allowing victory, rewards, persistence and victory presentation to follow.

## Plan ledger

**Goal:** keep every blocker to exclusive campaign terminal settlement explicit.

- [x] Record current source-backed terminal gaps.
- [ ] Close them through runtime implementation and executable headless/browser proof.

## Current terminal gaps

```txt
campaign RunId: absent
fixed-step StepId: absent
wave revision identity: absent
terminal proposal envelope: absent
sanctum-loss proposal: direct mutation only
final-wave-clear proposal: direct mutation only
terminal conflict classifier: absent
versioned outcome precedence: absent
exclusive accepted outcome: absent
outcome fingerprint: absent
reward-policy revision: absent
wave reward settlement receipt: absent
victory save candidate identity: absent
save commit result: absent
immutable public terminal readback: absent
terminal projection descriptor: absent
first terminal-frame acknowledgement: absent
retry command: page reload only
retry lineage: absent
stale predecessor rejection: absent
bounded outcome journal: absent
source/build/Pages conflict fixtures: absent
```

## Current risks

```txt
won and lost can both be true
victory can visually mask defeat
wave-clear rewards can apply after sanctum destruction
victory persistence can be attempted from a conflicting step
public readback can expose contradictory flags
raw reload discards predecessor evidence
terminal policy depends on function ordering
source-marker checks can pass while terminal behavior is wrong
static build can succeed without terminal correctness
```

## Retained gaps

The browser-startup, settings, durable save/resume, route-resource retirement, scheduler, WebGL recovery, accessibility, spatial/keyboard input, public-host, phase and combat gaps remain retained in their timestamped audits.