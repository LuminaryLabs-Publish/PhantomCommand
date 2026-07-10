# Architecture audit: campaign session and command-correlation DSK map

Timestamp: `2026-07-10T15-38-40-04-00`

## Current composition

```txt
index.html
  -> graveyard-menu.js
      -> graveyard-art.js
      -> crt-renderer.js
      -> settings persistence
      -> save-presence detection
      -> Begin/Continue route intent
  -> game.html
      -> campaign-scene.js
          -> inline descriptors
          -> inline campaign state
          -> inline input reducers
          -> inline fixed-step simulation
          -> inline render projection
          -> inline save-on-win
          -> inline GameHost diagnostics
```

The route is modular at the file-entry level but monolithic inside the campaign module.

## Domain-to-kit breakdown

| Domain | Current owner | Service offered | Authority status |
|---|---|---|---|
| Menu route | `graveyard-menu.js` | selection, panels, Begin/Continue navigation | source-backed |
| Menu settings | `graveyard-menu.js` | CRT, grain, ambience persistence | source-backed |
| Save detection | `graveyard-menu.js` | presence check across three keys | source-backed but schema-agnostic |
| Campaign session mode | query string | distinguishes `new` and `continue` intent | emitted by menu, unconsumed by campaign |
| Save schema | ad hoc win payload | `scene`, `souls`, `wave` write | incomplete |
| Save hydration | none | restore campaign state | missing |
| Ring/lane/pad descriptors | `campaign-scene.js` | construct map and 58 build pads | inline |
| Unit/tower/wave catalogs | `campaign-scene.js` | simulation source data | inline |
| Campaign commands | `selectAt`, `build`, `order`, `startWave` | player intent handling | inline and untyped |
| Command results | implicit mutation/no-op | accepted or rejected outcome | missing |
| Command journal | none | ordered replay/readback | missing |
| Simulation | `update` and helpers | fixed-step campaign progression | inline |
| Frame correlation | none | command-to-tick-to-render attribution | missing |
| Render projection | draw helpers | world, HUD, minimap, CRT | inline |
| Diagnostics | `window.GameHost` | direct state and aggregate counters | legacy, mutable, proof-poor |
| Validation | `check-campaign.mjs` | source-pattern smoke assertions | source-backed, non-behavioral |
| Build | `build-static.mjs` | static artifact copy | source-backed |

## Source-backed current kits

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
campaign-static-check-kit
static-build-copy-kit
construct-spiral-intro-kit
construct-spiral-schedule-kit
construct-piece-id-kit
construct-piece-state-kit
construct-sequence-update-kit
```

## Required next DSK cut

```txt
phantom-command-campaign-session-mode-kit
  parse URL intent
  normalize new/continue session mode
  expose JSON-safe mode row

phantom-command-save-schema-kit
  version save payload
  validate scene identity
  define defaults and migration behavior

phantom-command-save-hydration-kit
  load accepted save
  reject invalid save with reason
  reconstruct source-owned campaign state

phantom-command-command-envelope-kit
  assign sequence, commandId, frameId, type, payload, source

phantom-command-action-result-kit
  return accepted, rejected, no-op, skipped, unsupported
  preserve reason and before/after summary

phantom-command-action-journal-kit
  retain bounded ordered command/result rows

phantom-command-frame-correlation-kit
  link commandId to fixed-step simulation and render frame

phantom-command-render-readback-kit
  report source rows consumed by world, HUD, minimap, and CRT

phantom-command-gamehost-readback-kit
  preserve legacy fields
  expose immutable session, journal, frame, render, and fixture blocks

phantom-command-session-fixture-kit
  prove new session, valid continue, invalid continue fallback, command rejection, deterministic replay, and legacy compatibility

phantom-command-build-fixture-gate-kit
  run session fixture before static artifact copy
```

## Boundary rule

Do not move visual drawing or AI implementation first. Establish session mode, save schema, command envelopes, action results, ordered journal, and fixture proof as DOM-free modules; then splice them into `campaign-scene.js` without changing current visuals or controls.
