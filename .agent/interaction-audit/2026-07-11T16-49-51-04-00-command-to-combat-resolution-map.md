# PhantomCommand Command-to-Combat Resolution Map

**Timestamp:** `2026-07-11T16-49-51-04-00`

## Summary

Browser and `GameHost` actions mutate live state before the fixed-step loop, while combat resolution then applies additional order-dependent mutation without a shared command, tick or combat-result identity. This audit connects the existing command-authority work to the new liveness and resolution boundary.

## Plan ledger

**Goal:** define how admitted commands become deterministic combat inputs and how their effects return as typed results.

- [x] Map browser and GameHost sources.
- [x] Map fixed-step consumption.
- [x] Map combat result and render acknowledgement needs.
- [ ] Implement source adapters, queueing and result correlation.

## Current sources

```txt
pointer left
  -> selectAt()
  -> selection, pad selection or implicit build

pointer right
  -> order()
  -> target or move mutation

keyboard Space
  -> startWave()

keyboard 1/2/3
  -> towerType mutation

keyboard P
  -> paused Boolean toggle

GameHost
  -> startWave()
  -> build()
  -> setZoom()
```

## Current authority break

```txt
input callback mutates state immediately
  -> no command ID
  -> no sequence
  -> no target tick
  -> no phase admission result
  -> no projection revision
  -> no retained result

fixed update starts later
  -> no admitted command set identity
  -> no combat frame input identity
  -> no deterministic entity order identity
  -> no combat resolution identity
  -> no command-to-event range
```

## Target command envelope

```txt
CampaignCommand {
  sessionId,
  runEpoch,
  commandId,
  source,
  sequence,
  targetTick,
  observedPhase,
  projectionRevision,
  type,
  payload
}
```

## Target combat handoff

```txt
ordered commands for tick
  -> command preflight and phase admission
  -> accepted command result rows
  -> immutable CombatFrameInput
  -> deterministic CombatResolutionResult
  -> command-to-event correlation
  -> committed state fingerprint
  -> committed frame receipt
```

## Required correlation

```txt
commandId -> appliedCommandSequence
appliedCommandSequence -> simulationTickId
simulationTickId -> combatResolutionId
combatResolutionId -> event range
combatResolutionId -> stateFingerprint
stateFingerprint -> renderFrameId
renderFrameId -> world/HUD/minimap/CRT acknowledgements
```

## Rejection reasons

```txt
stale-session
stale-run-epoch
stale-sequence
stale-projection
wrong-phase
invalid-target
retired-target
insufficient-souls
occupied-pad
wave-already-active
terminal-run
command-duplicate
```

## Fixtures

```txt
same commands at different browser callback cadence -> same combat result
command targeting entity retired before target tick -> typed rejection
order command and lethal damage in same tick -> declared ordering
wave start command -> due spawn policy stable
GameHost and browser source adapters -> identical result envelope
command result event range -> matches committed frame
```
