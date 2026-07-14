# PhantomCommand Current Audit

**Timestamp:** `2026-07-14T07-58-22-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Status:** `browser-route-startup-readiness-failure-authority-audited`

## Summary

Both routes perform startup through top-level module side effects. DOM lookup, Canvas2D acquisition, WebGL acquisition, shader compilation, resource creation, state construction and listener installation happen without an application-owned startup result. Required failure can leave a blank or inert route with no fallback, retry, rollback or first-frame evidence.

## Plan ledger

**Goal:** make menu and campaign startup one admitted attempt with explicit capabilities, candidate ownership, atomic publication and visible failure handling.

- [x] Compare the complete Publish list with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only PhantomCommand under the oldest eligible rule.
- [x] Read route HTML, menu, campaign, CRT renderer, static checks and build.
- [x] Identify the interaction loop and active domains.
- [x] Preserve all 20 implemented kits and offered services.
- [x] Add the timestamped startup audit family.
- [ ] Implement and execute the authority later.

## Current loop

```txt
HTML parses
  -> module evaluates
  -> query route canvas
  -> acquire Canvas2D and WebGL
  -> compile/link shaders
  -> allocate source and CRT resources
  -> create menu or campaign state
  -> attach listeners
  -> publish host and request RAF

failure before completion
  -> exception or rejected module
  -> no typed startup state
  -> no resource rollback receipt
  -> no visible fallback or retry
  -> no first accepted frame acknowledgement
```

## Source-backed findings

```txt
menu parser-owned fallback: absent
campaign parser-owned fallback: static instructions only
startup attempt ID: absent
startup phases: absent
Canvas2D probe result: absent
WebGL probe result: throw on absence
shader compile/link result: throw on failure
candidate resource manifest: absent
atomic startup adoption: absent
startup rollback result: absent
route startup result: absent
retry command: absent
superseded-attempt rejection: absent
public host readiness revision: absent
first route frame acknowledgement: absent
browser startup fixtures: absent
```

## Domains in use

```txt
static route and ES module lifecycle
DOM root and accessibility fallback
Canvas2D source rendering
WebGL context and CRT resource preparation
shader compilation and linking
procedural menu and campaign state preparation
settings storage audio and navigation
campaign input simulation combat and outcomes
listener public-host and RAF publication
startup identity phase capability and readiness
candidate ownership atomic adoption and rollback
failure projection retry and route escape
first source/CRT frame evidence
source checks static build Pages and central tracking
```

## Implemented kits and offered services

```txt
crt-renderer-kit: WebGL context shaders buffer texture resize mapping upload and draw
graveyard-art-kit: procedural menu and panel drawing
menu-route-kit: selection panels fade transition and navigation
menu-settings-persistence-kit: settings parse defaults mutation and writeback
menu-save-presence-kit: local/session save-key scanning
menu-audio-kit: ambience wind UI tones and delayed close
campaign-route-shell-kit: campaign document source canvas and static instructions
pixel-campaign-runtime-kit: state input selection building orders pause and camera
fixed-step-campaign-simulation-kit: waves movement targeting projectiles damage rewards outcomes
pixel-campaign-render-kit: world HUD minimap terminal overlays and CRT submission
legacy-gamehost-diagnostics-kit: public state readback and direct capabilities
menu-static-check-kit: menu source-marker checks
campaign-static-check-kit: campaign source-marker checks
static-build-copy-kit: static output copy
pages-deploy-kit: Pages delivery
construct-spiral-intro-kit: intro choreography
construct-spiral-schedule-kit: sequence timing
construct-piece-id-kit: piece identity
construct-piece-state-kit: piece projection
construct-sequence-update-kit: sequence advancement
```

## Required authority

```txt
phantom-command-browser-route-startup-readiness-failure-authority-domain
```

## Required transaction

```txt
RouteStartupCommand
  -> bind route, attempt and source/build revisions
  -> probe DOM, Canvas2D, WebGL and shader capabilities
  -> prepare route state, resources, listeners, host and frame lease
  -> execute source and CRT probe frames
  -> atomically adopt or roll back every candidate
  -> publish RouteStartupResult
  -> publish host only for the accepted attempt
  -> publish FirstRouteFrameAck

failure
  -> retire candidates
  -> project DOM fallback
  -> expose retry and safe route escape
  -> reject stale completion from superseded attempts
```

## Validation boundary

Documentation only. Runtime, gameplay, rendering, HTML, package scripts, dependencies, workflows and deployment were not changed.