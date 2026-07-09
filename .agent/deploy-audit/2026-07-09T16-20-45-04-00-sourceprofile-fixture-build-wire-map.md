# PhantomCommand Deploy Audit: SourceProfile Fixture Build Wire Map

**Timestamp:** `2026-07-09T16-20-45-04-00`

## Current deploy/build path

```txt
npm run build
  -> node scripts/build-static.mjs
  -> remove dist
  -> create dist
  -> copy index.html
  -> copy game.html
  -> copy docs if present
  -> copy config if present
```

## Current deploy gap

The build path copies static artifacts, but it does not prove that the live construct source profile exists outside `game.html`.

There is no build-gated fixture for:

```txt
sourceProfile default parity
ring descriptor parity
piece descriptor count
ringStartTimes parity
totalBuildSeconds parity
GameHost sourceProfile readback shape
legacy GameHost compatibility
```

## Required build wire after implementation

```txt
npm run build
  -> node tests/phantom-command-source-profile-fixture.mjs
  -> node tests/construct-spiral-intro-kit-smoke.mjs
  -> node scripts/build-static.mjs
```

## Guardrails

```txt
- Do not require browser automation for source-profile fixture rows.
- Do not require Three.js in the fixture.
- Do not require DOM or canvas.
- Do not mutate runtime files until pure source parity passes.
- Keep deploy static and simple.
- Push only to main.
- Do not create branches.
```

## Validation status

No build or browser validation was run in this docs-only pass.
