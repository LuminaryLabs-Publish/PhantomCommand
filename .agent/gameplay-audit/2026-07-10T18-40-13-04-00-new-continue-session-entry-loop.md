# New and Continue Session Entry Loop

**Timestamp:** `2026-07-10T18-40-13-04-00`

## Current loop

```txt
Begin
  -> game.html?campaign=new
  -> fresh campaign

Continue
  -> allowed by raw storage presence
  -> game.html?campaign=continue
  -> fresh campaign
```

Both routes converge on the same unparameterized module initialization.

## Current campaign loop

```txt
fresh state
  -> select allies or pads
  -> build tower or issue order
  -> start wave
  -> fixed-step spawn and combat
  -> earn souls or lose core health
  -> clear six waves or lose
  -> victory writes completion summary
```

## Target session-entry loop

```txt
resolve candidates
  -> parse route intent
  -> new: create fresh session result
  -> continue with winner: hand winner to hydration boundary
  -> continue without winner: return rejected/fallback result
  -> expose immutable entry result
  -> begin campaign loop
```

## Gameplay invariants to preserve

```txt
7 rings
4 lanes
58 generated build pads
6 starter allies
3 tower types
7 unit archetypes
6 waves
fixed 1/60 simulation
initial souls 145
initial core 24
```

## Proof requirements

- `new` never reads or hydrates a candidate.
- `continue` never silently behaves as `new` without a typed fallback reason.
- Candidate resolution occurs before mutable campaign state is exposed.
- Invalid candidate handling cannot partially mutate counters, pads, units, camera, or selection.
- Existing input, combat, economy, win/loss, and rendering remain unchanged during the resolver slice.