# PhantomCommand Known Gaps

**Timestamp:** `2026-07-12T03-00-46-04-00`

## Summary

The newest gap is campaign phase admission. Pause and terminal flags stop fixed-step simulation, but they do not close command mutation. Wave start, construction, selection, orders, tower-type changes, camera controls, and public host mutation are not governed by one phase policy or typed result.

## Plan ledger

**Goal:** keep unresolved risks dependency ordered and fixture bounded.

- [ ] Continue candidate resolution and startup admission.
- [ ] Public host owner quarantine and typed command admission.
- [ ] CRT display/input projection parity and outside-region admission.
- [ ] Campaign phase admission and mutation fencing.
- [ ] Fixed-step command scheduling and committed frame.
- [ ] Public host committed read model.
- [ ] Deterministic combat and exclusive terminal result.
- [ ] Runtime session lifecycle, teardown and restart.
- [ ] Versioned checkpoint capture, migration and atomic resume.

## Campaign phase gaps

```txt
paused/waveActive/won/lost are independent booleans
no canonical phase enum
no phase ID or revision
no legal phase-transition table
no action-kind phase policy matrix
update() is paused/terminal fenced but commands are not
Space while paused can create spawn[], set waveActive and change message
build while paused can spend Souls and create towers
order while paused can mutate target/move state and append effects
selection remains mutable while paused and terminal
build/order remain reachable after won or lost
number keys and P remain reachable after terminal
camera policy is implicit
GameHost bypasses phase admission
no typed accepted/rejected result
no stale phase-revision rejection
no action/phase/tick/frame correlation
no paused/terminal zero-mutation fixture
```

## Projection gaps

```txt
GLSL applies contain then curve
CPU screenToSource applies contain only
CPU mapper has no CRT settings input
campaign handlers ignore mapping inside flag
post-curve black and letterbox regions can issue actions
no projection ID/revision or visible-frame receipt
no CPU/GLSL parity or browser pixel-pick fixture
```

## Public host gaps

```txt
window.GameHost exposes live state and camera
public callers bypass command and phase admission
startWave, build and setZoom return no typed result
setZoom accepts NaN
getState has no run, phase, simulation or frame provenance
no capability descriptor, command ID or bounded journal
no stale-host rejection after navigation/disposal
window.PhantomMenu has no session identity or teardown fence
```

## Continue and checkpoint gaps

```txt
three save keys are accepted by presence only
localStorage and sessionStorage have no source precedence
candidate bytes are not parsed before Continue enablement
campaign query intent is not parsed
campaign startup always creates fresh defaults
current save is a legacy terminal summary only
no schema, migration, quarantine, rollback or first resumed-frame receipt
```

## Existing downstream gaps

```txt
Commands: browser callbacks mutate live state outside fixed-step scheduling
Clock: commands have no deterministic schedule or replay identity
Combat: deleted captured entities can still act
Terminal: won and lost can both commit
Lifecycle: RAF, listeners, audio, WebGL and globals lack teardown
Checkpoint capture: no stable-boundary or full-state policy
```

## Validation gaps

```txt
no phase derivation fixture
no phase-transition table fixture
no paused zero-mutation fixture
no terminal zero-mutation fixture
no public-host phase parity fixture
no stale phase-revision fixture
no phase/action/frame receipt fixture
no CPU/GLSL projection parity fixture
no public owner-isolation fixture
no save-candidate precedence fixture
no atomic hydration rollback fixture
no browser lifecycle smoke
```

## Do not claim

Do not claim phase correctness, pause safety, terminal immutability, action admission, projection parity, command safety, Continue, checkpoint compatibility, terminal integrity or lifecycle correctness until the corresponding fixtures pass on `main`.