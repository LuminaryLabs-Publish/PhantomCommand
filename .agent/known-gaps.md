# PhantomCommand Known Gaps

**Timestamp:** `2026-07-11T11-51-06-04-00`

## Summary

PhantomCommand still lacks four connected authority gates. Within campaign action authority, the fixed-step update does not own command application, clock overruns or frame publication, so deterministic replay and committed-frame proof remain absent.

## Plan ledger

**Goal:** keep unresolved risks explicit and ordered by dependency.

- [ ] Continue/save-candidate resolution.
- [ ] CRT display/input projection parity.
- [ ] Campaign command and phase admission.
- [ ] Fixed-step command scheduling, clock-overrun and replay authority.
- [ ] Committed-tick and render-frame authority.
- [ ] Runtime session lifecycle authority.
- [ ] Versioned checkpoint capture and atomic resume authority.

## Gate 1: Continue resolution gaps

```txt
three keys x two storage layers collapse to Boolean presence
candidate parse/schema/version/content/provenance is discarded
candidate precedence is undefined
campaign ignores campaign=new|continue
candidate identity is not carried into startup
```

## Gate 2a: Projection gaps

```txt
shader: containUv -> curveUv -> source sample
pointer: contain correction only
no transform revision or typed rejection reason
click, order and wheel anchor use mismatched coordinates
drag selection uses a two-corner world AABB instead of visual inclusion
```

## Gate 2b: Command and phase gaps

```txt
pointer, keyboard and GameHost mutate live state
no command identity, source, sequence or target tick
invalid requests silently return
paused/won/lost are independent Boolean flags
no command-to-phase admission matrix
no typed command result or bounded journal
```

## Gate 2c: Fixed-step, clock and replay gaps

### Command scheduling

```txt
startWave, build, select and order apply in browser callbacks
pause and tower-type changes apply immediately
command ordering depends on callback timing relative to RAF
no deterministic (targetTick, sequence) queue
no duplicate or stale command handling
```

### Clock policy

```txt
wall-clock delta is capped at 50 ms
elapsed duration above 50 ms is silently discarded
maximum catch-up is an accidental consequence of the clamp
no hidden-tab policy
no clock-overrun result
no dropped-duration or catch-up counters
```

### Camera and projection timing

```txt
camera pan and zoom use variable frame delta outside fixed steps
pointer-to-world commands consume mutable camera state
no camera revision is carried into commands or frames
```

### Replay and state proof

```txt
no simulationTickId
no appliedCommandCursor
no ordered domain-event journal
no canonical state fingerprint
no replay input journal
same run cannot be reproduced from recorded commands
```

### Render proof

```txt
world/HUD/minimap/overlay read live mutable state
CRT time uses performance.now independently
no immutable render snapshot
no frameId or committed tick receipt
no consumer acknowledgements
no state/camera/projection/frame correlation
```

## Gate 3: Lifecycle gaps

```txt
menu and campaign allocate at module scope
RAF request IDs are discarded
anonymous listeners have no deterministic removal
no sessionId, runId or runGeneration
no startup rollback
no audio or CRT resource owner
navigation/reload bypass typed transition and teardown
```

## Gate 4: Checkpoint and resume gaps

```txt
victory writes only { scene, souls, wave }
no schema/content identity/checkpoint ID/fingerprint
no committed tick or command cursor
no full entity graph or identity counters
no load path, migration, staged hydration or reference rebuild
no atomic commit, rollback or resume epoch
no first resumed-frame acknowledgement
```

## Validation gaps

```txt
current checks are source-pattern checks
no candidate precedence fixture
no CPU/GLSL projection fixture
no command or phase fixture
no cadence-parity fixture
no irregular-frame fixture
no stall/visibility fixture
no command replay or state-fingerprint fixture
no committed-frame consumer fixture
no lifecycle fixture
no checkpoint roundtrip/migration/corruption/rollback fixture
no browser pointer, cadence, Continue or resume smoke
```

## Do not claim

Do not claim Continue works, pointer targeting is exact, pause freezes all authoritative mutation, fixed-step commands are deterministic, stalls preserve declared time, replays reproduce state, frames correspond to a committed tick, restart is lifecycle-safe or checkpoint resume works until the corresponding fixtures pass on `main`.