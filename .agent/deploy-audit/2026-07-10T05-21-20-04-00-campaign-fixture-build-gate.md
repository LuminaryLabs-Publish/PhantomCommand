# Deploy Audit: Campaign Fixture Build Gate

**Repository:** `LuminaryLabs-Publish/PhantomCommand`

**Timestamp:** `2026-07-10T05-21-20-04-00`

## Current scripts

```txt
npm run check  -> node scripts/check-menu.mjs && node scripts/check-campaign.mjs
npm run build  -> node scripts/build-static.mjs
npm run dev/start/preview -> Vite on port 4173
```

## Current build behavior

`scripts/build-static.mjs` copies these paths into `dist`:

```txt
index.html
game.html
src
docs
config
```

It does not run a campaign fixture before copying static artifacts.

## Missing fixture command

```txt
node tests/phantom-command-campaign-fixture.mjs
```

## Gate order for next implementation

```txt
1. Add source descriptor modules.
2. Add action-result and render-readback modules.
3. Add DOM-free campaign fixture.
4. Run node tests/phantom-command-campaign-fixture.mjs.
5. Run node tests/construct-spiral-intro-kit-smoke.mjs.
6. Run npm run check.
7. Run npm run build.
8. Only then wire build/check gating changes.
```

## Deploy finding

No deploy change is needed in this docs pass. The next deploy-safe step is fixture-first validation, not GitHub Pages or route rewiring.
