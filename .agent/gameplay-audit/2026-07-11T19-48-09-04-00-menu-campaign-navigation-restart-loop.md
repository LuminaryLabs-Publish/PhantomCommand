# Gameplay Audit: Menu, Campaign, Navigation and Restart Loop

**Timestamp:** `2026-07-11T19-48-09-04-00`

## Summary

Gameplay transitions are expressed as direct browser navigation rather than admitted lifecycle actions. The menu fades and assigns `window.location.href`; the campaign uses `location.reload()` for restart and direct location assignment for exit.

## Plan ledger

**Goal:** separate gameplay intent from browser navigation so state, resources and public capabilities retire deterministically.

- [x] Trace Begin and Continue.
- [x] Trace restart and exit.
- [x] Identify pre-navigation ownership.
- [ ] Implement typed lifecycle commands.

## Current loop

```txt
Begin/Continue
  -> mark transition timestamp
  -> keep menu RAF, listeners, global, audio and CRT live
  -> after 0.95 seconds assign href

Restart
  -> keydown callback calls location.reload()

Exit
  -> keydown callback assigns location.href="./"
```

## Target loop

```txt
GameplayNavigationIntent
  -> lifecycle admission
  -> StopSessionResult
  -> DisposeSessionResult
  -> persistence/terminal preconditions
  -> NavigateResult or RestartResult
  -> first replacement-session frame
```

## Gameplay invariant

No navigation or restart may expose a new page/session while required predecessor resources or mutable capabilities remain authoritative.
