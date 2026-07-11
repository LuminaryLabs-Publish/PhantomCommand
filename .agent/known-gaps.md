# PhantomCommand Known Gaps

**Timestamp:** `2026-07-11T18-21-09-04-00`

## Summary

PhantomCommand still lacks connected startup, projection, command, phase, fixed-step, combat-resolution, terminal, lifecycle and checkpoint authority. The newest concrete defect is terminal convergence: one fixed update can set both `lost` and `won`, report victory, grant the clear reward and write a victory summary after the sanctum has already reached zero.

## Plan ledger

**Goal:** keep unresolved risks explicit, source-backed and ordered by dependency.

- [ ] Continue save-candidate resolution and campaign-startup admission.
- [ ] CRT display/input projection parity.
- [ ] Campaign command and phase admission.
- [ ] Fixed-step command scheduling, clock-overrun and replay authority.
- [ ] Deterministic combat resolution and entity liveness.
- [ ] Exclusive terminal-outcome arbitration and persistence admission.
- [ ] Committed-tick and terminal-frame authority.
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
damage() deletes a target during captured iteration
updateUnit() does not reject an entity already deleted from live state
a killed actor can still move, attack, launch a projectile or breach the core
entity order is incidental object insertion order
newly spawned enemies act during the spawn tick without an explicit policy
nearest-target ties resolve by first encountered entry
retirement, rewards and core effects happen inside mutable iteration
no CombatResolutionResult, liveness revision or combat journal exists
```

## Gate 2e: Terminal outcome gaps

```txt
update() rejects terminal state only at tick entry
core breach mutates lost during unit iteration
core breach deletes the breaching enemy
remaining actors, towers and projectiles continue after lost becomes true
wave-clear evaluation still runs after defeat evidence
final-wave clear mutates won later in the same update
won and lost can both be true
victory message overwrites defeat message
victory clear reward can settle after defeat evidence
victory summary can be written after defeat evidence
overlay chooses victory when both flags are true
GameHost can expose won:true and lost:true
no terminal evidence IDs or revision
no simultaneous-evidence policy
no outcome enum, arbitration result, latch or run epoch
no persistence admission result
no terminal frame acknowledgement
no restart or exit result correlated to the terminal outcome
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
no committed tick, command cursor, combat/terminal policy version or fingerprint
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
no simultaneous victory/defeat fixture
no terminal latch fixture
no persistence admission fixture
no terminal world/HUD/overlay/CRT/GameHost parity smoke
no lifecycle or checkpoint roundtrip fixture
```

## Do not claim

Do not claim Continue works, pointer targeting is exact, commands are deterministic, combat is deterministic, terminal state is exclusive, defeat cannot persist as victory, terminal rendering is correlated, restart is lifecycle-safe or checkpoint resume works until the corresponding fixtures pass on `main`.