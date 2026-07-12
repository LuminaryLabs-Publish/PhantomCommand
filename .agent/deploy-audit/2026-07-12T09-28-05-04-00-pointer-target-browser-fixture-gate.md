# Pointer Target Browser Fixture Gate

**Timestamp:** `2026-07-12T09-28-05-04-00`

## Summary

Static token checks cannot prove that background, letterbox and panel misses are inert in the deployed browser surface. The release gate requires deterministic unit fixtures plus real-browser coordinate and action evidence.

## Plan ledger

**Goal:** prevent deployment claims until pointer targeting is proven across viewport shapes, CRT settings and menu states.

- [x] Identify current check and build limits.
- [x] Define deterministic pointer fixtures.
- [x] Define browser viewport matrix.
- [x] Define observable action evidence.
- [x] Preserve Pages deployment as proof-gated.
- [ ] Implement and run the fixtures later.

## Required deterministic fixtures

```txt
background miss
between-row miss
left/right letterbox miss
top/bottom letterbox miss
settings background miss
settings outside miss
disabled Continue target
current target hit
stale surface generation
stale panel generation
stale selection revision
keyboard activation parity
```

## Browser matrix

```txt
16:9 viewport
ultrawide viewport with side letterboxing
tall viewport with top/bottom letterboxing
DPR 1 and DPR 2
CRT enabled and disabled
settings panel open and closed
Continue enabled and disabled
```

## Required evidence

```txt
pointer client coordinates
source projection and inside flag
surface and panel generations
hit status and target identity
route target before and after
settings revision before and after
screenshot or frame receipt
terminal action result
```

## Gate

```txt
npm run check
npm run build
unit pointer fixtures
browser pointer-target smoke
Pages pointer-target smoke
```

No deployment-level pointer correctness claim is allowed until every miss case produces zero action and every current hit executes exactly one intended target.