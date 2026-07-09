# Scenario Bootstrap Audit: Bootstrap Stays Blocked After Ledger Catch-up

**Timestamp:** `2026-07-09T07-10-00-04-00`

## Current state

Scenario bootstrap does not exist yet. That is correct.

The current route is a construct proof and visual command-platform opening. It should not transition into RTS scenario state until the construct source profile and construct completion result are stable.

## Required prerequisites before bootstrap

```txt
1. SourceProfile parity fixture exists and passes.
2. GameHost sourceProfile readback is additive and legacy-compatible.
3. ConstructEventResult exists.
4. construct_complete is emitted once.
5. duplicate construct_complete is rejected idempotently.
6. scenario bootstrap can reject construct_incomplete.
7. scenario bootstrap can reject duplicate_scenario_bootstrap.
8. scenario bootstrap journal rows can be replayed deterministically.
```

## Blocker map

```txt
scenario_bootstrap
  blocked_by: sourceProfile parity missing
  blocked_by: typed construct result missing
  blocked_by: construct completion idempotency missing
  blocked_by: scenario bootstrap fixture missing
  blocked_by: command journal replay missing
```

## Do not do yet

```txt
- Do not add unit spawning.
- Do not add resources.
- Do not add enemies.
- Do not add scenario objectives.
- Do not add command UI.
- Do not promote RTS domains.
```

## Correct next sequence

```txt
sourceProfile fixture gate
  -> additive GameHost sourceProfile diagnostics
  -> build gate before static copy
  -> construct result envelope
  -> scenario bootstrap preflight
  -> scenario bootstrap fixture
  -> then first RTS slice
```
