# Menu-to-Campaign Audio Loop

**Timestamp:** `2026-07-15T13-41-25-04-00`

## Summary

Audio exists only in the menu. The campaign route creates no audio graph, while the menu does not explicitly settle its graph before navigation. Route audio behavior therefore depends on browser document teardown rather than a product-owned result.

## Plan ledger

**Goal:** preserve the current silent campaign while making menu exit deterministic and explicit.

- [x] Trace menu unlock, ambience and cue behavior.
- [x] Trace New and Continue navigation.
- [x] Confirm the campaign module creates no AudioContext or cue graph.
- [x] Define route settlement without adding campaign audio.
- [ ] Implement and prove the boundary.

## Loop

```txt
menu input
  -> create or reuse menu audio graph
  -> project ambience and UI cues

New or Continue
  -> play transition cue
  -> visually fade
  -> navigate to game.html
  -> browser destroys predecessor document at an implementation-defined point

campaign
  -> boot fixed-step combat and render surfaces
  -> no campaign audio owner
```

## Required outcome

The accepted route transition must publish a final menu-audio settlement result before or as the predecessor document retires. The campaign remains silent unless a separate campaign-audio domain is intentionally introduced.