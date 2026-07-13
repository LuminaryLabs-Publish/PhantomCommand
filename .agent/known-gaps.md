# PhantomCommand Known Gaps

**Timestamp:** `2026-07-13T11-41-10-04-00`

## Summary

The leading temporal gap is Fixed-Step Frame Scheduler Authority. The campaign bounds work by clamping RAF elapsed time to 50 ms and draining 60 Hz updates, but it does not identify scheduler generations, report dropped time or step counts, interpolate presentation state, own visibility transitions or prove which temporal frame became visible.

## Plan ledger

**Goal:** close temporal admission, deterministic drain, interpolation, visibility, diagnostics and proof gaps without moving gameplay or rendering semantics into the scheduler.

- [x] Record the current dt clamp and accumulator loop.
- [x] Record camera/simulation/CRT clock separation.
- [x] Record high-refresh and hitch presentation gaps.
- [x] Record missing visibility generations and public receipts.
- [x] Preserve prior authority gaps.
- [ ] Implement in dependency order.

## Scheduler identity gaps

```txt
scheduler ID
scheduler generation
route/session binding
scheduler lifecycle state
stale RAF rejection
restart and route-exit retirement
terminal scheduler result
```

## Wall-time gaps

```txt
wall-time sample ID
elapsed duration
admitted duration
dropped duration
clamp policy revision
debt retention/drop policy
first-frame elapsed policy
first-resume elapsed policy
```

## Fixed-step drain gaps

```txt
explicit step budget
step command ID
steps executed
accumulator before/after
previous/current simulation revision
budget-exhausted result
pause and terminal drain result
deterministic replay receipt
```

## Presentation gaps

```txt
previous/current immutable state pair
camera frame revision
interpolation alpha
presentation frame ID
presentation fingerprint
shared Canvas2D/CRT frame identity
partial-frame classification
first matching visible-frame acknowledgement
```

## Visibility and lifecycle gaps

```txt
visibility transition owner
hidden/suspended state
resume generation
stale callback rejection after resume
first-resume discontinuity marker
page exit scheduler retirement
bounded fatal scheduler result
```

## Concrete current risks

```txt
wall time above 50 ms disappears without evidence
camera can advance on a different temporal path than gameplay
high-refresh displays repeat a pose then expose full-step jumps
multiple fixed steps can collapse into one visible update
CRT effects use a second untracked performance.now sample
background/resume behavior cannot be replayed or diagnosed
GameHost cannot explain cadence or visible temporal provenance
```

## Test gaps

```txt
60 Hz exact cadence
90 Hz cadence
120 Hz cadence
144 Hz cadence
zero-step interpolation
multi-step interpolation
50 ms clamp boundary
250 ms hitch and dropped-time result
pause behavior
visibility hidden/resumed behavior
restart generation retirement
Canvas2D/CRT frame fingerprint parity
first visible-frame acknowledgement
source/build/Pages parity
```

## Retained authority gaps

```txt
WebGL Context Lifecycle and Recovery Authority
Accessible Command and Focus Projection Authority
Combat Modifier Application Authority
Runtime Session Resource Lifecycle Authority
Campaign Bootstrap and Continue Resume Authority
Campaign Keyboard Command Admission Authority
Campaign Action Result Authority
Campaign Spatial Input Admission Authority
Menu Pointer-Hit Admission Authority
Public Host Owner Quarantine and Typed Command Admission
CRT Display/Input Projection Authority
Campaign Phase Admission Authority
Public Host Committed Read Model
Combat Resolution and Entity Liveness Authority
Exclusive Terminal Outcome Transaction
Menu Audio Activation and Lifecycle Authority
complete campaign replay
source/build/Pages production proof
```

## Completion boundary

A bounded accumulator is not scheduler proof. Completion requires identified wall-time and scheduler generations, explicit dropped-time and step-drain results, immutable interpolated presentation frames, visibility transition handling, matching Canvas2D/CRT results and deployed visible-frame evidence.