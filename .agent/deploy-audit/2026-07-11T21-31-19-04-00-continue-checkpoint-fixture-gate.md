# Deploy Audit: Continue and Checkpoint Fixture Gate

**Timestamp:** `2026-07-11T21-31-19-04-00`

## Summary

The current static checks verify source patterns, not browser-storage admission or actual resume behavior. Deployment should not claim Continue support until pure fixtures and one browser smoke prove the selected checkpoint reaches the first visible frame.

## Plan ledger

**Goal:** define the validation gate required before resume behavior is considered deployable.

- [x] Inspect current package scripts.
- [x] Identify missing candidate and browser fixtures.
- [x] Define pure, host and browser gates.
- [ ] Implement and run the gate.

## Required pure fixtures

```txt
candidate discovery across keys and scopes
malformed JSON rejection
wrong-game and wrong-content rejection
unsupported-version rejection
legacy terminal summary classification
deterministic multiple-candidate precedence
migration success and migration failure
semantic checkpoint rejection
state fingerprint stability
atomic hydration rollback
```

## Required browser fixtures

```txt
no save -> Continue disabled
invalid save -> Continue disabled with no byte overwrite
valid checkpoint -> Continue enabled
Continue -> RESUME result
Begin -> NEW result even when a checkpoint exists
resumed HUD differs from defaults
GameHost reports matching checkpoint and run epoch
first resumed frame reports matching checkpoint fingerprint
reload and menu round trip retain the selected canonical checkpoint
```

## Package gate

Recommended:

```txt
npm run check
npm run test:checkpoint
npm run smoke:continue
npm run build
```

## Deployment rule

GitHub Pages deployment may remain a static artifact deployment, but the workflow should block if checkpoint fixtures, Continue browser smoke or the existing checks fail.
