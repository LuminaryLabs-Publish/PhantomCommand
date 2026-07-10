# PhantomCommand Source Profile Audit: Legacy Construct Profile Still Demoted

**Timestamp:** `2026-07-10T12-40-45-04-00`

## Status

The old construct/source-profile path remains useful as a legacy smoke target, but it is not the current live campaign route authority.

## Current route authority

```txt
index.html menu
  -> game.html
  -> src/campaign/campaign-scene.js
```

## Legacy construct support

```txt
src/kits/construct-spiral-intro-kit/index.js
tests/construct-spiral-intro-kit-smoke.mjs
```

These should remain intact, but they do not prove live campaign source, actions, render readback, or GameHost diagnostics.

## Rule for next work

Do not restart old smooth-ring-handoff/source-profile work until the live campaign route has fixture-readable source, action, simulation, render, and GameHost proof rows.

## Next safe ledge

```txt
PhantomCommand Campaign Source Action Render Readback Refresh + GameHost Fixture Gate
```
