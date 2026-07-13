# Keyboard Focus, Repeat and Generation Contract

**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Timestamp:** `2026-07-12T22-00-46-04-00`

## Summary

Keyboard admission needs three independent proofs: the campaign surface owns focus, the event belongs to the active keyboard generation, and repeat behavior is valid for the mapped command. A key being present in the held Set is not sufficient evidence.

## Plan ledger

**Goal:** define exact focus, repeat, lifecycle and generation semantics for campaign keyboard input.

- [x] Separate route ownership from DOM focus.
- [x] Separate physical press state from one-shot command identity.
- [x] Define repeat policy by command class.
- [x] Define generation retirement on lifecycle boundaries.
- [x] Define stale keyup and duplicate command behavior.
- [ ] Implement later.

## Focus policy

```txt
campaign route active
AND campaign canvas/input surface capability current
AND document focus policy admitted
AND target is not editable or explicitly excluded
```

Editable targets include text inputs, textareas, selects, contenteditable regions and future editor/debug controls unless they explicitly delegate a key.

## Repeat policy

```txt
held movement keys:
  repeat events may be normalized to no-op held-state duplicates

one-shot keys:
  Space, 1, 2, 3, P, F, R, Escape
  repeat=true rejects before command creation
```

## Generation policy

```txt
new campaign route mount -> keyboardGeneration + 1
focus ownership change -> focusGeneration + 1
blur -> close current generation and clear held state once
visibility hidden -> close current generation
pagehide / route teardown -> retire listeners and generation
pageshow / route resume -> allocate successor generation
```

## Stale-event policy

```txt
keyup from predecessor generation -> ignored with typed stale result
repeated keydown for completed one-shot command -> duplicate/repeat result
late event after route teardown -> inactive-surface result
consumer result for predecessor campaign revision -> stale-consumer result
```

## Observation contract

```txt
CampaignKeyboardObservation {
  routeId
  surfaceId
  keyboardGeneration
  focusGeneration
  heldKeys
  lastSequence
  acceptedCount
  repeatedRejectedCount
  staleRejectedCount
  editableTargetRejectedCount
  lastResult
}
```

The observation and journal must be bounded and must not expose mutable DOM events or the live held-key Set.

## Completion boundary

Clearing the Set on blur is not lifecycle proof. Completion requires generation retirement, stale-event rejection, exactly-once clear, listener teardown and visible-frame correlation for accepted commands.