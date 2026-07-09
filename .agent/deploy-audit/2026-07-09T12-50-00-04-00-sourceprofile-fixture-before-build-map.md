# Deploy Audit: SourceProfile Fixture Before Build Map

**Timestamp:** `2026-07-09T12-50-00-04-00`

## Current deploy/build path

```txt
package.json
  -> npm run build
  -> node scripts/build-static.mjs
  -> static artifact copy
  -> GitHub Pages workflow artifact
```

## Current gap

`npm run build` does not yet run a sourceProfile fixture before static artifact copy.

This means GitHub Pages can publish a route where the browser render consumes inline `game.html` constants without proving parity against source-owned profile descriptors.

## Required build gate

After sourceProfile fixture implementation:

```txt
npm run build
  -> node tests/phantom-command-source-profile-fixture.mjs
  -> node tests/construct-spiral-intro-kit-smoke.mjs
  -> node scripts/build-static.mjs
```

## Required fixture failure categories

```txt
profile_mismatch
ring_descriptor_mismatch
piece_descriptor_mismatch
timeline_mismatch
source_snapshot_unserializable
fingerprint_unstable
gamehost_legacy_shape_changed
sourceprofile_consumer_readback_missing
central_ledger_pointer_stale
scenario_bootstrap_unblocked_too_early
```

## Main deploy rule

Do not wire the fixture into build until the fixture exists and passes standalone.

Do not change GitHub Pages workflow behavior in the same pass as the profile extraction unless the fixture is already green locally.

## Current pass validation

```txt
runtime source changed: no
package.json changed: no
build script changed: no
workflow changed: no
local build run: no
browser smoke run: no
```
