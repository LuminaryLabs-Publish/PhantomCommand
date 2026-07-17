# Interaction Audit — Camera Intent to Boundary Result Map

**Timestamp:** `2026-07-17T11-39-49-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`

## Current command paths

```txt
keyboard pan
  keydown/keyup -> held key set -> frame velocity -> camera x/z -> square clamp

middle pan
  pointermove while middle -> source delta -> camera x/z -> later square clamp

wheel zoom
  wheel -> source anchor before/after -> targetZoom and camera x/z -> later square clamp

focus
  F -> selected-unit centroid or origin -> camera x/z and targetZoom -> later square clamp

public host
  window.GameHost.camera -> direct mutable reference -> later square clamp
```

Each path reaches the same camera state through a different mutation surface. None publishes an admitted target, boundary correction, rejection reason, coverage digest or matching frame acknowledgement.

## Required command/result map

```txt
CameraCoverageManifestCommand
  input:
    route generation
    arena generation
    source viewport generation
    projection generation
    zoom generation
    policy revision
  output:
    CameraCoverageManifestResult

CameraTargetAdmissionCommand
  input:
    intent type
    requested center/zoom/anchor
    input generation
    camera generation
    manifest revision
  output:
    CameraTargetAdmissionResult

CameraBoundarySettlementCommand
  input:
    admitted target
    visible world footprint
    policy
  output:
    CameraCoverageResult
      accepted center
      accepted zoom
      correction vector
      preserved anchor status
      coverage metrics
      reason
      camera generation

CameraProjectionCommitCommand
  input:
    accepted camera generation
  output:
    CameraProjectionCommitResult
    FirstCameraBoundsFrameAck
```

## Settlement rules

- Reject stale route, viewport, projection, zoom and camera generations.
- Normalize all camera producers through one admission surface.
- Apply the same final envelope to keyboard, middle-pan, wheel, focus and public-host intents.
- Preserve wheel or grabbed-world anchors only when compatible with the accepted coverage policy.
- Publish explicit correction rather than silently changing the requested target.
- Commit exactly one camera generation to a rendered frame.

## Observability

A useful diagnostic snapshot should expose:

```txt
camera generation
requested center and zoom
accepted center and zoom
boundary correction
arena radius and overscan
source footprint corners
coverage policy and metrics
first matching frame id
```

## Boundary

No input handler, camera state, public host surface or render behavior changed.