# Menu Audio Lifecycle DSK Map

**Timestamp:** `2026-07-15T13-41-25-04-00`

## Summary

The current `menu-audio-kit` combines browser capability discovery, context creation, ambience generation, transient cues, preference projection and delayed shutdown in one mutable object. Lifecycle authority is incomplete.

## Plan ledger

**Goal:** separate policy, ownership, projection, settlement and proof without moving Web Audio into gameplay or rendering.

- [x] Map existing menu audio services.
- [x] Map route, visibility and document lifecycle boundaries.
- [x] Define one parent authority and 18 focused surfaces.
- [ ] Implement the DSK family.

## Parent domain

`phantom-command-menu-audio-unlock-lifecycle-authority-domain`

## Existing domain boundary

```txt
menu-audio-kit
  ensureAudio
    -> AudioContext
    -> master gain
    -> persistent drone
    -> looping wind
  playUiTone
    -> transient oscillator and gain
  stopAmbience
    -> fade master
    -> delayed context close
```

## Required child surfaces

```txt
policy:
  menu-audio-policy-kit
  audio-preference-projection-kit
  audio-bus-policy-kit

context:
  audio-context-generation-kit
  audio-unlock-admission-kit
  audio-context-state-observer-kit

projection:
  persistent-ambience-source-kit
  transient-ui-cue-kit

settlement:
  visibility-audio-settlement-kit
  route-audio-settlement-kit
  pagehide-audio-retirement-kit
  audio-source-retirement-kit
  audio-context-retirement-kit
  late-audio-callback-rejection-kit

results and proof:
  audio-lifecycle-result-kit
  first-audible-menu-frame-ack-kit
  first-silent-route-transition-ack-kit
  browser-audio-lifecycle-fixture-kit
```

## Command flow

```txt
accepted input gesture
  -> MenuAudioUnlockCommand
  -> create or resume one AudioContextGeneration
  -> MenuAudioUnlockResult

accepted menu action
  -> MenuAudioProjectionCommand
  -> admit ambience or UI cue
  -> MenuAudioProjectionResult

preference visibility route or page transition
  -> MenuAudioSettlementCommand
  -> suspend fade stop disconnect close
  -> MenuAudioSettlementResult
```

No runtime implementation was added.