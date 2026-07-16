# Latched Drag/Pan Visible-Frame Gap

The renderer draws a selection rectangle whenever `input.drag` remains set. The frame loop applies camera movement during pointer moves whenever `input.middle` remains true. Because outside release and cancellation are not settled, a visible frame can continue representing a gesture whose physical contact already ended.

Required proof: a `PointerGestureResult` and matching `FirstGestureEffectFrameAck` for completion or cancellation.
