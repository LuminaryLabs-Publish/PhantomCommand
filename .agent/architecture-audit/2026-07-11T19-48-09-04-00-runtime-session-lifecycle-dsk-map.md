# Architecture Audit: Runtime Session Lifecycle DSK Map

**Timestamp:** `2026-07-11T19-48-09-04-00`

## Summary

The menu and campaign are currently module-owned procedural runtimes. The replacement boundary is a composed lifecycle domain that owns identities, phases, leases, teardown order and replacement-frame readiness.

## Plan ledger

**Goal:** map the DSK/domain ownership required to remove implicit browser-owned lifecycle behavior.

- [x] Identify current resource owners.
- [x] Identify missing identities and results.
- [x] Define coordinating kits.
- [ ] Implement the composition.

## Parent domain

```txt
phantom-command-runtime-session-lifecycle-authority-domain
```

## DSK map

```txt
runtime-session-dsk
  -> sessionId
  -> runtimeGeneration
  -> lifecyclePhase
  -> lifecycle command admission

resource-lease-dsk
  -> RAF leases
  -> listener leases
  -> timer leases
  -> audio leases
  -> WebGL/CRT leases
  -> global capability leases

runtime-stop-dsk
  -> reject new commands
  -> cancel frame and timer work
  -> fence stale callbacks
  -> StopSessionResult

runtime-dispose-dsk
  -> reverse dependency retirement
  -> listener removal
  -> audio shutdown
  -> CRT resource deletion
  -> global revocation
  -> DisposeSessionResult

runtime-navigation-dsk
  -> NavigateCommand
  -> RestartCommand
  -> bfcache policy
  -> first replacement-frame acknowledgement
```

## Candidate kits

```txt
phantom-command-runtime-session-id-kit
phantom-command-runtime-generation-kit
phantom-command-lifecycle-phase-kit
phantom-command-resource-lease-registry-kit
phantom-command-raf-lease-kit
phantom-command-listener-lease-kit
phantom-command-timer-lease-kit
phantom-command-audio-context-lease-kit
phantom-command-crt-resource-lease-kit
phantom-command-global-capability-lease-kit
phantom-command-stale-callback-fence-kit
phantom-command-navigation-exit-command-kit
phantom-command-restart-command-kit
phantom-command-teardown-plan-kit
phantom-command-reverse-retirement-kit
phantom-command-teardown-result-kit
phantom-command-first-session-frame-kit
phantom-command-lifecycle-journal-kit
phantom-command-menu-campaign-teardown-fixture-kit
phantom-command-bfcache-resume-fixture-kit
phantom-command-restart-leak-fixture-kit
```

## Dependency rule

Lifecycle identity must be established before command, combat, terminal and checkpoint results can be safely correlated. Teardown consumes those identities and must finish before navigation or a replacement runtime is admitted.
