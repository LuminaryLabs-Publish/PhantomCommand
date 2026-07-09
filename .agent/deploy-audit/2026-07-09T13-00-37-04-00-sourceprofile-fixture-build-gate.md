# PhantomCommand SourceProfile Fixture Build Gate

**Timestamp:** `2026-07-09T13-00-37-04-00`

## Current package scripts

```txt
npm run start   -> vite --host 0.0.0.0 --port 4173
npm run dev     -> vite --host 0.0.0.0 --port 4173
npm run build   -> node scripts/build-static.mjs
npm run preview -> vite preview --host 0.0.0.0 --port 4173
```

## Current deploy/build gap

`npm run build` copies the static site but does not yet prove live source-profile parity before artifact creation.

## Required future gate

```txt
node tests/phantom-command-source-profile-fixture.mjs
node tests/construct-spiral-intro-kit-smoke.mjs
npm run build
```

## Fixture acceptance rows

```txt
source profile constants match live game.html
ring part counts match [5,5,5,5,6,8,10,12,16,20]
piece descriptors total 92
total build seconds 19.923
ring gaps are zero
handoff/part stagger match live values
legacy GameHost fields preserved
sourceProfile diagnostics additive only
scenario bootstrap remains blocked
construct result remains blocked
central ledger latest tracker and audits match repo-local state
```

## This pass

```txt
runtime source changed: no
package scripts changed: no
npm run build: not run
fixture: not implemented or run
branch created: no
pushed to main: yes
```
