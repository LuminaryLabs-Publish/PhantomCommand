# Pointer Gesture Command/Result Map

| Evidence | Required command | Result |
|---|---|---|
| primary `pointerdown` | `PointerGestureAdmissionCommand(selection-drag)` | accepted/rejected/unsupported |
| middle `pointerdown` | `PointerGestureAdmissionCommand(camera-pan)` | accepted/rejected/unsupported |
| matching move | `PointerGestureEvidenceCommand(move)` | updated/stale/outside |
| matching `pointerup` | `PointerGestureSettlementCommand(complete)` | completed/duplicate/stale |
| `pointercancel` | `PointerGestureSettlementCommand(cancel)` | cancelled/stale |
| `lostpointercapture` | `PointerGestureSettlementCommand(interrupted)` | interrupted/stale |
| blur/hide/route exit | `PointerGestureSettlementCommand(retire)` | retired/already-retired |

Only accepted results may mutate selection or camera state.
