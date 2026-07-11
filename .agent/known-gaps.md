# PhantomCommand Known Gaps

**Timestamp:** `2026-07-11T16-49-51-04-00`

## Summary

PhantomCommand still lacks connected startup, projection, command, phase, fixed-step, combat-resolution, terminal, lifecycle and checkpoint authority. The newest concrete defect is inside the fixed update: a unit deleted from live state can remain in the captured unit array and act later in the same tick.

## Plan ledger

**Goal:** keep unresolved risks explicit, source-backed and ordered by dependency.

- [ ] Continue save-candidate resolution and campaign-startup admission.
- [ ] CRT display/input projection parity.
- [ ] Campaign command and phase admission.
- [ ] Fixed-step command scheduling, clock-overrun and replay authority.
- [ ] Deterministic combat resolution and entity liveness.
- [ ] Committed-tick and render-frame authority.
- [ ] Exclusive terminal-outcome arbitration and persistence admission.
- [ ] Runtime session lifecycle authority.
- [ ] Versioned checkpoint capture and atomic resume authority.

## Gate 1: Continue capability gaps

```txt
six storage slots collapse to Boolean presence
slot and storage-layer identity are discarded
raw payloads are not parsed
schema, content revision and fingerprints are absent
malformed data enables Continue
candidate precedence is absent
campaign=continue is ignored
Continue constructs default state
current victory write is a completion summary, not a checkpoint
```

## Gate 2a: Projection gaps

```txt
shader uses contain plus curve
pointer uses contain only
no transform revision or typed rejection
click, order and wheel anchor can use mismatched coordinates
drag selection uses a two-corner world AABB rather than visual inclusion
```

## Gate 2b: Command and phase gaps

```txt
pointer, keyboard and GameHost mutate live state
no command ID, sequence, target tick or retained result
invalid actions silently return
paused, won and lost are independent Booleans
no phase admission matrix
held input is not retired by phase transition
```

## Gate 2c: Fixed-step, clock and replay gaps

```txt
commands apply outside the fixed-step queue
ordering depends on browser callback timing
wall-clock delta above 50 ms is silently discarded
no simulationTickId or appliedCommandCursor
no replay journal or canonical state fingerprint
no immutable render snapshot or committed-frame receipt
```

## Gate 2d: Combat resolution and liveness gaps

```txt
Object.values(state.units) is captured before per-unit mutation
damage() deletes a target from state.units during captured iteration
updateUnit() does not reject an entity already deleted from live state
a killed actor can still move, attack, launch a projectile or breach the core
entity order is incidental object insertion order
allies act before enemies because they were inserted first
newly spawned enemies act during the spawn tick without an explicit policy
nearest-target ties resolve by first encountered entry
melee damage is immediate and sequential
retirement and rewards happen inside damage mutation
target and projectile reference cleanup is lazy
no CombatResolutionResult, liveness revision or combat event journal exists
checkpoint rebuild order can change next-tick behavior
```

## Gate 2e: Terminal outcome gaps

```txt
core breach can set lost during unit iteration
remaining units, towers and projectiles can still update
final-wave clear can later set won
won and lost can both be true
victory summary can be written after defeat evidence
no exclusive outcome enum, arbitration policy, latch or result ID
```

## Gate 3: Lifecycle gaps

```txt
menu and campaign allocate at module scope
RAF IDs are discarded
anonymous listeners have no deterministic removal
no sessionId, runId or generation
no startup rollback
no audio or CRT resource owner
navigation and reload bypass typed teardown
```

## Gate 4: Checkpoint and resume gaps

```txt
no resumable checkpoint schema or content identity
no committed tick, command cursor, combat policy version or fingerprint
no complete entity graph and identity counters
no load path, migration, staged hydration or reference rebuild
no atomic commit, rollback or resume epoch
no insertion-order parity proof after hydration
no first resumed-frame acknowledgement
```

## Validation gaps

```txt
current checks are source-pattern checks
no Continue slot/precedence/startup fixtures
no CPU/GLSL projection fixture
no command, phase, cadence, stall or replay fixture
no dead-entity-no-action fixture
no insertion-order parity fixture
no target tie-break fixture
no reward/cleanup fixture
no checkpoint-order parity fixture
no ghost-action committed-frame smoke
no simultaneous terminal fixture
no lifecycle or checkpoint roundtrip fixture
```

## Do not claim

Do not claim Continue works, pointer targeting is exact, commands are deterministic, combat is deterministic, dead entities cannot act, checkpoint hydration preserves combat behavior, terminal outcome is exclusive, restart is lifecycle-safe or checkpoint resume works until the corresponding fixtures pass on `main`.
