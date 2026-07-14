# PhantomCommand Current Audit

**Timestamp:** `2026-07-14T13-40-59-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Status:** `campaign-terminal-outcome-conflict-settlement-authority-audited`

## Summary

Campaign terminal truth is split across independent mutable `won` and `lost` flags. A sanctum breach can set loss and remove the final enemy, after which the same fixed step can classify the final wave as cleared, grant rewards, set victory, write a victory save and render victory.

## Plan ledger

**Goal:** make terminal proposals from one fixed step settle into exactly one immutable outcome before rewards, persistence, public readback, presentation or retry proceed.

- [x] Compare the complete Publish list with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only PhantomCommand under the oldest eligible rule.
- [x] Read campaign state, simulation, reward, persistence, rendering and retry paths.
- [x] Identify the interaction loop and active domains.
- [x] Preserve all 20 implemented kits and offered services.
- [x] Add the timestamped terminal-settlement audit family.
- [ ] Implement and execute the authority later.

## Current loop

```txt
active final wave
  -> fixed-step update begins
  -> final enemy reaches the sanctum
  -> core is reduced to zero
  -> enemy is deleted
  -> lost becomes true
  -> fixed-step update continues
  -> no queued or live enemies remain
  -> wave clear reward is granted
  -> won becomes true
  -> victory save is attempted
  -> terminal UI selects victory before defeat
```

## Source-backed findings

```txt
terminal enum: absent
independent won and lost flags: present
run identity: absent
fixed-step identity: absent
terminal proposal contract: absent
conflict classifier: absent
versioned precedence policy: absent
exclusive terminal settlement: absent
wave reward receipt: absent
victory save commit receipt: absent
terminal outcome fingerprint: absent
immutable GameHost outcome: absent
first terminal-frame acknowledgement: absent
retry lineage: absent
terminal conflict fixtures: absent
```

## Domains in use

```txt
static route and ES module lifecycle
DOM root and accessibility fallback
Canvas2D source rendering
WebGL context and CRT presentation
procedural menu art, settings, save presence, audio and navigation
campaign rings, pads, units, towers and wave catalog
pointer, keyboard, wheel, blur and navigation input
camera, projection, selection, building and orders
fixed-step scheduling and mutable simulation
wave queueing, spawning and completion
movement, targeting, projectiles, damage and kill rewards
sanctum core, victory, defeat and terminal precedence
wave rewards and victory marker persistence
terminal HUD, CRT frame and GameHost readback
run, step, proposal, conflict and outcome authority
reward, save, retry and journal settlement
source checks, static build, Pages and central tracking
```

## Implemented kits and offered services

```txt
crt-renderer-kit: WebGL context, shaders, buffer, texture, resize, mapping, upload and CRT draw
graveyard-art-kit: procedural menu and panel drawing
menu-route-kit: selection, panels, fade, transition and navigation
menu-settings-persistence-kit: settings parse, defaults, mutation and writeback
menu-save-presence-kit: local/session save-key scanning
menu-audio-kit: ambience, wind, UI tones and delayed close
campaign-route-shell-kit: campaign document, source canvas and static instructions
pixel-campaign-runtime-kit: state, input, selection, building, orders, pause and camera
fixed-step-campaign-simulation-kit: waves, spawning, movement, targeting, projectiles, damage, rewards and terminal flags
pixel-campaign-render-kit: world, HUD, minimap, terminal overlay and CRT submission
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
phantom-command-campaign-terminal-outcome-conflict-settlement-authority-domain
```

## Required transaction

```txt
CampaignTerminalSettlementCommand
  -> bind RunId, StepId, WaveId and policy revisions
  -> collect sanctum-loss and final-wave-clear proposals
  -> classify zero, one, duplicate or conflicting proposals
  -> apply one explicit precedence policy
  -> accept exactly one CampaignOutcomeArtifact
  -> settle wave and terminal rewards exactly once
  -> prepare persistence only for accepted victory
  -> publish immutable GameHost and UI descriptors
  -> acknowledge FirstTerminalFrameAck

CampaignRetryCommand
  -> cite the accepted predecessor artifact
  -> allocate successor RunId and retry lineage
  -> reset participants atomically
  -> reject late predecessor work
```

## Validation boundary

Documentation only. Runtime, gameplay, rendering, persistence, HTML, package scripts, dependencies, workflows and deployment were not changed.