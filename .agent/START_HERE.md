# PhantomCommand Agent Start

**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Branch:** `main`  
**Last aligned:** `2026-07-12T13-59-50-04-00`

## Summary

PhantomCommand is a static pixel-isometric campaign game with a procedural graveyard menu, CRT WebGL presentation, browser audio, direct controls, fixed-step combat, persistence and public diagnostics.

The current audit isolates **Campaign Bootstrap and Continue Resume Authority**. The menu enables Continue when any configured storage key contains any truthy string and navigates with `campaign=continue`, but the campaign never reads the query or any save. Both New and Continue build the same default campaign, while the only save writer stores an incomplete unversioned victory payload.

## Plan ledger

**Goal:** make New and Continue distinct, validated and observable bootstrap transactions with complete state hydration and first-visible-frame proof.

- [x] Compare the complete Publish inventory with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `PhantomCommand` as the oldest eligible central-ledger entry.
- [x] Identify the full interaction loop, all active domains, all 20 implemented kits and services.
- [x] Trace menu save probing, launch URLs, campaign construction, victory writes and static checks.
- [x] Define typed launch, probe, validation, migration, hydration, bootstrap and frame results.
- [x] Update documentation on `main`; create no branch or pull request.
- [ ] Implement and execute the bootstrap/resume authority.

## Read this first

```txt
.agent/trackers/2026-07-12T13-59-50-04-00/project-breakdown.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/architecture-audit/2026-07-12T13-59-50-04-00-campaign-bootstrap-continue-resume-authority-dsk-map.md
.agent/render-audit/2026-07-12T13-59-50-04-00-continue-save-visible-frame-truth-gap.md
.agent/gameplay-audit/2026-07-12T13-59-50-04-00-menu-continue-default-campaign-loop.md
.agent/interaction-audit/2026-07-12T13-59-50-04-00-launch-intent-save-hydration-result-map.md
.agent/persistence-audit/2026-07-12T13-59-50-04-00-save-key-schema-hydration-contract.md
.agent/deploy-audit/2026-07-12T13-59-50-04-00-continue-resume-browser-fixture-gate.md
.agent/turn-ledger/2026-07-12T13-59-50-04-00.md
.agent/kit-registry.json
```

## Current interaction loop

```txt
menu boot
  -> read settings
  -> probe three keys in localStorage/sessionStorage
  -> enable Continue for any truthy value
  -> perform no parse or campaign validation

menu activation
  -> Begin navigates with campaign=new
  -> Continue navigates with campaign=continue

campaign boot
  -> ignore location.search
  -> build default rings, pads, economy, units, IDs and camera
  -> publish GameHost
  -> start fixed-step RAF

victory
  -> write only scene, souls and wave
  -> swallow storage failure

Continue or reload
  -> read no save
  -> hydrate no state
  -> render the default campaign
```

## Main findings

```txt
save presence validation: absent
save key/scope identity: absent
campaign query consumption: absent
new/continue behavioral distinction: absent
complete save capture: absent
schema/version/fingerprint: absent
migration: absent
atomic candidate hydration: absent
save read/write result: absent
bootstrap revision: absent
first restored-frame acknowledgement: absent
browser resume fixtures: absent
```

## Domains and kit groups

```txt
menu and campaign route shells
menu settings, save presence, selection, fade and navigation
campaign launch intent and route admission
storage capability, key ownership, schema, migration and fingerprints
new-session bootstrap and continue-session hydration
campaign state, commands, fixed-step simulation and terminal mutation
procedural graveyard, campaign world, HUD, minimap and CRT presentation
public hosts and diagnostics
runtime-session and browser-resource lifecycle
source checks, static build, Pages and audit tracking
```

Implemented kit count: `20`. The current audit, tracker and machine registry contain the complete per-kit service inventory.

## Required parent domain

```txt
phantom-command-campaign-bootstrap-continue-resume-authority-domain
```

It coordinates launch intent, save ownership, typed probing, schema/version/fingerprint validation, migration, detached candidate construction, atomic New/Continue commit, stale-result rejection, journals and first-visible-frame acknowledgement.

## Ordered architecture queue

```txt
1. Campaign Bootstrap and Continue Resume Authority
2. Campaign Action Result Authority
   2a. Menu Pointer-Hit Admission Authority
   2b. Campaign World-Pointer Admission Authority
   2c. Public Host Owner Quarantine and Typed Command Admission
   2d. CRT Display/Input Projection Authority
   2e. Campaign Phase Admission Authority
   2f. Fixed-Step Scheduling, Replay and Committed Frames
   2g. Public Host Committed Read Model
   2h. Combat and Exclusive Terminal Authorities
3. Runtime Session Resource Lifecycle Authority
   3a. Menu Audio Activation and Lifecycle Authority
4. Versioned Full Campaign Checkpoint Capture Authority
```

Campaign Bootstrap now has a complete audit specification but remains unimplemented. It depends on Versioned Full Campaign Checkpoint Capture for complete payloads and Runtime Session Resource Lifecycle for route-generation fencing.

Do not treat a truthy storage value, Continue label or query string as proof of resume support. Completion requires complete versioned capture, validated hydration and a visible-frame receipt.