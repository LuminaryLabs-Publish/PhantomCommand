# PhantomCommand Known Gaps

**Timestamp:** `2026-07-11T03-41-49-04-00`

## Summary

The current product can run correctly in a one-shot page load, but it cannot prove safe construction, remount, transition, restart or disposal. The gaps below are ordered by dependency.

## Plan ledger

**Goal:** keep unresolved risks explicit and prevent unrelated feature work from obscuring the required authority gates.

- [ ] Continue/save-candidate resolution.
- [ ] Campaign action-result and fixed-step command authority.
- [ ] Runtime session lifecycle authority.
- [ ] Versioned full-session save and resume fidelity.
- [ ] Broader content and presentation work only after those gates.

## Queue-head gaps

### Continue resolution

```txt
three keys x two storage layers collapse to Boolean presence
candidate parse/schema/version/provenance is discarded
menu calls presence detection twice
campaign ignores campaign=new|continue
victory payload is not resumable state
```

### Campaign action authority

```txt
input and GameHost mutate live state directly
no command identity, sequence or target tick
invalid requests silently return
no typed result or reason catalog
no replay journal or canonical fingerprint
render has no committed-frame identity
```

## Lifecycle gaps

### Session ownership

```txt
menu and campaign allocate at module scope
no route-session object
no sessionId, runId or runGeneration
no explicit lifecycle state
no startup result or startup rollback
```

### Animation frame

```txt
request IDs are discarded
no cancelAnimationFrame path
no stale-callback fence
no one-pending-request invariant
no stop or restart transaction
```

### Event listeners

```txt
multiple anonymous handlers
no registration ledger
no deterministic removal
canvas, document and window ownership is fragmented
```

### Globals

```txt
window.PhantomMenu and window.GameHost overwrite prior values
no ownership token
no restore-on-dispose behavior
GameHost exposes mutable state and camera
CRT renderer exposes raw WebGL context
```

### Audio and timers

```txt
AudioContext and graph are not session-owned
looping sources are not tracked in a disposal ledger
delayed context-close timer is not retained
menu transition and audio shutdown have no shared completion result
```

### CRT/WebGL

```txt
no dispose method
no deleteTexture, deleteBuffer or deleteProgram
shader lifecycle is incomplete
no disposed-state guard
no render-after-dispose rejection
no resource counters or disposal proof
```

### Navigation and restart

```txt
menu assigns location after fade without explicit teardown
campaign uses location.reload and location.href directly
input remains admitted during transition
navigation completion has no typed result
teardown is not awaited or observable
```

### Failure handling

```txt
partial startup has no reverse cleanup stack
later initialization failure can leak earlier resources
no failed terminal state
no last error or cleanup report
```

## Validation gaps

```txt
current checks are source-pattern checks
no fake RAF scheduler fixture
no listener parity fixture
no global lease fixture
no audio lifecycle fixture
no WebGL resource fixture
no startup rollback fixture
no remount fixture
no menu-to-campaign teardown fixture
no restart/exit fixture
no browser resource-retention smoke
```

## Do not claim

Do not claim lifecycle safety, restart safety, remount safety, resource cleanup, or render disposal until the lifecycle fixture gate and browser smoke pass on `main`.
