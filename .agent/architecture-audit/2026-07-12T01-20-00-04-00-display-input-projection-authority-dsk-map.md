# PhantomCommand Display/Input Projection Authority DSK Map

**Timestamp:** `2026-07-12T01-20-00-04-00`

## Summary

The shared CRT renderer owns two incompatible projection implementations. GLSL maps output pixels through containment and optional curvature; JavaScript maps pointer pixels through containment only. This audit defines one composed domain that owns the projection descriptor, adapters, admission and evidence.

## Plan ledger

**Goal:** replace duplicated implicit math with one versioned projection contract consumed by render and interaction paths.

- [x] Map current owners and adapters.
- [x] Identify missing identities and revisions.
- [x] Define parent domain and child kits.
- [x] Define command/result and frame-correlation boundaries.
- [ ] Implement the domain and fixtures.

## Current ownership

```txt
crt-renderer.js
  GLSL containUv
  GLSL curveUv
  WebGL output sizing
  JS screenToSource contain mapping

graveyard-menu.js
  CRT settings owner
  pointer observations
  menu/panel hit testing

campaign-scene.js
  pointer observations
  source-to-world transforms
  selection, orders, pan and zoom commands
```

## Required parent domain

```txt
phantom-command-display-input-projection-authority-domain
```

## Child domains and kits

### Projection policy

```txt
phantom-command-projection-policy-kit
phantom-command-projection-id-kit
phantom-command-projection-revision-kit
phantom-command-semantic-sample-policy-kit
```

Services:

```txt
declare contain and curvature order
declare curve coefficient and CRT enablement
declare canonical semantic sample under aberration
issue immutable projection identity and revision
```

### Surface observation

```txt
phantom-command-output-surface-observation-kit
phantom-command-source-surface-descriptor-kit
phantom-command-crt-settings-revision-kit
```

Services:

```txt
observe CSS output rect and physical buffer size
record source-canvas size and route identity
record CRT settings revision
reject zero, stale or detached surfaces
```

### Projection adapters

```txt
phantom-command-contain-projection-kit
phantom-command-curve-projection-kit
phantom-command-cpu-projection-adapter-kit
phantom-command-glsl-projection-adapter-kit
```

Services:

```txt
compile CPU mapping from the canonical descriptor
compile GLSL uniforms/functions from the same descriptor
return typed source coordinates or outside status
publish adapter fingerprints for parity checks
```

### Input admission

```txt
phantom-command-pointer-sample-id-kit
phantom-command-pointer-mapping-result-kit
phantom-command-surface-admission-kit
phantom-command-stale-projection-rejection-kit
```

Services:

```txt
identify each pointer sample
bind mapping to route, session and projection revision
reject black, letterbox, pillarbox and detached regions
reject predecessor results after resize/settings changes
```

### Correlation and proof

```txt
phantom-command-projection-command-correlation-kit
phantom-command-projection-frame-receipt-kit
phantom-command-projection-observation-kit
phantom-command-projection-journal-kit
phantom-command-cpu-glsl-parity-fixture-kit
phantom-command-black-border-admission-fixture-kit
phantom-command-menu-campaign-pointer-parity-fixture-kit
phantom-command-browser-pixel-pick-smoke-kit
```

Services:

```txt
correlate semantic command with mapping result
correlate visible frame with projection revision
retain bounded detached observations
prove CPU/GLSL coordinates across representative points
prove black-region rejection
prove menu and campaign visible pick agreement
```

## Dependency order

```txt
surface observation
  -> projection policy and revision
  -> CPU and GLSL adapter compilation
  -> render submission and frame receipt
  -> pointer mapping result
  -> command admission
  -> committed effect and visible-frame correlation
```

## Invariants

```txt
one descriptor controls both adapters
one route has one active projection revision
settings changes invalidate predecessor pointer mappings
outside-visible-source performs zero semantic mutation
campaign wheel, click and drag use admitted mapping results
projection observations contain no mutable runtime owner
```

## Boundary

This is an architecture specification. No source implementation or executable proof was added.