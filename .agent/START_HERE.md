# PhantomCommand Agent Start

**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Branch:** `main`  
**Last aligned:** `2026-07-12T05-49-04-04-00`

## Summary

The menu presents distinct Begin and Continue routes, but the campaign runtime does not read the route query or any saved campaign state. Continue is enabled by the presence of any non-empty value under three legacy keys, while every campaign launch reconstructs the same default wave-zero state. The winning save payload is minimal and is never consumed.

## Plan ledger

**Goal:** define one campaign bootstrap and resume authority that turns route intent plus validated storage evidence into either a clean new run or a deterministic resumed run with a typed result and first-visible-frame proof.

- [x] Compare all ten accessible Publish repositories with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger and root `.agent` coverage.
- [x] Select only `PhantomCommand` as the oldest eligible repository.
- [x] Trace menu save detection, Begin/Continue routing, campaign startup, terminal save, restart and public host readback.
- [x] Identify the complete interaction loop, all domains, all 20 implemented kits and offered services.
- [x] Confirm `campaign=new` and `campaign=continue` are not read by the campaign module.
- [x] Confirm no storage key is parsed or hydrated during campaign startup.
- [x] Define bootstrap commands, save envelope validation, migration, hydration, result projection and browser fixture gates.
- [x] Refresh required root `.agent` files and add a timestamped audit family.
- [ ] Runtime implementation and executable resume fixtures remain future work.

## Current interaction loop

```txt
menu load
  -> read settings
  -> scan three storage keys for any truthy value
  -> enable Continue when any value exists

Begin Campaign
  -> navigate to game.html?campaign=new

Continue
  -> navigate to game.html?campaign=continue

campaign module evaluation
  -> ignore location.search
  -> ignore localStorage and sessionStorage
  -> construct default rings, units, camera and wave-zero state
  -> start fixed-step RAF
  -> publish mutable window.GameHost

campaign victory
  -> write { scene, souls, wave } to phantomCommand.save
  -> return no save result
  -> future Continue still starts the default state
```

## Main finding

```txt
launch intent parsing: absent
new-versus-continue admission: absent
save-key precedence: absent
save parsing and schema validation: absent
save version and migration: absent
invalid-save quarantine: absent
runtime hydration: absent
entity-ID reseeding after hydration: absent
new-run save clearing policy: absent
save commit result: absent
resume result and observation: absent
first resumed-frame acknowledgement: absent
browser route/resume fixtures: absent
```

The menu's presence test accepts malformed, stale or unrelated data. The campaign never consumes any of the three keys, so Begin and Continue currently converge on the same runtime construction path.

## Domains in use

```txt
menu route, selection, panels, settings and fade transition
save-presence discovery across localStorage and sessionStorage
campaign launch intent and bootstrap gap
campaign save envelope, validation, migration and hydration gap
procedural graveyard drawing
CRT WebGL presentation and pointer projection
Web Audio ambience and UI tones
menu keyboard/pointer interaction and recursive RAF
campaign content, mutable state, fixed-step simulation and rendering
selection, construction, orders, combat, rewards and terminal state
public menu/campaign host projection
static checks, build, Pages deployment and central tracking
```

## Implemented kits and services

```txt
crt-renderer-kit
graveyard-art-kit
menu-route-kit
menu-settings-persistence-kit
menu-save-presence-kit
menu-audio-kit
campaign-route-shell-kit
pixel-campaign-runtime-kit
fixed-step-campaign-simulation-kit
pixel-campaign-render-kit
legacy-gamehost-diagnostics-kit
menu-static-check-kit
campaign-static-check-kit
static-build-copy-kit
pages-deploy-kit
construct-spiral-intro-kit
construct-spiral-schedule-kit
construct-piece-id-kit
construct-piece-state-kit
construct-sequence-update-kit
```

Services cover menu routing, settings, save-presence scanning, procedural art, audio, CRT resources and projection, campaign state/actions/simulation/rendering, terminal save writing, public diagnostics, construction sequencing, checks, static build and Pages deployment.

## Required parent domain

```txt
phantom-command-campaign-bootstrap-resume-authority-domain
```

## Required transaction

```txt
CampaignBootstrapCommand
  -> validate menu session and launch intent
  -> resolve the canonical save key and storage scope
  -> parse, validate, migrate or quarantine the candidate envelope
  -> choose NEW, RESUME or REJECTED bootstrap mode
  -> construct or hydrate one detached candidate runtime
  -> reseed entity counters and validate references
  -> atomically commit the campaign generation
  -> return one CampaignBootstrapResult
  -> publish detached bootstrap observation
  -> acknowledge the first visible frame from the committed generation
```

## Read this pass first

```txt
.agent/trackers/2026-07-12T05-49-04-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-12T05-49-04-04-00.md
.agent/architecture-audit/2026-07-12T05-49-04-04-00-campaign-bootstrap-resume-authority-dsk-map.md
.agent/render-audit/2026-07-12T05-49-04-04-00-resumed-state-first-frame-provenance-gap.md
.agent/gameplay-audit/2026-07-12T05-49-04-04-00-begin-continue-default-state-loop.md
.agent/interaction-audit/2026-07-12T05-49-04-04-00-launch-intent-save-admission-map.md
.agent/save-resume-audit/2026-07-12T05-49-04-04-00-save-envelope-bootstrap-hydration-contract.md
.agent/deploy-audit/2026-07-12T05-49-04-04-00-campaign-resume-fixture-gate.md
```

Do not treat a visible Continue button or a stored JSON string as resume proof. Completion requires validated bootstrap admission, deterministic hydration and a first resumed-frame receipt.