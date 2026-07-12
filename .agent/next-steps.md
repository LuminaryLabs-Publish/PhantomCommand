# PhantomCommand Next Steps

**Timestamp:** `2026-07-12T04-18-44-04-00`

## Goal

Add menu-audio lifecycle authority while preserving the current ambience character and keeping it subordinate to the existing runtime-session lifecycle plan.

## Plan ledger

- [ ] Create one menu audio session and context generation.
- [ ] Replace `ensureAudio()` void behavior with a typed start/resume result.
- [ ] Observe `AudioContext.state` and subscribe to state changes.
- [ ] Resume a suspended context only after a qualifying user gesture.
- [ ] Own master, drone, wind, UI voices and delayed-close timer as leases.
- [ ] Stop/disconnect graph nodes before closing the context.
- [ ] Cancel or fence stale delayed-close callbacks.
- [ ] Add visibility suspend/resume policy.
- [ ] Add `pagehide`, `pageshow`, bfcache and navigation retirement policy.
- [ ] Correlate ambience settings with admitted audible state.
- [ ] Expose detached audio diagnostics, not raw AudioContext owners.
- [ ] Add pure lifecycle fixtures and real-browser audio smokes.
- [ ] Run `npm run check` after the fixtures are wired.

## Existing owners to update

```txt
src/menu/graveyard-menu.js
menu-audio-kit
menu-settings-persistence-kit
menu-route-kit
window.PhantomMenu adapter
Runtime Session Lifecycle Authority
scripts/check-menu.mjs
package.json
```

## Result contract

```txt
AudioLifecycleResult
  commandId
  audioSessionId
  contextGeneration
  status
  previousContextState
  nextContextState
  graphLeaseCount
  voiceLeaseCount
  timerLeaseCount
  reason
  resolvedAtMs
```

## Fixture gate

```txt
first gesture starts one graph
suspended context resumes on later gesture
repeated ensure is idempotent
rapid off/on toggle does not cross-close generations
pagehide retires or suspends under policy
bfcache restore revalidates before audio resumes
transition retires menu graph before navigation
UI-tone voices return to zero live leases
settings and observed audible state agree
```

## Dependency order

```txt
Continue admission
  -> public host quarantine
  -> CRT projection
  -> campaign phase admission
  -> fixed-step scheduling
  -> committed read model
  -> combat/terminal authority
  -> runtime session lifecycle
  -> menu audio lifecycle specialization
  -> checkpoint capture
```

Do not expose the raw AudioContext through `PhantomMenu`. Publish immutable capability and lifecycle results only.
