# PhantomCommand Gameplay Audit: Construct Result Deferral Loop

**Timestamp:** `2026-07-09T12-38-16-04-00`

## Current player loop

```txt
open menu
  -> start scene
  -> watch construct assemble
  -> pan camera
  -> zoom camera
  -> optionally skip
  -> optionally restart
  -> construct completes
  -> HUD says command online
```

## Current gameplay mechanics

```txt
scene-start routing
camera pan
camera zoom
construct timing
construct skip
construct restart
progress HUD
phase HUD
GameHost state query
```

## Current gameplay authority

The current route is more construct proof than full RTS gameplay.

```txt
construct(seq)
  -> calculates done pieces
  -> updates active ring phrase
  -> mutates progress
  -> mutates phase
  -> mutates HUD
  -> sets complete when all pieces are done
```

## Missing gameplay result layer

There is no typed result layer yet.

```txt
skipConstruct: mutates startedAt / complete
restartConstruct: mutates startedAt / complete / progress / phase
construct completion: visual phase only
scenario bootstrap: absent
unit command result: absent
RTS loop: absent
```

## Deferred result contract

Construct result work should remain blocked until sourceProfile parity passes.

Needed after sourceProfile fixture:

```txt
ConstructEventEnvelope
ConstructEventResult
construct_complete accepted row
duplicate_construct_complete rejected row
construct_skip accepted row
construct_restart accepted row
scenario_bootstrap accepted only after construct_complete
scenario_bootstrap rejected with construct_incomplete before completion
duplicate_scenario_bootstrap rejected with duplicate_scenario_bootstrap
```

## Gameplay domain map

```txt
menu-route-domain
scene-start-domain
construct-sequence-domain
construct-progress-domain
construct-phase-domain
construct-skip-domain
construct-restart-domain
camera-pan-domain
camera-zoom-domain
hud-projection-domain
gamehost-query-domain
construct-result-domain-deferred
scenario-bootstrap-domain-deferred
rts-gameplay-domain-deferred
```

## Main gameplay finding

The next gameplay-safe improvement is not RTS expansion.

The useful order is:

```txt
1. SourceProfile parity proof.
2. Additive GameHost sourceProfile readback.
3. Fixture/build gate.
4. Construct result envelope.
5. Scenario bootstrap gate.
6. RTS command loop.
```
