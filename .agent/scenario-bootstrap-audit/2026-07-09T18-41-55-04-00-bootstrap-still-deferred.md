# PhantomCommand Scenario Bootstrap Still Deferred

**Timestamp:** `2026-07-09T18-41-55-04-00`

## Status

Scenario bootstrap remains deferred.

## Reason

The live route is still a construct proof, not a scenario runtime.

The construct proof must first become source-owned and fixture-readable:

```txt
smooth-ring-handoff-v6 profile
ring descriptors
piece descriptors
timeline descriptors
source fingerprint
source snapshot
profile parity report
GameHost sourceProfile readback
fixture/build gate
```

## Do not do yet

```txt
RTS economy
unit command loop
enemy AI
resource harvesting
scenario bootstrap
camera rewrite
renderer replacement
new construct visual model
```

## Unlock condition

Only revisit scenario bootstrap after source-profile fixture rows pass and `GameHost.getState().sourceProfile` confirms parity without breaking legacy fields.
