# PhantomCommand Known Gaps

**Timestamp:** `2026-07-13T02-49-07-04-00`

## Summary

The leading interface gap is Accessible Command and Focus Projection Authority. Visual selection, DOM focus, native activation and panel state are separate, while campaign status remains canvas-only.

## Plan ledger

**Goal:** close command identity, availability, focus lifecycle, accessible status and proof gaps without weakening existing input, campaign or render ownership.

- [x] Record visual/native command identity divergence.
- [x] Record duplicate Enter/Space activation risk.
- [x] Record Continue availability mismatch.
- [x] Record panel focus and background-isolation gaps.
- [x] Record campaign status projection gaps.
- [x] Record deterministic and deployed proof gaps.
- [ ] Implement in dependency order.

## Command identity gaps

```txt
stable accessible command ID
activation source identity
event sequence and deduplication key
focused-control ID
visual-selection revision
focus generation
typed conflict result
typed duplicate result
public-host command admission
```

## Availability gaps

```txt
native disabled projection
aria-disabled projection
availability reason
availability revision
transition-in-progress state
command result projection
focusability parity
```

## Focus lifecycle gaps

```txt
menu focus owner
panel focus scope
focus transfer on open
background inertness
focus restoration on close
lost-focus result
stale focus-generation rejection
```

## Campaign accessibility gaps

```txt
focus admission for role=application canvas
native command alternatives
dynamic souls/core/wave status
build/order/selection result announcements
pause/win/loss announcements
bounded live-region policy
campaign status revision
first accessible result acknowledgement
```

## Concrete current risks

```txt
focused Continue plus visual New can begin New
focused Settings plus visual New can begin a route transition before panel activation
Enter/Space can generate document and native click attempts
Continue is focusable when visual state says EMPTY
menu buttons remain active while a visual panel is open
settings and credits panels have no native control projection
screen readers receive static campaign instructions but no game progress
public PhantomMenu activation has no focus or source evidence
```

## Test gaps

```txt
native Enter activation identity
native Space activation identity
focused-versus-selected disagreement
duplicate event suppression
disabled Continue focus and activation
panel focus transfer and restoration
panel background inertness
settings native/visual parity
campaign status ordering and throttling
source/build/Pages accessibility parity
```

## Retained authority gaps

```txt
Combat Modifier Application Authority
Runtime Session Resource Lifecycle Authority
Campaign Bootstrap and Continue Resume Authority
Campaign Keyboard Command Admission Authority
Campaign Action Result Authority
Campaign Spatial Input Admission Authority
Menu Pointer-Hit Admission Authority
Public Host Owner Quarantine and Typed Command Admission
CRT Display/Input Projection Authority
Campaign Phase Admission Authority
Fixed-Step Command Scheduling Replay and Committed Frame Authority
Public Host Committed Read Model
Combat Resolution and Entity Liveness Authority
Exclusive Terminal Outcome Transaction
Menu Audio Activation and Lifecycle Authority
WebGL context loss/restore and disposal
complete campaign replay
source/build/Pages production proof
```

## Completion boundary

Hidden buttons and a static `aria-live` description are not accessible-command proof. Completion requires one command identity, one accepted result, availability parity, deterministic focus ownership, dynamic status projection and matching visual/accessibility acknowledgements.
