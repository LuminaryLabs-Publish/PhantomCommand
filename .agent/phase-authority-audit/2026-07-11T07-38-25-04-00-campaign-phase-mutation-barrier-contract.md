# Campaign Phase Mutation Barrier Contract

**Timestamp:** `2026-07-11T07-38-25-04-00`

## Summary

The campaign needs one authoritative phase state machine. Boolean `paused`, `won` and `lost` flags should become projections or compatibility fields derived from that state machine, not independent admission checks.

## Plan ledger

**Goal:** define a deterministic mutation barrier for pause, terminal, transition and disposal phases.

- [x] Define canonical phases.
- [x] Define legal transitions.
- [x] Define mutation barriers.
- [x] Define compatibility projections.
- [x] Define result and journal contracts.
- [ ] Implement and migrate callers.
- [ ] Remove direct mutation bypasses after fixtures pass.

## Canonical state

```txt
CampaignPhaseState {
  sessionId,
  runId,
  phase,
  phaseSequence,
  enteredAtTick,
  reason,
  terminalResult,
  transitionId
}
```

## Legal transitions

```txt
BOOTING -> ACTIVE
ACTIVE -> PAUSED
PAUSED -> ACTIVE
ACTIVE -> WON
ACTIVE -> LOST
ACTIVE|PAUSED|WON|LOST -> TRANSITIONING
TRANSITIONING -> DISPOSED
TRANSITIONING -> BOOTING only through a new run/session transaction
```

No transition may be produced by writing several flags separately.

## Mutation barrier

```txt
phase !== ACTIVE
  -> gameplay commands reject before mutation
  -> fixed-step gameplay update does not advance
  -> queued gameplay commands are retired or held by explicit policy
  -> direct callback mutators are unavailable
```

Presentation and lifecycle commands use separate declared policies. Camera pan/zoom during pause or terminal state must be an explicit presentation policy and must not affect checkpoint authority unless intentionally included.

## Compatibility projection

During migration:

```txt
state.paused = phase === PAUSED
state.won = phase === WON
state.lost = phase === LOST
```

Writes to these compatibility fields must be removed. All changes flow through `transitionPhase()`.

## Transition result

```txt
CampaignPhaseResult {
  commandId,
  transitionId,
  status: accepted | rejected | idempotent,
  beforePhase,
  afterPhase,
  beforeSequence,
  afterSequence,
  reason,
  stateFingerprint,
  appliedTick
}
```

## Journal rules

```txt
bounded
ordered by phaseSequence and command sequence
clone-safe
no DOM, WebGL, RAF or event objects
records rejected gameplay attempts while non-active
records input retirement counts
records first frame acknowledging each phase sequence
```

## Integration requirements

### Action authority

Phase preflight occurs before gameplay preflight and before fixed-step queue insertion.

### Lifecycle authority

Restart and exit transition through `TRANSITIONING`; lifecycle disposal owns route changes and reload replacement.

### Checkpoint authority

Checkpoint capture records canonical phase. Resume stages and validates phase before atomic commit. `TRANSITIONING` and `DISPOSED` are never resumable checkpoint phases.

### Render authority

Overlay copy and style derive from committed canonical phase. No overlay reads independent mutable terminal flags.

## Acceptance criteria

```txt
no gameplay mutation while phase is PAUSED, WON, LOST, TRANSITIONING or DISPOSED
same command/phase/state yields same result
phase sequence increments exactly once per accepted transition
duplicate transition command is idempotent
stale observed phase is rejected
legacy GameHost cannot bypass admission
first frame for each accepted phase acknowledges phaseSequence
```