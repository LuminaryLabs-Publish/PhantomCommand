# PhantomCommand Known Gaps

**Timestamp:** `2026-07-11T21-31-19-04-00`

## Summary

The highest-priority gap is a false Continue capability. Raw storage presence enables Continue even though the campaign ignores the route and cannot hydrate the partial save. Later projection, command, combat, terminal, lifecycle and checkpoint work remains ordered behind a trustworthy startup decision.

## Plan ledger

**Goal:** keep unresolved risks explicit and dependency ordered.

- [ ] Continue candidate resolution and startup admission.
- [ ] Versioned checkpoint capture and migration.
- [ ] Display/input projection parity.
- [ ] Command, phase and fixed-step scheduling.
- [ ] Deterministic combat and exclusive terminal result.
- [ ] Runtime session lifecycle, teardown and restart.
- [ ] Atomic resume and first resumed-frame proof.

## Continue and checkpoint gaps

```txt
three save keys are accepted by presence only
both localStorage and sessionStorage are scanned without source precedence
candidate bytes are not parsed before Continue is enabled
candidate key and storage scope are not retained
no schemaVersion, gameId, campaignId or contentRevision
no checkpointId, runEpoch, stateRevision or stateFingerprint
no migration registry
no semantic validation
no corrupt-save quarantine
no multiple-candidate ambiguity result
campaign query intent is not parsed
campaign startup always creates fresh defaults
RESUME cannot be distinguished from NEW
current save is only a victory summary
current save cannot rebuild towers, units, queues, camera or IDs
no staged hydration transaction
no rollback on hydration failure
no resumed-state observation model
no first resumed-frame receipt
```

## Existing downstream gaps

```txt
Projection: CPU pointer mapping omits CRT curve
Commands: browser callbacks mutate live state
Clock: commands are outside fixed-step scheduling
Combat: deleted captured entities can still act
Terminal: won and lost can both commit
Lifecycle: module-owned RAF, listeners, audio, WebGL and globals lack teardown
Checkpoint capture: no stable-boundary or full-state policy
```

## Validation gaps

```txt
no save-candidate precedence fixture
no malformed or foreign-candidate fixture
no legacy summary classification fixture
no storage-scope provenance fixture
no route-intent fixture
no semantic checkpoint fixture
no atomic hydration rollback fixture
no first resumed-frame fixture
no browser Continue smoke
```

## Do not claim

Do not claim Continue, checkpoint compatibility, migration, resume, first-frame coherence or persistence safety until the documented fixtures pass on `main`.
