# PhantomCommand Gameplay Audit: Construct to RTS Gap

**Timestamp:** `2026-07-08T02:50:33-04:00`

## Current player loop

```txt
open menu
  -> start scene
  -> watch ritual construct assemble
  -> pan / zoom / skip / restart
  -> reach command online phase
```

This is a strong opening-scene proof, but not yet an RTS gameplay loop.

## Intended product loop

```txt
construct platform completes
  -> scenario bootstrap gate opens
  -> player receives first command context
  -> undead host / necropolis systems become available
  -> player selects units or commands production
  -> enemies / waves / objectives create pressure
  -> player gathers, builds, commands, defends, and expands
  -> combat and economy events update state ledgers
  -> progression unlocks new undead units, buildings, and rituals
```

## Gap

The repo currently proves the ritual construct intro.

The next gameplay step should not jump straight to full unit control. It should first add a safe bridge from construct completion into scenario bootstrap.

## Scenario bootstrap bridge

Required first bridge:

```txt
ConstructSnapshot
  -> ConstructEventResult accepts first construct_complete
  -> ScenarioBootstrapCommand attempts scenario_001_raise_the_host
  -> ScenarioBootstrapPreflight checks constructComplete true
  -> ScenarioBootstrapResult accepts or rejects with stable reason
  -> ScenarioBootstrapSnapshot records active scenario boundaries
```

## Deferred RTS domains

```txt
radial-map-generation
center-pressure-ring-model
player-start-placement
resource-node-placement
enemy-camp-placement
wave-lane-placement
grave-field-economy
bone-yard-economy
soul-well-economy
undead-unit-state
enemy-unit-state
necropolis-building-state
building-construction
building-production
rts-selection
rts-command-validation
rts-movement-request
rts-attack-request
world-economy-ledger
combat-resolution
objective-tracking
experience-progression
unlock-registry
command-journal-replay
behavior-smoke-testing
```

## Next gameplay acceptance

```txt
- construct_complete is accepted exactly once.
- duplicate construct_complete is rejected.
- scenario bootstrap before construct completion is rejected.
- scenario bootstrap after construct completion is accepted.
- duplicate scenario bootstrap is rejected.
- accepted bootstrap emits a serializable ScenarioBootstrapSnapshot.
- snapshot includes placeholder boundaries for map, units, economy, enemies, objectives, and progression.
- no full RTS systems are implemented until the bridge is fixture-proven.
```

## Gameplay conclusion

The next useful gameplay work is a command/result gate, not more visual content.

The repo needs a durable state transition from intro-proof to scenario-proof before adding selection, units, economy, enemies, or combat.
