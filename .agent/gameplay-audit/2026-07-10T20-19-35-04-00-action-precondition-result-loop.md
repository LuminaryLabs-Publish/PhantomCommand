# Action Precondition and Result Loop

**Timestamp:** `2026-07-10T20-19-35-04-00`

## Gameplay loop

```txt
prepare rings and lanes
  -> generate empty build pads
  -> spawn six starter allies
  -> select units or pads
  -> spend souls to build towers
  -> start a scripted wave
  -> spawn enemies from four lanes
  -> allies acquire targets or execute orders
  -> enemies attack allies or move toward the sanctum
  -> towers acquire targets and fire
  -> projectiles apply direct or splash damage
  -> enemy deaths award souls
  -> enemies reaching the center damage the sanctum
  -> clear wave and award inter-wave souls
  -> repeat through six waves
  -> win and write completion summary, or lose when core reaches zero
```

## Current player actions

### Selection

`selectAt()` finds the nearest ally first, then the nearest unoccupied pad. Empty clicks clear selection. A repeated click on the already-selected pad calls `build()`.

This means one pointer gesture can represent several implicit command types:

```txt
select ally
add ally
remove ally
select pad
attempt build
clear selection
```

No explicit result identifies which interpretation occurred.

### Build

Current preconditions:

```txt
selected pad exists
pad is unoccupied
selected tower type exists
souls >= tower cost
```

Current rejection behavior: silent `return`.

Current accepted mutation:

```txt
allocate tower ID
attach ID to pad
subtract souls
create tower state
emit a visual effect
replace message text
```

### Order

Current precondition: at least one selected unit ID.

Current rejection behavior: silent `return`.

Accepted behavior:

```txt
if an enemy is near the clicked world point:
  assign target IDs
  clear move destinations
else:
  clear target IDs
  assign formation-offset move destinations
emit a visual effect
```

### Wave start

Current preconditions:

```txt
wave is not active
campaign is not won
campaign is not lost
wave index is below six
```

Current rejection behavior: silent `return`.

Accepted behavior:

```txt
expand wave descriptors into spawn rows
sort rows by time
assign spawn queue
set waveActive
replace message text
```

## Fixed-step timing gap

The combat simulation uses an accumulator and exact `1/60` updates, but player actions mutate state immediately from DOM event callbacks. The mutation therefore occurs at browser-event time, not at a recorded simulation tick.

Two replays with the same visible action order can diverge in proof terms because the action may land before or after a fixed-step update depending on event timing and frame cadence. The campaign has no tick counter, command queue, or action admission timestamp to resolve that ambiguity.

## Required gameplay authority loop

```txt
input request
  -> typed gameplay command
  -> command sequence assignment
  -> deterministic target tick
  -> precondition evaluation
  -> accepted, rejected, or no-op result
  -> mutation on accepted commands only
  -> gameplay event rows
  -> state fingerprint
  -> committed tick and frame
```

## Required initial fixtures

```txt
1. Build accepted
   selected empty pad + enough souls
   -> accepted
   -> souls decrease exactly once
   -> one tower created
   -> pad references tower

2. Build rejected: no pad
   -> rejected / no-selected-pad
   -> state fingerprint unchanged

3. Build rejected: occupied
   -> rejected / pad-occupied
   -> state fingerprint unchanged

4. Build rejected: insufficient souls
   -> rejected / insufficient-souls
   -> state fingerprint unchanged

5. Order rejected: no selection
   -> rejected / no-selected-units

6. Order accepted: move
   -> accepted
   -> every valid selected ally receives a move target

7. Order accepted: attack
   -> accepted
   -> every valid selected ally receives the enemy target

8. Wave start accepted
   -> accepted
   -> deterministic spawn queue

9. Wave start rejected while active
   -> rejected / wave-already-active

10. Same command sequence and tick schedule
    -> same result rows
    -> same state fingerprints
```

## Content scope rule

Do not add new units, towers, waves, economy layers, or campaign maps during this slice. The proof must first make the existing gameplay loop observable and replayable.