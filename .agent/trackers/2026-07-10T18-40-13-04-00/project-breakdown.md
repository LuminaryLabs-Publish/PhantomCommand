# PhantomCommand Project Breakdown

**Timestamp:** `2026-07-10T18-40-13-04-00`

## Goal

Document the current menu-to-campaign interaction, all source-backed domains, services, and kits, then define the smallest safe proof boundary for truthful Continue admission.

## Plan ledger

- [x] Enumerate all accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Compare all nine eligible repositories with the central ledger and root `.agent` state.
- [x] Select only `PhantomCommand` as the oldest eligible documented fallback.
- [x] Read menu, campaign, package, validation, and kit-registry sources.
- [x] Identify the current interaction loop.
- [x] Identify all domains in use and planned at the next boundary.
- [x] Identify every source-backed kit and service.
- [x] Add architecture, render, gameplay, interaction, persistence, and deploy audits.
- [x] Update required root `.agent` files.
- [ ] Sync the central repo ledger and internal change log.

## Repository inventory comparison

```txt
PhantomCommand       selected / prior 2026-07-10T17-08-36-04-00
ZombieOrchard        tracked  / 2026-07-10T17-18-47-04-00
TheUnmappedHouse     tracked  / 2026-07-10T17-29-23-04-00
MyCozyIsland         tracked  / 2026-07-10T17-38-35-04-00
TheOpenAbove         tracked  / 2026-07-10T17-51-35-04-00
PrehistoricRush      tracked  / 2026-07-10T18-01-03-04-00
AetherVale           tracked  / 2026-07-10T18-08-37-04-00
IntoTheMeadow        tracked  / 2026-07-10T18-22-01-04-00
HorrorCorridor       tracked  / 2026-07-10T18-31-21-04-00
TheCavalryOfRome     excluded
```

## Interaction loop

```txt
menu load
  -> settings read
  -> two calls to hasCampaignSave()
  -> each call scans 3 keys x 2 storage layers
  -> raw evidence collapses to Boolean
  -> Continue state freezes
  -> new or continue route emitted
  -> campaign ignores route intent and storage
  -> fresh campaign state initializes
  -> selection/build/order/wave commands mutate live state
  -> fixed 1/60 simulation advances combat
  -> world/HUD/minimap/modal/CRT render
  -> victory writes a non-resumable completion summary
```

## Domain map

### Route, menu, and presentation

`static-route-shell`, `menu-route`, `campaign-route`, `menu-selection-domain`, `menu-panel-domain`, `menu-settings-persistence-domain`, `menu-save-candidate-discovery-domain`, `menu-continue-capability-domain`, `menu-transition-domain`, `menu-audio-domain`, `graveyard-art-domain`, `source-canvas-domain`, `crt-display-domain`.

### Session and persistence

`campaign-session-intent-domain`, `campaign-save-key-domain`, plus next boundaries for slot enumeration, parsing, schema classification, precedence, capability projection, provenance, save envelope, hydration, resume fidelity, and fingerprinting.

### Campaign and simulation

`ring-map-domain`, `lane-domain`, `build-pad-domain`, unit/tower/wave descriptor domains, souls economy, sanctum health, selection, build/order/wave actions, AI/pathing/targeting, projectile, damage/reward, effects, win/loss, and save-on-win.

### Runtime, proof, and deploy

Keyboard, pointer, camera, fixed-step simulation, world render, HUD, minimap, modal, GameHost diagnostics, static checks, static build, GitHub Pages deploy, and central ledger sync.

## Source-backed kits and services

- `crt-renderer-kit`: CRT display, fade/grain, source coordinate mapping.
- `graveyard-art-kit`: procedural menu art.
- `menu-route-kit`: menu interaction and route emission.
- `menu-settings-persistence-kit`: visual/audio settings persistence.
- `menu-save-presence-kit`: raw six-slot presence detection.
- `menu-audio-kit`: ambience and UI tones.
- `campaign-route-shell-kit`: game route and canvas shell.
- `pixel-campaign-runtime-kit`: descriptors, state, input, simulation, persistence, render, diagnostics.
- `fixed-step-campaign-simulation-kit`: accumulator-driven 1/60 simulation.
- `pixel-campaign-render-kit`: world, HUD, minimap, modal, CRT.
- `legacy-gamehost-diagnostics-kit`: mutable state/camera and aggregate readback.
- `campaign-static-check-kit`: source-pattern checks.
- `static-build-copy-kit`: static artifact construction.
- Legacy construct kits: retained proof only, not live campaign authority.

## Next kits

```txt
phantom-command-candidate-slot-registry-kit
phantom-command-save-candidate-resolver-kit
phantom-command-save-classifier-kit
phantom-command-candidate-precedence-kit
phantom-command-continue-capability-kit
phantom-command-candidate-provenance-kit
phantom-command-campaign-session-mode-kit
phantom-command-candidate-resolver-fixture-kit
phantom-command-build-fixture-gate-kit
central-ledger-readback-kit
```

## Main finding

Continue availability is a stale Boolean, not an authoritative capability result. The next boundary must make six-slot inspection, classification, precedence, and provenance deterministic and shared by both menu and campaign startup before full save hydration is attempted.

## Next safe ledge

```txt
PhantomCommand Continue Capability Resolver + Save Candidate Precedence Fixture Gate
```