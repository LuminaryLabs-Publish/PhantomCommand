# PhantomCommand Known Gaps

**Timestamp:** `2026-07-12T04-18-44-04-00`

## Summary

The newest documented gap is menu audio lifecycle. The menu can create and close ambience, but it cannot prove that a retained context is running, resume a suspended context, retire nodes and timers at navigation/page lifecycle boundaries, or correlate the ambience setting with actual audible state.

## Plan ledger

**Goal:** keep audio ownership explicit and preserve the existing dependency queue.

- [ ] Audio context state admission and resume.
- [ ] Graph, voice and timer leases.
- [ ] Visibility, pagehide, bfcache and navigation policy.
- [ ] Typed start/suspend/resume/retire results.
- [ ] Browser audio lifecycle fixtures.
- [ ] Retain campaign phase, command, terminal, lifecycle and checkpoint gates.

## Audio lifecycle gaps

```txt
audio session ID: absent
context generation: absent
context.state observation: absent
context.resume path: absent
statechange listener: absent
visibility suspend/resume: absent
pagehide/pageshow handling: absent
transition teardown result: absent
graph node leases: absent
UI-tone voice leases: absent
delayed-close timer lease: absent
stale timer rejection: absent
typed lifecycle result: absent
audio observation/journal: absent
browser audio fixture: absent
```

## Concrete risks

```txt
suspended context remains non-null and ensureAudio returns without resume
rapid disable/enable can overlap old closing and new active generations
navigation relies on browser reclamation rather than explicit retirement
bfcache can preserve a page without a documented audio restore policy
settings can say ambience enabled without audible-state proof
```

## Retained gaps

```txt
Continue candidates are presence-only
CPU and GLSL projection differ
GameHost exposes live mutable owners
campaign phase does not fence commands
commands are not fixed-step scheduled
combat liveness and exclusive terminal result remain unimplemented
runtime RAF/listener/WebGL lifecycle remains unowned
checkpoint capture/resume remains incomplete
```

## Completion boundary

Do not claim audio lifecycle correctness because tones play in one browser session. Completion requires context-state results, generation fencing, complete lease retirement and browser proof across suspension, toggle churn, navigation and bfcache.
