# Menu Continue to Default Campaign Loop

**Timestamp:** `2026-07-12T13-59-50-04-00`

## Summary

Continue is currently a navigation label, not a gameplay-resume operation. The menu detects storage presence and emits a query string, but the campaign always initializes the same default rings, pads, units, economy, IDs and camera.

## Plan ledger

**Goal:** define the gameplay boundary between a clean New bootstrap and a complete Continue hydration.

- [x] Trace menu save detection and activation.
- [x] Trace campaign initial state and entity creation.
- [x] Trace the only campaign save write.
- [x] Identify incomplete-state and stale-save failure paths.
- [ ] Implement distinct New and Continue gameplay bootstraps.

## Current loop

```txt
menu
  -> hasCampaignSave returns true for any configured truthy value
  -> Continue is enabled
  -> activate Continue
  -> navigate to game.html?campaign=continue

campaign
  -> ignore campaign=continue
  -> initialize souls=145, core=24, wave=0
  -> initialize empty towers/projectiles/effects
  -> create six default allied units
  -> initialize camera at origin and zoom 0.78
  -> begin simulation and rendering
```

## Victory loop

```txt
final wave clears
  -> state.won = true
  -> message becomes campaign complete
  -> write { scene, souls, wave }
  -> omit the rest of the campaign graph
  -> swallow any storage error
```

## Concrete failure scenarios

### False Continue

```txt
legacy key contains unrelated JSON
  -> menu marks Continue BOUND
  -> user selects Continue
  -> campaign starts default state
```

### Malformed save

```txt
phantomCommand.save contains invalid JSON text
  -> menu marks Continue BOUND because it never parses
  -> campaign ignores the payload
  -> no diagnostic or recovery result exists
```

### Completed campaign resume

```txt
victory payload exists
  -> Continue is enabled
  -> campaign ignores saved souls/wave
  -> player sees wave 1 default state instead of the completed node
```

### Begin with predecessor save

```txt
old save exists
  -> Begin Campaign does not clear, archive or supersede it
  -> new session starts
  -> future menu still reports Continue BOUND from predecessor data
```

## Gameplay state required for exact resume

```txt
simulation time and committed tick
souls and sanctum core
wave index, active flag and spawn queue
unit records, IDs, targets, movement and cooldowns
tower records, IDs, pad occupancy and cooldowns
projectiles, IDs and remaining travel state
selection and selected pad
tower type
camera position, velocity and target zoom
pause and terminal phase
next ID counters
content version and balance fingerprint
```

Transient effects may be explicitly dropped, but that policy must be versioned and deterministic.

## Required gameplay result

```txt
CampaignBootstrapResult
  mode: New | Continue
  status
  bootstrapRevision
  stateFingerprint
  contentFingerprint
  resumedTick
  droppedTransientKinds
  reason
```

## Completion boundary

The Continue button, query string and victory write are not sufficient evidence of resumable gameplay. The campaign must hydrate a complete validated state graph before the first simulation tick and visible frame.