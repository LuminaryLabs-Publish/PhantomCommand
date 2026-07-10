# PhantomCommand Deploy Audit: Campaign Fixture Check Build Gate

**Timestamp:** `2026-07-10T12-40-45-04-00`

## Deployment posture

No runtime source, branch, deployment config, route, or package script was changed in this documentation pass.

## Available commands

From `package.json`:

```txt
npm run check
npm run build
npm run start
npm run dev
npm run preview
```

## Existing checks

```txt
npm run check
  -> node scripts/check-menu.mjs
  -> node scripts/check-campaign.mjs

npm run build
  -> node scripts/build-static.mjs
```

## Missing gate

```txt
node tests/phantom-command-campaign-fixture.mjs
```

The fixture does not exist yet, so it was not run in this docs-only pass.

## Required gate before runtime splice

```txt
[ ] campaign source ledger exists
[ ] action result rows exist
[ ] simulation frame summaries exist
[ ] render readback rows exist
[ ] additive GameHost diagnostics exist
[ ] campaign fixture proves source/action/render/GameHost parity
[ ] construct smoke remains green
[ ] npm run check passes
[ ] npm run build runs campaign fixture before static copy
```

## Safe sequencing

```txt
source ledger
  -> action results
  -> simulation frames
  -> render readback
  -> GameHost diagnostics
  -> DOM-free fixture
  -> package/build gate
  -> campaign-scene additive splice
```
