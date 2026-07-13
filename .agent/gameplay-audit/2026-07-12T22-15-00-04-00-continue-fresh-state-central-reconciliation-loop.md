# Continue Starts Fresh Campaign Loop

**Timestamp:** `2026-07-12T22-15-00-04-00`

## Summary

New and Continue currently converge on identical module initialization. Both create wave zero, 145 souls, 24 core, six starting allies and empty tower/projectile/effect collections.

## Plan ledger

**Goal:** prevent Continue from silently becoming New and require a terminal typed result for unavailable or invalid checkpoints.

- [x] Trace New.
- [x] Trace Continue.
- [x] Compare initialized state.
- [x] Inspect final save output.
- [ ] Implement separate admitted paths later.

## Failure loop

```txt
finish campaign
  -> write {scene, souls, wave}
  -> menu detects truthy value
  -> Continue enabled
  -> route carries continue
  -> campaign ignores route and save
  -> fresh wave-zero state appears
```
