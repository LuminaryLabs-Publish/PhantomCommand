# PhantomCommand project breakdown

Timestamp: `2026-07-10T15-38-40-04-00`

## Selection

Compared the complete accessible `LuminaryLabs-Publish` repository list against `LuminaryLabs-Dev/LuminaryLabs/repo-ledger/LuminaryLabs-Publish/` and verified root `.agent/START_HERE.md` state for every eligible repository.

```txt
PhantomCommand      selected / prior central latest 2026-07-10T14-11-51-04-00
ZombieOrchard       tracked / root .agent present / 2026-07-10T14-21-28-04-00
TheUnmappedHouse    tracked / root .agent present / 2026-07-10T14-28-47-04-00
MyCozyIsland        tracked / root .agent present / 2026-07-10T14-42-01-04-00
TheOpenAbove        tracked / root .agent present / 2026-07-10T14-50-38-04-00
PrehistoricRush     tracked / root .agent present / 2026-07-10T14-59-00-04-00
AetherVale          tracked / root .agent present / 2026-07-10T15-09-26-04-00
IntoTheMeadow       tracked / root .agent present / 2026-07-10T15-18-29-04-00
HorrorCorridor      tracked / root .agent present / 2026-07-10T15-31-03-04-00
TheCavalryOfRome    excluded by standing rule
```

No eligible repository was new, ledger-missing, missing root `.agent`, recently added but undocumented, or otherwise undocumented. `PhantomCommand` was therefore the oldest eligible documented fallback and was the only project audited.

## Interaction loop

```txt
index.html
  -> src/menu/graveyard-menu.js
  -> read menu settings from localStorage
  -> detect any save across three keys
  -> Begin Campaign routes to game.html?campaign=new
  -> Continue routes to game.html?campaign=continue
  -> game.html imports src/campaign/campaign-scene.js
  -> campaign scene does not read the campaign query parameter
  -> campaign scene does not hydrate a prior save
  -> fresh rings, pads, starter allies, resources, camera, input, and wave state initialize every load
  -> click or drag selects allies or pads
  -> second click on the selected empty pad attempts a build
  -> right-click orders selected allies or targets an enemy
  -> Space attempts to start the next wave
  -> fixed 1/60 simulation advances spawns, units, towers, projectiles, damage, rewards, wave completion, win, and loss
  -> draw loop renders the isometric world, HUD, minimap, modal overlay, and CRT pass
  -> win writes a minimal save payload
  -> window.GameHost exposes direct mutable state plus aggregate counters and control hooks
```

## Domains in use

### Route and menu domains

- static route shell
- menu route
- campaign route
- menu selection
- settings persistence
- save presence detection
- route transition
- procedural ambience and UI tone
- graveyard menu art
- source-canvas CRT presentation

### Campaign authority domains

- campaign session mode
- campaign save schema
- campaign save hydration
- ring map
- enemy lanes
- generated build pads
- unit archetypes
- tower archetypes
- wave scripts
- souls economy
- sanctum core health
- selection
- build action
- order action
- wave-start action
- unit AI
- enemy pathing
- ally targeting
- tower targeting
- projectiles
- damage and rewards
- effects
- win/loss state
- save-on-win

### Input, simulation, render, and diagnostics domains

- pointer mapping
- keyboard mapping
- camera pan and zoom
- fixed-step accumulator
- scene rendering
- HUD projection
- minimap projection
- CRT display pass
- GameHost diagnostics
- static source checks
- static artifact build
- GitHub Pages deployment

## Kits and services

### Source-backed current kits

- `crt-renderer-kit`: uploads the source canvas, applies CRT/grain/fade presentation, and maps display coordinates back to source coordinates.
- `graveyard-art-kit`: composes the menu scene.
- `menu-route-kit`: menu navigation, Begin/Continue route transitions, settings panel, credits panel, and save-presence gating.
- `menu-settings-persistence-kit`: reads and writes CRT, grain, and ambience preferences.
- `menu-audio-kit`: synthesized ambience and UI tones.
- `campaign-route-shell-kit`: accessible `game.html` canvas shell and campaign module entry.
- `pixel-campaign-runtime-kit`: inline campaign descriptors, state mutation, simulation, rendering, input, persistence, and diagnostics.
- `fixed-step-campaign-simulation-kit`: 1/60 accumulator-driven campaign updates, currently inline.
- `pixel-campaign-render-kit`: world, entities, effects, HUD, minimap, modal, and CRT submission, currently inline.
- `legacy-gamehost-diagnostics-kit`: direct `state`, `camera`, `startWave`, `build`, aggregate `getState`, and `setZoom` access.
- `campaign-static-check-kit`: verifies route, source dimensions, core descriptors, CRT usage, and GameHost presence through source-pattern assertions.
- `static-build-copy-kit`: copies deployable static artifacts into `dist/`.
- `construct-spiral-intro-kit` family: legacy construct proof utilities retained but not authoritative for the live campaign route.

### Next kits required

- `phantom-command-campaign-session-mode-kit`
- `phantom-command-save-schema-kit`
- `phantom-command-save-hydration-kit`
- `phantom-command-command-envelope-kit`
- `phantom-command-action-result-kit`
- `phantom-command-action-journal-kit`
- `phantom-command-frame-correlation-kit`
- `phantom-command-render-readback-kit`
- `phantom-command-gamehost-readback-kit`
- `phantom-command-session-fixture-kit`
- `phantom-command-build-fixture-gate-kit`
- `central-ledger-readback-kit`

## Main finding

The menu advertises a Continue path, but the campaign runtime has no continuation authority. `graveyard-menu.js` routes Continue to `game.html?campaign=continue`; `campaign-scene.js` neither reads that query parameter nor hydrates any saved campaign state. Every campaign load initializes a fresh run, while the only campaign write occurs after victory and stores only `scene`, `souls`, and `wave`.

The action boundary is also unobservable: `startWave`, `build`, and `order` silently return on rejected or no-op branches; `selectAt` combines selection and second-click construction; the fixed-step loop has no ordered command journal; and `GameHost` exposes a mutable state object without session, command, or frame-correlation readback.

## Next safe ledge

```txt
PhantomCommand Campaign Session Authority + Command Correlation Fixture Gate
```

This should be completed before new waves, economy expansion, save/load UI work, camera rewrites, renderer replacement, enemy art expansion, or legacy construct-profile work.
