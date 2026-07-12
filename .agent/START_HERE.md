# PhantomCommand Agent Start

**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Branch:** `main`  
**Last aligned:** `2026-07-12T07-29-32-04-00`

## Summary

PhantomCommand is a static pixel-isometric campaign game with a procedural graveyard menu, CRT WebGL presentation, browser audio, direct controls, fixed-step combat, persistence and public diagnostics.

The current audit isolates **menu audio activation and lifecycle authority**. The menu creates a Web Audio graph on pointer or keyboard input, but a non-null `state.audio` is treated as healthy without observing context state. There is no resume path for suspended or interrupted contexts, no context or graph generation, no cancellation of delayed close work and no ordered retirement for visibility loss, pagehide or navigation.

The preceding campaign bootstrap and Continue-resume audit remains an active dependency.

## Plan ledger

**Goal:** make audio creation, resume, suspension, replacement, stop and disposal explicit, session-scoped and proven in real browsers.

- [x] Compare all ten accessible Publish repositories with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm nine eligible repositories have central ledger and root `.agent` coverage.
- [x] Reconcile current repo-local timestamps before selection.
- [x] Select only `PhantomCommand` as the oldest stable eligible repository.
- [x] Inspect menu settings, audio graph construction, input activation, toggles, transition timing and RAF ownership.
- [x] Identify the interaction loop, all active domains, all 20 implemented kits and their services.
- [x] Define context-state, generation, activation, resume, replacement, teardown, observation and fixture contracts.
- [x] Add timestamped architecture and system-specific audits.
- [x] Update documentation on `main`; create no branch or pull request.
- [ ] Runtime implementation and executable browser fixtures remain future work.

## Read this first

```txt
.agent/trackers/2026-07-12T07-29-32-04-00/project-breakdown.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/architecture-audit/2026-07-12T07-29-32-04-00-menu-audio-activation-lifecycle-dsk-map.md
.agent/render-audit/2026-07-12T07-29-32-04-00-audio-setting-runtime-state-gap.md
.agent/gameplay-audit/2026-07-12T07-29-32-04-00-suspended-audio-menu-loop.md
.agent/interaction-audit/2026-07-12T07-29-32-04-00-user-activation-audio-admission-map.md
.agent/audio-audit/2026-07-12T07-29-32-04-00-context-generation-resume-teardown-contract.md
.agent/deploy-audit/2026-07-12T07-29-32-04-00-audio-lifecycle-browser-fixture-gate.md
.agent/turn-ledger/2026-07-12T07-29-32-04-00.md
.agent/kit-registry.json
```

## Current interaction loop

```txt
page boot
  -> create menu art and CRT renderer
  -> read settings and save presence
  -> install input handlers
  -> start recursive RAF

first pointer or keyboard input
  -> ensureAudio()
  -> create context, master, drone and wind graph when state.audio is null
  -> execute menu action

later input
  -> state.audio truthy causes ensureAudio() to return
  -> suspended/interrupted/closed state is not inspected

ambience off
  -> clear state.audio
  -> fade old master
  -> schedule untracked close after 300 ms

ambience on before close
  -> create a new graph while predecessor close work remains pending

navigation
  -> play tone and keep graph/RAF active through fade
  -> assign location without ordered disposal
```

## Main findings

```txt
context state observation: absent
context resume path: absent
context/graph generation: absent
statechange handling: absent
trusted activation receipt: absent
delayed close identity/cancellation: absent
rapid-toggle overlap protection: absent
visibility/pagehide retirement: absent
navigation teardown result: absent
audio lifecycle diagnostics/journal: absent
real-browser lifecycle fixtures: absent
```

## Domains and kit groups

```txt
menu and campaign route shells
menu selection, panels, settings, persistence and transitions
procedural graveyard and CRT WebGL presentation
Web Audio activation, ambience graph and UI tones
browser input, visibility, navigation and RAF lifecycle
campaign content, fixed-step simulation, combat and rendering
public menu and campaign host capabilities
validation, static build, Pages and audit tracking
campaign bootstrap/resume, runtime lifecycle and audio authority gaps
```

Implemented kit count: `20`. The tracker and machine registry contain the complete per-kit service inventory.

## Required parent domain

```txt
phantom-command-menu-audio-activation-lifecycle-authority-domain
```

It coordinates trusted activation evidence, context and graph generations, state observation, resume/suspend/stop/dispose transactions, node and timer ownership, visibility and navigation retirement, typed results, bounded observations and browser fixtures.

## Ordered architecture queue

```txt
1. Campaign Bootstrap and Continue Resume Authority
2. Campaign Action Result Authority
   2a. Public Host Owner Quarantine and Typed Command Admission
   2b. CRT Display/Input Projection Authority
   2c. Campaign Phase Admission Authority
   2d. Fixed-Step Scheduling, Replay and Committed Frames
   2e. Public Host Committed Read Model
   2f. Combat and Exclusive Terminal Authorities
3. Runtime Session Lifecycle Authority
   3a. Menu Audio Activation and Lifecycle Authority
4. Versioned Full Campaign Checkpoint Capture Authority
```

Do not treat successful node construction or a non-null audio object as proof that the browser context is running.