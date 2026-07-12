# Pointer Hit Command Admission Map

**Timestamp:** `2026-07-12T09-28-05-04-00`

## Summary

Pointer movement and keyboard activation have clear roles, but pointer activation currently falls back to keyboard-style selection semantics after a hit-test miss. The paths must remain distinct.

## Plan ledger

**Goal:** separate hover selection, pointer targeting and keyboard selection into explicit command paths.

- [x] Map current event listeners.
- [x] Map selection mutation.
- [x] Map action execution.
- [x] Identify pointer/keyboard authority crossover.
- [x] Define corrected admission flow.
- [ ] Implement after documentation.

## Current paths

```txt
pointermove
  -> source projection
  -> optional hit
  -> optional selection change

pointerdown
  -> source projection
  -> optional hit
  -> optional selection change
  -> unconditional selected action

keyboard direction
  -> explicit selection change

keyboard Enter or Space
  -> explicit selected action

hidden native button click
  -> explicit action identity
```

## Corrected paths

```txt
pointermove
  -> hover observation only

pointerdown
  -> source projection
  -> current hit test
  -> Hit(target) or Miss
  -> activate only target from Hit

keyboard Enter or Space
  -> selected-action command

native button click
  -> native-action command
```

## Admission matrix

| Input | Required evidence | Allowed result |
|---|---|---|
| Pointer | Current event `Hit(target)` | Apply that target only |
| Pointer miss | Current event `Miss` | No-op result |
| Keyboard | Current selection revision | Apply selected target |
| Native button | Native action identity | Apply named target |
| Stale event | Mismatched generation/revision | Reject with zero mutation |

## Observation requirements

```txt
input type
pointerEventId or keyboardCommandId
surface generation
panel generation
selection revision
hit status and target
terminal action result
route/settings revision after commit
```