# PhantomCommand Gameplay Audit — Construct Result Idempotency Precondition

**Timestamp:** `2026-07-08T22-58-02-04-00`

## Current gameplay loop

The current loop is a construct-viewer loop, not RTS gameplay:

```txt
menu
  -> enter construct scene
  -> watch stone construct assemble
  -> pan/zoom/skip/restart
  -> reach command online
```

## Current gameplay authority

```txt
visual completion phase: command online
skipConstruct(): forces construct completion
restartConstruct(): resets construct animation
GameHost.getState(): reports construct diagnostics
```

## Missing gameplay authority

```txt
ConstructEventEnvelope
ConstructEventResult
ConstructEventJournal
ConstructSnapshot
ScenarioBootstrapCommand
ScenarioBootstrapResult
ScenarioBootstrapSnapshot
```

## Precondition

Do not implement ConstructEventResult yet unless the sourceProfile fixture exists and passes. Construct completion must be linked to source-owned profile/timeline/descriptors first; otherwise construct result authority would still depend on inline browser constants.

## Required result rows after sourceProfile proof

```txt
construct_complete_accepts_once
construct_complete_rejects_duplicate
construct_complete_preserves_snapshot
skip_construct_emits_single_completion_candidate
restart_construct_resets_completion_candidate
scenario_bootstrap_rejects_construct_incomplete
scenario_bootstrap_rejects_source_profile_unproven
scenario_bootstrap_rejects_duplicate
```

## Current decision

Keep RTS gameplay deferred. The next implementation should only prepare the idempotency precondition map while building sourceProfile fixture parity.
