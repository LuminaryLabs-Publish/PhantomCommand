# PhantomCommand Known Gaps

**Timestamp:** `2026-07-09T16-25-16-04-00`

## Critical source-profile gaps

```txt
- game.html still owns the live smooth-ring-handoff-v6 constants inline.
- game.html still owns ring descriptor math inline.
- game.html still owns piece descriptor math inline.
- game.html still owns timing policy inline.
- game.html still owns wedge geometry, material, construct animation, HUD mutation, input, camera, and GameHost state inline.
- construct-spiral-intro-kit exists, but it is generic spiral/window scheduling and not the live no-gap smooth-ring-handoff-v6 authority.
- There is no source-owned smooth-ring-handoff-v6 profile file.
- There is no normalizer proving exact live default values.
- There is no ring descriptor module that reproduces the live no-gap ring descriptors.
- There is no piece descriptor module that reproduces the live 92-piece construct.
- There is no timeline contract module proving ringStartTimes, per-piece delays, totalBuildSeconds, and prewarm behavior.
- There is no stable source fingerprint for the live construct profile.
- There is no serializable source snapshot proving what profile produced the construct.
- There is no DOM-free fixture for ring counts, gap policy, piece count, start times, and total build time.
- window.GameHost.getState() does not expose additive sourceProfile diagnostics yet.
- scripts/build-static.mjs copies static assets without running fixture proof first.
- scenario bootstrap, economy, unit command, construct result authority, and RTS gameplay should remain blocked until source-profile parity passes.
```

## Practical risk

Without source-profile parity, future agents can change `game.html` visuals and diagnostics independently from the source-owned DSK contracts. That makes the route visually stable but not reliably composable.

## Safe order

```txt
source profile
  -> descriptors
  -> timeline
  -> fingerprint
  -> fixture rows
  -> GameHost additive diagnostics
  -> build gate
  -> central ledger parity
  -> only then scenario bootstrap or command-result work
```
