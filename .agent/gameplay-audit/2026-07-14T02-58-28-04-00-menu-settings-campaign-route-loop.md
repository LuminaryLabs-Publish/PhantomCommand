# Menu Settings to Campaign Route Loop

**Timestamp:** `2026-07-14T02-58-28-04-00`

## Summary

The player-facing settings loop ends at menu navigation. CRT and grain choices visibly affect the menu but do not affect campaign presentation. Ambience controls only the menu audio graph and has no declared campaign meaning.

## Plan ledger

**Goal:** make settings behavior predictable across the complete player route rather than treating each page as an unrelated application.

- [x] Trace player input through settings mutation.
- [x] Trace persistence and menu feedback.
- [x] Trace campaign startup and hard-coded presentation.
- [x] Identify unsupported and silently ignored settings.
- [ ] Implement route capability and adoption results later.

## Current player loop

```txt
open Ritual Settings
  -> toggle CRT or grain
  -> menu presentation changes immediately
  -> localStorage write is attempted
  -> select Begin Campaign or Continue
  -> menu fades and navigates
  -> campaign creates a new CRT renderer
  -> campaign forces CRT on and grain low
  -> no message explains the override
```

## Gameplay impact

The mismatch changes readability and presentation during active combat. A player who disables curvature/aberration or chooses another grain level cannot rely on that accessibility or visual preference once gameplay starts.

## Required gameplay rules

```txt
one canonical settings document per browser profile
one accepted settings revision per route generation
explicit capability status for each field
no silent fallback after a user-selected supported value
unsupported values produce a visible or diagnostic result
route transition preserves the accepted revision
first campaign frame proves the applied presentation revision
```

## Retained boundaries

This audit does not replace the retained route-lifecycle, fixed-step scheduler, WebGL recovery, accessible command, combat modifier or persistence audits. It adds the missing cross-route settings contract.