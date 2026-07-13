# PhantomCommand Known Gaps

**Timestamp:** `2026-07-12T19-58-07-04-00`

## Summary

The leading documented campaign-input gap is Campaign Spatial Input Admission Authority. Pointer evidence is not bound to a current surface, pointer identity or visible transform, and rectangle selection does not match the visible marquee.

## Plan ledger

**Goal:** close containment, pointer ownership, visible/logical transform, polygon membership, revision admission, terminal-result and frame-proof gaps while preserving existing action, lifecycle, replay and persistence queues.

- [x] Record outside-source mutation reachability.
- [x] Record CRT visible/input transform divergence.
- [x] Record pointer identity and cancellation gaps.
- [x] Record the two-corner rectangle-selection defect.
- [x] Record revision, result, observation and fixture gaps.
- [x] Preserve previous authority queues.
- [ ] Implement in dependency order.

## Surface and focus gaps

```txt
campaign input surface ID
surface generation
focus generation
surface retirement
current canvas capability
outside-source terminal rejection
```

## Pointer lifecycle gaps

```txt
pointer sample ID
pointer sequence
primary pointer policy
supported button policy
pointer identity binding
pointer capture
lost-pointer-capture handling
pointer cancellation
exactly-once gesture terminal result
```

## Projection gaps

```txt
viewport transform revision
CRT transform revision
inverse visible CRT curve
source containment result
source point result
camera revision
source-to-world projection result
stale transform/camera rejection
```

## Selection and order gaps

```txt
selection gesture ID
complete source rectangle or world polygon
source-space entity membership
entity-set revision
selection revision
point hit result
selected-pad hit result
order target admission result
zero-mutation miss proof
```

## Concrete current risks

```txt
letterboxed or pillarboxed pointer positions can select, order, pan or zoom
visible CRT-distorted point can resolve to another logical world point
one pointer can move or terminate another pointer's gesture
pointer cancellation can leave implicit state without a terminal result
40 x 20 drag can collapse tested world-z width to approximately zero
visibly enclosed units can be omitted from selection
point/order results can be applied after camera, entity or selection changes
second pad click can build without spatial/action correlation
```

## Result and render gaps

```txt
CampaignSpatialInputCommand
CampaignSpatialInputResult
typed rejection reasons
bounded spatial-input observation
bounded spatial-input journal
CampaignActionResult correlation
first visible spatial-result frame acknowledgement
stale result/frame rejection
```

## Test gaps

```txt
outside-source zero mutation
CRT on/off projection parity
aspect-ratio containment matrix
pointer identity mismatch
pointercancel and lost capture
point selection hit/miss
additive selection
four drag directions
cancellation-ratio rectangle rows
camera and zoom revisions
entity and selection revisions
order target hit/miss/stale
pan and wheel anchor
source/build/Pages parity
first visible frame correlation
```

## Retained campaign gaps

```txt
Campaign Action Result Authority
Menu Pointer-Hit Admission Authority
Public Host Owner Quarantine and Typed Command Admission
CRT Display/Input Projection Authority
Campaign Phase Admission Authority
Fixed-Step Command Scheduling Replay and Committed Frame Authority
Public Host Committed Read Model
Combat Resolution and Entity Liveness Authority
Exclusive Terminal Outcome Transaction
Versioned Full Campaign Checkpoint Capture Authority
Campaign Bootstrap and Continue Resume Authority
```

## Retained lifecycle/product gaps

```txt
Runtime Session Resource Lifecycle Authority
Menu Audio Activation and Lifecycle Authority
WebGL context loss/restore and disposal
save schema, migration and atomic hydration
complete campaign replay and restored-frame proof
```

## Completion boundary

Do not count an `inside` field, a visible drag rectangle, a changed selection or an order effect as spatial-input proof. Completion requires current surface and pointer identity, visible/logical transform parity, correct selection membership, one terminal spatial result, zero mutation for rejection and a first-visible-frame acknowledgement.
