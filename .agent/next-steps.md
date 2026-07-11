# PhantomCommand Next Steps

**Timestamp:** `2026-07-11T19-48-09-04-00`

## Summary

Keep the existing dependency order. When Gate 3 is reached, replace module-scope ownership and direct navigation with session factories, resource leases, typed stop/dispose commands and a first-frame-confirmed replacement generation.

## Plan ledger

**Goal:** make all public work belong to one session and prove it is retired before navigation or restart.

- [ ] Finish Gates 1 and 2 identities first.
- [ ] Extract menu and campaign runtime factories.
- [ ] Add sessionId, runEpoch and runtimeGeneration.
- [ ] Add a resource lease registry.
- [ ] Retain RAF IDs and named listener functions.
- [ ] Add timer, audio, CRT and global capability leases.
- [ ] Add stale-callback fences.
- [ ] Add idempotent stop and dispose commands.
- [ ] Replace direct navigation/reload with typed results.
- [ ] Add pagehide/pageshow policy.
- [ ] Prove first replacement frame and repeated-cycle leak freedom.

## Gate 3 implementation sequence

1. Create `createMenuRuntime()` and `createCampaignRuntime()` factories with no module-evaluation side effects.
2. Define lifecycle phases: `CREATED`, `STARTING`, `READY`, `STOPPING`, `STOPPED`, `DISPOSING`, `DISPOSED`, `FAILED`.
3. Allocate `sessionId` and `runtimeGeneration` before any callback or global is published.
4. Register every RAF, listener, timer, audio node/context, WebGL object and global as a lease.
5. Extend `createCrtRenderer()` with idempotent resource disposal.
6. Convert anonymous listeners to named handlers retained by the lease registry.
7. Fence every callback against session, generation and lifecycle phase.
8. Implement `StopSessionCommand` and cancel frame/timer work first.
9. Implement reverse-order `DisposeSessionCommand`.
10. Revoke `PhantomMenu` and `GameHost` before navigation.
11. Implement explicit bfcache policy on `pagehide` and `pageshow`.
12. Implement `NavigateCommand` and `RestartCommand`.
13. Publish readiness only after the first replacement-generation frame.
14. Add lifecycle journal and leak counters.

## Target files

```txt
src/runtime/session-lifecycle.js
src/runtime/resource-lease-registry.js
src/runtime/lifecycle-results.js
src/menu/graveyard-menu.js
src/menu/crt-renderer.js
src/campaign/campaign-scene.js
tests/runtime-lifecycle.fixture.mjs
tests/runtime-resource-retirement.fixture.mjs
scripts/smoke-runtime-restart.mjs
package.json
```

## Required fixtures

```txt
menu start -> one RAF, expected listeners and one global
menu dispose -> zero RAF, listeners, timers, audio and global leases
campaign start -> one RAF and one GameHost generation
campaign dispose -> zero callbacks and revoked GameHost
CRT dispose twice -> idempotent, no live owned objects
pagehide persisted -> declared suspend or dispose policy
pageshow persisted -> declared resume or new generation
restart -> old generation rejects callbacks
20 menu/campaign/restart cycles -> stable lease and WebGL counts
first replacement frame -> matching sessionId, generation and frameId
```
