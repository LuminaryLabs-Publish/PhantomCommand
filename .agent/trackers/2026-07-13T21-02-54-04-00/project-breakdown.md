# PhantomCommand Project Breakdown

**Timestamp:** `2026-07-13T21-02-54-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Branch:** `main`  
**Status:** `victory-save-durable-commit-resume-authority-audited`

## Summary

PhantomCommand has 20 source-backed kit surfaces spanning the menu, settings, save-presence scan, browser audio, campaign simulation, Canvas2D rendering, CRT WebGL presentation, construction choreography, checks, build and Pages delivery. The current gap is the durable campaign outcome boundary: the campaign marks victory before attempting one swallowed localStorage write, persists only `{scene,souls,wave}`, and never reads or validates that record on campaign boot, while the menu advertises Continue whenever any string exists under one of three unrelated keys.

## Plan ledger

**Goal:** require victory, durable save admission, Continue availability, resume reconstruction and the first matching visible frame to share one typed commit generation.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm nine eligible repositories have central-ledger coverage.
- [x] Confirm PhantomCommand is synchronized and has the oldest eligible central timestamp.
- [x] Inspect menu settings/save scanning and campaign outcome persistence.
- [x] Identify the interaction loop, domains, all implemented kits and offered services.
- [x] Add the timestamped persistence audit family.
- [x] Refresh required root `.agent` state.
- [ ] Runtime durable-commit and resume implementation remains future work.
- [ ] Executable source/build/Pages fixtures remain future work.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
central ledger entries: 9
new eligible repositories: 0
ledger-missing eligible repositories: 0
selected: PhantomCommand
selection reason: oldest eligible synchronized ledger entry
prior central timestamp: 2026-07-13T17-00-59-04-00
excluded: TheCavalryOfRome
```

## Complete interaction loop

```txt
menu boot
  -> parse menu settings or use defaults
  -> scan localStorage and sessionStorage for three save keys
  -> enable Continue if any non-empty string exists
  -> do not parse, validate or classify the candidate

campaign boot
  -> ignore campaign=new or campaign=continue semantics
  -> construct one fresh hard-coded campaign state
  -> expose GameHost and start simulation

victory
  -> set won=true and publish completion message
  -> try localStorage.setItem("phantomCommand.save", JSON.stringify({scene,souls,wave}))
  -> swallow storage rejection
  -> keep visible victory regardless of durable result

later Continue
  -> menu sees key presence
  -> navigate to game.html?campaign=continue
  -> campaign constructs a fresh state again
  -> no save admission result, resume receipt or matching visible-frame acknowledgement
```

## Domains in use

```txt
menu and campaign route shells
browser URL query, localStorage and sessionStorage
settings parsing and writeback
save-key discovery, candidate admission and quarantine
campaign state, wave progression, combat, economy and outcomes
victory settlement and durable commit
resume reconstruction and compatibility policy
Canvas2D menu, world, HUD, minimap and terminal projection
WebGL CRT presentation and screen mapping
pointer, keyboard, wheel, drag and native-button input
AudioContext ambience and UI tones
public PhantomMenu and GameHost capabilities
construction choreography
source checks, static build, Pages deployment and central tracking
first durable-outcome and resumed-frame proof
```

## Implemented kits and offered services

```txt
crt-renderer-kit: WebGL context, shaders, buffer, texture, resize, source upload, mapping and CRT draw
graveyard-art-kit: procedural menu, graves, panels and labels
menu-route-kit: selection, panels, fade transition and location navigation
menu-settings-persistence-kit: settings parse, defaults and writeback
menu-save-presence-kit: three-key local/session storage presence scan
menu-audio-kit: AudioContext, ambience, UI tones and delayed close
campaign-route-shell-kit: game document and 640x360 source canvas
pixel-campaign-runtime-kit: mutable campaign state, input, selection, building, orders, pause and camera
fixed-step-campaign-simulation-kit: accumulator, waves, movement, targeting, projectiles, damage and outcomes
pixel-campaign-render-kit: world, HUD, minimap, terminal and overlay projection
legacy-gamehost-diagnostics-kit: public state readback and direct commands
menu-static-check-kit: menu source-marker checks
campaign-static-check-kit: campaign source-marker checks
static-build-copy-kit: deployable static copy
pages-deploy-kit: GitHub Pages delivery
construct-spiral-intro-kit: construction intro choreography
construct-spiral-schedule-kit: ring and piece timing
construct-piece-id-kit: stable construction identity
construct-piece-state-kit: construction state projection
construct-sequence-update-kit: sequence advancement
```

```txt
implemented source-backed kits: 20
planned durable-save authority surfaces: 23
```

## Source-backed findings

```txt
menu save keys: phantomCommand.save, nexus.sceneSnapshot, phantom.command.campaign
candidate validation before Continue: absent
candidate schema/version: absent
campaign query admission: absent
campaign save read: absent
campaign resume reconstruction: absent
victory state committed before storage attempt: yes
storage error surfaced to state/UI: no
save payload completeness: scene, souls and wave only
seed, units, towers, core, pads, IDs, camera and timing persisted: no
write revision or checksum: absent
atomic temp-record then promotion: absent
save receipt: absent
first durable victory frame acknowledgement: absent
first resumed frame acknowledgement: absent
```

## Required authority

```txt
phantom-command-victory-save-durable-commit-resume-authority-domain
```

## Required transaction

```txt
CampaignOutcomeCommitCommand
  -> bind campaign session, outcome and expected state revision
  -> construct a versioned canonical save candidate
  -> include deterministic reconstruction evidence or a complete snapshot
  -> validate schema, identifiers, ranges and compatibility
  -> write a staged record and verify readback
  -> atomically promote the accepted durable generation
  -> publish CampaignSaveCommitResult
  -> project victory as durable, degraded or failed
  -> derive Continue only from an admitted save manifest
  -> execute ResumeCommand against the same generation
  -> publish ResumeAdmissionResult
  -> publish FirstDurableOutcomeFrameAck and FirstResumedFrameAck
```

## Candidate authority kits

```txt
campaign-session-id-kit
campaign-state-revision-kit
campaign-outcome-command-kit
campaign-outcome-result-kit
campaign-save-schema-kit
campaign-save-version-kit
campaign-save-candidate-kit
campaign-save-validation-kit
campaign-save-fingerprint-kit
campaign-save-staging-kit
campaign-save-readback-kit
campaign-save-promotion-kit
campaign-save-commit-result-kit
storage-failure-classification-kit
save-candidate-quarantine-kit
continue-capability-projection-kit
resume-command-kit
resume-admission-result-kit
resume-state-reconstruction-kit
first-durable-outcome-frame-ack-kit
first-resumed-frame-ack-kit
storage-failure-fixture-kit
source-build-pages-persistence-fixture-kit
```

## Validation boundary

Documentation only. Runtime, gameplay, persistence, rendering, package scripts, dependencies and deployment were not changed. No durable save, resume, rollback, compatibility or production-readiness claim is made.