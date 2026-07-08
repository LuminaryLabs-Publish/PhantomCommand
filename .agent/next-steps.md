# PhantomCommand Next Steps

**Timestamp:** `2026-07-08T02:50:33-04:00`

## Next safe ledge

```txt
PhantomCommand Construct Source Authority + Scenario Bootstrap Fixture Gate
```

## Goal

Preserve the current live visual while moving source authority, descriptor parity, completion idempotency, bootstrap gating, snapshots, and replay proof out of the inline `game.html` runtime.

## Checklist

- [ ] Keep `index.html -> game.html` routing unchanged.
- [ ] Keep visible sequential-ring-v5 construct behavior unchanged.
- [ ] Add a source-owned sequential-ring-v5 profile outside `game.html`.
- [ ] Add profile normalization.
- [ ] Add a source fingerprint service.
- [ ] Add a source snapshot service.
- [ ] Add ring descriptor generation from the source profile.
- [ ] Add piece descriptor generation from the ring descriptors.
- [ ] Add delay and settle descriptor generation.
- [ ] Add transition-margin descriptors proving inner-first timing.
- [ ] Add a parity report for ring count, gaps, part counts, total pieces, and total build seconds.
- [ ] Add ConstructEventEnvelope.
- [ ] Add ConstructEventResult.
- [ ] Add construct event reducer.
- [ ] Accept `construct_complete` exactly once.
- [ ] Reject duplicate `construct_complete` with `duplicate_construct_complete`.
- [ ] Add ConstructEventJournal.
- [ ] Add serializable ConstructSnapshot.
- [ ] Add ScenarioBootstrapCommand.
- [ ] Add ScenarioBootstrapPreflight.
- [ ] Reject bootstrap before completion with `construct_incomplete`.
- [ ] Accept `scenario_001_raise_the_host` after completion.
- [ ] Reject duplicate bootstrap with `duplicate_scenario_bootstrap`.
- [ ] Add serializable ScenarioBootstrapSnapshot with RTS boundary placeholders only.
- [ ] Expand `window.GameHost.getState()` additively without breaking `skipConstruct` or `restartConstruct`.
- [ ] Add DOM-free fixture smoke for profile parity.
- [ ] Add DOM-free fixture smoke for ring descriptors.
- [ ] Add DOM-free fixture smoke for piece descriptors.
- [ ] Add DOM-free fixture smoke for inner-first timeline margins.
- [ ] Add DOM-free fixture smoke for construct completion idempotency.
- [ ] Add DOM-free fixture smoke for scenario bootstrap gating.
- [ ] Add DOM-free fixture smoke for snapshot shape.
- [ ] Add DOM-free fixture smoke for legacy GameHost compatibility.

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
game.html visual output remains sequential-ring-v5
window.GameHost.skipConstruct remains available
window.GameHost.restartConstruct remains available
window.GameHost.getState remains available
profile reports buildId sequential-ring-v5
profile reports ringCount 10
ring descriptors report zero gaps
ring descriptors report [5,5,5,5,6,8,10,12,16,20]
piece descriptors report 92 pieces
timing descriptors report totalBuildSeconds 31.915
every ring transition reports positive marginSeconds
first construct_complete is accepted
duplicate construct_complete is rejected with duplicate_construct_complete
bootstrap before completion is rejected with construct_incomplete
bootstrap after completion is accepted
second bootstrap is rejected with duplicate_scenario_bootstrap
ConstructSnapshot is serializable
ScenarioBootstrapSnapshot is serializable
DOM-free fixture passes without browser, DOM, canvas, or Three.js
```
