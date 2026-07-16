# Deploy Audit — Marquee Selection Browser Fixture Gate

**Timestamp:** `2026-07-16T17-40-04-04-00`  
**Status:** `isometric-marquee-selection-geometry-authority-audited`

## Plan ledger

**Goal:** prevent a source, build or Pages release from claiming correct marquee selection without executable geometry and visible-frame proof.

- [x] Inspect current source checks and build flow.
- [x] Identify missing selection fixtures.
- [x] Define source, artifact and deployed-origin gates.
- [ ] Implement and run the gate.

## Current proof

`npm run check` performs static marker assertions for campaign structure, camera target zoom, CRT upload and build inclusion. It does not execute pointer gestures, transforms, unit membership or visible selection rings.

`npm run build` copies static files into `dist/`; the Pages workflow deploys that artifact.

## Required fixture gate

```txt
source browser
  -> load campaign
  -> set deterministic camera and unit positions
  -> perform marquee gestures in every direction
  -> compare projected membership to selected IDs
  -> observe FirstMarqueeSelectionFrameAck

built artifact
  -> repeat identical fixture matrix from dist

Pages origin
  -> repeat representative fixture matrix
  -> compare release artifact and source revision identity
```

## Required cases

```txt
two-corner regression case
four-corner extrema case
reverse drag directions
edge inclusion
empty result
Shift policy
camera change during drag
route retirement during drag
duplicate pointer-up
```

## Release rule

A release may claim marquee-selection correctness only when source, built artifact and deployed origin produce the same terminal results and selected-frame acknowledgements.

## Validation boundary

No check script, browser harness, workflow or deployment configuration was changed.
