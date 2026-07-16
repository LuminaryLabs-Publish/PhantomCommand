# Known Gaps

## Current priority

- No pointer capture is acquired for selection drag or middle-button camera pan.
- Canvas-local `pointerup` is the only ordinary completion path.
- No `pointercancel` or `lostpointercapture` observer exists.
- No pointer-id or gesture-generation ownership exists.
- Pointer exit and outside release have no typed settlement.
- Blur clears state but publishes no cancellation or retirement result.
- No stale-event rejection exists after interruption or route transition.
- No first matching gesture-effect frame acknowledgement exists.
- No executable browser fixture proves outside-release or cancellation behavior.

## Retained gaps

Prior audits remain authoritative for pointer feedback, menu audio lifecycle, public diagnostic capability, device coverage, render order, pause admission, terminal settlement, startup readiness, settings adoption, victory persistence, route retirement, fixed-step scheduling, WebGL recovery, accessibility and combat modifiers.
