# PhantomCommand Project Breakdown

**Timestamp:** `2026-07-14T13-40-59-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Branch:** `main`  
**Status:** `campaign-terminal-outcome-conflict-settlement-authority-audited`

## Summary

PhantomCommand is a two-route static browser game with a procedural Canvas2D menu, WebGL CRT presentation, fixed-step grave-ring campaign, browser audio, minimal persistence, static source checks, a copy build and GitHub Pages delivery. The current audit isolates terminal campaign settlement. A sanctum breach can set `lost=true` during unit updates, after which the same fixed step can still clear the final wave, set `won=true`, grant the clear reward and write a victory save. Rendering prioritizes `won` over `lost`, so a conflicting terminal state can be projected as victory.

## Plan ledger

**Goal:** make every campaign terminal step resolve exactly one immutable outcome before rewards, persistence, presentation or retry can proceed.

- [x] Enumerate all 11 accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Compare ten eligible repositories with ten central ledger entries.
- [x] Confirm every eligible current head matches its recorded repo-local documentation head.
- [x] Confirm no eligible repository is new, ledger-missing, root-agent-missing or runtime-ahead.
- [x] Select only `LuminaryLabs-Publish/PhantomCommand` by the oldest eligible central documentation timestamp.
- [x] Inspect campaign state, wave start, spawning, unit breach, wave clear, reward, save, terminal rendering, retry and public readback.
- [x] Preserve all 20 implemented kits and offered services.
- [x] Define a 22-surface terminal outcome settlement family.
- [x] Add a new timestamped tracker and system-specific audit family.
- [x] Refresh every required root `.agent` document and machine registry.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Runtime settlement and executable conflict fixtures remain future work.

## Selection comparison

```txt
accessible Publish repositories: 11
eligible after Cavalry exclusion: 10
central ledger entries: 10
root .agent states represented by synchronized documentation heads: 10
new eligible repositories: 0
ledger-missing eligible repositories: 0
root-agent-missing eligible repositories: 0
runtime-ahead eligible repositories: 0
selected: PhantomCommand
selection reason: oldest eligible synchronized central timestamp
prior central timestamp: 2026-07-14T07-58-22-04-00
excluded: TheCavalryOfRome
```

Only `LuminaryLabs-Publish/PhantomCommand` is modified in the Publish organization.

## Complete interaction loop

```txt
menu route
  -> draw procedural graveyard menu to Canvas2D
  -> submit the source canvas through the CRT renderer
  -> begin new campaign or request continue

campaign bootstrap
  -> create rings, pads, units, tower catalog, wave catalog and mutable state
  -> attach pointer, wheel, keyboard and blur listeners
  -> publish window.GameHost
  -> start recursive RAF and a 60 Hz fixed-step accumulator

active campaign
  -> player selects units and pads
  -> player builds towers and issues movement or attack orders
  -> Space calls startWave() directly
  -> queued enemies spawn across four lanes
  -> units, towers and projectiles update
  -> enemies reaching the sanctum subtract core and remove themselves
  -> dead enemies grant immediate soul rewards
  -> an empty active wave increments wave and grants a wave-clear reward

terminal step
  -> a breaching enemy can set state.lost=true during updateUnit()
  -> update() continues through towers, projectiles and wave-clear detection
  -> if the final active enemy was removed by breaching, enemies() is empty
  -> final-wave clear can set state.won=true in the same fixed step
  -> victory save can be written while state.lost is also true
  -> terminal overlay chooses won before lost
  -> GameHost can expose won=true and lost=true together

retry or exit
  -> R reloads the document without predecessor outcome identity
  -> Escape navigates to the menu
  -> no immutable terminal artifact or retry lineage is retained
```

## Domains in use

```txt
static HTML routes and ES module lifecycle
DOM root discovery and accessibility fallback
Canvas2D source rendering
WebGL context, shader and CRT presentation
procedural graveyard menu art
menu selection, settings, save presence, audio and navigation
campaign authored rings, pads, units, towers and wave catalog
pointer, wheel, keyboard, blur and route input
camera pan, zoom, projection and spatial picking
fixed-step scheduling and mutable simulation state
wave admission, queueing, spawning and completion
movement, targeting, projectile, damage and reward rules
sanctum health, victory, defeat and terminal precedence
localStorage victory marker persistence
terminal HUD, overlay, minimap and public GameHost readback
run identity, step identity, terminal proposal and settlement
reward policy, save adoption, outcome journal and retry lineage
first terminal-frame evidence
source checks, static build, Pages deployment and central tracking
```

## Implemented kits and offered services

| Kit | Offered services |
|---|---|
| `crt-renderer-kit` | WebGL acquisition, shader compile/link, buffer and texture allocation, resize, screen mapping, source upload and CRT draw |
| `graveyard-art-kit` | Procedural menu, graveyard, title, panel and selection drawing |
| `menu-route-kit` | Menu selection, panels, fade, transition and navigation |
| `menu-settings-persistence-kit` | Settings parsing, defaults, mutation and storage write |
| `menu-save-presence-kit` | Local and session save-key presence scan |
| `menu-audio-kit` | AudioContext creation, ambience, wind, UI tones and delayed close |
| `campaign-route-shell-kit` | Campaign HTML, source canvas and static assistive instructions |
| `pixel-campaign-runtime-kit` | Campaign state, input, selection, building, orders, pause and camera |
| `fixed-step-campaign-simulation-kit` | Accumulator, waves, spawning, movement, targeting, projectiles, damage, rewards and terminal flags |
| `pixel-campaign-render-kit` | World, entities, HUD, minimap, terminal overlays and CRT submission |
| `legacy-gamehost-diagnostics-kit` | Public campaign snapshot, wave start, build and zoom capabilities |
| `menu-static-check-kit` | Menu HTML and source-marker checks |
| `campaign-static-check-kit` | Campaign HTML and source-marker checks |
| `static-build-copy-kit` | Static route and source copying into `dist` |
| `pages-deploy-kit` | GitHub Pages publication |
| `construct-spiral-intro-kit` | Concentric construction choreography |
| `construct-spiral-schedule-kit` | Ring and piece scheduling |
| `construct-piece-id-kit` | Stable construction identity |
| `construct-piece-state-kit` | Construction-state projection |
| `construct-sequence-update-kit` | Construction sequence advancement |

```txt
implemented source-backed kits: 20
planned terminal-settlement surfaces: 22
```

## Source-backed findings

### Terminal flags are independent

Campaign state contains separate mutable `won` and `lost` booleans. No terminal enum, accepted outcome ID or invariant prevents both from becoming true.

### Loss does not stop the current fixed step

An enemy that reaches the sanctum subtracts core, removes itself and can set `lost=true`. Control returns to the same `update()` call, which still advances towers, projectiles, effects and wave-clear logic.

### Final-wave clear can follow loss

Wave completion checks `waveActive`, an empty spawn queue and `!enemies().length`. A final enemy removed because it breached the sanctum satisfies the empty-enemy condition. On the last wave, the code can then set `won=true` after `lost=true` in the same step.

### Presentation masks the conflict

The terminal overlay chooses `state.won` before `state.lost`. A conflicting state is therefore rendered as `GRAVE RING SECURED`. Public diagnostics expose both flags but provide no accepted terminal result or conflict classification.

### Rewards and persistence are not settlement participants

Wave-clear souls are added before any terminal artifact exists. Victory persistence writes only `{scene, souls, wave}` and is attempted immediately when `won` is set. There is no run ID, terminal step ID, outcome fingerprint, reward-policy revision, atomic save result or rollback receipt.

### Retry replaces evidence

`R` reloads the page. The predecessor run, terminal proposals, accepted outcome, rewards, save result and visible terminal frame are not retained or cited by a successor run.

### Existing validation cannot detect the conflict

`npm run check` performs regular-expression source checks. It does not execute a fixed step where the final enemy breaches at zero core, inspect terminal precedence, verify reward idempotency, inspect storage or capture the terminal frame.

## Required parent domain

```txt
phantom-command-campaign-terminal-outcome-conflict-settlement-authority-domain
```

## Planned coordinating kits

```txt
campaign-run-identity-kit
simulation-step-identity-kit
wave-identity-kit
terminal-proposal-kit
sanctum-loss-proposal-kit
final-wave-clear-proposal-kit
terminal-conflict-classifier-kit
outcome-precedence-policy-kit
campaign-terminal-settlement-kit
terminal-result-fingerprint-kit
reward-policy-revision-kit
wave-reward-settlement-kit
victory-save-candidate-kit
save-commit-result-kit
terminal-state-projection-kit
gamehost-outcome-readback-kit
first-terminal-frame-ack-kit
campaign-retry-command-kit
retry-lineage-kit
stale-step-rejection-kit
outcome-journal-kit
source-build-pages-outcome-fixture-kit
```

## Required transaction

```txt
CampaignTerminalSettlementCommand
  -> bind RunId, StepId, WaveId, campaign configuration and policy revisions
  -> collect SanctumLost and FinalWaveCleared proposals from one fixed step
  -> classify zero, one or conflicting terminal proposals
  -> apply one explicit precedence policy
  -> accept exactly one immutable CampaignOutcomeArtifact
  -> derive wave and terminal rewards from the accepted artifact
  -> prepare the victory save only for an accepted victory
  -> atomically commit state, rewards, persistence, GameHost and UI projection
  -> publish participant receipts and FirstTerminalFrameAck

CampaignRetryCommand
  -> cite the accepted predecessor outcome
  -> allocate a successor RunId and retry lineage
  -> reset campaign participants as one transaction
  -> reject late work from predecessor steps
  -> retain bounded outcome history
```

## Required fixtures

```txt
final enemy dies before reaching core -> victory only
final enemy reaches core with core remaining -> wave clear only
final enemy reaches core and reduces core to zero -> policy-defined single outcome
loss proposal and final-wave-clear proposal in one fixed step
wave reward applied exactly once
victory save written only after accepted victory
save failure does not mutate the accepted outcome
terminal overlay matches accepted artifact
GameHost exposes one terminal result and no conflicting flags
retry cites predecessor outcome and rejects late predecessor work
source versus dist versus Pages terminal parity
first accepted terminal-frame acknowledgement
```

## Repo-local output

Added under `2026-07-14T13-40-59-04-00`:

```txt
.agent/trackers/2026-07-14T13-40-59-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-14T13-40-59-04-00.md
.agent/architecture-audit/2026-07-14T13-40-59-04-00-campaign-terminal-outcome-settlement-dsk-map.md
.agent/render-audit/2026-07-14T13-40-59-04-00-terminal-outcome-visible-frame-gap.md
.agent/gameplay-audit/2026-07-14T13-40-59-04-00-final-wave-loss-conflict-loop.md
.agent/interaction-audit/2026-07-14T13-40-59-04-00-terminal-command-settlement-result-map.md
.agent/outcome-audit/2026-07-14T13-40-59-04-00-outcome-reward-save-retry-contract.md
.agent/deploy-audit/2026-07-14T13-40-59-04-00-terminal-conflict-fixture-gate.md
.agent/central-sync-audit/2026-07-14T13-40-59-04-00-repo-ledger-terminal-outcome-reconciliation.md
```

Refreshed:

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
```

## Validation

```txt
documentation-only: yes
runtime JavaScript changed: no
HTML or CSS changed: no
gameplay changed: no
rendering changed: no
persistence changed: no
package scripts or dependencies changed: no
workflow or deployment changed: no
branch created: no
pull request created: no
npm run check: not run
npm run build: not run
terminal conflict fixture: unavailable / not run
browser terminal-frame fixture: unavailable / not run
Pages terminal fixture: unavailable / not run
```

No exclusive terminal settlement, precedence correctness, reward idempotency, durable outcome, save atomicity, retry lineage, terminal-frame convergence or production-readiness claim is made.