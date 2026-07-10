# Architecture Audit: Campaign Source Action Readback DSK Map

**Repository:** `LuminaryLabs-Publish/PhantomCommand`

**Timestamp:** `2026-07-10T05-21-20-04-00`

## DSK read

`PhantomCommand` is a static Vite canvas game. The active route is `game.html -> src/campaign/campaign-scene.js`.

The live campaign source already contains meaningful domain boundaries, but they are inline in one module rather than source-owned descriptors and fixture-readable records.

## Current DSK chain

```txt
index.html menu
  -> game.html route shell
  -> campaign-scene.js inline descriptors
  -> inline state and action mutation
  -> inline simulation update
  -> inline draw/render pass
  -> aggregate GameHost.getState()
```

## Target DSK chain

```txt
campaign source manifest
  -> descriptor fingerprint
  -> ring/lane/pad descriptors
  -> archetype/tower/wave descriptors
  -> action intent records
  -> ActionResult rows
  -> simulation frame summaries
  -> render readback rows
  -> additive GameHost campaign diagnostics
  -> DOM-free campaign fixture
  -> build fixture gate
```

## Domains

```txt
static-route-shell
menu-route
campaign-route
vite-static-build
static-artifact-copy
low-resolution-source-canvas
crt-display-renderer
pixel-campaign-render-loop
ring-map-domain
lane-domain
build-pad-domain
unit-archetype-domain
tower-archetype-domain
wave-script-domain
souls-economy-domain
sanctum-core-health-domain
selection-domain
build-action-domain
order-action-domain
wave-start-action-domain
unit-ai-domain
enemy-pathing-domain
ally-targeting-domain
tower-targeting-domain
projectile-domain
damage-reward-domain
effect-domain
camera-pan-zoom-domain
keyboard-input-domain
pointer-input-domain
hud-projection-domain
minimap-domain
save-on-win-domain
legacy-gamehost-campaign-diagnostics
construct-spiral-intro-kit-legacy-support
campaign-source-manifest-next
campaign-descriptor-fingerprint-next
campaign-action-result-next
campaign-simulation-frame-next
campaign-render-readback-next
campaign-gamehost-diagnostics-next
campaign-fixture-next
central-ledger-sync
```

## Source/consumer seam

```txt
src/campaign/campaign-scene.js:
  owns W/H, rings, laneAngles, pad generation, archetypes, towerTypes, waves, camera, input, state, update, draw, render, event listeners, save-on-win, and GameHost.

game.html:
  thin route shell with source module import and accessible control copy.

scripts/build-static.mjs:
  copies static assets to dist, but does not run a campaign fixture.

window.GameHost.getState():
  exposes aggregate wave/souls/core/unit/tower/win/loss/zoom only.
```

## Architecture finding

The next implementation should extract source/readback facts without changing the live scene first. Keep `campaign-scene.js` as the consumer until source manifests and action/render fixtures prove parity.
