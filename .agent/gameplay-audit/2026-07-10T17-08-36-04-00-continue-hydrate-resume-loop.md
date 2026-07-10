# Continue, Hydrate, and Resume Gameplay Loop

**Repository:** `LuminaryLabs-Publish/PhantomCommand`

**Timestamp:** `2026-07-10T17-08-36-04-00`

## Current loop

```txt
Continue selected
  -> route includes campaign=continue
  -> campaign ignores query
  -> fresh state initializes
  -> six starter allies and default resources appear
  -> player continues through normal build/order/wave loop
```

The current player-facing behavior is therefore a fresh campaign disguised as continuation whenever any candidate key exists.

## Required target loop

```txt
menu scans candidate registry
  -> classifier parses every candidate
  -> menu selects highest-priority resumable candidate
  -> Continue becomes enabled
  -> route includes campaign=continue
  -> campaign parses session mode
  -> selected candidate is re-read and revalidated
  -> hydration occurs into an isolated state candidate
  -> checksum and state invariants pass
  -> hydrated fingerprint matches saved fingerprint
  -> isolated state becomes live atomically
  -> counters and simulation tick resume
  -> renderer consumes hydrated state
  -> immutable session result reaches GameHost
```

## Invalid Continue loop

```txt
campaign=continue requested
  -> no resumable candidate exists
  -> typed rejected or fallback-new result
  -> no partial state mutation
  -> deterministic fresh campaign baseline
  -> diagnostic reason retained
```

## Gameplay state that must resume

```txt
souls and core
wave index, wave-active flag, and spawn queue
units and all combat-relevant fields
towers and occupied pads
projectiles and effects if policy retains them
selection and tower type
win/loss/pause/message state
identifier counters
simulation tick
camera baseline
```

## Acceptance rule

A resumed run is valid only when the hydrated fingerprint matches the saved fingerprint and the next fixed step advances without identifier collisions or state reset. Matching only `souls` and `wave` is insufficient.
