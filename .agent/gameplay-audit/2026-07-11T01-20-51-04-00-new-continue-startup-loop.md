# New and Continue Startup Loop

**Timestamp:** `2026-07-11T01-20-51-04-00`

## Current loop

```txt
BEGIN CAMPAIGN
  -> game.html?campaign=new
  -> campaign module constructs fresh state

CONTINUE
  -> enabled by any non-empty candidate slot
  -> game.html?campaign=continue
  -> campaign module constructs the same fresh state
```

The route query currently has no gameplay effect.

## Current initial state

```txt
souls: 145
sanctum core: 24
wave: 0
waveActive: false
six starter allies
zero towers
spire selected
fresh IDs and queues
```

## Current persistence result

Victory writes only:

```js
{
  scene: "grave-ring",
  souls,
  wave
}
```

This proves prior completion but cannot restore entities, towers, health, projectiles, queues, IDs, selection, camera, tick position, messages, or command history.

## Required gameplay admission results

```txt
fresh-start accepted
continue accepted
continue rejected: no resumable candidate
continue rejected: invalid candidate
continue rejected: unsupported version
continue rejected: completion summary only
route rejected: unsupported mode
```

A rejected Continue must not silently become a fresh start. The caller must receive a stable reason and choose an explicit recovery path.

## Startup transaction

```txt
resolve route intent
  -> consume immutable candidate decision
  -> create staged fresh or hydrated campaign state
  -> validate state invariants
  -> compute startup fingerprint
  -> commit session
  -> publish startup result
```

Hydration remains a later implementation gate. The first slice should still establish admission and explicitly reject non-resumable candidates.

## Compatibility rule

The current victory summary should remain readable as `legacy-completion-summary`. It may support a future completed-node projection but must not be promoted to resumable gameplay state.
