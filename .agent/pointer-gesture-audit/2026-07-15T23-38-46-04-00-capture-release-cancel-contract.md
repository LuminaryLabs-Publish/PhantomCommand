# Pointer Capture, Release and Cancel Contract

## Invariants

- One active gesture owns one pointer id and generation.
- Capture is requested after accepted pointerdown when supported.
- Completion or cancellation settles exactly once.
- Release, cancel, lost capture, blur, hide and route exit all retire the generation.
- Retired generations cannot mutate selection, camera or visible feedback.
- Pointer capture is released exactly once when still owned.
- The first frame after settlement cites the resulting gesture revision.

## Unsupported capture

Unsupported capture must be explicit. The fallback must install document-level release/cancel evidence or reject the gesture; silent canvas-local ownership is not sufficient.
