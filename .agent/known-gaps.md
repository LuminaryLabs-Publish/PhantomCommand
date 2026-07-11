# PhantomCommand Known Gaps

**Timestamp:** `2026-07-11T13-28-37-04-00`

## Summary

PhantomCommand still lacks connected startup, projection, command, phase, fixed-step, terminal, lifecycle and checkpoint authority gates. The newly isolated terminal defect allows one fixed update to set both `lost` and `won`, display victory and write a success save after the sanctum reaches zero health.

## Plan ledger

**Goal:** keep unresolved risks explicit, source-backed and ordered by dependency.

- [ ] Continue/save-candidate resolution.
- [ ] CRT display/input projection parity.
- [ ] Campaign command and phase admission.
- [ ] Fixed-step command scheduling, clock-overrun and replay authority.
- [ ] Committed-tick and render-frame authority.
- [ ] Exclusive terminal-outcome arbitration and persistence admission.
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
paused, won and lost are independent Boolean flags
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

### Replay and render proof

```txt
no simulationTickId
no appliedCommandCursor
no ordered domain-event journal
no canonical state fingerprint
no replay input journal
no immutable render snapshot
no frameId or committed-tick receipt
no consumer acknowledgements
```

## Gate 2d: Terminal outcome gaps

### Conflicting terminal state

```txt
updateUnit can set lost = true
parent update continues after defeat evidence
final-wave clear can then set won = true
state can contain won === true and lost === true
no exclusive terminal outcome enum
no arbitration priority policy
no terminal latch or transition result
```

### Defeat/victory ordering

```txt
core breach is a mutation inside unit iteration
wave clear is evaluated later in the same update
no evidence collection phase
no pure predicate evaluation
no atomic terminal commit
no monotonic run-epoch outcome
```

### Presentation

```txt
overlay checks won before lost
conflicting state is projected as victory
GameHost reports both booleans
no terminal result ID or committed terminal frame
no consumer acknowledgement for HUD, overlay, CRT or diagnostics
```

### Persistence

```txt
final-wave branch writes a victory save immediately
save admission does not require core > 0
save admission does not reject defeat evidence
save contains no terminal result ID, tick, command cursor or fingerprint
storage errors are swallowed
contradictory victory save can enable Continue
```

### Restart

```txt
R calls location.reload()
no terminal result acknowledgement
no run epoch increment
no input retirement or ordered teardown
no typed restart result
no first post-restart frame proof
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
no committed tick, command cursor or terminal result ID
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
no cadence, stall or replay fixture
no simultaneous core-breach/final-wave-clear fixture
no terminal exclusivity or latch fixture
no terminal persistence-admission fixture
no terminal render-consumer fixture
no lifecycle fixture
no checkpoint roundtrip/migration/corruption/rollback fixture
no browser pointer, cadence, terminal or resume smoke
```

## Do not claim

Do not claim Continue works, pointer targeting is exact, pause freezes authoritative mutation, commands are deterministic, stalls preserve declared time, replays reproduce state, frames correspond to a committed tick, win/loss is exclusive, victory persistence is valid, restart is lifecycle-safe or checkpoint resume works until the corresponding fixtures pass on `main`.