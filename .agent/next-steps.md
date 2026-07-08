# PhantomCommand Next Steps

**Timestamp:** `2026-07-08T10-58-46-04-00`

## Next safe ledge

```txt
PhantomCommand Construct Scenario Acceptance Matrix
```

## Goal

Preserve the current live visual while moving source authority, descriptor parity, completion idempotency, bootstrap gating, snapshots, and replay proof out of the inline `game.html` runtime.

The next cut should prove that `smooth-ring-handoff-v6` can transition from visual construct completion into a typed scenario bootstrap result without depending on DOM, canvas, Three.js, or HUD text mutation.

## Checklist

- [ ] Keep `index.html -> game.html` routing unchanged.
- [ ] Keep visible `smooth-ring-handoff-v6` construct behavior unchanged.
- [ ] Add `src/kits/phantom-command-smooth-handoff-profile-kit/index.js`.
- [ ] Mirror current `game.html` constants exactly.
- [ ] Add profile normalization.
- [ ] Add `src/kits/phantom-command-source-profile-fingerprint-kit/index.js`.
- [ ] Add `src/kits/phantom-command-source-profile-snapshot-kit/index.js`.
- [ ] Add `src/kits/phantom-command-ring-descriptor-kit/index.js`.
- [ ] Add `src/kits/phantom-command-piece-descriptor-kit/index.js`.
- [ ] Add delay, settle, and margin descriptor helpers.
- [ ] Add a parity report for ring count, gaps, part counts, total pieces, and total build seconds.
- [ ] Add `src/kits/phantom-command-construct-result-kit/index.js`.
- [ ] Add `ConstructEventEnvelope`.
- [ ] Add `ConstructEventResult`.
- [ ] Accept `construct_complete` exactly once.
- [ ] Reject duplicate `construct_complete` with `duplicate_construct_complete`.
- [ ] Add `ConstructEventJournal`.
- [ ] Add serializable `ConstructSnapshot`.
- [ ] Add `src/kits/phantom-command-scenario-bootstrap-kit/index.js`.
- [ ] Add `ScenarioBootstrapCommand`.
- [ ] Reject bootstrap before completion with `construct_incomplete`.
- [ ] Accept `scenario_001_raise_the_host` after completion.
- [ ] Reject duplicate bootstrap with `duplicate_scenario_bootstrap`.
- [ ] Add serializable `ScenarioBootstrapSnapshot` with RTS boundary placeholders only.
- [ ] Add `src/kits/phantom-command-gamehost-diagnostics-adapter-kit/index.js`.
- [ ] Expand `window.GameHost.getState()` additively without breaking `skipConstruct` or `restartConstruct`.
- [ ] Add `tests/phantom-command-source-acceptance-fixture.mjs`.
- [ ] Fixture proves profile parity.
- [ ] Fixture proves ring descriptor parity.
- [ ] Fixture proves piece descriptor parity.
- [ ] Fixture proves handoff/timeline margin parity.
- [ ] Fixture proves construct completion idempotency.
- [ ] Fixture proves scenario bootstrap gating.
- [ ] Fixture proves snapshot shape.
- [ ] Fixture proves legacy GameHost compatibility shape.

## Recommended build order

```txt
1. Source profile first
   - create src/kits/phantom-command-smooth-handoff-profile-kit/index.js
   - mirror current game.html constants exactly
   - expose normalized profile and fingerprint
   - expose profile snapshot

2. Descriptor parity second
   - create src/kits/phantom-command-ring-descriptor-kit/index.js
   - derive rings from the source profile
   - create src/kits/phantom-command-piece-descriptor-kit/index.js
   - derive pieces from rings
   - derive delays, settle windows, and transition margins
   - prove 10 rings, zero gaps, 92 pieces, and 19.923 seconds

3. Construct result authority third
   - create src/kits/phantom-command-construct-result-kit/index.js
   - create construct_complete envelope/result/reducer
   - accept first completion
   - reject duplicate completion
   - project ConstructSnapshot

4. Scenario bootstrap fourth
   - create src/kits/phantom-command-scenario-bootstrap-kit/index.js
   - reject bootstrap before completion
   - accept scenario_001_raise_the_host after completion
   - reject duplicate bootstrap
   - project ScenarioBootstrapSnapshot with RTS placeholders only

5. Legacy host compatibility last
   - keep skipConstruct
   - keep restartConstruct
   - keep getState
   - add diagnostics without breaking current consumers
```

## Required result reasons

```txt
profile_parity_ok
ring_parity_ok
piece_parity_ok
timeline_parity_ok
construct_complete_accepted
duplicate_construct_complete
construct_restarted
construct_skipped
unknown_construct_event
scenario_bootstrap_accepted
construct_incomplete
duplicate_scenario_bootstrap
unknown_scenario
source_fingerprint_mismatch
snapshot_serializable
legacy_gamehost_compatible
```

## Acceptance matrix to implement

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

## Do not do yet

```txt
- Do not add full RTS unit control before the construct -> scenario bootstrap gate exists.
- Do not replace the current construct visual in the same pass as source extraction.
- Do not remove window.GameHost compatibility.
- Do not move reusable logic into NexusEngine or ProtoKits until the publish-local fixture proof is stable.
- Do not work on Cavalry of Rome.
```

## Acceptance target

```txt
index.html still routes to game.html
game.html visual output remains smooth-ring-handoff-v6
window.GameHost.skipConstruct remains available
window.GameHost.restartConstruct remains available
window.GameHost.getState remains available
profile reports buildId smooth-ring-handoff-v6
profile reports ringCount 10
ring descriptors report zero gaps
ring descriptors report [5,5,5,5,6,8,10,12,16,20]
piece descriptors report 92 pieces
timing descriptors report totalBuildSeconds 19.923
handoff descriptors report RING_HANDOFF 0.72 and PART_STAGGER 0.025
first construct_complete is accepted
duplicate construct_complete is rejected with duplicate_construct_complete
bootstrap before completion is rejected with construct_incomplete
bootstrap after completion is accepted
second bootstrap is rejected with duplicate_scenario_bootstrap
ConstructSnapshot is serializable
ScenarioBootstrapSnapshot is serializable
DOM-free fixture passes without browser, DOM, canvas, or Three.js
```
