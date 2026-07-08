# PhantomCommand Construct Render Audit

**Timestamp:** `2026-07-08T02:50:33-04:00`

## Current render surface

`game.html` currently owns the full render surface inline.

```txt
game.html
├─ imports Three.js from CDN
├─ creates WebGLRenderer with antialias and logarithmicDepthBuffer
├─ sets device pixel ratio and renderer size
├─ creates Scene background and Fog
├─ creates PerspectiveCamera
├─ creates AmbientLight and DirectionalLights
├─ creates stone material palette
├─ creates wedge geometries for ring pieces
├─ creates seam line meshes
├─ creates center disc
├─ creates Grim Reaper Totem
├─ creates Phantom Commander figure
├─ animates construct pieces
├─ orbits camera
├─ pans camera from keyboard input
├─ zooms camera from wheel input
├─ mutates HUD DOM
└─ renders every frame
```

## Current visual strengths

```txt
- The construct visual has a clear center-out ritual identity.
- The zero-gap ring policy supports a solid command-platform look.
- The inner-first timing rule is now clear enough to preserve.
- The ring pieces, center disc, totem, commander, fog, and camera orbit give the prototype a readable opening ritual.
- The HUD exposes enough state to debug constructed count, phase, and progress.
```

## Current visual risks

```txt
- Source math and render math are fused.
- Geometry generation is not descriptor-driven.
- Material selection is inline and not inspectable as a render plan.
- HUD updates are coupled to construct state mutation.
- Camera state is coupled to runtime input and render loop.
- The render host is not consuming a reusable construct render descriptor.
- The next RTS surface cannot safely reuse this visual system without extracting descriptors first.
```

## Render handoff target

```txt
construct-source-profile
  -> ring descriptors
  -> piece descriptors
  -> construct render descriptors
  -> view adapter creates wedge meshes
  -> view adapter animates from descriptor progress
  -> HUD adapter projects construct snapshot
  -> GameHost diagnostics reports source fingerprint and render snapshot
```

## Do not change in the next pass

```txt
- Do not change the public route shape.
- Do not change the sequential-ring-v5 visual output.
- Do not remove the existing HUD.
- Do not remove skip/restart/zoom/pan controls.
- Do not remove window.GameHost compatibility.
```

## Render conclusion

The renderer is good enough to keep as the initial visual host.

The next meaningful render improvement is not a style pass. It is a handoff pass: make `game.html` consume source-owned descriptors so later render upgrades can happen without re-breaking timing, ring gaps, total pieces, or GameHost state.
