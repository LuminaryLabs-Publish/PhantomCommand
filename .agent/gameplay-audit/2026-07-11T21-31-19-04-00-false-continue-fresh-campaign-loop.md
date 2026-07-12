# Gameplay Audit: False Continue Fresh-Campaign Loop

**Timestamp:** `2026-07-11T21-31-19-04-00`

## Summary

A completed campaign writes a truthy save summary. Returning to the menu enables Continue. Choosing Continue then starts the same fresh defaults as Begin Campaign because the campaign ignores route and storage.

## Plan ledger

**Goal:** document the reachable player-facing failure and the minimum gameplay contract for resume.

- [x] Trace victory persistence.
- [x] Trace menu save discovery.
- [x] Trace Continue navigation.
- [x] Trace campaign initialization.
- [x] Define resume gameplay invariants.
- [ ] Implement the fix.

## Reachable loop

```txt
finish final wave
  -> write phantomCommand.save
  -> return to menu
  -> Continue becomes BOUND
  -> choose Continue
  -> campaign=continue
  -> default camera and IDs
  -> six default player units
  -> souls 145
  -> core 24
  -> wave 0
```

## Gameplay risks

```txt
player progress appears lost
legacy or foreign storage can advertise a false resume
resume cannot restore tower placement or surviving units
resume cannot restore core damage or economy
resume cannot restore an active spawn queue
resume cannot preserve deterministic IDs or references
resume cannot distinguish terminal summary from active checkpoint
```

## Required policy

The product must explicitly choose supported checkpoint kinds. A safe first implementation is a stable wave-boundary checkpoint. Arbitrary mid-wave resume should not be advertised until spawn queues, active units, projectiles, cooldowns, IDs and fixed-step time are fully captured and validated.
