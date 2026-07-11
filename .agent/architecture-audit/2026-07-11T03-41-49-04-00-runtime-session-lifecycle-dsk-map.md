# Runtime Session Lifecycle DSK Map

**Timestamp:** `2026-07-11T03-41-49-04-00`

## Summary

The active menu and campaign already compose multiple service families, but runtime ownership is implicit. This audit maps the lifecycle parent domain and the DSKs needed to own construction, execution, transition and disposal.

## Plan ledger

**Goal:** define a composable lifecycle domain that wraps existing kits without absorbing their gameplay or rendering responsibilities.

- [x] Map current route composition.
- [x] Separate lifecycle ownership from menu/gameplay logic.
- [x] Identify parent domain responsibilities.
- [x] Identify sub-kits and service boundaries.
- [x] Define composition order and invariants.
- [ ] Implement after earlier queue gates.

## Current composition

```txt
menu-route-kit
  + graveyard-art-kit
  + menu-settings-persistence-kit
  + menu-save-presence-kit
  + menu-audio-kit
  + crt-renderer-kit
  + PhantomMenu exposure
  + recursive RAF and listeners

campaign-route-shell-kit
  + pixel-campaign-runtime-kit
  + fixed-step-campaign-simulation-kit
  + pixel-campaign-render-kit
  + crt-renderer-kit
  + GameHost exposure
  + recursive RAF and listeners
```

## Missing parent domain

```txt
phantom-command-runtime-session-domain
```

Owns:

```txt
session identity
lifecycle state
environment adapters
startup transaction
resource ledger
cleanup stack
RAF lease and generation fence
listener/timer/global leases
audio and CRT ownership adapters
transition admission
stop/restart/dispose orchestration
startup rollback
last result and bounded journal
clone-safe observation
```

Does not own:

```txt
menu art
menu selection rules
save-candidate classification
campaign content
campaign commands
fixed-step gameplay
world drawing
CRT shader appearance
save envelope semantics
```

## DSK breakdown

| DSK | Inputs | Outputs | Services |
|---|---|---|---|
| `runtime-session-id-kit` | route ID, optional seed | sessionId, runId, generation | allocate and advance identity |
| `lifecycle-state-kit` | current state, operation | typed transition result | admit/reject lifecycle transitions |
| `startup-transaction-kit` | factories, environment | started session or failure | acquire resources and register cleanup |
| `resource-ledger-kit` | acquisitions/releases | immutable resource rows | count, inspect and assert parity |
| `cleanup-stack-kit` | cleanup callbacks | ordered cleanup result | reverse-order exactly-once cleanup |
| `animation-frame-lease-kit` | scheduler adapter | RAF lease | request, cancel, inspect pending callback |
| `run-generation-fence-kit` | generation token | callback admission result | reject stale callbacks |
| `listener-lease-kit` | target, type, handler, options | listener lease | add/remove exactly once |
| `timer-lease-kit` | clock adapter, callback | timer lease | set/cancel/settle |
| `global-exposure-lease-kit` | object, property, value | global lease | install, verify owner, restore |
| `audio-resource-owner-kit` | AudioContext adapter | audio ledger/result | stop, disconnect and close |
| `crt-resource-owner-kit` | WebGL adapter | CRT lifecycle result | allocate, render, resize and dispose |
| `transition-command-kit` | Begin/Continue/Restart/Exit | normalized command | source normalization |
| `transition-result-kit` | command and lifecycle outcome | typed terminal result | report admission/completion/failure |
| `ordered-dispose-kit` | active leases | disposal report | stop admission and release in order |
| `startup-rollback-kit` | partial cleanup stack | rollback report | unwind failed startup |
| `lifecycle-journal-kit` | lifecycle rows | bounded immutable journal | append, trim, clone |
| `lifecycle-observation-kit` | session state and ledgers | public snapshot | clone-safe GameHost/PhantomMenu view |
| `lifecycle-fixture-kit` | fake environment | proof report | execute deterministic lifecycle cases |

## Composition order

```txt
identity
  -> state machine
  -> startup transaction
  -> resource ledger and cleanup stack
  -> acquire CRT/audio/listeners/globals
  -> acquire RAF lease
  -> running
  -> transition admission
  -> stop input/command admission
  -> cancel RAF and timers
  -> remove listeners
  -> release globals
  -> stop audio
  -> dispose CRT
  -> disposed result and journal
```

## DSK contract rules

```txt
every acquired external resource returns a lease
every lease has an idempotent release
release order is deterministic
lifecycle state is not inferred from DOM or location
route navigation is an effect after a completed teardown result
public observation contains no live mutable ownership objects
```
