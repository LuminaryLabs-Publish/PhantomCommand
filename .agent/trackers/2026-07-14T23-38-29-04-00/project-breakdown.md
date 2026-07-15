# PhantomCommand Project Breakdown

**Timestamp:** `2026-07-14T23-38-29-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Branch:** `main`  
**Status:** `isometric-render-order-frame-authority-audited`

## Summary

PhantomCommand is a static pixel-isometric campaign with procedural Canvas2D menu art, fixed-step combat, Canvas2D world/HUD/minimap rendering, WebGL CRT presentation, browser persistence, source checks and Pages deployment. This breakdown isolates world render ordering.

The unit and tower painter list is correctly sorted by the isometric depth key `x + z`, but the sanctum is excluded from that list and drawn last. Projectiles and effects are also drawn outside the stable world-item ordering. The source therefore permits near-side units, health bars, projectiles and effects to be covered by the sanctum even when their projected depth should place them in front.

## Plan ledger

**Goal:** bind every visible world item to one stable isometric render plan so occlusion, overlays and the accepted browser frame all represent the same simulation snapshot.

- [x] Enumerate all 11 accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm ten eligible central-ledger entries and ten root `.agent` states.
- [x] Compare current eligible repository heads with their recorded documentation heads.
- [x] Confirm no new, missing, undocumented, root-agent-missing or runtime-ahead eligible repository.
- [x] Select only PhantomCommand under the oldest synchronized documentation rule.
- [x] Trace campaign simulation, projection, painter ordering, sanctum drawing, projectiles, effects, HUD, minimap and CRT submission.
- [x] Identify the complete interaction loop, domains, all implemented kits and every offered service.
- [x] Preserve all 20 implemented source-backed kit surfaces.
- [x] Define the isometric render-order frame authority family.
- [x] Add a new timestamped tracker, turn ledger and focused audit family.
- [x] Refresh every required root `.agent` document and machine registry.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Implement stable world-item admission and executable pixel-order fixtures.

## Selection comparison

```txt
accessible Publish repositories:              11
eligible after Cavalry exclusion:              10
central ledger entries:                        10
root .agent states:                            10
new eligible repositories:                      0
ledger-missing eligible repositories:           0
root-agent-missing eligible repositories:       0
runtime-ahead eligible repositories:            0

oldest synchronized eligible entry:
  PhantomCommand  2026-07-14T18-41-11-04-00

selected: LuminaryLabs-Publish/PhantomCommand
excluded: LuminaryLabs-Publish/TheCavalryOfRome
```

Only `LuminaryLabs-Publish/PhantomCommand` is modified in the Publish organization.

## Complete interaction loop

```txt
menu route
  -> draw procedural graveyard art through Canvas2D
  -> handle menu selection, settings, save presence and audio
  -> navigate to game.html

campaign boot
  -> create 640 x 360 source canvas
  -> create CRT WebGL presentation surface
  -> author rings, lanes, tower pads, units, waves, camera and mutable state
  -> attach keyboard, pointer, wheel, context-menu and blur listeners
  -> expose window.GameHost
  -> start recursive RAF

simulation step
  -> admit queued wave spawns
  -> update player and enemy movement and targeting
  -> resolve melee and projectile damage
  -> update towers, projectiles, rewards, effects and wave completion
  -> settle sanctum loss or final victory flags

world presentation
  -> draw rings, lanes and pads
  -> combine towers and units
  -> sort combined entities by x + z
  -> draw sorted entities and their health bars
  -> draw projectiles after all entities
  -> draw effects after all projectiles
  -> draw sanctum last regardless of depth
  -> draw HUD, tower controls, message, minimap and overlays
  -> upload Canvas2D source to CRT texture
  -> render WebGL CRT frame

interaction
  -> map CRT pointer coordinates to source and world coordinates
  -> select units or pads
  -> build towers, issue orders, pan, zoom, focus, pause or start waves
  -> publish mutable diagnostics through GameHost

terminal and delivery
  -> render victory or defeat overlay
  -> write victory marker to localStorage
  -> reload or return to menu
  -> static checks validate source markers
  -> static builder copies product files
  -> GitHub Pages publishes the artifact
```

## Domains in use

1. Static HTML route and ES-module lifecycle.
2. Browser document, RAF, performance clock, blur and navigation lifecycle.
3. Procedural menu composition, settings, save presence, audio and route navigation.
4. Canvas2D source rendering and pixel-art typography.
5. WebGL context, shader, texture upload and CRT presentation.
6. Campaign ring, lane, pad, tower, unit, wave and archetype content.
7. Mutable campaign state and fixed-step scheduling.
8. Spawn queue, movement, targeting, projectiles, damage, rewards and effects.
9. Camera projection, isometric transforms, pan, zoom and focus.
10. Pointer, keyboard, wheel, selection, building and unit-order interaction.
11. World-item classification, isometric depth ordering and occlusion policy.
12. HUD, minimap, pause and terminal presentation.
13. LocalStorage victory marker and reload retry.
14. GameHost diagnostics and direct product capabilities.
15. Construction intro choreography and sequence state.
16. Source checks, static build, Pages deployment and central audit tracking.

## Implemented kits and offered services

| Kit | Services offered |
|---|---|
| `crt-renderer-kit` | WebGL context creation, source-texture upload, CRT shader execution, viewport mapping and disposal surface. |
| `graveyard-art-kit` | Procedural graveyard menu drawing and animated ambient presentation. |
| `menu-route-kit` | Menu selection, panels, fade and navigation into the campaign. |
| `menu-settings-persistence-kit` | Settings read/write and menu preference projection. |
| `menu-save-presence-kit` | Victory marker detection and continue-state presentation. |
| `menu-audio-kit` | AudioContext creation, ambience, wind and UI tones. |
| `campaign-route-shell-kit` | `game.html` campaign canvas, fallback content and module bootstrap. |
| `pixel-campaign-runtime-kit` | Campaign state, authored content, public host and runtime lifecycle. |
| `fixed-step-campaign-simulation-kit` | Accumulator, 60 Hz simulation steps, wave updates and terminal gates. |
| `pixel-campaign-render-kit` | Rings, lanes, pads, entities, projectiles, effects, sanctum, HUD, minimap and overlays. |
| `legacy-gamehost-diagnostics-kit` | Mutable state/camera exposure, start-wave, build, zoom and snapshot readback. |
| `menu-static-check-kit` | Menu source-marker assertions. |
| `campaign-static-check-kit` | Campaign HTML/source/CRT/build marker assertions. |
| `static-build-copy-kit` | Static product copy into deployment output. |
| `pages-deploy-kit` | GitHub Pages artifact publication. |
| `construct-spiral-intro-kit` | Intro construction choreography descriptor. |
| `construct-spiral-schedule-kit` | Timed construction schedule generation. |
| `construct-piece-id-kit` | Stable construction-piece identity. |
| `construct-piece-state-kit` | Piece visibility and construction state. |
| `construct-sequence-update-kit` | Construction sequence advancement. |

```txt
implemented source-backed kits: 20
render-facing implemented kits:  3
executable source checks:        2
planned render-order surfaces:  17
```

## Source-backed render-order finding

`worldToScreen()` maps vertical isometric screen position from `(x + z) * 0.36`, so sorting by `x + z` is the correct principal painter key for world entities.

The active draw path does this only for towers and units:

```txt
items = towers + units
items.sort((a, b) => (a.x + a.z) - (b.x + b.z))
items.forEach(drawEntity)
```

It then executes:

```txt
draw every projectile
draw every effect
drawSanctum(center)
```

The sanctum has world depth `x + z = 0` but is always drawn after positive-depth near-side entities. It can therefore cover entities and health bars that should occlude it. Far-side and near-side projectiles/effects also share no stable ordering with units, towers or the sanctum.

This is a source-permitted render mismatch. No browser screenshot or pixel probe was executed in this documentation-only run.

## Required authority

```txt
phantom-command-isometric-render-order-frame-authority-domain
```

```txt
IsometricRenderFrameCommand
  -> bind FrameId, SimulationRevision, CameraRevision and viewport revision
  -> classify every world renderable
  -> assign world depth key, layer policy and stable tie-break key
  -> admit sanctum, towers, units, projectiles and effects into one render plan
  -> separate true screen-space overlays from world-space items
  -> execute the accepted stable painter order
  -> publish per-item draw receipts and RenderFrameResult
  -> acknowledge FirstVisibleDepthOrderedFrameAck
  -> reject stale or mixed-revision render plans
```

## Proposed authority kit family

1. `campaign-frame-identity-kit`
2. `simulation-snapshot-revision-kit`
3. `camera-projection-revision-kit`
4. `world-renderable-descriptor-kit`
5. `isometric-depth-key-kit`
6. `render-layer-policy-kit`
7. `stable-depth-tie-break-kit`
8. `sanctum-render-item-kit`
9. `tower-render-item-kit`
10. `unit-render-item-kit`
11. `projectile-render-item-kit`
12. `effect-render-item-kit`
13. `world-health-overlay-policy-kit`
14. `isometric-render-plan-kit`
15. `render-item-receipt-kit`
16. `first-depth-ordered-frame-ack-kit`
17. `source-build-pages-render-order-fixture-kit`

## Required validation fixtures

```txt
headless render-plan ordering matrix
sanctum versus far-side unit ordering
sanctum versus near-side unit ordering
health-bar occlusion policy
projectile and effect cross-depth ordering
stable equal-depth tie-break replay
camera pan and zoom ordering invariance
Canvas2D pixel probes around the sanctum
CRT-visible frame acknowledgement
source, built-output and Pages parity
```

## Validation boundary

This run changed documentation only. It did not modify campaign source, rendering, gameplay, persistence, package scripts, tests, workflows or deployment. Existing `npm run check` assertions are source-marker checks and do not execute Canvas2D ordering, browser pixel probes or the CRT frame.
