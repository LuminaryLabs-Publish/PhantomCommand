# PhantomCommand Construct Complete Command Boundary

**Timestamp:** `2026-07-08T18-29-21-04-00`

## Purpose

Record the scenario bootstrap boundary so future implementation does not jump from the construct visual directly into RTS gameplay without typed source proof.

## Current state

```txt
construct completion = phase string changes to command online
scenario bootstrap = not implemented
RTS slice = deferred
```

## Required future command envelope

```js
{
  type: "scenario.bootstrap",
  source: "gamehost" | "fixture" | "ui",
  buildId: "smooth-ring-handoff-v6",
  constructComplete: boolean,
  sourceProfileStatus: "passed" | "failed" | "missing",
  requestedAt: number
}
```

## Required future result shape

```js
{
  type: "scenario.bootstrap.result",
  status: "accepted" | "rejected" | "unchanged",
  reason: null | "source_profile_unproven" | "construct_incomplete" | "duplicate_scenario_bootstrap" | "invalid_command",
  before: object,
  after: object,
  events: []
}
```

## Boundary acceptance rows

```txt
bootstrap_rejects_when_sourceProfile_missing
bootstrap_rejects_when_sourceProfile_failed
bootstrap_rejects_when_construct_incomplete
bootstrap_accepts_once_after_sourceProfile_passed_and_construct_complete
bootstrap_rejects_duplicate_after_accepted
bootstrap_result_is_serializable
bootstrap_result_does_not_mutate_render_state
```

## Dependency order

```txt
1. source profile fixture row acceptance
2. additive GameHost sourceProfile readback
3. ConstructEventResult
4. scenario bootstrap command/result
5. first RTS command slice
```

## Stop line

Do not implement this boundary before the source-profile fixture exists and passes. This audit is a blocker map, not permission to add RTS gameplay now.