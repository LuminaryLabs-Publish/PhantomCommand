# PhantomCommand Deploy Audit

**Timestamp:** `2026-07-09T16-10-00-04-00`

## Current deploy/build path

```txt
package.json
  -> npm run build
  -> node scripts/build-static.mjs
  -> rm dist
  -> mkdir dist
  -> copy index.html
  -> copy game.html
  -> copy docs if present
  -> copy config if present
```

## Current gap

The build path copies static artifacts without proving that the live construct profile is source-owned or fixture-readable.

## Required future build gate

```txt
npm run build
  -> node tests/phantom-command-source-profile-fixture.mjs
  -> node tests/construct-spiral-intro-kit-smoke.mjs
  -> node scripts/build-static.mjs
```

The source-profile fixture should run before artifact copy.

## Build fixture assertions

```txt
- sourceProfile build id is smooth-ring-handoff-v6.
- ring count is 10.
- gap policy is zero-gap.
- ring part counts are [5,5,5,5,6,8,10,12,16,20].
- total pieces are 92.
- total build seconds are 19.923.
- source fingerprint is stable.
- source snapshot serializes.
- profile parity report has no errors.
- GameHost source diagnostics are additive.
- legacy GameHost state is preserved.
```

## Deploy finding

Do not change deploy or static copy semantics until the fixture exists. The next deploy pass should be a narrow fixture-before-copy splice.

## Validation this pass

```txt
runtime source changed: no
npm install run: no
npm run build run: no
source-profile fixture run: no
browser smoke run: no
branch created: no
pull request created: no
push target: main
```
