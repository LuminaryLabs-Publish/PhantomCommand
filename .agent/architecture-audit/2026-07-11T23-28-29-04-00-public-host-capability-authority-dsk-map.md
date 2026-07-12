# Architecture Audit: Public Host Capability Authority DSK Map

**Timestamp:** `2026-07-11T23-28-29-04-00`

## Summary

`legacy-gamehost-diagnostics-kit` currently publishes live campaign owners and direct mutators. This audit defines a composed product domain that preserves read and command capabilities while keeping state, camera, simulation, rendering and terminal owners private.

## Plan ledger

**Goal:** place public automation at a controlled adapter boundary rather than inside gameplay ownership.

- [x] Identify current public owners and mutators.
- [x] Identify existing authoritative domains that must remain owners.
- [x] Define the parent host capability domain.
- [x] Define proposed kits, inputs, outputs and dependencies.
- [x] Define incremental migration ledges.
- [ ] Implement after Continue admission and command result primitives are established.

## Existing ownership

```txt
pixel-campaign-runtime-kit
  owns mutable campaign state, camera, IDs and input-facing actions

fixed-step-campaign-simulation-kit
  owns simulation advancement and combat mutation

pixel-campaign-render-kit
  owns visible CPU/CRT projection

legacy-gamehost-diagnostics-kit
  currently leaks the owners above through window.GameHost
```

## Required parent domain

```txt
phantom-command-public-host-capability-authority-domain
```

This domain owns only:

```txt
public API shape
capability discovery
host session identity
owner-handle quarantine
command admission and result projection
committed read-model publication
frame provenance
bounded observation journal
legacy compatibility policy
```

It does not own gameplay state, camera state, combat, terminal outcome, rendering or persistence.

## DSK map

```txt
phantom-command-public-host-capability-authority-domain
  |
  +-- phantom-command-host-surface-policy-kit
  |     allowed public methods and forbidden owner handles
  |
  +-- phantom-command-host-session-identity-kit
  |     hostSessionId, lifecycle and stale-host rejection
  |
  +-- phantom-command-host-capability-descriptor-kit
  |     versioned read/command capability discovery
  |
  +-- phantom-command-host-owner-handle-quarantine-kit
  |     private closure boundary and detached outputs
  |
  +-- phantom-command-host-read-capability-kit
  |     getCommittedState and getJournal admission
  |
  +-- phantom-command-host-command-capability-kit
  |     supported command names and payload bounds
  |
  +-- phantom-command-host-command-envelope-kit
  |     commandId, capability, expected identities and payload
  |
  +-- phantom-command-host-command-id-kit
  |     duplicate and idempotency policy
  |
  +-- phantom-command-host-command-admission-kit
  |     schema, capability, lifecycle and phase checks
  |
  +-- phantom-command-host-run-epoch-fence-kit
  |     predecessor-run rejection
  |
  +-- phantom-command-host-phase-revision-fence-kit
  |     paused, active and terminal admission
  |
  +-- phantom-command-host-finite-value-policy-kit
  |     finite and bounded numeric validation
  |
  +-- phantom-command-host-command-result-kit
  |     rejected, pending, committed and failed results
  |
  +-- phantom-command-host-committed-read-model-kit
  |     immutable detached public observation
  |
  +-- phantom-command-host-frame-provenance-kit
  |     simulationTick, frameId and render receipt
  |
  +-- phantom-command-host-state-fingerprint-kit
  |     stable observation identity
  |
  +-- phantom-command-host-observation-journal-kit
  |     bounded result and frame history
  |
  +-- phantom-command-legacy-gamehost-adapter-kit
  |     temporary compatibility without raw owner exposure
  |
  +-- fixture kits
        mutation isolation
        read-model coherence
        stale command rejection
        terminal command rejection
```

## Command routing

```txt
public HostCommand
  -> host command admission
  -> campaign action result authority
  -> phase admission
  -> fixed-step command scheduler
  -> existing gameplay/camera owner
  -> simulation and render commit
  -> HostCommandResult with frame provenance
```

The host must not call gameplay functions directly once the command authority exists.

## Read routing

```txt
simulation and camera commit
  -> presentation state
  -> CPU and CRT render submit
  -> committed frame record
  -> host committed read model
  -> detached immutable public result
```

## Migration ledges

```txt
Ledge 1
  remove public state and camera properties
  preserve getState as a detached best-effort compatibility method
  reject all direct public mutation

Ledge 2
  add version and capability descriptors
  add typed command envelope and finite-value admission

Ledge 3
  route host commands through campaign action and phase authority

Ledge 4
  replace getState with getCommittedState after frame authority exists

Ledge 5
  retire legacy adapter after downstream callers migrate
```

## Required invariants

```txt
one authoritative owner per state domain
public API contains no mutable owner handle
public commands never bypass phase or fixed-step authority
read model is built from one committed frame
stale host/run/phase identities perform zero mutation
legacy compatibility cannot widen capability
```
