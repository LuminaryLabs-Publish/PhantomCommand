# Deploy Audit — Target Query Budget Fixture Gate

**Timestamp:** `2026-07-18T10-38-06-04-00`  
**Status:** `campaign-target-query-work-budget-authority-audited`

## Existing delivery path

```txt
npm run check
  -> static menu markers
  -> static campaign markers

npm run build
  -> copy static routes and src into dist

GitHub Pages
  -> install
  -> build
  -> upload artifact
  -> deploy
```

The current campaign check confirms source markers such as rings, lanes, waves, camera zoom and `GameHost`. It does not execute fixed-step target queries, observe team-array construction, compare deterministic targets or bind a deployed frame to a target-query generation.

## Required gates

```txt
source fixture
  -> idle pre-wave query counts
  -> tower query counts
  -> target parity
  -> stale-index rejection

built-artifact fixture
  -> same query and target results from dist

Pages fixture
  -> same query and target results at deployed origin
  -> matching CombatTargetQueryDigest
  -> FirstTargetQueryBoundFrameAck
```

## Failure policy

Do not promote a query optimization solely from static marker checks. Require deterministic target parity and explicit work observations before source, artifact or Pages readiness is claimed.

## Not run

- `npm run check`
- `npm run build`
- Browser query fixture
- Built artifact smoke
- Pages-origin query fixture
- Heap or frame-time profiler

## Boundary

No workflow or deployment file changed.