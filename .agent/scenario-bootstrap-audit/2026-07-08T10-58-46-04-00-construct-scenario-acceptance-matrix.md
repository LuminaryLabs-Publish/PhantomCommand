# PhantomCommand Construct Scenario Acceptance Matrix

**Timestamp:** `2026-07-08T10-58-46-04-00`

## Purpose

This file turns the next ledge into a fixture-ready acceptance matrix.

The goal is to prove the current `smooth-ring-handoff-v6` construct can hand off into a typed scenario bootstrap gate without relying on DOM, canvas, Three.js, or HUD text.

## Source constants to preserve

```txt
BUILD_ID: smooth-ring-handoff-v6
RING_COUNT: 10
FIRST_INNER_RADIUS: 10
FIRST_RING_WIDTH: 7
RING_WIDTH_GROWTH: 1.25
MAX_RING_WIDTH: 120
RING_GAP_BASE: 0
RING_GAP_GROWTH: 0
MOVE_SECONDS: 2.6
DROP_START_SECONDS: 0.08
RING_HANDOFF: 0.72
PART_STAGGER: 0.025
PREWARM_SECONDS: 0.45
START_RADIUS_MULTIPLIER: 1.38
START_HEIGHT_BASE: 24
ringParts: [5,5,5,5,6,8,10,12,16,20]
totalPieces: 92
totalBuildSeconds: 19.923
```

## Source files to add next

```txt
src/kits/phantom-command-smooth-handoff-profile-kit/index.js
src/kits/phantom-command-source-profile-fingerprint-kit/index.js
src/kits/phantom-command-source-profile-snapshot-kit/index.js
src/kits/phantom-command-ring-descriptor-kit/index.js
src/kits/phantom-command-piece-descriptor-kit/index.js
src/kits/phantom-command-handoff-timeline-contract-kit/index.js
src/kits/phantom-command-construct-result-kit/index.js
src/kits/phantom-command-scenario-bootstrap-kit/index.js
src/kits/phantom-command-gamehost-diagnostics-adapter-kit/index.js
tests/phantom-command-source-acceptance-fixture.mjs
```

## Construct event types

```txt
construct_tick
construct_skip
construct_restart
construct_complete
```

## Construct result shape

```js
{
  ok: true | false,
  type: "construct_event_result",
  eventId: "...",
  eventType: "construct_complete",
  accepted: true | false,
  reason: "construct_complete_accepted" | "duplicate_construct_complete" | "construct_restarted" | "construct_skipped" | "unknown_construct_event",
  changed: true | false,
  publish: true | false,
  constructSnapshot: { ... },
  journalEntry: { ... }
}
```

## Scenario command types

```txt
scenario_bootstrap
scenario_reset
```

## Scenario result shape

```js
{
  ok: true | false,
  type: "scenario_bootstrap_result",
  commandId: "...",
  commandType: "scenario_bootstrap",
  scenarioId: "scenario_001_raise_the_host",
  accepted: true | false,
  reason: "scenario_bootstrap_accepted" | "construct_incomplete" | "duplicate_scenario_bootstrap" | "unknown_scenario",
  changed: true | false,
  publish: true | false,
  scenarioBootstrapSnapshot: { ... },
  journalEntry: { ... }
}
```

## Acceptance matrix

| Case | Input | Required result | Reason | Publish |
| --- | --- | --- | --- | --- |
| Profile parity | Normalize live profile | `ok: true` | `profile_parity_ok` | false |
| Ring parity | Derive rings | 10 rings, zero gaps | `ring_parity_ok` | false |
| Piece parity | Derive pieces | 92 pieces | `piece_parity_ok` | false |
| Timing parity | Derive timeline | total build seconds 19.923 | `timeline_parity_ok` | false |
| First completion | `construct_complete` | accepted | `construct_complete_accepted` | true |
| Duplicate completion | `construct_complete` again | rejected | `duplicate_construct_complete` | false |
| Restart after complete | `construct_restart` | accepted changed reset | `construct_restarted` | true |
| Skip from forming | `construct_skip` | accepted complete | `construct_skipped` | true |
| Early bootstrap | `scenario_bootstrap` before complete | rejected | `construct_incomplete` | false |
| Accepted bootstrap | `scenario_bootstrap scenario_001_raise_the_host` after complete | accepted | `scenario_bootstrap_accepted` | true |
| Duplicate bootstrap | same bootstrap again | rejected | `duplicate_scenario_bootstrap` | false |
| Unknown scenario | unsupported scenario id | rejected | `unknown_scenario` | false |
| Snapshot serialization | Project snapshots | JSON-safe | `snapshot_serializable` | false |
| GameHost compatibility | Adapt diagnostics | keeps skip/restart/getState | `legacy_gamehost_compatible` | false |

## Fixture rows

```txt
profile-parity: profile -> fingerprint -> source snapshot
ring-parity: profile -> ring descriptors -> [5,5,5,5,6,8,10,12,16,20]
piece-parity: ring descriptors -> piece descriptors -> count 92
timeline-parity: profile + pieces -> margin descriptors -> 19.923 seconds
construct-idempotency: complete -> complete duplicate
construct-reset: complete -> restart -> complete
construct-skip: forming -> skip -> complete snapshot
scenario-early-reject: bootstrap before construct complete
scenario-accepted: complete -> bootstrap scenario_001_raise_the_host
scenario-duplicate-reject: complete -> bootstrap -> bootstrap duplicate
scenario-unknown-reject: complete -> bootstrap unsupported id
snapshot-shape: ConstructSnapshot + ScenarioBootstrapSnapshot stringify and parse
gamehost-shape: additive diagnostic payload keeps legacy methods
```

## Stop condition for the implementation pass

Stop when a single DOM-free fixture can prove:

```txt
profile fingerprint deterministic
ring parity exact
piece parity exact
timeline parity exact
construct completion accepted once
construct duplicate rejected
scenario bootstrap early rejected
scenario bootstrap accepted after completion
scenario duplicate rejected
snapshots are serializable
GameHost compatibility shape is preserved
```

Do not start RTS units, enemies, economy, waves, objectives, or combat until this matrix passes.
