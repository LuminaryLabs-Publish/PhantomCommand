# PhantomCommand Validation

**Timestamp:** `2026-07-09T16-25-16-04-00`

## Validation performed in this pass

```txt
- Listed the accessible LuminaryLabs-Publish repo set through the GitHub connector.
- Compared the Publish repo set against central LuminaryLabs-Dev/LuminaryLabs repo-ledger entries.
- Sampled repo-local .agent/START_HERE.md state for checked non-Cavalry repos.
- Confirmed no checked non-Cavalry repo was new, ledger-absent, missing sampled root agent state, recently added but undocumented, or otherwise undocumented.
- Confirmed PhantomCommand had the oldest eligible central tracker state among checked documented repos at read time.
- Excluded LuminaryLabs-Publish/TheCavalryOfRome.
- Selected PhantomCommand as the documentation consistency target.
- Read package.json.
- Read index.html.
- Read game.html.
- Read scripts/build-static.mjs.
- Read src/kits/construct-spiral-intro-kit/index.js.
- Updated .agent root docs.
- Added timestamped tracker and turn-ledger entries.
- Added architecture, render, gameplay, source-profile, scenario-bootstrap, and deploy audits.
- Updated .agent/kit-registry.json.
- Synced the central LuminaryLabs-Dev/LuminaryLabs repo ledger and internal change-log.
```

## Runtime validation not performed

```txt
- Runtime source changed: no.
- Branch created: no.
- Pull request created: no.
- npm install: not run.
- npm run build: not run.
- source-profile fixture: not run because the fixture does not exist yet.
- browser smoke: not run.
```

## Available validation hooks

```txt
npm run build
```

The current build script is `node scripts/build-static.mjs` and only copies static files into `dist/`. It should be upgraded to run the source-profile fixture before static copy after fixture files exist.

## Required next validation gate

```txt
node scripts/validate-source-profile.mjs
npm run build
browser route check: index.html -> game.html
GameHost check: window.GameHost.getState().sourceProfile exists and legacy fields still exist
```
