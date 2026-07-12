# PhantomCommand Next Steps

**Timestamp:** `2026-07-12T07-29-32-04-00`

## Goal

Implement one menu audio activation and lifecycle authority so context state, graph ownership, interruption recovery and teardown are explicit and testable.

## Plan ledger

- [ ] Introduce `AudioSessionId`, `contextGeneration`, `graphGeneration` and `stateRevision`.
- [ ] Replace direct `ensureAudio()` mutation with a typed `AudioLifecycleCommand` path.
- [ ] Capture trusted user-activation evidence before create or resume admission.
- [ ] Observe `AudioContext.state` and subscribe to `statechange`.
- [ ] Resume suspended or interrupted contexts through an admitted transaction.
- [ ] Treat closed and failed contexts as replaceable, not current.
- [ ] Register all persistent and transient nodes by graph generation.
- [ ] Assign identities to delayed close work and cancel stale timers before replacement.
- [ ] Make rapid off/on/off sequences generation-safe and idempotent.
- [ ] Add visibility, pagehide and navigation retirement adapters.
- [ ] Add ordered stop and disposal with typed terminal results.
- [ ] Distinguish ambience preference from actual runtime audio state in diagnostics.
- [ ] Publish bounded lifecycle observations and a journal.
- [ ] Add deterministic lifecycle fixtures and real-browser audio smokes.
- [ ] Run `npm run check` and `npm run build` after fixture wiring.

## Existing owners to update

```txt
src/menu/graveyard-menu.js
menu-audio-kit
menu-settings-persistence-kit
menu-route-kit
window.PhantomMenu diagnostics
scripts/check-menu.mjs
package.json
```

## Command contract

```txt
AudioLifecycleCommand
  commandId
  audioSessionId
  expectedContextGeneration
  expectedGraphGeneration
  action
  userActivationEvidence
  reason
  requestedAtMs
```

Actions:

```txt
CreateOrResume
Suspend
Stop
Dispose
Observe
```

## Result contract

```txt
AudioLifecycleResult
  commandId
  audioSessionId
  contextGeneration
  graphGeneration
  requestedAction
  previousState
  observedState
  status
  nodeCount
  pendingTaskCount
  userActivationObserved
  reason
  committedAtMs
```

## Fixture gate

```txt
untrusted synthetic input cannot create or resume audio
first admitted pointer gesture creates one running generation
first admitted keyboard gesture creates one running generation
repeated gesture while running is idempotent
suspended context resumes on the next admitted gesture
closed context is replaced by a new generation
rapid off/on cancels predecessor delayed work
rapid off/on/off leaves one disposed terminal generation
visibility and interruption state changes are observed
Begin and Continue transitions retire the graph in order
pagehide and reload leave no owned nodes or pending timers
settings diagnostics distinguish preference from runtime state
```

## Dependency order

```txt
Campaign Bootstrap and Continue Resume Authority
  -> Runtime Session Lifecycle Authority
     -> Menu Audio Activation and Lifecycle Authority
        -> transition and navigation retirement
        -> browser audio fixture gate
  -> Public Host and Committed Read Model Authorities
  -> Full Checkpoint Capture Authority
```

Do not call `context.resume()` or `context.close()` from unrelated menu branches. Route every lifecycle mutation through one session-scoped transaction.