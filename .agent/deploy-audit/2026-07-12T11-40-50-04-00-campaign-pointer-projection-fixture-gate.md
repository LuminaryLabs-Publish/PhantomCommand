# Deploy Audit: Campaign Pointer Projection Fixture Gate

**Timestamp:** `2026-07-12T11-40-50-04-00`

## Summary

Current checks confirm source tokens and static-copy behavior. They do not prove that campaign pointer coordinates match visible CRT pixels, that letterbox gestures are inert, or that pointer results correlate with committed state and frames.

## Plan ledger

**Goal:** block deployment-level pointer correctness claims until deterministic and real-browser campaign projection fixtures pass.

- [x] Inspect current campaign static check.
- [x] Identify missing projection and command evidence.
- [x] Define deterministic fixture set.
- [x] Define browser and Pages matrices.
- [ ] Implement and execute the gate.

## Deterministic fixtures

```txt
contain projection at 16:9
contain projection at ultrawide
contain projection at tall viewport
left/right letterbox no-op
top/bottom letterbox no-op
CRT curve/inverse-curve round-trip
source-to-world camera revision
right-click order admission
point selection admission
rectangle drag lease and boundary policy
middle-pan admission
wheel-anchor admission
stale display generation
stale camera revision
command-to-frame receipt
```

## Browser matrix

```txt
viewport: 16:9, ultrawide, tall, narrow mobile
DPR: 1 and 2
CRT: enabled and disabled
curve: current coefficient and zero
interaction: select, box select, order, pan and wheel zoom
surface region: center, curved edge and each letterbox margin
host: local static server and deployed GitHub Pages
```

## Required report

```txt
browser/version
URL and deployment commit
display generation
source and output sizes
CRT settings revision
camera revision
pointer event and gesture IDs
client/source/world coordinates
projection status
command result
state/camera revisions
first correlated frame ID
screenshot path, size and digest
fatal/error observations
```

## Gate

```txt
npm run check
npm run build
deterministic projection fixtures
browser campaign-pointer smoke
Pages campaign-pointer smoke
```

## Execution status

```txt
npm run check: not run
npm run build: not run
browser smoke: not run
Pages smoke: not run
campaign-pointer fixtures: unavailable
runtime source changed: no
deployment source changed: no
```

No deployment-readiness claim is made.