# Browser Route Startup Readiness DSK Map

**Timestamp:** `2026-07-14T07-58-22-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`

## Summary

The menu and campaign currently compose startup through top-level side effects rather than an admitted domain transaction. This map separates prerequisite probes, candidate preparation, publication, failure projection and first-frame evidence.

## Plan ledger

**Goal:** define a semantic DSK/domain boundary that can own route startup without restructuring the product runtime wholesale.

- [x] Preserve the existing 20-kit product surface.
- [x] Separate startup preparation from startup publication.
- [x] Define route, attempt, capability, resource and frame identities.
- [x] Define failure, rollback, fallback and retry results.
- [x] Keep menu and campaign content behind the same neutral parent authority.
- [ ] Implement the authority and adapters later.

## Current composition

```txt
HTML route
  -> ES module evaluation
  -> DOM query
  -> Canvas2D source creation
  -> CRT WebGL creation
  -> product state creation
  -> listener installation
  -> public host publication
  -> RAF publication
```

There is no stable boundary between preparation and adoption.

## Parent domain

```txt
phantom-command-browser-route-startup-readiness-failure-authority-domain
```

## Domain responsibilities

```txt
Route Startup Identity
  route ID
  startup attempt ID
  source/build revision
  predecessor/superseded attempt relation

Capability Admission
  DOM root
  Canvas2D context
  WebGL context
  shader compile/link
  texture upload and draw probe
  optional audio capability

Candidate Preparation
  source canvas
  CRT program, buffer and texture
  menu art or campaign state
  listener leases
  public host facade
  frame lease

Atomic Adoption
  one accepted resource manifest
  one listener generation
  one host generation
  one frame generation

Failure and Recovery
  typed failed phase
  candidate retirement receipts
  DOM fallback projection
  retry command
  route escape

Evidence
  RouteStartupResult
  FirstSourceFrameAck
  FirstRouteFrameAck
  source/build/Pages parity result
```

## Coordinating kits

| Kit | Service |
|---|---|
| `route-startup-attempt-kit` | Stable route and attempt identity |
| `route-startup-phase-kit` | Ordered phase state and terminal phase |
| `startup-capability-probe-kit` | Capability probe orchestration |
| `dom-root-admission-kit` | Required root lookup and validation |
| `source-canvas-admission-kit` | Source canvas dimensions and ownership |
| `canvas2d-context-probe-kit` | Canvas2D availability and probe result |
| `webgl-context-probe-kit` | WebGL options, availability and generation |
| `shader-compile-result-kit` | Per-shader compile evidence |
| `shader-link-result-kit` | Program link evidence |
| `crt-resource-preparation-kit` | Program, buffer, texture and uniform candidates |
| `menu-art-preparation-kit` | Graveyard art candidate |
| `campaign-state-preparation-kit` | Rings, pads, units, waves and state candidate |
| `listener-lease-preparation-kit` | Prepared but unpublished input leases |
| `audio-capability-classification-kit` | Optional menu audio capability result |
| `startup-candidate-resource-manifest-kit` | Complete candidate ownership manifest |
| `startup-atomic-adoption-kit` | All-or-nothing publication |
| `startup-rollback-kit` | Candidate disposal and predecessor preservation |
| `route-startup-result-kit` | Typed accepted, degraded or failed result |
| `startup-failure-projection-kit` | Parser/DOM-owned visible fallback |
| `startup-retry-command-kit` | Explicit retry with a new attempt ID |
| `startup-attempt-supersession-kit` | Stale completion rejection |
| `public-host-publication-kit` | `PhantomMenu` or `GameHost` publication after adoption |
| `first-route-frame-ack-kit` | First frame tied to accepted attempt/resource revisions |
| `source-build-pages-startup-fixture-kit` | Environment parity and fault injection |

## Adapter boundaries

```txt
existing createCrtRenderer
  -> becomes a candidate-preparation adapter

existing graveyard menu module
  -> becomes the menu participant

existing campaign scene module
  -> becomes the campaign participant

existing HTML routes
  -> own fallback container and retry/escape controls

existing checks/build
  -> remain tooling adapters, not startup proof
```

## Required dependency order

```txt
identity
  -> capability probes
  -> candidate preparation
  -> probe source and CRT frame
  -> atomic adoption
  -> host and frame publication
  -> first-frame acknowledgement

failure at any step
  -> rollback
  -> failure result
  -> fallback projection
  -> optional retry
```

## Validation boundary

Documentation only. No DSK, domain, source or test implementation was added.