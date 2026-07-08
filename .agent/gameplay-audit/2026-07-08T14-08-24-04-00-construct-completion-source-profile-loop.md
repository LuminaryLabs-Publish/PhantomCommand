# PhantomCommand Construct Completion Source Profile Loop

**Timestamp:** `2026-07-08T14-08-24-04-00`

## Summary

The current gameplay loop is still a construct-viewer loop. Before adding RTS commands or scenario bootstrap, the game needs source-profile proof so construct completion can later become a typed result instead of only a visual/HUD phase.

## Current gameplay loop

```txt
open menu
  -> enter construct scene
  -> watch inner-to-outer ring construction
  -> pan and zoom around construct
  -> skip or restart construction
  -> phase changes to command online when 92 pieces are done
```

## Current completion state

```txt
complete=false
construct(seq) counts done pieces
if done === parts.length and !complete:
  complete=true
  phase='command online'
```

This is visually correct enough, but it is not yet a typed gameplay result.

## Required source-profile predecessor

Construct completion should not become the next implementation until the live source profile is owned by pure modules.

```txt
source profile fixture passes
  -> ring descriptors are source-owned
  -> piece descriptors are source-owned
  -> timing descriptors are source-owned
  -> source fingerprint is stable
  -> source snapshot is serializable
  -> GameHost source diagnostics are additive
  -> then construct completion can become ConstructEventResult
```

## Later ConstructEventResult target

```txt
ConstructEventEnvelope {
  type: 'construct_complete',
  source: 'smooth-ring-handoff-v6',
  atSeconds,
  totalPieces: 92,
  ringCount: 10,
  fingerprint
}

ConstructEventResult {
  accepted: true,
  reason: 'construct_complete_recorded',
  duplicate: false,
  snapshot
}
```

## Later rejection rows

```txt
construct_complete_accepts_once
construct_complete_rejects_duplicate
construct_restart_resets_completion
construct_skip_records_completion_source
scenario_bootstrap_rejects_before_construct_complete
scenario_bootstrap_accepts_after_construct_complete
scenario_bootstrap_rejects_duplicate
unknown_scenario_rejects_with_reason
```

## Gameplay boundary rule

Do not connect RTS gameplay domains until source profile and construct completion authority are fixture-safe.

Deferred domains:

```txt
unit-selection
undead-roster
necropolis-buildings
resource-economy
wave-spawning
combat-resolution
objective-progression
command-journal-replay
```

## Main gameplay finding

The next gameplay value is not more input. It is a stable source-to-completion proof chain that lets future RTS state know which construct profile completed and why the scenario is allowed to start.
