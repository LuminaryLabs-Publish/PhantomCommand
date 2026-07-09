# PhantomCommand Scenario Bootstrap Audit: Bootstrap Blocker After SourceProfile

**Timestamp:** `2026-07-09T04-50-00-04-00`

## Scenario bootstrap status

Scenario bootstrap is intentionally blocked.

`PhantomCommand` currently reaches `command online` through visual construct state in `game.html`, not through a typed construct result contract. That means RTS or scenario startup should not attach yet.

## Current sequence

```txt
index.html
  -> game.html
  -> construct animation starts from inline smooth-ring-handoff-v6 constants
  -> construct(seq) updates piece transforms and HUD state
  -> complete becomes true when done === parts.length
  -> phase becomes command online
  -> GameHost reports legacy construct state
  -> no typed ConstructEventResult exists
  -> no ScenarioBootstrapCommand exists
```

## Required blocker chain

```txt
sourceProfile fixture passes
  -> GameHost sourceProfile readback passes
  -> fixture build gate passes
  -> central ledger parity row passes
  -> ConstructEventEnvelope exists
  -> ConstructEventResult exists
  -> ConstructEventJournal exists
  -> ScenarioBootstrapCommand exists
  -> ScenarioBootstrapResult exists
  -> RTS boundary placeholder may start
```

## Rejection reasons to define later

```txt
sourceprofile_parity_missing
construct_incomplete
duplicate_construct_complete
scenario_bootstrap_missing_construct_result
duplicate_scenario_bootstrap
scenario_bootstrap_blocked_until_sourceprofile_fixture
```

## Bootstrap domains deferred

```txt
construct-event-envelope
construct-event-result
construct-completion-idempotency
construct-event-journal
scenario-bootstrap-command
scenario-bootstrap-result
scenario-bootstrap-snapshot
scenario-bootstrap-journal
rts-boundary-placeholder
necropolis-command-loop
unit-command-loop
resource-loop
enemy-wave-loop
objective-loop
```

## Why this remains deferred

A scenario bootstrap reducer would create a second authority layer on top of a construct whose source profile is still embedded in `game.html`.

The safer order is to make the construct source explicit, prove it without DOM/Canvas/Three, splice readback into `GameHost`, and only then create typed construct and scenario results.

## Non-goals

```txt
- Do not add RTS unit control yet.
- Do not add Necropolis resources yet.
- Do not add enemy waves yet.
- Do not emit construct_complete before sourceProfile parity is proven.
- Do not bootstrap scenario state from HUD text.
- Do not work on Cavalry of Rome.
```

## Next safe ledge

```txt
PhantomCommand SourceProfile Consumer Freeze + Fixture Build Central Ledger Gate
```
