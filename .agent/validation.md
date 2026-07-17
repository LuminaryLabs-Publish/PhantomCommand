# Validation

**Timestamp:** `2026-07-17T11-39-49-04-00`  
**Status:** `campaign-camera-coverage-bounds-authority-audited`

## Summary

This pass validates repository selection, documentation scope, source evidence, interaction loops, domains, kit inventory and camera-boundary policy gaps only. It does not validate camera-boundary behavior because no runtime authority or executable fixture was added.

## Checklist

- [x] Enumerate 11 accessible Publish repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm ten eligible central ledgers and root `.agent` records.
- [x] Confirm synchronized documented heads.
- [x] Select PhantomCommand through the oldest documented-selection rule.
- [x] Inspect arena geometry, camera producers, source/world projection and frame clamping.
- [x] Preserve all 20 implemented kits and services.
- [x] Add the timestamped camera-coverage audit family.
- [x] Refresh required root `.agent` files and machine registry.
- [ ] Execute browser, artifact and Pages fixtures.

## Source inspection completed

```txt
src/campaign/campaign-scene.js
src/menu/crt-renderer.js
game.html
package.json
scripts/check-campaign.mjs
scripts/build-static.mjs
current repo-local trackers and kit registry
central PhantomCommand ledger
full Publish repository inventory and eligible heads
```

## Confirmed by inspection

```txt
outer ring radius 147: present
camera x/z independent clamp: present
square corner radius 207.89: derived from source constants
source viewport 640x360: present
projection origin (320,210): present
zoom range 0.34..2.45: present
zoom-aware visible-footprint envelope: absent
shared camera producer admission: absent
CameraCoverageResult: absent
FirstCameraBoundsFrameAck: absent
```

## Changed

```txt
documentation: yes
runtime JavaScript: no
HTML or CSS: no
gameplay or simulation: no
camera or rendering behavior: no
pointer behavior: no
audio or persistence: no
packages or dependencies: no
tests or workflows: no
build or deployment: no
branch creation: no
pull request creation: no
```

## Not executed

```txt
npm run check
npm run build
keyboard camera-boundary fixture
middle-pan boundary fixture
wheel-anchor boundary fixture
focus boundary fixture
public-host camera mutation fixture
minimum/default/maximum zoom coverage fixture
resize/DPR stale-envelope fixture
built-output smoke
Pages-origin camera-boundary smoke
```

No camera-boundary correctness, minimum-coverage guarantee, anchor-preservation correctness, browser fixture success, artifact parity, Pages parity or production readiness is claimed.