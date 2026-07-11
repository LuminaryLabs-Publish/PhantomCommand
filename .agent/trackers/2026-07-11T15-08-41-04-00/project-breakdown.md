# PhantomCommand Project Breakdown

**Timestamp:** `2026-07-11T15-08-41-04-00`

## Summary

This pass documents PhantomCommand's missing Continue capability authority. The menu treats raw storage presence as resumability, while the campaign ignores the requested mode and starts a fresh state. The required boundary is one deterministic save-candidate resolver followed by typed campaign-startup admission and atomic hydration.

## Plan ledger

**Goal:** align menu capability, save-candidate identity, route intent, campaign bootstrap and first resumed frame around one source-backed transaction.

- [x] Enumerate the complete Publish organization inventory.
- [x] Compare all eligible repositories with the central ledger.
- [x] Confirm root `.agent` state for all nine eligible repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Skip active same-window work in `HorrorCorridor`.
- [x] Select only `PhantomCommand` as the oldest stable eligible repository.
- [x] Trace menu storage reads and Continue projection.
- [x] Trace Begin and Continue routes into campaign startup.
- [x] Trace the only current campaign save writer.
- [x] Identify all domains, implemented kits and offered services.
- [x] Define the Continue capability DSK composition and validation gate.
- [x] Refresh required root `.agent` documents.
- [x] Push only to `main`.
- [ ] Runtime implementation remains future work.

## Repository selection

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
central ledger entries: 9
root .agent entries: 9

selected: PhantomCommand
prior central timestamp: 2026-07-11T13-28-37-04-00
skipped active repo: HorrorCorridor 2026-07-11T15-01-33-04-00
excluded: TheCavalryOfRome
```

## Interaction loop

```txt
menu startup
  -> SAVE_KEYS declares three names
  -> each key reads localStorage or sessionStorage
  -> any nonempty string becomes hasSave=true
  -> Continue becomes enabled and BOUND

Continue
  -> game.html?campaign=continue
  -> campaign module constructs default state at module load
  -> no query read
  -> no candidate read
  -> no hydration
  -> fresh run begins

victory
  -> final wave writes phantomCommand.save
  -> payload is { scene, souls, wave }
  -> later menu treats it as raw Continue evidence
```

## Domains in use

```txt
route shell and menu routing
menu selection panels settings and audio
storage slots and raw presence detection
save parsing schema content provenance precedence and capability
campaign startup mode admission and hydration
procedural graveyard art and source canvas
CRT display and pointer projection
ring map lanes pads archetypes waves economy and core health
selection build order wave pause camera and counters
spawn AI targeting projectiles damage rewards and effects
fixed-step simulation clock replay and committed-frame planning
terminal outcome persistence lifecycle checkpoint and resume planning
world HUD minimap overlay diagnostics validation build and Pages deployment
```

## Implemented kits

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

## Services offered by current kits

```txt
menu navigation and modal panels
settings persistence
raw save-key presence detection
route transition timing
procedural menu audio
graveyard art and source-canvas drawing
CRT upload, contain framing, curvature and display
contain-only pointer mapping
campaign content and mutable state construction
selection, construction, orders and wave admission
fixed-step spawning, combat, economy and terminal mutation
world, HUD, minimap and overlay drawing
GameHost diagnostics and direct action exposure
source-pattern checks
static build and GitHub Pages deployment
```

## Main finding

The menu scans six possible slots but retains only a Boolean. It does not know which slot was readable, valid, current, newest or resumable. Malformed data can enable Continue, a failed read can hide other candidates, and the selected identity cannot cross navigation because no candidate is selected.

`campaign-scene.js` then ignores both `campaign=new` and `campaign=continue`. Both routes construct the same default state, so the visible Continue promise is false even when the current victory summary exists.

## Required parent domain

```txt
phantom-command-continue-capability-authority-domain
```

## Candidate kit composition

```txt
save-slot-registry
storage-slot-read-result
save-candidate-parser
save-schema-classifier
save-content-identity
save-candidate-provenance
save-candidate-precedence
save-candidate-resolver
continue-capability-result
campaign-startup-mode
campaign-startup-admission
campaign-hydration-plan
campaign-hydration-result
candidate-journal
candidate-resolver-fixture
browser-continue-parity-smoke
```

## Required evidence

```txt
malformed candidates do not enable Continue
unsupported candidates return typed reasons
slot read failures do not hide valid candidates
multiple valid candidates resolve deterministically
menu and campaign use the same candidate identity
new mode never hydrates
continue mode either commits the full candidate or leaves state unchanged
first resumed frame acknowledges the startup result
```

## Validation boundary

Documentation only. No runtime, persistence, route, build, dependency or deployment behavior changed. Existing checks are source-pattern checks and do not prove Continue behavior.