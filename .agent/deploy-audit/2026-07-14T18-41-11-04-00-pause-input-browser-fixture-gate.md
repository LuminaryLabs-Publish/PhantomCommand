# Pause Input Browser Fixture Gate

**Timestamp:** `2026-07-14T18-41-11-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`

## Summary

Current checks are source-marker assertions. They do not execute pause, input, camera, GameHost or visible-frame behavior.

## Plan ledger

**Goal:** require identical pause behavior in source, `dist` and GitHub Pages.

- [ ] Headless command-admission matrix.
- [ ] Browser keyboard fixture.
- [ ] Browser pointer and wheel fixture.
- [ ] Public GameHost fixture.
- [ ] Paused-frame screenshot and state correlation.
- [ ] Resume stale-input fixture.
- [ ] Source/build/Pages parity.

## Required matrix

```txt
while strict paused:
  simulation time unchanged
  wave cannot start
  souls and tower count unchanged
  unit targets and moves unchanged
  selection unchanged unless policy explicitly allows it
  camera x/z/zoom unchanged
  blocked commands return rejection receipts
  route escape follows documented policy
  PAUSED frame cites accepted pause revision

after resume:
  stale held input does not leak
  fresh input works
  fixed-step simulation resumes once
  first resumed frame cites successor input revision
```
