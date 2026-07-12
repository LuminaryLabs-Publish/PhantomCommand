# PhantomCommand Known Gaps

**Timestamp:** `2026-07-11T23-28-29-04-00`

## Summary

The newest gap is the public runtime surface. `window.GameHost` exposes live campaign and camera owners plus direct mutators, so diagnostics and automation can become a second gameplay authority. Continue admission remains the first product gate, but raw owner exposure should be quarantined before expanding automation or public tooling.

## Plan ledger

**Goal:** keep unresolved risks explicit, dependency ordered and fixture bounded.

- [ ] Continue candidate resolution and startup admission.
- [ ] Public host owner quarantine and typed command admission.
- [ ] Display/input projection parity.
- [ ] Phase and fixed-step command scheduling.
- [ ] Committed-frame host read model.
- [ ] Deterministic combat and exclusive terminal result.
- [ ] Runtime session lifecycle, teardown and restart.
- [ ] Versioned checkpoint capture, migration and atomic resume.

## Public host gaps

```txt
window.GameHost exposes the live state object
window.GameHost exposes the live camera object
public callers can mutate gameplay without command admission
public callers can mutate terminal flags without arbitration
public callers can bypass fixed-step ordering
public callers can bypass run, phase and revision checks
startWave, build and setZoom return no typed result
build depends on ambient selectedPad and towerType
setZoom accepts NaN and can poison camera projection
getState has no runId, runEpoch or phaseRevision
getState has no simulationTick or frameId
getState has no render receipt or state fingerprint
getState can report state newer than the visible canvas
no capability descriptor or caller budget
no command ID or idempotency rule
no bounded host journal
no stale-host rejection after navigation or disposal
window.PhantomMenu also has no session identity or teardown fence
```

## Continue and checkpoint gaps

```txt
three save keys are accepted by presence only
both localStorage and sessionStorage are scanned without source precedence
candidate bytes are not parsed before Continue is enabled
candidate key and storage scope are not retained
no schemaVersion, gameId, campaignId or contentRevision
no checkpointId, runEpoch, stateRevision or stateFingerprint
no migration registry or semantic validation
no corrupt-save quarantine
campaign query intent is not parsed
campaign startup always creates fresh defaults
current save is only a legacy victory summary
no staged hydration, rollback or first resumed-frame receipt
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
no public owner-isolation fixture
no detached read-model fixture
no finite host-command fixture
no stale session/run/phase fixture
no terminal command rejection fixture
no host/render frame-correlation fixture
no legacy compatibility quarantine fixture
no save-candidate precedence fixture
no atomic hydration rollback fixture
no first resumed-frame fixture
no browser host smoke
```

## Do not claim

Do not claim public host isolation, command safety, terminal integrity, frame-coherent diagnostics, Continue, checkpoint compatibility, migration or resume correctness until the corresponding fixtures pass on `main`.
