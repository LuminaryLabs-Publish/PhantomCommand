# Validation

**Timestamp:** `2026-07-17T06-38-14-04-00`  
**Status:** `campaign-input-region-arbitration-authority-audited`

## Summary

This pass validates repository selection, documentation scope, source evidence, interaction loops, domains, kit inventory and campaign input-region classification only. It does not validate region-aware pointer behavior because no runtime authority or executable fixture was added.

## Checklist

- [x] Enumerate 11 accessible Publish repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm ten eligible central ledgers and root `.agent` records.
- [x] Confirm synchronized documented heads.
- [x] Select PhantomCommand through the oldest documented-selection rule.
- [x] Inspect campaign source mapping, rendering and pointer command paths.
- [x] Preserve all 20 implemented kits and services.
- [x] Add the timestamped input-region audit family.
- [x] Refresh required root `.agent` files and machine registry.
- [ ] Execute browser, artifact and Pages fixtures.

## Source inspection completed

```txt
src/menu/crt-renderer.js
src/campaign/campaign-scene.js
package.json
scripts/build-static.mjs
current repo-local trackers and kit registry
central PhantomCommand ledger
full Publish repository inventory and eligible timestamps
```

## Confirmed by inspection

```txt
browser-to-source mapping returns x/y/inside: present
world/HUD/control/minimap/modal shared source surface: present
visible overlay z-order: present in renderer
inside flag enforcement by campaign commands: absent
source-region manifest: absent
topmost visible-region command arbitration: absent
typed region/command results: absent
matching frame acknowledgement: absent
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
HUD no-fallthrough fixture
control-strip no-marquee fixture
minimap no-order fixture
modal suspension fixture
letterbox/pillarbox rejection fixture
unobscured world command fixture
built-output smoke
Pages-origin input-region smoke
```

No region arbitration, command suppression, browser fixture success, artifact parity, Pages parity or production readiness is claimed.