# Source Profile Audit — Legacy Construct Profile Demotion

**Timestamp:** `2026-07-10T11-10-08-04-00`

## Current state

The legacy `construct-spiral-intro-kit` still exists and should not be deleted during the campaign proof cut.

However, it is no longer the primary live-route authority. The active route is now:

```txt
game.html -> src/campaign/campaign-scene.js
```

## Finding

Do not spend the next pass on the older smooth-ring construct source profile unless the campaign fixture is already in place. The current blocker is campaign source/action/render readback, not construct profile parity.

## Next relation

Keep construct smoke coverage as a regression guard, but make campaign fixture proof the build gate before camera, economy, renderer, or RTS expansion.
