# Gameplay audit: new/continue and wave command loop

Timestamp: `2026-07-10T15-38-40-04-00`

## Current player loop

```txt
Begin or Continue from menu
  -> campaign always initializes fresh
  -> inspect rings, lanes, pads, starter guards, and starter archers
  -> choose spire, lantern, or ward
  -> select an empty pad
  -> click the same pad again to build when souls are sufficient
  -> select one or more allied units
  -> right-click ground to move or an enemy to target
  -> press Space to start the next wave
  -> enemies enter from four lanes
  -> allies and towers acquire targets
  -> projectiles and melee damage resolve
  -> enemy deaths award souls
  -> enemies reaching the sanctum reduce core
  -> cleared waves award additional souls
  -> survive six waves to write a minimal victory save
```

## Gameplay authority gaps

### Continue is not gameplay continuation

The menu recognizes save presence and emits `campaign=continue`, but the campaign module always creates a fresh state object, six starter allies, full sanctum core, wave zero, and default resources. No save is read.

### Build intent is overloaded

`selectAt` both selects an empty pad and treats a second click as a build command. There is no explicit command record distinguishing:

```txt
select pad accepted
select pad rejected
build accepted
build rejected: occupied
build rejected: insufficient souls
build rejected: no selected pad
```

### Order and wave start failures are silent

`order` returns when no units are selected. `startWave` returns when a wave is active, the campaign is won/lost, or all waves are complete. These outcomes have no result rows or player-readable diagnostics.

### Replay cannot be deterministic from current evidence

The fixed-step simulation is deterministic for a given initialized state and ordered inputs, but there is no command queue, session seed, command sequence, save version, or replay journal to reconstruct that condition.

## Required gameplay result set

```txt
SESSION_NEW_CREATED
SESSION_CONTINUE_HYDRATED
SESSION_CONTINUE_REJECTED
UNIT_SELECTION_CHANGED
PAD_SELECTION_CHANGED
BUILD_ACCEPTED
BUILD_REJECTED
ORDER_ACCEPTED
ORDER_REJECTED
WAVE_START_ACCEPTED
WAVE_START_REJECTED
ENEMY_SPAWNED
DAMAGE_APPLIED
ENEMY_DEFEATED
SOULS_AWARDED
SANCTUM_DAMAGED
WAVE_CLEARED
CAMPAIGN_WON
CAMPAIGN_LOST
SAVE_WRITTEN
SAVE_WRITE_REJECTED
```

## Acceptance boundary

The next gameplay cut is complete only when a DOM-free fixture can create a new session, hydrate a valid continue session, reject an invalid save without mutation, execute accepted and rejected build/order/wave commands, replay the command journal, and reproduce the same final summary.
