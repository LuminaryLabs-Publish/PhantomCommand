# PhantomCommand Known Gaps

**Timestamp:** `2026-07-12T11-48-43-04-00`

## Summary

The newest documented gap is runtime-session and resource lifecycle ownership. Both routes depend on page destruction to stop RAF loops, remove listeners, release WebGL resources, close audio and revoke public hosts.

## Plan ledger

**Goal:** require explicit, generation-bound startup and retirement for every callback and native browser resource.

- [ ] Runtime session identity, phase and generation.
- [ ] Detached candidate startup and typed start result.
- [ ] RAF, listener and timer leases.
- [ ] WebGL resource inventory and idempotent dispose.
- [ ] Complete shader/program/buffer/texture rollback.
- [ ] Context-loss and restoration generations.
- [ ] Audio resource lease and close receipt.
- [ ] Route transition retirement barrier.
- [ ] Public host revocation.
- [ ] Stale callback rejection.
- [ ] Lifecycle observations and bounded journal.
- [ ] Repeated-session, context-loss and Pages fixtures.
- [ ] Retain campaign pointer, menu pointer, bootstrap, host, combat, phase and checkpoint gates.

## Runtime lifecycle gaps

```txt
runtimeSessionId: no
runtimeGeneration: no
lifecycle phase: no
start command/result: no
retire command/result: no
RAF request ownership: no
listener lease registry: no
timer lease registry: no
resource ledger: no
WebGL dispose: no
context loss/restore handling: no
context generation: no
AudioContext retirement receipt: no
public host revocation: no
stale callback rejection: no
idempotent duplicate retirement: no
browser lifecycle fixtures: no
```

## Concrete risks

```txt
recursive RAF can schedule a successor without checking route retirement
anonymous listeners cannot be removed by an aggregate route owner
successful WebGL shaders, program, buffer and texture have no explicit retirement path
context loss has no typed degraded state or resource rebuild generation
menu audio close uses an untracked delayed timer
PhantomMenu and GameHost remain reachable until page destruction
stale callbacks have no session fence
repeated embedded or test mounts can accumulate callbacks/resources
```

## Retained gaps

```txt
Menu pointer misses can execute the selected action
Campaign Begin and Continue lack validated bootstrap and hydration
Campaign pointer commands ignore visible-surface and CRT-curve admission
GameHost exposes live mutable owners
Campaign phase does not fence commands
Commands are not fixed-step scheduled
Combat liveness and exclusive terminal result remain unimplemented
Menu audio activation policy remains incomplete
Full checkpoint capture and replay remain incomplete
```

## Completion boundary

Do not claim lifecycle correctness because navigation normally destroys the page. Completion requires explicit lease ownership, context recovery, idempotent retirement, host revocation, stale-callback rejection and real-browser repeated-session proof.