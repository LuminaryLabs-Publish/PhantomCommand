# Campaign Action Fixture Gate

**Timestamp:** `2026-07-12T18-11-53-04-00`

## Summary

The existing `npm run check` command performs source-token assertions. It does not execute campaign actions, inspect terminal results, prove zero mutation after rejection or correlate committed actions with visible frames.

## Required headless fixtures

```txt
start-wave success and every rejection reason
build success, missing pad, occupied pad and insufficient souls
selection add, toggle, clear and rectangle selection
order success, empty selection and stale entity reference
tower-type valid and invalid payloads
pause phase policy
restart phase policy
duplicate action ID idempotency
stale campaign/phase/selection/economy/pad/target revisions
prepare failure and rollback
public GameHost source identity
```

## Required invariants

```txt
rejected result leaves a stable state digest
committed result advances exactly one campaign revision
one action ID cannot mutate twice
build commits pad, economy, tower, effect and message together
wave start commits queue, phase and message together
result change set matches actual successor state
```

## Required browser fixtures

```txt
keyboard actions return typed results
pointer selection and order return typed results
public GameHost actions return typed results
HUD feedback reflects the terminal result
first visible frame cites action ID and successor revision
source canvas and CRT output remain coherent
```

## Delivery matrix

```txt
source tree
built static output
GitHub Pages deployment
```

All three must produce equivalent action statuses, revisions, state digests and visible-frame acknowledgements.

## Package gate

After implementation:

```txt
npm run check
npm run build
browser campaign-action smoke
built-output campaign-action smoke
Pages campaign-action smoke
```

## Current status

```txt
campaign action fixtures available: no
browser action smoke run: no
built-output action smoke run: no
Pages action smoke run: no
runtime source changed by this audit: no
```

No deployment configuration was changed.