# PhantomCommand Campaign Phase Admission Authority DSK Map

**Timestamp:** `2026-07-12T03-00-46-04-00`

## Summary

The campaign has simulation gating but no action-phase authority. This composed domain makes phase derivation, legal transitions, action policy, mutation fencing, typed results, public-host compatibility, observation, and proof one coherent boundary.

## Plan ledger

**Goal:** define the smallest complete DSK composition that prevents paused or terminal gameplay mutation and preserves deterministic downstream scheduling.

- [x] Map existing campaign owners and mutators.
- [x] Separate phase derivation from action admission.
- [x] Define action and transition result boundaries.
- [x] Define paused and terminal mutation fences.
- [x] Define legacy browser and GameHost adapters.
- [x] Define render receipt and journal boundaries.
- [x] Define executable fixture kits.
- [ ] Implement only after upstream host and projection gates are preserved.

## Parent domain

```txt
phantom-command-campaign-phase-admission-authority-domain
```

## Composition

```txt
phantom-command-campaign-phase-admission-authority-domain
  identity
    -> phantom-command-campaign-phase-id-kit
    -> phantom-command-campaign-phase-revision-kit

  model
    -> phantom-command-campaign-phase-schema-kit
    -> phantom-command-campaign-phase-derivation-kit
    -> phantom-command-campaign-phase-transition-table-kit
    -> phantom-command-campaign-phase-snapshot-kit

  action
    -> phantom-command-campaign-action-kind-kit
    -> phantom-command-campaign-action-envelope-kit
    -> phantom-command-campaign-action-id-kit
    -> phantom-command-campaign-action-policy-matrix-kit
    -> phantom-command-campaign-action-admission-kit
    -> phantom-command-campaign-action-result-kit

  transition
    -> phantom-command-campaign-phase-transition-result-kit
    -> phantom-command-paused-mutation-fence-kit
    -> phantom-command-terminal-mutation-fence-kit
    -> phantom-command-stale-phase-result-rejection-kit

  adapters
    -> phantom-command-wave-start-adapter-kit
    -> phantom-command-build-adapter-kit
    -> phantom-command-order-adapter-kit
    -> phantom-command-selection-adapter-kit
    -> phantom-command-camera-action-policy-kit
    -> phantom-command-legacy-gamehost-phase-adapter-kit

  observation
    -> phantom-command-phase-frame-receipt-kit
    -> phantom-command-phase-observation-kit
    -> phantom-command-phase-journal-kit

  proof
    -> phantom-command-paused-terminal-mutation-fixture-kit
    -> phantom-command-wave-admission-fixture-kit
    -> phantom-command-build-phase-policy-fixture-kit
    -> phantom-command-phase-frame-smoke-kit
```

## Canonical phase state

```txt
CampaignPhaseSnapshot {
  phaseId
  phaseRevision
  phase
  waveIndex
  waveActive
  paused
  terminalOutcome
  sourceTickId
  sourceStateFingerprint
}
```

Recommended phase values:

```txt
BOOT
PLANNING
RUNNING_WAVE
PAUSED_PLANNING
PAUSED_WAVE
WON
LOST
DISPOSED
```

## Action envelope

```txt
CampaignAction {
  actionId
  runtimeSessionId
  actorId
  kind
  payload
  observedPhaseId
  observedPhaseRevision
  observedProjectionRevision
  requestedAtSequence
}
```

## Policy matrix

```txt
START_WAVE       PLANNING only
TOGGLE_PAUSE     non-terminal live phases
BUILD            declared buildable phases only
ORDER_UNITS      declared commandable phases only
SELECT           explicit planning/gameplay policy
SET_TOWER_TYPE   explicit planning policy
CAMERA_PAN       explicit presentation policy
CAMERA_ZOOM      explicit presentation policy
CAMERA_FOCUS     explicit presentation policy
```

## Commit boundary

```txt
admit action
  -> read one immutable phase snapshot
  -> validate action policy and expected revision
  -> stage owner mutations
  -> derive successor phase
  -> validate legal transition
  -> atomically commit gameplay and phase revision
  -> publish typed action result
  -> publish committed read model
  -> render and acknowledge first visible frame
```

## Result boundary

```txt
accepted:
  ACCEPTED

rejected:
  REJECTED_PAUSED
  REJECTED_TERMINAL
  REJECTED_ACTIVE_WAVE
  REJECTED_NOT_BUILDABLE_PHASE
  REJECTED_NOT_COMMANDABLE_PHASE
  REJECTED_INSUFFICIENT_SOULS
  REJECTED_INVALID_TARGET
  REJECTED_STALE_PHASE
  REJECTED_DUPLICATE_ACTION
  REJECTED_DISPOSED_SESSION
```

## Invariants

```txt
one action consumes one phase snapshot
one accepted action advances at most one phase revision
one rejected action changes no durable owner
terminal phases reject gameplay mutation
paused phases reject gameplay mutation unless explicitly declared
public adapters cannot bypass admission
rendered phase/action claims cite a frame receipt
```

## Dependency boundary

```txt
public host quarantine
  -> projection admission
  -> phase admission
  -> fixed-step command scheduling
  -> committed read model
  -> combat liveness
  -> exclusive terminal transaction
```

This domain does not replace clock, replay, terminal, lifecycle, or checkpoint authority. It provides the legal-phase input those later domains require.