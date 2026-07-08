# PhantomCommand GameHost Source Profile Readback Gate

**Timestamp:** `2026-07-08T18-29-21-04-00`

## Current render readback

`game.html` renders the full construct and exposes a compact `window.GameHost.getState()` shape.

Current readback fields:

```txt
buildId
phase
progress
pieces
rings
ringParts
ringGaps
ringStartTimes
animation.prewarmSeconds
animation.moveSeconds
animation.ringHandoff
animation.partStagger
animation.ringGapBase
animation.ringGapGrowth
animation.totalBuildTime
```

## Readback gap

The current GameHost fields are useful, but they are downstream runtime facts from the same inline file that owns rendering.

They do not prove:

```txt
- which source profile generated the rings
- whether the source profile is normalized
- whether the ring descriptors came from source modules
- whether the piece descriptors came from source modules
- whether the timeline contract matched fixture rows
- whether the source fingerprint is stable
- whether the browser consumed the same source snapshot as the DOM-free fixture
```

## Target additive GameHost shape

Do not remove or rename the existing fields.

Add only:

```txt
sourceProfile: {
  status,
  buildId,
  sourceFingerprint,
  sourceSnapshot,
  profileParity,
  descriptorParity,
  timelineParity,
  fixtureRows,
  consumer: {
    route: "game.html",
    mode: "additive-readback",
    legacyFieldsPreserved: true
  }
}
```

## Render acceptance rows

```txt
gamehost_legacy_fields_are_present
gamehost_sourceProfile_is_additive
gamehost_sourceProfile_buildId_matches_live
gamehost_sourceProfile_fingerprint_matches_fixture
gamehost_sourceProfile_ringParts_match_fixture
gamehost_sourceProfile_totalBuildSeconds_matches_fixture
gamehost_sourceProfile_reports_no_parity_errors
gamehost_sourceProfile_does_not_require_dom_fixture
```

## Browser splice rules

```txt
- Import only diagnostics / source snapshot helpers into game.html.
- Keep the current inline visual creation until parity passes.
- Do not change camera, materials, wedge geometry, HUD copy, controls, or animation timing in the same pass.
- Keep skipConstruct and restartConstruct stable.
- Keep the legacy getState shape stable.
- Add sourceProfile below the existing state, not as a replacement.
```

## Stop line

The next implementation stops once GameHost readback proves sourceProfile parity additively. Renderer extraction is a later pass.