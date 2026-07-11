# Projection Parity Fixture Gate

**Timestamp:** `2026-07-11T09-40-19-04-00`

## Summary

Current checks assert source patterns but do not execute display-to-source math, browser pointer behavior or visual selection parity. Projection authority should be deployment-gated before action authority relies on pointer-derived coordinates.

## Plan ledger

**Goal:** prevent releases where CRT presentation and interaction geometry disagree.

- [x] Inventory existing package checks.
- [x] Identify missing Node and browser proof.
- [x] Define the minimum deployment gate.
- [ ] Implement scripts and wire them into `npm run check`.

## Existing gate

```txt
npm run check
  -> check-menu.mjs
  -> check-campaign.mjs

npm run build
  -> build-static.mjs
```

The checks confirm text patterns such as `curveUv`, `screenToSource`, canvas sizes and campaign declarations. They do not call projection functions.

## Required Node fixtures

```txt
fixture:crt-projection-parity
fixture:pointer-roundtrip
fixture:pointer-boundaries
fixture:wheel-anchor
fixture:drag-selection
```

## Required browser smoke

```txt
smoke:pointer-browser
  -> load menu and campaign
  -> test CRT on/off
  -> test wide and tall viewports
  -> click known visual anchors
  -> verify source/world projection results
  -> verify drag membership and wheel anchor
```

## Deployment admission

```txt
static source checks pass
projection unit fixtures pass
CPU/GLSL parity samples pass
browser pointer smoke passes
static build succeeds
Pages artifact contains projection modules and tests expected by the workflow
```

## Failure policy

Any mismatch beyond tolerance, stale revision acceptance, visually incorrect drag membership or missing browser observation must fail the validation gate. Do not downgrade these failures to warnings because pointer-derived gameplay commands depend on this boundary.