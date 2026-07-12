# PhantomCommand Known Gaps

**Timestamp:** `2026-07-12T07-29-32-04-00`

## Summary

The newest documented gap is menu audio activation and lifecycle authority. The menu can construct ambience and UI-tone nodes, but it has no context-state recovery, graph generation, delayed-work ownership or ordered retirement.

## Plan ledger

**Goal:** keep audio activation, runtime state and teardown explicit while preserving campaign, command, render, combat and persistence gates.

- [ ] Trusted user-activation evidence.
- [ ] Context and graph generation identity.
- [ ] AudioContext state observation and `statechange` handling.
- [ ] Suspended/interrupted context resume transaction.
- [ ] Closed/failed context replacement policy.
- [ ] Complete node and transient-tone registry.
- [ ] Delayed close timer identity and cancellation.
- [ ] Rapid-toggle overlap prevention.
- [ ] Visibility, pagehide and navigation retirement.
- [ ] Typed create/resume/suspend/stop/dispose results.
- [ ] Audio diagnostics and bounded journal.
- [ ] Real-browser activation, interruption and teardown fixtures.
- [ ] Retain campaign bootstrap/resume and all downstream authority gates.

## Audio lifecycle gaps

```txt
context state observation: absent
context statechange subscription: absent
resume path: absent
suspend policy: absent
trusted activation receipt: absent
context generation: absent
graph generation: absent
complete node registry: absent
transient tone ownership: absent
delayed close task identity: absent
delayed close cancellation: absent
rapid replacement fence: absent
visibilitychange adapter: absent
pagehide adapter: absent
navigation retirement: absent
module disposal API: absent
typed lifecycle results: absent
audio observation/journal: absent
browser lifecycle fixtures: absent
```

## Concrete risks

```txt
browser-suspended audio can remain permanently silent because ensureAudio() returns on non-null state.audio
closed or interrupted contexts can remain represented as current
rapid ambience off/on can overlap old and new graph generations
stale delayed close callbacks have no generation fence
transient tones and intermediate nodes are not registered for disposal
navigation can transfer page ownership without an explicit audio terminal result
settings can display ambience enabled while no running context is proven
unrelated keydown events can attempt audio activation before command classification
```

## Retained gaps

```txt
Campaign Begin and Continue still lack validated bootstrap and hydration
GameHost exposes live mutable owners
CPU and GLSL CRT projection differ
campaign phase does not fence commands
commands are not fixed-step scheduled
combat liveness and exclusive terminal result remain unimplemented
runtime RAF/listener/WebGL lifecycle remains unowned
full checkpoint capture and replay remain incomplete
```

## Completion boundary

Do not claim audio activation or lifecycle correctness because nodes were constructed or `state.audio` is non-null. Completion requires observed context state, generation-safe transactions, ordered teardown and real-browser evidence.