# PhantomCommand Validation

**Timestamp:** `2026-07-08T02:50:33-04:00`

## Validation performed in this pass

```txt
- Listed full LuminaryLabs-Publish repo set through the GitHub installation.
- Compared Publish repo set against central LuminaryLabs-Dev/LuminaryLabs ledger search results.
- Confirmed PhantomCommand is tracked centrally but was missing root .agent/START_HERE.md.
- Read README.md.
- Read package.json.
- Read index.html.
- Read game.html.
- Read scripts/build-static.mjs.
- Read .agent/kit-registry.json.
- Read repo-ledger/LuminaryLabs-Publish/PhantomCommand.md in the central ledger.
- Read src/kits/construct-spiral-intro-kit/index.js.
- Read tests/construct-spiral-intro-kit-smoke.mjs.
- Added required repo-local .agent audit files.
- Added new timestamped tracker entry.
- Added new timestamped turn-ledger entry.
- Updated central repo ledger with latest root-agent normalization state.
- Added central internal change-log entry.
```

## Runtime validation not performed

```txt
- npm install was not run.
- npm run build was not run.
- npm start was not run.
- Browser smoke was not run.
- GitHub Pages deploy was not checked after this docs-only pass.
- No Playwright or DOM automation was run.
- No implementation source files were changed.
```

## Current evidence from source inspection

```txt
README.md declares:
- PhantomCommand is a single-player PvE RTS prototype.
- index.html is the main menu.
- game.html is the opening construct scene.
- GitHub Pages deployment uses .github/workflows/deploy-pages.yml.

package.json declares:
- type module
- start/dev use Vite on port 4173
- build uses node scripts/build-static.mjs

scripts/build-static.mjs declares:
- dist is rebuilt from scratch
- index.html, game.html, docs, and config are copied if present

game.html declares:
- BUILD_ID sequential-ring-v5
- RING_COUNT 10
- zero ring gap base/growth
- window.GameHost.skipConstruct
- window.GameHost.restartConstruct
- window.GameHost.getState

construct-spiral-intro-kit declares:
- CONSTRUCT_SPIRAL_INTRO_KIT_ID construct-spiral-intro-kit
- CONSTRUCT_SPIRAL_INTRO_DOMAIN_PATH n:sequence:construct:spiral-intro
- installPieces/reset/update/snapshot service surface

tests/construct-spiral-intro-kit-smoke.mjs declares:
- kit id and domain assertions
- schedule ordering assertions
- update loop until complete
- active cap and active ring window assertions
```

## Next validation needed

```txt
npm install
npm run build
node tests/construct-spiral-intro-kit-smoke.mjs
node <new fixture> for sequential-ring-v5 profile parity
node <new fixture> for ConstructEventResult idempotency
node <new fixture> for ScenarioBootstrapResult gating
browser smoke for index.html -> game.html -> GameHost surface
post-deploy Pages route check
```
