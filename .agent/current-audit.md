# PhantomCommand Current Audit

**Timestamp:** `2026-07-14T02-58-28-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Status:** `settings-route-adoption-visible-frame-authority-audited`

## Summary

The menu reads `phantomCommand.menuSettings`, normalizes `crt`, `grain` and `ambience`, applies the values live and attempts an unverified write. Campaign startup never reads that document. Its render loop calls the shared CRT renderer with hard-coded `crt: true` and `grain: "low"`; `GameHost` exposes no settings revision or result.

## Plan ledger

**Goal:** make settings persistence, route capability, participant adoption and visible presentation one revisioned transaction.

- [x] Compare the complete Publish list with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only PhantomCommand under the oldest eligible rule.
- [x] Read menu, CRT renderer, campaign, package checks and retained audit state.
- [x] Identify the interaction loop and active domains.
- [x] Preserve all 20 implemented kits and offered services.
- [x] Add the timestamped settings audit family.
- [ ] Implement and execute the authority later.

## Current loop

```txt
menu boot
  -> parse unversioned settings document
  -> apply menu CRT, grain and ambience
settings edit
  -> mutate live menu state
  -> attempt unverified write
  -> next menu frame applies values
campaign boot
  -> ignore stored settings
  -> force CRT enabled and grain low
  -> expose no settings revision or application result
```

## Source-backed findings

```txt
settings key: phantomCommand.menuSettings
stored fields: crt, grain, ambience
schema/version: absent
accepted revision: absent
verified write: absent
menu settings application: present
campaign settings read: absent
campaign CRT policy: hard-coded enabled
campaign grain policy: hard-coded low
campaign ambience capability: undeclared
public campaign settings readback: absent
first settings revision frame acknowledgement: absent
```

## Domains in use

```txt
menu and campaign route shells
browser localStorage and navigation
settings parsing mutation persistence and migration
settings schema revision and route capability
Canvas2D source presentation
WebGL CRT grain curve aberration vignette and fade
menu AudioContext ambience and UI tones
campaign simulation combat economy and outcomes
input public hosts and construction choreography
validation build Pages deployment and central tracking
settings application and visible-frame evidence
```

## Implemented kits and offered services

```txt
crt-renderer-kit: WebGL CRT creation upload draw resize and mapping
graveyard-art-kit: procedural menu drawing
menu-route-kit: selection panels fade and navigation
menu-settings-persistence-kit: settings read defaults mutation and writeback
menu-save-presence-kit: local/session key scanning
menu-audio-kit: ambience wind UI tones and delayed close
campaign-route-shell-kit: campaign page and source canvas
pixel-campaign-runtime-kit: state input building orders pause and camera
fixed-step-campaign-simulation-kit: waves movement combat rewards outcomes
pixel-campaign-render-kit: world HUD minimap terminal and CRT submission
legacy-gamehost-diagnostics-kit: public readback and direct commands
menu-static-check-kit: menu marker checks
campaign-static-check-kit: campaign marker checks
static-build-copy-kit: static output
pages-deploy-kit: Pages delivery
construct-spiral-intro-kit: intro choreography
construct-spiral-schedule-kit: sequence timing
construct-piece-id-kit: piece identity
construct-piece-state-kit: piece projection
construct-sequence-update-kit: sequence advancement
```

## Required authority

```txt
phantom-command-settings-route-adoption-visible-frame-authority-domain
```

## Required transaction

```txt
SettingsChangeCommand
  -> bind schema, settings revision and route generation
  -> normalize and validate a detached candidate
  -> stage and verify storage when available
  -> classify route support for CRT, grain and ambience
  -> prepare route participants
  -> atomically adopt supported settings or preserve predecessors
  -> publish SettingsAdoptionResult
  -> expose immutable route readback
  -> publish FirstSettingsRevisionFrameAck
```

## Validation boundary

Documentation only. Runtime, gameplay, persistence behavior, audio, rendering, package scripts, dependencies and deployment were not changed.