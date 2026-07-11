# PhantomCommand Known Gaps

**Timestamp:** `2026-07-11T05-50-43-04-00`

## Summary

PhantomCommand still lacks four connected authority boundaries: candidate resolution, fixed-step command results, runtime lifecycle ownership and full versioned checkpoint/resume fidelity. Continue is not operational until all four gates are implemented and fixture-gated.

## Plan ledger

**Goal:** keep unresolved risks explicit, ordered by dependency and separated from unrelated feature work.

- [ ] Continue/save-candidate resolution.
- [ ] Campaign action-result and fixed-step command authority.
- [ ] Runtime session lifecycle authority.
- [ ] Versioned checkpoint capture and atomic resume authority.
- [ ] First-frame resume acknowledgement.
- [ ] Broader content and presentation work only after those gates.

## Gate 1: Continue resolution gaps

```txt
three keys x two storage layers collapse to Boolean presence
candidate parse/schema/version/content/provenance is discarded
menu calls presence detection more than once during construction
candidate precedence is undefined
campaign ignores campaign=new|continue
candidate identity is not carried into startup
```

## Gate 2: Campaign action authority gaps

```txt
input and GameHost mutate live state directly
no command identity, sequence or target tick
invalid requests silently return
no typed result or reason catalog
no replay journal or canonical fingerprint
render has no committed-frame identity
```

## Gate 3: Lifecycle gaps

### Session ownership

```txt
menu and campaign allocate at module scope
no route-session object
no sessionId, runId or runGeneration
no explicit lifecycle state
no startup result or startup rollback
```

### Animation frame and event ownership

```txt
RAF request IDs are discarded
no cancelAnimationFrame path
no stale-callback fence
multiple anonymous listeners
no deterministic listener removal
no timer or global lease ledger
```

### Audio and CRT ownership

```txt
AudioContext, sources and nodes are not session-owned
delayed context-close timer is not retained
CRT renderer has no dispose method
no deleteTexture/deleteBuffer/deleteProgram proof
no render-after-dispose rejection
```

### Navigation and restart

```txt
menu assigns location after fade without explicit teardown
campaign uses location.reload and location.href directly
input remains admitted during transition
navigation completion has no typed result
teardown is not awaited or observable
```

## Gate 4: Checkpoint and resume gaps

### Current save format

```txt
writes only after victory
payload: { scene, souls, wave }
no schema identity
no schema version
no campaign content identity/version
no checkpoint ID
no simulation tick
no command sequence cursor
no canonical state fingerprint
```

### Missing authoritative state

```txt
core health and elapsed time
waveActive and spawn queue
units and their combat/movement state
towers and pad ownership
projectiles and targets
selection and selected pad
tower type and camera continuity
uid/pid/tid counters
paused/won/lost/message state
```

### Missing load path

```txt
campaign never reads a candidate
campaign never parses or validates a save
no migration registry
no staged hydration
no reference rebuilding
no invariant validation
no atomic state replacement
no rollback
no resume epoch
```

### Missing relational proof

```txt
pad tower IDs may not resolve
selected IDs may not resolve
projectile targets may not resolve
spawn entries may reference invalid archetypes/lanes
restored counters may collide
terminal flags may conflict
fingerprint parity is unavailable
```

### Missing frame proof

```txt
no checkpoint fingerprint on render input
no resume epoch on render input
no world/HUD/minimap application result
no CRT upload acknowledgement
no first resumed-frame completion barrier
stale pre-resume RAF callbacks are not fenced
```

## Validation gaps

```txt
current checks are source-pattern checks
no candidate precedence fixture
no command/replay/committed-frame fixture
no fake RAF/listener/global/audio/WebGL lifecycle fixture
no checkpoint roundtrip fixture
no migration fixture
no malformed/corrupt candidate fixture
no relational invariant fixture
no hydration rollback fixture
no duplicate/stale Resume command fixture
no first-frame resume fixture
no browser Continue/resume smoke
```

## Do not claim

Do not claim Continue works, campaign resume, full save fidelity, migration safety, corruption safety, atomic load, lifecycle safety, restart safety or first-frame fidelity until the ordered fixture gates and browser smoke pass on `main`.
