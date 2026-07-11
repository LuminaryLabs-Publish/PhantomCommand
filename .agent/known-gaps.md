# PhantomCommand Known Gaps

**Timestamp:** `2026-07-11T19-48-09-04-00`

## Summary

The architecture still lacks connected Continue, projection, command, fixed-step, combat, terminal, lifecycle and checkpoint authority. The newest audit deepens Gate 3: module-scope RAF, listeners, audio, CRT WebGL objects and globals have no lease registry, deterministic teardown or generation fence.

## Plan ledger

**Goal:** keep unresolved risks explicit and ordered by dependency.

- [ ] Continue save-candidate resolution and startup admission.
- [ ] Display/input projection parity.
- [ ] Command, phase and fixed-step scheduling.
- [ ] Deterministic combat and exclusive terminal result.
- [ ] Runtime session lifecycle, teardown and restart.
- [ ] Versioned checkpoint capture and atomic resume.

## Runtime lifecycle gaps

```txt
menu and campaign allocate at module evaluation time
RAF IDs are discarded
recursive frames have no stop flag or generation fence
anonymous listeners cannot be deterministically removed
hidden menu buttons retain click listeners
AudioContext and looping sources are not mandatory teardown dependencies
audio close timeout is untracked
CRT renderer has no dispose() service
WebGL shaders, program, buffer and texture lack retirement receipts
window.PhantomMenu is not revoked
window.GameHost is not revoked
navigation relies on browser document replacement
restart uses location.reload()
Escape exit uses direct location assignment
no StopSessionCommand or DisposeSessionCommand
no teardown ordering or idempotency result
no pagehide/pageshow or bfcache policy
no first replacement-session frame acknowledgement
no repeated-cycle leak proof
```

## Existing earlier gates

```txt
Continue: raw slot presence, no selected candidate or atomic hydration
Projection: CPU mapping omits CRT curve
Commands: browser callbacks mutate live state
Clock: commands are outside fixed-step scheduling
Combat: deleted captured entities can still act
Terminal: won and lost can both commit
Checkpoint: no full schema, migration, reference rebuild or resume epoch
```

## Validation gaps

```txt
no menu teardown fixture
no campaign teardown fixture
no RAF-count fixture
no listener-count fixture
no audio retirement fixture
no CRT WebGL retirement fixture
no global revocation fixture
no bfcache pagehide/pageshow fixture
no restart-generation fixture
no repeated-cycle leak fixture
```

## Do not claim

Do not claim menu or campaign teardown, navigation safety, restart safety, bfcache safety, WebGL retirement or leak-free repeated sessions until the lifecycle fixtures pass on `main`.
