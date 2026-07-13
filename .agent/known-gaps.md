# PhantomCommand Known Gaps

**Timestamp:** `2026-07-13T17-00-59-04-00`

## Summary

The leading lifecycle gap is Route Session Resource Retirement Authority. Menu and campaign resource ownership is ambient, and navigation depends on implicit document teardown.

## Plan ledger

**Goal:** close route identity, cleanup, navigation and successor-proof gaps without moving rendering, audio or gameplay semantics into the composition authority.

- [x] Record route allocation and navigation behavior.
- [x] Record missing RAF, listener, audio, CRT and public-host retirement.
- [x] Record failure and successor-frame gaps.
- [x] Preserve prior authority gaps.
- [ ] Implement in dependency order.

## Identity gaps

```txt
route generation
transition ID
source and target identity
active retiring retired states
duplicate and stale transition rejection
```

## Resource gaps

```txt
resource manifest
RAF lease and cancellation receipt
listener lease and removal receipt
timeout retirement
AudioContext and node receipt
CRT shader program buffer and texture disposal
public-host generation and revocation
```

## Navigation gaps

```txt
typed navigation attempt
accepted failed cancelled superseded timed-out results
blocked-navigation fallback
predecessor restoration
successor startup failure result
```

## Presentation gaps

```txt
last accepted outgoing frame
route-independent failure projection
transition-aware successor startup
first successor visible-frame acknowledgement
public route-transition readback
```

## Concrete current risks

```txt
menu continues drawing and accepting input during fade
campaign exit and reload bypass one transition owner
stale callbacks have no generation fence
audio closes only through a settings action
CRT GPU objects have no disposal method
public hosts have no retired state
navigation failure can leave a fully faded active route
successor readiness is never proven
```

## Test gaps

```txt
menu-to-campaign retirement
campaign-to-menu retirement
campaign restart replacement
duplicate transition rejection
stale RAF rejection
listener removal
audio suspend/close
CRT disposal
public-host retirement
navigation failure fallback
successor startup failure
first successor frame acknowledgement
source/build/Pages parity
```

## Retained authority gaps

```txt
Fixed-Step Frame Scheduler Authority
WebGL Context Lifecycle and Recovery Authority
Accessible Command and Focus Projection Authority
Combat Modifier Application Authority
Campaign Bootstrap and Continue Resume Authority
Campaign Keyboard Command Admission Authority
Campaign Action Result Authority
Campaign Spatial Input Admission Authority
Menu Pointer-Hit Admission Authority
CRT Display/Input Projection Authority
Campaign Phase Admission Authority
Public Host Committed Read Model
Combat Resolution and Entity Liveness Authority
Exclusive Terminal Outcome Transaction
Menu Audio Activation and Lifecycle Authority
complete campaign replay
source/build/Pages production proof
```

## Completion boundary

Browser document replacement is not a resource-retirement receipt. Completion requires generation-aware manifests, explicit participant disposal, typed navigation outcomes, bounded failure behavior and a matching successor visible-frame acknowledgement.
