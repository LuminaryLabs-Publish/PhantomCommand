# PhantomCommand Validation

**Timestamp:** `2026-07-08T09:19:43-04:00`

## Validation performed in this pass

```txt
- Listed full LuminaryLabs-Publish repo set through the GitHub installation.
- Compared Publish repo set against central LuminaryLabs-Dev/LuminaryLabs ledger/readback state.
- Confirmed PhantomCommand is tracked centrally and already has root .agent state.
- Selected PhantomCommand as fallback follow-up because source profile parity, construct completion results, and scenario bootstrap remain untyped authority seams.
- Read .agent/START_HERE.md.
- Read .agent/current-audit.md.
- Read .agent/next-steps.md.
- Read .agent/known-gaps.md.
- Read .agent/validation.md.
- Read .agent/kit-registry.json.
- Read README.md.
- Read package.json.
- Read game.html.
- Read src/kits/construct-spiral-intro-kit/index.js.
- Read tests/construct-spiral-intro-kit-smoke.mjs.
- Read repo-ledger/LuminaryLabs-Publish/PhantomCommand.md in the central ledger.
- Updated required repo-local .agent audit files.
- Added architecture-audit/2026-07-08T09-19-43-04-00-dsk-domain-breakdown.md.
- Added render-audit/2026-07-08T09-19-43-04-00-render-source-authority-map.md.
- Added scenario-bootstrap-audit/2026-07-08T09-19-43-04-00-source-wire-map.md.
- Added a new timestamped tracker entry.
- Added a new timestamped turn-ledger entry.
- Updated central repo ledger with latest follow-up state.
- Added central internal change-log entry.
```

## Runtime validation not performed

```txt
- npm install was not run.
- npm run build was not run.
- npm start was not run.
- node tests/construct-spiral-intro-kit-smoke.mjs was not run.
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
- build runs node scripts/build-static.mjs.
- dev/start run Vite on port 4173.

game.html declares:
- BUILD_ID smooth-ring-handoff-v6
- RING_COUNT 10
- RING_GAP_BASE 0
- RING_GAP_GROWTH 0
- MOVE_SECONDS 2.6
- RING_HANDOFF 0.72
- PART_STAGGER 0.025
- inline ringParts() policy
- inline makePiece() wedge construction
- inline construct(seq) progress and phase mutation
- window.GameHost.skipConstruct
- window.GameHost.restartConstruct
- window.GameHost.getState

construct-spiral-intro-kit declares:
- CONSTRUCT_SPIRAL_INTRO_KIT_ID construct-spiral-intro-kit
- CONSTRUCT_SPIRAL_INTRO_DOMAIN_PATH n:sequence:construct:spiral-intro
- DEFAULT_CONSTRUCT_SPIRAL_INTRO_CONFIG for generic active/spiral/window behavior
- installPieces/reset/update/snapshot service surface
- pending/active/settled/newlyActive/newlySettled piece query surface

construct-spiral-intro-kit-smoke declares:
- smoke data uses [5,5,5,6,8,10,12,15,18,22,26,32]
- smoke validates generic schedule ordering, active count cap, active ring window, and eventual completion
- smoke does not validate live smooth-ring-handoff-v6 values
```

## Next validation needed

```txt
npm install
npm run build
node tests/construct-spiral-intro-kit-smoke.mjs
node <new fixture> for smooth-ring-handoff-v6 profile parity
node <new fixture> for ring descriptor parity
node <new fixture> for piece descriptor parity
node <new fixture> for handoff/timeline margin parity
node <new fixture> for ConstructEventResult idempotency
node <new fixture> for ConstructSnapshot serialization
node <new fixture> for ScenarioBootstrapResult gating
node <new fixture> for ScenarioBootstrapSnapshot serialization
node <new fixture> for legacy GameHost compatibility shape
browser smoke for index.html -> game.html -> GameHost surface
post-deploy Pages route check
```

## Current proof status

```txt
repo-list comparison: performed
central ledger comparison: performed
source readback: performed
root .agent updated: performed
tracker created: performed
turn ledger created: performed
central change-log created: performed
runtime implementation changed: no
build proof: missing
browser proof: missing
fixture replay proof: missing
```