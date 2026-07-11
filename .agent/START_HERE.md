# PhantomCommand Agent Start

**Repository:** `LuminaryLabs-Publish/PhantomCommand`

**Last aligned:** `2026-07-11T15-08-41-04-00`

## Summary

PhantomCommand is a static pixel-isometric RTS with a procedural graveyard menu and a `640 x 360` grave-ring campaign. The current highest-priority gap is the Continue capability boundary: the menu enables Continue from raw nonempty data in any of six storage slots, but it never parses, validates, ranks or selects a save candidate, and the campaign ignores `campaign=continue` and constructs a fresh run.

## Plan ledger

**Goal:** make Continue a truthful, deterministic capability derived from one admitted save candidate whose identity, schema, content provenance and startup result are preserved from menu projection into campaign bootstrap.

- [x] Compare the complete ten-repository Publish inventory with the central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories remain centrally tracked with root `.agent` state.
- [x] Skip the active same-window `HorrorCorridor` interaction-target audit.
- [x] Select only `PhantomCommand` as the oldest stable eligible repository.
- [x] Trace all three save keys across local and session storage.
- [x] Trace Continue enablement, routing, campaign startup and current save writing.
- [x] Identify the interaction loop, domains, kits and offered services.
- [x] Define candidate classification, precedence, capability, startup admission and fixture contracts.
- [x] Push documentation directly to `main` without a branch or pull request.
- [ ] Runtime implementation and executable Continue fixtures remain future work.

## Current implementation queue

```txt
1. Continue Capability Resolver + Save Candidate Precedence Fixture Gate
2. Campaign Action Result Authority
   2a. CRT Display/Input Projection Authority + CPU/GLSL Parity Fixture Gate
   2b. Campaign Phase Admission + Paused/Terminal Mutation Fixture Gate
   2c. Fixed-Step Command Scheduling, Replay and Committed Frame Authority
   2d. Exclusive Terminal Outcome Transaction + Win/Loss Arbitration Fixture Gate
3. Runtime Session Lifecycle Authority + Menu/Campaign Teardown Fixture Gate
4. Versioned Campaign Checkpoint Authority + Atomic Resume/First-Frame Fixture Gate
```

Continue remains first because every later phase, replay, lifecycle and checkpoint contract needs an authoritative answer to three questions before campaign construction begins:

```txt
which candidate was selected
why it was accepted
which startup mode consumed it
```

## Product route

```txt
index.html
  -> src/menu/graveyard-menu.js
  -> Begin or Continue route
  -> game.html
  -> src/campaign/campaign-scene.js
```

## Current interaction loop

```txt
menu construction
  -> enumerate three key names
  -> read localStorage or sessionStorage
  -> collapse any nonempty string to Boolean true
  -> enable Continue and label it BOUND

Continue activation
  -> navigate to game.html?campaign=continue
  -> campaign module does not read the query parameter
  -> construct default souls, core, wave, units, towers and counters
  -> start a fresh campaign indistinguishable from Begin

victory persistence
  -> final-wave branch writes localStorage phantomCommand.save
  -> payload contains only scene, souls and wave
  -> menu later treats the raw string as sufficient Continue evidence
```

## Main finding

The menu declares:

```txt
SAVE_KEYS = [
  phantomCommand.save,
  nexus.sceneSnapshot,
  phantom.command.campaign
]
```

For each key it reads local storage first and session storage second, then reduces all six possible slots to one Boolean. It does not preserve:

```txt
slot identity
storage layer
raw payload
parse result
schema or version
content identity
campaign revision
completion provenance
candidate timestamp
state fingerprint
rejection reason
```

Any nonempty string can enable Continue, including malformed JSON or unrelated legacy content. A storage exception during the scan disables Continue without identifying which slot failed.

The route then discards even the Boolean provenance. `campaign=continue` is never consumed by `campaign-scene.js`, no save is loaded, and a fresh default run starts. `campaign=new` also does not explicitly reject or clear prior candidates.

## Domains in use

```txt
static route and page shell
menu selection panels settings audio and transition
storage slot enumeration and raw presence detection
save candidate parsing schema version provenance and precedence
Continue capability and menu projection
campaign startup mode and startup admission
procedural graveyard art and source canvas
CRT contain curve upload display and pointer projection
campaign ring map lanes pads archetypes waves economy and core health
selection building orders wave start pause camera and identity counters
spawn queue unit AI targeting projectiles damage rewards and effects
fixed-step simulation clock command replay and committed-frame planning
terminal outcome arbitration persistence and restart planning
runtime lifecycle checkpoint resume validation build deploy and central synchronization
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

## Required composed domain

```txt
phantom-command-continue-capability-authority-domain
  -> phantom-command-save-slot-registry-kit
  -> phantom-command-storage-slot-read-kit
  -> phantom-command-save-candidate-parse-kit
  -> phantom-command-save-schema-classifier-kit
  -> phantom-command-save-content-identity-kit
  -> phantom-command-save-candidate-provenance-kit
  -> phantom-command-save-candidate-precedence-kit
  -> phantom-command-save-candidate-resolver-kit
  -> phantom-command-continue-capability-result-kit
  -> phantom-command-campaign-startup-mode-kit
  -> phantom-command-campaign-startup-admission-kit
  -> phantom-command-candidate-journal-kit
  -> phantom-command-candidate-resolver-fixture-kit
  -> phantom-command-browser-continue-parity-smoke-kit
```

## Required invariant

```txt
Continue is enabled if and only if:
  exactly one deterministic candidate resolution succeeds

Campaign startup in continue mode is admitted if and only if:
  the selected candidate identity and fingerprint still match
  the candidate schema and content revision are supported
  hydration succeeds atomically

If no candidate is valid:
  Continue is disabled with a typed reason
  Begin remains available
  no malformed or stale payload reaches live campaign state
```

## Read first

```txt
.agent/trackers/2026-07-11T15-08-41-04-00/project-breakdown.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/turn-ledger/2026-07-11T15-08-41-04-00.md
.agent/architecture-audit/2026-07-11T15-08-41-04-00-continue-capability-save-candidate-dsk-map.md
.agent/render-audit/2026-07-11T15-08-41-04-00-continue-ui-startup-provenance-gap.md
.agent/gameplay-audit/2026-07-11T15-08-41-04-00-menu-continue-fresh-campaign-loop.md
.agent/interaction-audit/2026-07-11T15-08-41-04-00-continue-command-candidate-admission-map.md
.agent/persistence-audit/2026-07-11T15-08-41-04-00-save-candidate-precedence-capability-contract.md
.agent/deploy-audit/2026-07-11T15-08-41-04-00-continue-capability-fixture-gate.md
```

## Guardrails

```txt
Push only to main.
Create no branches or pull requests.
Do not work on TheCavalryOfRome.
Do not equate raw storage presence with resumability.
Do not let menu and campaign resolve candidates independently.
Do not hydrate a candidate without schema, content and fingerprint admission.
Do not claim Continue works until pure and browser fixtures prove candidate selection and resumed state.
```