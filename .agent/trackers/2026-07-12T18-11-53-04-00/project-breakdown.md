# PhantomCommand Project Breakdown

**Timestamp:** `2026-07-12T18-11-53-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Branch:** `main`  
**Status:** `campaign-action-result-authority-audited`

## Summary

PhantomCommand is a static pixel-isometric campaign game with a procedural graveyard menu, CRT presentation, browser input, fixed-step combat, persistence and public diagnostics. This breakdown isolates Campaign Action Result Authority: campaign actions mutate shared state directly or return silently, so callers cannot distinguish committed work from rejected, stale, duplicate or unsupported requests.

## Plan ledger

**Goal:** make every campaign action an identity-bound command that either commits one explicit state transition and terminal result or performs zero mutation with a typed rejection, then correlate accepted results with the first visible campaign frame.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Compare the nine eligible repositories against `LuminaryLabs-Dev/LuminaryLabs` repo ledgers.
- [x] Confirm all nine eligible repositories have root `.agent` documentation.
- [x] Confirm no new, ledger-missing, root-agent-missing or unsynchronized eligible repository takes priority.
- [x] Select only `LuminaryLabs-Publish/PhantomCommand`, the oldest eligible central-ledger entry.
- [x] Trace campaign input, action helpers, direct mutation, fixed-step simulation, rendering and public host exposure.
- [x] Identify the complete interaction loop and all domains in use.
- [x] Preserve all 20 implemented source-backed kits and offered services.
- [x] Define the Campaign Action Result Authority parent domain, candidate kits and proof gates.
- [x] Add the required timestamped tracker, turn ledger and system-specific audits.
- [x] Refresh all required root `.agent` files and machine registry.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Runtime implementation and executable action fixtures remain future work.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0
unsynchronized eligible repositories found: 0

PhantomCommand     2026-07-12T16-00-03-04-00 selected oldest
PrehistoricRush    2026-07-12T16-20-55-04-00
HorrorCorridor     2026-07-12T16-39-35-04-00
ZombieOrchard      2026-07-12T16-51-47-04-00
MyCozyIsland       2026-07-12T17-10-31-04-00
TheUnmappedHouse   2026-07-12T17-20-42-04-00
AetherVale         2026-07-12T17-35-48-04-00
TheOpenAbove       2026-07-12T17-41-25-04-00
IntoTheMeadow      2026-07-12T17-58-43-04-00
TheCavalryOfRome   excluded
```

Only `LuminaryLabs-Publish/PhantomCommand` was modified in the Publish organization.

## Complete interaction loop

```txt
menu route
  -> Begin or Continue navigates to game.html

campaign boot
  -> create source canvas, CRT renderer, rings, pads, archetypes, waves and mutable state
  -> create keyboard, pointer, wheel and blur listeners
  -> expose window.GameHost
  -> start recursive RAF

browser input
  -> Space calls startWave()
  -> number keys directly replace towerType
  -> P directly toggles paused
  -> R reloads the page
  -> left-pointer click/drag calls selectAt() or rectangle selection
  -> right-pointer calls order()
  -> second click on a selected pad calls build()
  -> public GameHost can call startWave(), build() and setZoom()

campaign actions
  -> helpers inspect mutable state at execution time
  -> helpers either mutate in place or return undefined
  -> no command identity, source, expected revision or terminal result is published

fixed-step simulation
  -> frame accumulates wall time
  -> update(1/60) advances waves, units, towers, projectiles, rewards and terminal state

presentation
  -> drawWorld() and drawUI() consume current mutable state
  -> CRT presents the source canvas
  -> no accepted/rejected action result is correlated with the visible frame
```

## Main source-backed finding

The action helpers are void and use silent early returns:

```txt
startWave()
  rejects waveActive, won, lost or exhausted-wave state by returning undefined

build()
  rejects missing pad, occupied pad or insufficient souls by returning undefined

order()
  rejects empty selection by returning undefined
  silently skips selected IDs that no longer resolve

selectAt()
  selects, deselects, chooses a pad or builds on second activation
  returns no selected/build/rejected result

keyboard actions
  tower type and pause mutate state directly
  restart reloads the document

GameHost actions
  startWave and build expose raw mutators
  setZoom mutates camera target directly
```

Consequences:

```txt
callers cannot know whether an action committed
rejection reasons are not observable
no command can be deduplicated
stale selection, economy, phase or target evidence cannot be rejected
public and browser callers have no source identity or capability admission
multi-field mutations have no prepare/commit boundary
visible feedback can remain stale after a rejected action
no first-visible-frame receipt proves which action produced the frame
```

## Domains in use

```txt
menu and campaign route shells
menu settings, save presence, panels, fade, navigation and audio
viewport/source projection and CRT presentation
browser pointer, keyboard, wheel, focus and context-menu input
campaign session and mutable aggregate state
campaign action source, identity, admission and results
selection and selected-pad state
world-pointer projection, unit selection and rectangle selection
economy, tower type, pad occupancy and building
wave phase, spawn queue and wave progression
unit orders, targeting and movement
fixed-step spawning, combat, projectiles, damage and rewards
pause, restart and terminal outcomes
camera pan, focus and zoom
world, HUD, minimap and terminal rendering
public GameHost command and readback exposure
browser persistence
source checks, static build, Pages deployment and audit tracking
```

## Implemented kits and offered services

The repository retains 20 implemented source-backed kit surfaces:

| Kit | Offered services |
|---|---|
| `crt-renderer-kit` | WebGL context/program/buffer/texture ownership, source upload, aspect containment, CRT curve, grain, aberration, vignette, fade, screen-to-source projection |
| `graveyard-art-kit` | procedural menu graveyard drawing and menu control art |
| `menu-route-kit` | Begin, Continue, Settings, Credits and route navigation |
| `menu-settings-persistence-kit` | settings read/write and presentation preferences |
| `menu-save-presence-kit` | configured storage-key scanning and Continue availability |
| `menu-audio-kit` | AudioContext, master gain, drone, wind buffer, UI tones and delayed close |
| `campaign-route-shell-kit` | game page shell and campaign module boot |
| `pixel-campaign-runtime-kit` | mutable campaign state, selection, pads, towers, units, waves, actions, camera and public host |
| `fixed-step-campaign-simulation-kit` | accumulator, 60 Hz updates, spawn scheduling, movement, targeting, projectiles, damage, rewards and terminal mutation |
| `pixel-campaign-render-kit` | isometric world, entities, HUD, minimap, overlays and CRT submission |
| `legacy-gamehost-diagnostics-kit` | raw state/camera exposure, direct action methods and snapshot readback |
| `menu-static-check-kit` | source-token assertions for menu structure |
| `campaign-static-check-kit` | source-token assertions for campaign structure |
| `static-build-copy-kit` | static output copy and asset inclusion |
| `pages-deploy-kit` | GitHub Pages build and deployment |
| `construct-spiral-intro-kit` | grave-ring introduction orchestration |
| `construct-spiral-schedule-kit` | ordered construction timing |
| `construct-piece-id-kit` | stable construction-piece identity |
| `construct-piece-state-kit` | construction-piece lifecycle state |
| `construct-sequence-update-kit` | sequence progression and piece activation |

## Missing authority

```txt
campaign session ID and generation
campaign state revision
campaign action ID and sequence
input/public action source identity
actor/capability admission
action kind and payload schema
expected phase, selection, economy, pad and target revisions
duplicate action rejection
stale action rejection
prepare/commit/rollback boundary
terminal committed/rejected result
changed-resource set and successor revision
rejection reason and zero-mutation proof
action observation and bounded journal
first visible campaign frame acknowledgement
browser/public/source/build/Pages fixture parity
```

## Required parent domain

```txt
phantom-command-campaign-action-result-authority-domain
```

Required transaction:

```txt
sample browser or public intent
  -> identify action source, campaign session and action ID
  -> capture expected campaign, phase, selection, economy and target revisions
  -> validate action schema and capability
  -> reject duplicate or stale evidence
  -> prepare one detached action plan
  -> validate all participants and invariants
  -> atomically commit or perform zero mutation
  -> publish one CampaignActionResult
  -> project feedback/readback from the committed result
  -> acknowledge the first visible campaign frame
```

## Candidate kits

```txt
campaign-session-id-kit
campaign-session-generation-kit
campaign-state-revision-kit
campaign-action-id-kit
campaign-action-sequence-kit
campaign-action-source-kind-kit
campaign-action-kind-kit
campaign-action-command-kit
campaign-action-payload-schema-kit
campaign-action-capability-kit
campaign-action-admission-kit
campaign-phase-revision-kit
campaign-selection-revision-kit
campaign-economy-revision-kit
campaign-pad-revision-kit
campaign-target-revision-kit
campaign-action-plan-kit
campaign-action-prepare-kit
campaign-action-commit-kit
campaign-action-rollback-kit
campaign-action-result-kit
campaign-action-change-set-kit
stale-campaign-action-rejection-kit
duplicate-campaign-action-rejection-kit
campaign-action-observation-kit
campaign-action-journal-kit
campaign-action-visible-frame-ack-kit
campaign-action-source-fixture-kit
campaign-action-rejection-fixture-kit
campaign-action-idempotency-fixture-kit
public-gamehost-action-fixture-kit
browser-campaign-action-smoke-kit
pages-campaign-action-smoke-kit
```

## Required result statuses

```txt
Committed
RejectedInvalidSchema
RejectedUnsupportedAction
RejectedCapability
RejectedPhase
RejectedSelection
RejectedTarget
RejectedOccupied
RejectedInsufficientResources
RejectedTerminal
RejectedPaused
RejectedStale
RejectedDuplicate
RejectedNoEffect
FailedPrepare
FailedCommit
RolledBack
```

## Required invariants

```txt
one action ID produces at most one terminal result
rejected actions perform zero mutation
build either commits pad, economy, tower and feedback together or commits none
wave start either commits queue, phase and message together or commits none
orders cite one selection and target revision
selection actions publish exact added/removed IDs
public GameHost actions use explicit source and capability identity
results identify predecessor and successor campaign revisions
visible feedback and readback derive from the terminal result
first visible frame cites the accepted result and successor revision
source, built output and Pages fixtures agree
```

## Repo-local output

```txt
.agent/trackers/2026-07-12T18-11-53-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-12T18-11-53-04-00.md
.agent/architecture-audit/2026-07-12T18-11-53-04-00-campaign-action-result-authority-dsk-map.md
.agent/render-audit/2026-07-12T18-11-53-04-00-action-result-visible-feedback-gap.md
.agent/gameplay-audit/2026-07-12T18-11-53-04-00-silent-action-noop-mutation-loop.md
.agent/interaction-audit/2026-07-12T18-11-53-04-00-action-command-admission-result-map.md
.agent/campaign-action-audit/2026-07-12T18-11-53-04-00-command-revision-commit-result-contract.md
.agent/deploy-audit/2026-07-12T18-11-53-04-00-campaign-action-fixture-gate.md
```

## Validation boundary

Documentation only. Runtime, gameplay, action behavior, rendering, package scripts, dependencies and deployment were not changed. `npm run check`, `npm run build`, browser fixtures and Pages fixtures were not run.