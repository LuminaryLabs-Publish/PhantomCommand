# Gameplay Audit — Camera Coverage Loop

**Timestamp:** `2026-07-17T11-39-49-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`

## Intent

Make camera reachability and arena visibility an explicit gameplay policy rather than an incidental consequence of two scalar clamps.

## Current loop

```txt
player camera input
  -> keyboard velocity, middle drag, wheel anchor or focus command
  -> camera x/z/targetZoom mutation
  -> frame clamps x and z independently to +/-147
  -> fixed-step gameplay continues
  -> world and UI render from the settled camera
  -> no coverage result is exposed to gameplay or diagnostics
```

## Gameplay ownership questions currently unanswered

```txt
may the camera center leave the circular arena: unspecified
must the sanctum remain visible: unspecified
must selected units remain visible after focus: unspecified
minimum playable-ring coverage: unspecified
allowed aesthetic overscan: unspecified
zoom-dependent edge padding: unspecified
boundary response: unspecified
anchor preservation vs coverage priority: unspecified
```

## Player-facing risk

At a square-clamp corner the camera center is approximately `207.89` units from the arena origin even though the outer playable ring radius is `147`. Depending on zoom, the player can intentionally or accidentally place the main tactical construct far from the source frame's focal area. The game still simulates correctly, but route reading, unit selection and wave awareness can become harder without an explicit policy.

No production playability failure was reproduced. This is a policy and proof gap.

## Required gameplay flow

```txt
camera intent
  -> CameraTargetAdmissionResult
  -> accepted coverage policy
  -> CameraCoverageResult
  -> camera projection commit
  -> FirstCameraBoundsFrameAck
  -> gameplay/HUD diagnostics may report boundary settlement
```

## Preserve

- Existing arena layout and wave rules.
- Existing keyboard, middle-pan, wheel and focus controls.
- Existing zoom range unless separately revised.
- Existing selection, order and construction semantics.
- Fixed-step simulation ownership.
- Existing Canvas2D and CRT appearance outside explicit boundary settlement.

## Future fixture scenarios

- Hold keyboard pan toward every diagonal at minimum, default and maximum zoom.
- Middle-drag through every arena quadrant.
- Wheel zoom at each source corner and near the sanctum.
- Focus selected units near each ring edge.
- Apply public host camera mutation outside the accepted envelope.
- Verify deterministic settlement and one matching frame acknowledgement.

## Boundary

Documentation only. No camera or gameplay behavior changed.