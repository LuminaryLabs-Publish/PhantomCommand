# PhantomCommand Next Steps

**Timestamp:** `2026-07-10T05-21-20-04-00`

## Next safe ledge

```txt
PhantomCommand Campaign Source Action Readback Refresh + GameHost Fixture Gate
```

## Goal

Preserve the current campaign scene while moving live rings, lanes, pads, unit archetypes, tower archetypes, wave scripts, action intents, action results, simulation frame rows, render readback, and additive GameHost diagnostics into explicit contracts.

The next cut should prove campaign source and action parity without depending on DOM, canvas drawing, CRT effects, or browser timing. Only after fixture proof should `src/campaign/campaign-scene.js` consume those helpers additively through `window.GameHost.getState().campaign`.

## Checklist

```txt
[ ] Keep index.html -> game.html routing unchanged.
[ ] Keep current campaign visuals and controls unchanged.
[ ] Keep existing window.GameHost methods and fields unchanged.
[ ] Add src/campaign/campaign-source-manifest.js.
[ ] Move ring, lane, pad, archetype, tower, and wave constants into source-owned descriptors.
[ ] Add src/campaign/ring-lane-descriptors.js.
[ ] Add src/campaign/build-pad-descriptors.js.
[ ] Add src/campaign/unit-archetypes.js.
[ ] Add src/campaign/tower-archetypes.js.
[ ] Add src/campaign/wave-scripts.js.
[ ] Add src/campaign/action-results.js for select, build, order, start-wave, damage, reward, win, and loss rows.
[ ] Add src/campaign/simulation-frame.js for deterministic tick summaries.
[ ] Add src/campaign/render-readback.js for ring, lane, pad, unit, tower, projectile, HUD, minimap, and CRT consumption summaries.
[ ] Add src/campaign/gamehost-diagnostics.js.
[ ] Add tests/phantom-command-campaign-fixture.mjs.
[ ] Prove sourceWidth/sourceHeight, ring count 7, lane count 4, generated pad count, starter ally count 6, tower catalog, wave queue shape, build accept/reject, order action, wave start, win/loss flags, and GameHost legacy compatibility.
[ ] Import only source/readback helpers into src/campaign/campaign-scene.js after fixture proof.
[ ] Add additive campaign diagnostics under window.GameHost.getState().
[ ] Ensure npm run build runs the campaign fixture before copying static artifacts.
[ ] Run node tests/phantom-command-campaign-fixture.mjs.
[ ] Run node tests/construct-spiral-intro-kit-smoke.mjs.
[ ] Run npm run check.
[ ] Run npm run build.
[ ] Push only to main.
```

## Stop condition

Stop the implementation slice only after these are fixture-readable:

```txt
campaignSource.route === game.html
campaignSource.sceneModule === src/campaign/campaign-scene.js
campaignSource.sourceWidth === 640
campaignSource.sourceHeight === 360
campaignSource.ringCount === 7
campaignSource.laneCount === 4
campaignSource.towerTypes includes spire, lantern, ward
campaignSource.unitArchetypes includes guard, archer, runner, shield, zealot, brute, wraith
campaignSource.waveCount === 6
ActionResult rows cover select, build, order, start-wave, damage, reward, win, and loss
simulation frame rows summarize spawn, unit, tower, projectile, damage, wave clear, win, and loss
renderReadback rows cover rings, lanes, pads, units, towers, projectiles, HUD, minimap, and CRT pass
legacy GameHost fields still exist
central ledger latest tracker equals repo-local latest tracker
```

## Defer until after proof

```txt
camera rewrite
pixel art enemy animation expansion
additional campaign waves
new economy systems
renderer replacement
expanded save/load
RTS scenario bootstrap
```
