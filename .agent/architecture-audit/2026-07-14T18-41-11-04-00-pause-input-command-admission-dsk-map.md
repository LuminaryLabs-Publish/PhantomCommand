# Pause Input Command Admission DSK Map

**Timestamp:** `2026-07-14T18-41-11-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`

## Summary

The implemented campaign combines simulation pause, input handling, camera control and command mutation in one module. The required authority separates pause state from command admission and makes every accepted or rejected command cite one pause-policy revision.

## Plan ledger

**Goal:** map current ownership and the smallest coordinating DSK family needed for deterministic pause and resume.

- [x] Map existing campaign, input, scheduler, camera, render and route ownership.
- [x] Preserve existing kits.
- [x] Add no renderer or gameplay implementation.
- [ ] Implement the authority as a composed campaign subdomain.

## Current ownership

```txt
pixel-campaign-runtime-kit
  keyboard and pointer listeners
  camera state
  selection
  building
  orders
  pause boolean

fixed-step-campaign-simulation-kit
  update gate
  wave and combat mutation

pixel-campaign-render-kit
  PAUSED overlay
  continuous world/HUD/CRT rendering

legacy-gamehost-diagnostics-kit
  direct startWave, build and setZoom capabilities
```

## Required domain

```txt
phantom-command-pause-input-command-admission-authority-domain
```

## Required subkits

```txt
campaign-run-identity-kit
input-command-envelope-kit
pause-policy-revision-kit
campaign-pause-command-kit
pause-state-revision-kit
held-input-settlement-kit
keyboard-command-admission-kit
pointer-command-admission-kit
wheel-command-admission-kit
camera-freeze-policy-kit
wave-start-admission-kit
tower-build-admission-kit
unit-order-admission-kit
selection-admission-kit
route-command-admission-kit
fixed-step-pause-gate-kit
pause-result-kit
paused-command-journal-kit
first-paused-frame-ack-kit
campaign-resume-command-kit
stale-input-rejection-kit
source-build-pages-pause-fixture-kit
```

## Ownership rule

Pause policy must be renderer-neutral and command-neutral. Existing handlers become adapters that submit typed commands. The authority decides whether a command is accepted, rejected, deferred or retained for resume. Rendering consumes accepted pause state and results but does not decide admission.
