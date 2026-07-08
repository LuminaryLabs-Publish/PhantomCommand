# Smooth Handoff V6 Source Drift Audit

**Timestamp:** `2026-07-08T06:19:51-04:00`

## Audit target

This audit records a documentation/runtime drift found during the repo breakdown pass.

The root `.agent` and central ledger were still oriented around `sequential-ring-v5`, but the live `game.html` runtime now declares:

```txt
BUILD_ID = smooth-ring-handoff-v6
```

## Current source evidence

```txt
game.html
  -> imports Three.js from CDN
  -> declares BUILD_ID smooth-ring-handoff-v6
  -> declares RING_COUNT 10
  -> declares RING_GAP_BASE 0
  -> declares RING_GAP_GROWTH 0
  -> declares MOVE_SECONDS 2.6
  -> declares RING_HANDOFF 0.72
  -> declares PART_STAGGER 0.025
  -> creates rings inline
  -> creates wedge pieces inline
  -> animates pieces inline
  -> exposes window.GameHost inline
```

Derived live parity values from inspected constants and ring math:

```txt
ringParts: [5,5,5,5,6,8,10,12,16,20]
totalPieces: 92
totalBuildSeconds: 19.923
```

## Drift fixed in docs

```txt
previous doc target: sequential-ring-v5
current runtime target: smooth-ring-handoff-v6
previous fixture target totalBuildSeconds: 31.915
current runtime totalBuildSeconds: 19.923
```

This pass updates the internal docs so the next implementation pass does not build a fixture gate against the wrong profile.

## Domain boundary read

```txt
phantom-command
├─ static-app-shell
│  ├─ menu-route
│  └─ game-route
├─ construct-source-authority
│  ├─ smooth-handoff-v6-profile-kit
│  ├─ profile-normalization-kit
│  ├─ source-fingerprint-kit
│  └─ source-snapshot-kit
├─ construct-descriptor-authority
│  ├─ ring-descriptor-kit
│  ├─ piece-descriptor-kit
│  ├─ delay-policy-kit
│  ├─ settle-policy-kit
│  └─ handoff-margin-kit
├─ construct-result-authority
│  ├─ construct-event-envelope-kit
│  ├─ construct-event-result-kit
│  ├─ construct-completion-idempotency-kit
│  ├─ construct-event-journal-kit
│  └─ construct-snapshot-kit
├─ scenario-bootstrap-authority
│  ├─ bootstrap-command-kit
│  ├─ bootstrap-preflight-kit
│  ├─ bootstrap-result-kit
│  ├─ bootstrap-journal-kit
│  └─ bootstrap-snapshot-kit
├─ renderer-handoff
│  └─ renderer consumes descriptors only after parity fixture passes
└─ legacy-host-compatibility
   └─ window.GameHost remains additive and stable
```

## Services needed next

```txt
createSmoothHandoffProfile()
normalizeSmoothHandoffProfile(profile)
fingerprintSmoothHandoffProfile(profile)
createSmoothHandoffSourceSnapshot(profile)
createRingDescriptors(profile)
createPieceDescriptors(rings, profile)
createTimingDescriptors(profile, pieces)
createHandoffMarginDescriptors(timing)
createConstructParityReport(profile, rings, pieces, timing)
createConstructEventEnvelope(event)
reduceConstructEvent(state, envelope)
projectConstructSnapshot(state)
preflightScenarioBootstrap(state, command)
reduceScenarioBootstrap(state, command)
projectScenarioBootstrapSnapshot(state)
```

## Fixture acceptance target

```txt
profile.buildId === smooth-ring-handoff-v6
profile.ringCount === 10
ringDescriptors.every(gap === 0)
ringPartCounts === [5,5,5,5,6,8,10,12,16,20]
pieceDescriptors.length === 92
timing.totalBuildSeconds === 19.923
handoff.ringHandoff === 0.72
handoff.partStagger === 0.025
first construct_complete result is accepted
duplicate construct_complete result is rejected with duplicate_construct_complete
bootstrap before completion is rejected with construct_incomplete
bootstrap after completion is accepted
second bootstrap is rejected with duplicate_scenario_bootstrap
snapshots are JSON-serializable
fixture runs without DOM, canvas, WebGL, or Three.js
```

## No-go conditions

```txt
- Do not implement fixtures against sequential-ring-v5 values.
- Do not preserve the old 31.915 second target unless source evidence changes back.
- Do not extract renderer code before source and descriptor parity are fixture-readable.
- Do not add RTS gameplay before scenario bootstrap has accepted/rejected result proof.
```