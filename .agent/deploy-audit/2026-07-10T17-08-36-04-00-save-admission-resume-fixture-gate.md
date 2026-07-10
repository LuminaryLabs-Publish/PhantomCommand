# Save Admission and Resume Fixture Gate

**Repository:** `LuminaryLabs-Publish/PhantomCommand`

**Timestamp:** `2026-07-10T17-08-36-04-00`

## Current validation chain

```txt
npm run check
  -> scripts/check-menu.mjs
  -> scripts/check-campaign.mjs

npm run build
  -> scripts/build-static.mjs
```

The current checks are source-pattern checks. They do not execute candidate classification, hydration, fingerprint comparison, or post-resume simulation.

## Required independent fixtures

```txt
tests/phantom-command-save-admission-fixture.mjs
tests/phantom-command-resume-fidelity-fixture.mjs
```

### Save-admission fixture rows

```txt
empty storage
malformed JSON
foreign nexus.sceneSnapshot
foreign phantom.command.campaign
legacy victory completion summary
current resumable envelope
migratable resumable envelope
unsupported version
checksum failure
deterministic storage-layer and key priority
```

### Resume-fidelity fixture rows

```txt
nontrivial saved campaign baseline
atomic successful hydration
atomic rejected hydration
fingerprint equality
unit/tower/projectile identifier continuity
spawn queue continuity
core/resource/wave continuity
camera policy
next fixed-step parity
legacy GameHost compatibility
immutable session readback
```

## Gate sequence

```txt
1. run each fixture independently
2. keep existing check scripts unchanged until fixtures pass
3. add fixtures to npm run check
4. prove npm run check
5. gate npm run build through the passing check chain
6. prove static artifact creation
7. browser-smoke new and continue routes
8. push only to main
```

## Deployment non-goals

Do not change GitHub Pages routing, Vite version, static copy layout, canvas dimensions, visuals, controls, or campaign constants during the fixture-gate pass.

## Current status

```txt
runtime source changed: no
package scripts changed: no
deploy workflow changed: no
save admission fixture exists: no
resume fidelity fixture exists: no
npm run check: not run
npm run build: not run
browser smoke: not run
```
