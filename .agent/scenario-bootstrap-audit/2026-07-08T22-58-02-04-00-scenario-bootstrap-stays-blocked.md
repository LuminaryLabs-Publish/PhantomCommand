# PhantomCommand Scenario Bootstrap Audit — Stays Blocked

**Timestamp:** `2026-07-08T22-58-02-04-00`

## Current state

There is no playable RTS scenario bootstrap yet. That is correct for now.

## Why it stays blocked

The visible construct completion is still a browser/runtime phase, not a typed source-owned `ConstructEventResult`. Starting scenario bootstrap now would couple future RTS gameplay to inline `game.html` constants and HUD state.

## Required gates before bootstrap

```txt
sourceProfile fixture passes
GameHost sourceProfile readback exists
legacy GameHost fields remain stable
ConstructEventEnvelope exists
ConstructEventResult exists
construct_complete accepts once
construct_complete rejects duplicate
ScenarioBootstrapCommand exists
ScenarioBootstrapResult rejects construct_incomplete
ScenarioBootstrapResult rejects source_profile_unproven
ScenarioBootstrapResult accepts only after construct_complete
```

## Deferred domains

```txt
necropolis-domain
unit-command-domain
resource-domain
undead-wave-domain
objective-domain
scenario-route-domain
rts-camera-domain
rts-command-journal-domain
```

## Next safe action

Keep scenario bootstrap as documentation and fixture rows only. Do not wire it into `game.html` until sourceProfile parity and construct result idempotency are proven.
