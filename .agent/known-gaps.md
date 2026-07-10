# PhantomCommand Known Gaps

**Timestamp:** `2026-07-10T12-40-45-04-00`

## Critical campaign-source gaps

```txt
- game.html is a thin route shell importing src/campaign/campaign-scene.js.
- src/campaign/campaign-scene.js owns rings, lanes, pads, archetypes, towers, waves, state, update, draw, HUD, minimap, input, camera, save, and GameHost inline.
- campaign ring descriptors are not source-owned outside the runtime file.
- lane descriptors are not source-owned outside the runtime file.
- build pad generation is inline and has no descriptor parity rows.
- unit archetypes are inline and have no source fingerprint.
- tower archetypes are inline and have no source fingerprint.
- wave scripts are inline and have no fixture rows.
- select, build, order, start-wave, damage, reward, win, and loss actions have no ActionResult records.
- no-op and rejected branches are silent.
- simulation ticks have no deterministic frame summaries.
- render pass has no source-consumption/readback ledger.
- HUD and minimap draw from live aggregate state without render-consumption rows.
- GameHost.getState() exposes only aggregate campaign counters and zoom.
- GameHost does not expose source ledger, action journal, render readback, fixture status, selected units, selected pad, tower type, wave queue, or per-wave source.
- build-static does not run a campaign fixture before copying static artifacts.
```

## Source wire gaps

```txt
- src/campaign/campaign-source-ledger.js does not exist.
- src/campaign/campaign-source-manifest.js does not exist.
- src/campaign/source-fingerprint.js does not exist.
- src/campaign/ring-lane-descriptors.js does not exist.
- src/campaign/build-pad-descriptors.js does not exist.
- src/campaign/unit-archetypes.js does not exist.
- src/campaign/tower-archetypes.js does not exist.
- src/campaign/wave-scripts.js does not exist.
- src/campaign/action-intents.js does not exist.
- src/campaign/action-results.js does not exist.
- src/campaign/simulation-frame.js does not exist.
- src/campaign/render-readback.js does not exist.
- src/campaign/gamehost-diagnostics.js does not exist.
- tests/phantom-command-campaign-fixture.mjs does not exist.
```

## Legacy construct gaps now demoted

```txt
- construct-spiral-intro-kit is still present and smoke-tested separately.
- it is no longer the live campaign route authority.
- source-profile work for the old smooth-ring-handoff construct is not the immediate live-route blocker.
- do not delete the construct kit, but do not treat it as proof for current game.html gameplay.
```

## Non-blocking gaps

```txt
- pixel art animation frames are procedural rectangles today.
- isometric camera zoom/pan is functional but lacks fixture-readable bounds.
- enemy and ally AI are compact and inline.
- economy is minimal.
- save only writes a small win payload.
- accessibility route copy roughly matches campaign controls, but needs source-owned control help later.
```

## Do not do next

```txt
- Do not create a new branch.
- Do not work on Cavalry of Rome.
- Do not replace the campaign scene renderer first.
- Do not add more waves or enemy types before source manifests exist.
- Do not expand economy before build/action results exist.
- Do not rewrite camera before camera/readback fixture rows exist.
- Do not start construct-profile parity before campaign fixture readback.
- Do not delete legacy construct kit during this proof cut.
```
