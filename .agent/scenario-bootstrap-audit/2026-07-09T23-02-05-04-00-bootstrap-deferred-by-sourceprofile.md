# PhantomCommand Scenario Bootstrap Audit: Deferred by SourceProfile

**Timestamp:** `2026-07-09T23-02-05-04-00`

## Status

Scenario bootstrap remains deferred.

`PhantomCommand` currently ships a static menu route and one construct scene route. The current proof is the smooth-ring construct, not a scenario loop.

## Why bootstrap is blocked

Scenario bootstrap would need stable construct facts:

```txt
which profile built the command platform
which rings and pieces exist
when construction completes
which GameHost facts are source-owned
which fixture rows prove legacy compatibility
```

Those facts are currently derived inline in `game.html` and are not fixture-readable.

## Do not do next

```txt
new scenario bootstrap
RTS unit controls
resource economy
wave spawning
mission progression
command-result authority
renderer rewrite
```

## Safe prerequisite

```txt
PhantomCommand SourceProfile Consumer Refresh + GameHost Fixture Gate
```

Only after source-profile parity and additive GameHost source diagnostics pass should scenario bootstrap consume construct completion or platform descriptors.

## Future bootstrap inputs

```txt
sourceProfile.buildId
sourceProfile.ringDescriptors
sourceProfile.pieceDescriptors
sourceProfile.timeline
sourceProfile.fingerprint
sourceProfile.parityReport
GameHost legacy compatibility
fixture result rows
```
