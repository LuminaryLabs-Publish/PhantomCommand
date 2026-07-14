# Final-Wave Loss Conflict Loop

**Timestamp:** `2026-07-14T13-40-59-04-00`

## Summary

The final enemy can breach the sanctum, reduce core to zero and remove itself. Because the fixed step continues, the empty final wave can then be classified as cleared, producing both loss and victory state.

## Plan ledger

**Goal:** isolate terminal proposals during one fixed step and settle one policy-defined outcome before rewards or persistence.

- [x] Trace wave start and spawn queue.
- [x] Trace sanctum breach and enemy removal.
- [x] Trace wave-clear and final victory mutation.
- [x] Trace reward, save, UI and retry effects.
- [ ] Implement exclusive settlement later.

## Current loop

```txt
Space
  -> startWave()
  -> mutable spawn queue
  -> fixed-step update

last enemy
  -> moves toward sanctum
  -> reaches stop radius
  -> state.core -= enemy.core
  -> enemy is deleted
  -> core <= 0 sets state.lost = true

same update call
  -> tower update
  -> projectile update
  -> effects update
  -> waveActive && no spawn && no enemies
  -> wave increments
  -> souls receive wave-clear reward
  -> final wave sets state.won = true
  -> victory save attempt
```

## Gameplay risks

```txt
victory and defeat can coexist
victory presentation can mask defeat
victory save can be written from a conflicting step
wave-clear reward can be granted after sanctum destruction
retry discards predecessor evidence
terminal policy is implicit in function order
```

## Required policy

The terminal precedence must be explicit and versioned. A reasonable default is:

```txt
if core <= 0 at terminal settlement -> defeat
else if final wave has no pending or live enemies -> victory
else -> continue
```

This is a proposed policy, not implemented behavior.

## Required gameplay result

```txt
CampaignOutcomeArtifact {
  runId
  stepId
  waveId
  outcome
  reason
  core
  soulsBefore
  rewardDelta
  soulsAfter
  policyRevision
  fingerprint
}
```

No gameplay behavior was changed.