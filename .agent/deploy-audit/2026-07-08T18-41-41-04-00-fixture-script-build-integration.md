# Deploy Audit: Fixture Script Build Integration

**Timestamp:** `2026-07-08T18-41-41-04-00`

## Current deploy surface

```txt
package.json
  -> npm run build
  -> node scripts/build-static.mjs
  -> dist artifact
  -> GitHub Pages workflow deploys from main
```

## Current validation gap

The future source-profile fixture does not exist yet and is not wired into any build/check path.

## Next deploy validation target

Add fixture validation only after source files exist and pass locally:

```txt
node tests/phantom-command-source-profile-fixture.mjs
node tests/construct-spiral-intro-kit-smoke.mjs
npm run build
```

## Do not change yet

```txt
- Do not change GitHub Pages workflow until the fixture exists.
- Do not fail deploy on a missing fixture file.
- Do not create a branch.
- Do not create a PR gate.
- Do not change runtime visual output during fixture integration.
```

## Acceptance line

Deploy validation can include source-profile fixture checks only after the fixture proves live profile parity and GameHost source diagnostics shape.
