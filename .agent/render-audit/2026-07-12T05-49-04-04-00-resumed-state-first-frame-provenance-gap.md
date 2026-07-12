# Render Audit: Resumed State First-Frame Provenance Gap

**Timestamp:** `2026-07-12T05-49-04-04-00`

## Current flow

```txt
campaign module evaluates
  -> creates default state
  -> creates six default units
  -> starts RAF
  -> update fixed steps
  -> draw world, HUD, minimap and overlays
  -> CRT render
```

There is no resume preparation stage before rendering. The first campaign frame cannot cite:

```txt
launch intent
save key or scope
save schema version
migration result
bootstrap ID
campaign generation
hydrated state revision
hydrated state fingerprint
```

## Visible consequence

Begin and Continue show the same default frame because the campaign ignores the route and storage. A future hydration patch could still produce a mixed frame if state is mutated after RAF starts or if world, HUD and minimap consume different revisions.

## Required frame plan

```txt
CampaignFramePlan
  frameId
  bootstrapId
  campaignGeneration
  stateRevision
  stateFingerprint
  cameraRevision
  worldProjectionRevision
  hudProjectionRevision
  minimapProjectionRevision
  terminalProjectionRevision
```

## Required ordering

```txt
validate and prepare candidate
  -> commit campaign generation
  -> build immutable first CampaignFramePlan
  -> draw world
  -> draw HUD
  -> draw minimap
  -> draw overlay
  -> CRT present
  -> collect consumer acknowledgements
  -> publish FirstResumedFrameResult
```

## Required proof

```txt
world, HUD and minimap cite one state revision
first Continue frame differs from clean Begin when save content differs
no default-state frame appears before resumed-state commit
invalid saves never reach rendering
bootstrap and frame fingerprints remain correlated
```

A rendered frame is not resume proof unless it cites the committed bootstrap generation and state fingerprint.