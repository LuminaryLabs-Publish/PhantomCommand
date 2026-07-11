# PhantomCommand Project Breakdown

**Timestamp:** `2026-07-11T13-28-37-04-00`

## Summary

This pass selects `LuminaryLabs-Publish/PhantomCommand` as the oldest stable eligible Publish repository and audits exclusive terminal-outcome authority. The final enemy can destroy the sanctum and then satisfy final-wave completion in the same fixed update, producing `lost = true`, `won = true`, a victory overlay and a victory save.

## Plan ledger

**Goal:** identify the complete interaction loop, domains, kits and services, then define one atomic terminal transaction shared by simulation, phase, persistence, rendering, diagnostics, replay and restart.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger and root `.agent` coverage.
- [x] Skip `HorrorCorridor` because a same-window repo-local audit was active.
- [x] Select only `PhantomCommand` as the oldest stable eligible repository.
- [x] Inspect `src/menu/graveyard-menu.js` and `src/campaign/campaign-scene.js`.
- [x] Trace core breach, unit deletion, wave completion, save, overlay, restart and `GameHost` flows.
- [x] Identify all domains, implemented kits and offered services.
- [x] Define terminal evidence, arbitration, latch, result, persistence and frame contracts.
- [x] Refresh required root `.agent` documents.
- [x] Push directly to `main` without a branch or pull request.
- [ ] Runtime implementation and fixtures remain future work.

## Repository comparison

```txt
PhantomCommand     2026-07-11T11-51-06-04-00 selected
ZombieOrchard      2026-07-11T12-01-38-04-00
TheUnmappedHouse   2026-07-11T12-08-47-04-00
AetherVale         2026-07-11T12-18-42-04-00
IntoTheMeadow      2026-07-11T12-29-49-04-00
PrehistoricRush    2026-07-11T12-39-53-04-00
MyCozyIsland       2026-07-11T12-58-06-04-00
TheOpenAbove       2026-07-11T13-10-35-04-00
HorrorCorridor     active repo-local write at 2026-07-11T13-20-45-04-00
TheCavalryOfRome   excluded
```

## Interaction loop

```txt
menu
  -> settings, audio, raw save presence and CRT presentation
  -> Begin or Continue route

campaign input
  -> direct selection, build, order, wave, pause, tower and camera mutation

campaign fixed update
  -> unit movement and combat
  -> enemy breach may set lost and delete the enemy
  -> update continues
  -> final-wave clear may set won and write success persistence

presentation
  -> overlay checks won before lost
  -> GameHost exposes both terminal booleans
  -> R reloads without a typed restart transaction
```

## Domains in use

```txt
static route and campaign shell
menu settings save-presence transition audio and graveyard art
CRT containment curvature source upload and pointer projection
ring map lanes pads unit/tower archetypes wave scripts economy and core health
selection construction orders wave admission pause camera and identity counters
spawn queue AI pathing targeting projectiles damage rewards and effects
fixed-step simulation frame clock command replay and committed-frame candidates
core-breach wave-clear victory defeat arbitration latch and persistence
world HUD minimap terminal overlay CRT and GameHost observation
lifecycle checkpoint validation build deploy and central synchronization
```

## Implemented kits and services

| Kit | Services |
|---|---|
| `crt-renderer-kit` | WebGL CRT setup, source upload, containment, curvature, resize, draw and partial pointer mapping |
| `graveyard-art-kit` | Procedural menu composition |
| `menu-route-kit` | Selection, panels, Begin/Continue route and fade |
| `menu-settings-persistence-kit` | CRT, grain and ambience settings |
| `menu-save-presence-kit` | Boolean scan of three keys across local/session storage |
| `menu-audio-kit` | Procedural ambience and UI tones |
| `campaign-route-shell-kit` | Campaign page bootstrap |
| `pixel-campaign-runtime-kit` | Content, mutable state, selection, build, orders, wave and camera input |
| `fixed-step-campaign-simulation-kit` | `1/60` spawn, AI, combat, core damage, rewards and terminal mutation |
| `pixel-campaign-render-kit` | World, HUD, minimap, terminal overlay and source frame |
| `legacy-gamehost-diagnostics-kit` | Live state/camera exposure and direct action methods |
| `menu-static-check-kit` | Menu source-pattern checks |
| `campaign-static-check-kit` | Campaign source-pattern checks |
| `static-build-copy-kit` | Deployable artifact assembly |
| `pages-deploy-kit` | GitHub Pages deployment |
| retained construct kits | Construct intro scheduling, IDs, piece state and sequence updates |

## Main finding

```txt
final wave active
spawn queue empty
last enemy reaches center
core 1 -> 0
lost = true
enemy deleted
parent update continues
enemies() is now empty
wave increments to wave count
won = true
victory message written
phantomCommand.save written
```

The runtime can commit:

```txt
core: 0
lost: true
won: true
```

The overlay then displays victory because `won` is tested first.

## New DSK boundary

```txt
phantom-command-terminal-outcome-authority-domain
```

Responsibilities:

```txt
collect terminal evidence
purely evaluate defeat and victory predicates
apply a versioned outcome-priority policy
commit exactly one outcome
latch terminal state for the run epoch
publish a typed terminal result
admit or reject persistence
correlate the first terminal frame
project one outcome through HUD overlay CRT and GameHost
prove breach clear simultaneous persistence replay restart and frame cases
```

## Validation

Documentation only. Runtime source, scripts, dependencies, routes, gameplay, rendering, persistence and deployment configuration were unchanged. Existing checks do not execute terminal arbitration or persistence behavior.