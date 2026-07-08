# PhantomCommand Construct Result + Scenario Bootstrap Fixture Matrix

**Timestamp:** `2026-07-08T07:50:47-04:00`

## Purpose

This audit turns the next implementation ledge into fixture-readable command/result contracts.

The current runtime reaches `phase = command online` visually, but that completion is not yet a typed event result.

The future RTS slice needs an explicit handoff from construct completion into a scenario bootstrap gate before unit control, waves, economy, or combat can safely start.

## Current source facts to preserve

```txt
buildId: smooth-ring-handoff-v6
ringCount: 10
ringGaps: [0,0,0,0,0,0,0,0,0,0]
ringParts: [5,5,5,5,6,8,10,12,16,20]
totalPieces: 92
moveSeconds: 2.6
ringHandoff: 0.72
partStagger: 0.025
totalBuildSeconds: 19.923
legacyGameHost: skipConstruct, restartConstruct, getState
```

## Required command envelopes

```ts
type ConstructEventEnvelope = {
  id: string;
  type: "construct_complete" | "construct_restart" | "construct_skip";
  buildId: "smooth-ring-handoff-v6";
  frame: number;
  sourceFingerprint: string;
};

type ScenarioBootstrapCommand = {
  id: string;
  type: "scenario_bootstrap";
  scenarioId: "scenario_001_raise_the_host";
  requestedFromConstructBuildId: "smooth-ring-handoff-v6";
  frame: number;
};
```

## Required result records

```ts
type ConstructEventResult = {
  accepted: boolean;
  reason:
    | "construct_complete_accepted"
    | "duplicate_construct_complete"
    | "construct_restarted"
    | "construct_skipped"
    | "unknown_construct_event";
  mutated: boolean;
  journaled: boolean;
  snapshotVersion: number;
};

type ScenarioBootstrapResult = {
  accepted: boolean;
  reason:
    | "scenario_bootstrap_accepted"
    | "construct_incomplete"
    | "duplicate_scenario_bootstrap"
    | "unknown_scenario"
    | "source_fingerprint_mismatch";
  mutated: boolean;
  journaled: boolean;
  snapshotVersion: number;
};
```

## Fixture matrix

| Fixture | Input | Expected result |
| --- | --- | --- |
| `construct-profile-parity` | `smooth-ring-handoff-v6` source profile | build id, ring count, zero gaps, ring parts, pieces, timing match current `game.html` |
| `construct-complete-first-accepts` | first `construct_complete` after all pieces settled | accepted, reason `construct_complete_accepted`, mutated true, journaled true |
| `construct-complete-duplicate-rejects` | second `construct_complete` | accepted false, reason `duplicate_construct_complete`, mutated false |
| `construct-snapshot-serializable` | accepted completion | serializable `ConstructSnapshot` without DOM/Three.js |
| `bootstrap-before-complete-rejects` | `scenario_bootstrap` before completion | accepted false, reason `construct_incomplete`, mutated false |
| `bootstrap-after-complete-accepts` | `scenario_001_raise_the_host` after completion | accepted true, reason `scenario_bootstrap_accepted`, journaled true |
| `bootstrap-duplicate-rejects` | second scenario bootstrap | accepted false, reason `duplicate_scenario_bootstrap`, mutated false |
| `bootstrap-snapshot-serializable` | accepted scenario bootstrap | serializable `ScenarioBootstrapSnapshot` with RTS placeholders only |
| `gamehost-compatibility` | current browser host | `skipConstruct`, `restartConstruct`, `getState` remain available |
| `diagnostics-additive` | future expanded `getState()` | old keys remain, new source/result/snapshot keys are additive |

## Required snapshots

### `ConstructSnapshot`

```txt
buildId
sourceFingerprint
complete
completionAccepted
completionFrame
ringCount
ringParts
totalPieces
progress
phase
journalLength
```

### `ScenarioBootstrapSnapshot`

```txt
scenarioId
mode
constructBuildId
constructSourceFingerprint
bootstrapAccepted
bootstrapFrame
rtsBoundaryPlaceholders
journalLength
```

## RTS placeholder boundary

Do not create full RTS gameplay in the same pass.

The accepted bootstrap snapshot should only reserve placeholders:

```txt
commanderEntity
necropolisAnchor
availableUndeadRoster
resourceLedgerSeed
waveLaneSeed
objectiveSeed
commandJournalSeed
```

## Next implementation ledge

```txt
PhantomCommand Construct Result + Scenario Bootstrap Fixture Gate
```

Build source parity first, then command/result reducers, then snapshots, then additive GameHost diagnostics.
