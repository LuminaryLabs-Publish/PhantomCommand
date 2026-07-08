# PhantomCommand Next Steps

**Timestamp:** `2026-07-08T09:19:43-04:00`

## Next safe ledge

```txt
PhantomCommand Source Profile + Construct/Scenario Result Wire Map
```

## Goal

Preserve the current live visual while moving source authority, descriptor parity, completion idempotency, bootstrap gating, snapshots, and replay proof out of the inline `game.html` runtime.

The next cut should prove that `smooth-ring-handoff-v6` can transition from visual construct completion into a typed scenario bootstrap result without depending on DOM, canvas, Three.js, or HUD text mutation.

## Checklist

- [ ] Keep `index.html -> game.html` routing unchanged.
- [ ] Keep visible `smooth-ring-handoff-v6` construct behavior unchanged.
- [ ] Add a source-owned `smooth-ring-handoff-v6` profile outside `game.html`.
- [ ] Add profile normalization.
- [ ] Add a source fingerprint service.
- [ ] Add a source snapshot service.
- [ ] Add ring descriptor generation from the source profile.
- [ ] Add piece descriptor generation from the ring descriptors.
- [ ] Add delay and settle descriptor generation.
- [ ] Add handoff/margin descriptors proving current timing parity.
- [ ] Add a parity report for ring count, gaps, part counts, total pieces, and total build seconds.
- [ ] Add `ConstructEventEnvelope`.
- [ ] Add `ConstructEventResult`.
- [ ] Add construct event reducer.
- [ ] Accept `construct_complete` exactly once.
- [ ] Reject duplicate `construct_complete` with `duplicate_construct_complete`.
- [ ] Add `ConstructEventJournal`.
- [ ] Add serializable `ConstructSnapshot`.
- [ ] Add `ScenarioBootstrapCommand`.
- [ ] Add `ScenarioBootstrapPreflight`.
- [ ] Reject bootstrap before completion with `construct_incomplete`.
- [ ] Accept `scenario_001_raise_the_host` after completion.
- [ ] Reject duplicate bootstrap with `duplicate_scenario_bootstrap`.
- [ ] Add serializable `ScenarioBootstrapSnapshot` with RTS boundary placeholders only.
- [ ] Expand `window.GameHost.getState()` additively without breaking `skipConstruct` or `restartConstruct`.
- [ ] Add DOM-free fixture smoke for profile parity.
- [ ] Add DOM-free fixture smoke for ring descriptors.
- [ ] Add DOM-free fixture smoke for piece descriptors.
- [ ] Add DOM-free fixture smoke for handoff/timeline margins.
- [ ] Add DOM-free fixture smoke for construct completion idempotency.
- [ ] Add DOM-free fixture smoke for scenario bootstrap gating.
- [ ] Add DOM-free fixture smoke for snapshot shape.
- [ ] Add DOM-free fixture smoke for legacy GameHost compatibility.

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