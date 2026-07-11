# Gameplay Audit: Menu Continue to Fresh Campaign Loop

**Timestamp:** `2026-07-11T15-08-41-04-00`

## Summary

Continue is currently a false gameplay promise. The menu enables it from raw storage presence, but the campaign ignores the mode and starts the same default state as Begin.

## Plan ledger

**Goal:** preserve player expectations by making Continue either resume one admitted campaign state or fail explicitly without substituting a fresh run.

- [x] Trace Continue enablement.
- [x] Trace route navigation.
- [x] Compare Begin and Continue startup state.
- [x] Trace current victory-summary persistence.
- [x] Define gameplay invariants and fixture cases.
- [ ] Implement resume behavior.

## Current gameplay loop

```txt
player completes or partially interacts with prior content
  -> a raw value exists under one legacy/current key
  -> menu shows CONTINUE / BOUND
  -> player activates Continue
  -> campaign URL includes campaign=continue
  -> campaign constructs wave 0, core 24, souls 145 and default allies
  -> prior progress is not restored
```

## Begin and Continue parity today

```txt
Begin URL:     game.html?campaign=new
Continue URL:  game.html?campaign=continue

runtime state for both:
  time = 0
  souls = 145
  core = 24
  wave = 0
  waveActive = false
  default allied roster
  no towers
  no projectiles
  default camera and counters
```

The only behavioral difference is the query string, which the runtime does not consume.

## Current saved value is not resumable

The active writer stores:

```json
{
  "scene": "grave-ring",
  "souls": 0,
  "wave": 6
}
```

The actual numeric `souls` varies, but the payload omits the live graph required to resume:

```txt
core health
units and HP
unit targets and movement
selected units and pad
towers and cooldowns
projectiles and effects
spawn queue and timers
camera
paused or terminal phase
identity counters
simulation time and accumulator
```

This value is a completion summary, not a mid-run checkpoint.

## Player-facing consequences

```txt
Continue can be enabled by corrupt data
Continue can be enabled by unrelated legacy data
Continue silently discards expected progress
Continue and Begin are indistinguishable after navigation
failure is hidden rather than explained
future checkpoint work can inherit ambiguous key precedence
```

## Required gameplay contract

```txt
Begin
  -> explicitly starts a fresh run
  -> never hydrates a candidate

Continue
  -> requires one selected resumable candidate
  -> resumes exactly that candidate
  -> rejects changed, stale or unsupported candidates
  -> never substitutes a fresh run silently

Completion summary
  -> may unlock future content
  -> does not claim resumable campaign state
```

## Required result reasons

```txt
new-started
continue-started
no-candidate
invalid-candidate
unsupported-schema
content-mismatch
stale-candidate
candidate-changed
hydration-failed
reference-invalid
fingerprint-mismatch
storage-denied
```

## Gameplay fixture cases

```txt
Begin with no save
Begin with valid save present
Continue with valid resumable checkpoint
Continue with completion summary only
Continue with corrupt payload
Continue with stale content revision
Continue after candidate changes during fade
Continue hydration failure
return to menu after explicit failure
```

## Validation boundary

Documentation only. Continue still starts a fresh default campaign until runtime work and browser fixtures are implemented.