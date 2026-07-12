# PhantomCommand Agent Start

**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Last aligned:** `2026-07-12T01-20-00-04-00`

## Summary

PhantomCommand displays both menu and campaign source canvases through a shared CRT WebGL renderer. The visible shader applies aspect containment and then radial curvature, but CPU pointer mapping applies containment only. The menu therefore has settings-dependent display/input drift, while campaign selection, drag selection, orders, pan and zoom can target coordinates different from the displayed pixels. Campaign handlers also ignore the mapper's `inside` result, allowing black border regions to issue commands.

## Plan ledger

**Goal:** establish one settings-aware, versioned projection authority shared by GLSL presentation and CPU interaction.

- [x] Compare the complete Publish inventory with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have ledger and root `.agent` coverage.
- [x] Select only `PhantomCommand` as the oldest eligible repository.
- [x] Trace shader containment/curvature and CPU pointer mapping.
- [x] Trace menu and campaign projection consumers.
- [x] Identify interaction loops, domains, implemented kits and services.
- [x] Add the display/input projection authority audit set.
- [x] Preserve Continue, host, phase, clock, combat, terminal, lifecycle and checkpoint dependencies.
- [ ] Implement CPU/GLSL parity, outside-region admission and visible-frame fixtures.

## Current implementation queue

```txt
1. Continue Capability and Checkpoint Admission Authority
   + Save Candidate Precedence, Legacy Summary and First Resumed Frame Fixtures

2. Campaign Action Result Authority
   2a. Public Host Owner Quarantine and Command Admission
   2b. CRT Display/Input Projection Authority
   2c. Campaign Phase Admission Authority
   2d. Fixed-Step Command Scheduling, Replay and Committed Frame Authority
   2e. Public Host Committed Read Model and Frame Provenance
   2f. Combat Resolution and Entity Liveness Authority
   2g. Exclusive Terminal Outcome Transaction

3. Runtime Session Lifecycle Authority
   + Menu/Campaign Teardown, bfcache and Restart Leak Fixtures

4. Versioned Campaign Checkpoint Capture Authority
   + Stable Boundary Capture, Atomic Resume and Migration Fixtures
```

## Current interaction loop

```txt
menu startup
  -> create 480x270 source canvas and shared CRT renderer
  -> load CRT settings
  -> attach pointer, keyboard and hidden-button interaction
  -> render source through contain + optional curve

menu pointer
  -> client coordinate
  -> contain-only screenToSource
  -> menu/panel hit and activation

campaign startup
  -> create 640x360 source canvas and shared CRT renderer
  -> create campaign state, camera, input and fixed-step RAF
  -> render source through contain + always-enabled curve

campaign pointer
  -> client coordinate
  -> contain-only screenToSource
  -> inside flag ignored
  -> screenToWorld
  -> select, drag-select, order, pan or zoom
```

## Latest finding

```txt
visible mapping:
  output UV -> contain -> CRT curve -> source texel

semantic mapping:
  client coordinate -> contain only -> source coordinate
```

Consequences:

```txt
menu click target can drift from the visible item
CRT toggle changes display geometry without changing input geometry
campaign click/drag/order target can drift from the visible world point
wheel zoom can preserve the wrong source point
post-curve black and letterbox/pillarbox regions can still issue campaign commands
```

## Latest composed domain

```txt
phantom-command-display-input-projection-authority-domain
  -> projection policy, identity and revision
  -> output/source surface observations
  -> settings revision
  -> contain and curve adapters
  -> canonical semantic sample policy
  -> pointer sample and mapping result
  -> visible-surface admission
  -> stale-result rejection
  -> command and frame correlation
  -> observations, journal and parity fixtures
```

## Read first

```txt
.agent/trackers/2026-07-12T01-20-00-04-00/project-breakdown.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/turn-ledger/2026-07-12T01-20-00-04-00.md
.agent/architecture-audit/2026-07-12T01-20-00-04-00-display-input-projection-authority-dsk-map.md
.agent/render-audit/2026-07-12T01-20-00-04-00-crt-visible-semantic-coordinate-gap.md
.agent/gameplay-audit/2026-07-12T01-20-00-04-00-curved-display-command-target-loop.md
.agent/interaction-audit/2026-07-12T01-20-00-04-00-pointer-projection-command-admission-map.md
.agent/projection-authority-audit/2026-07-12T01-20-00-04-00-cpu-glsl-projection-parity-contract.md
.agent/deploy-audit/2026-07-12T01-20-00-04-00-projection-parity-fixture-gate.md
```

## Guardrails

```txt
Push only to main.
Create no branches or pull requests.
Do not work on TheCavalryOfRome.
Do not duplicate projection constants across CPU and GLSL paths.
Do not admit campaign commands from outside the visible source.
Do not call pointer targeting correct until CPU/GLSL and browser fixtures pass.
Do not call a projection result frame-coherent without a visible-frame receipt.
```