# PhantomCommand Project Breakdown

**Timestamp:** `2026-07-11T09-40-19-04-00`

## Summary

This run selected `LuminaryLabs-Publish/PhantomCommand` as the oldest stable eligible Publish repository after skipping active same-window writes on `HorrorCorridor`. The breakdown identified a display/input projection mismatch between CRT rendering and pointer mapping.

## Plan ledger

**Goal:** document the complete product loop, domain/kit inventory and the next safe projection authority boundary without changing runtime behavior.

- [x] List all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Compare nine eligible repositories against central ledger entries.
- [x] Confirm all nine have root `.agent` state.
- [x] Skip active same-window `HorrorCorridor` writes.
- [x] Select only `PhantomCommand`.
- [x] Read menu, campaign, CRT, checks and existing audit state.
- [x] Identify interaction loops, domains, kits and kit services.
- [x] Trace display-to-source and source-to-world projection.
- [x] Add architecture, render, gameplay, interaction, input-projection and deploy audits.
- [x] Refresh required root `.agent` files.
- [x] Push directly to `main`.
- [ ] Runtime implementation and fixtures remain future work.

## Selection inventory

```txt
HorrorCorridor      tracked / root .agent / active same-window writes
AetherVale          tracked / root .agent
TheOpenAbove        tracked / root .agent
TheCavalryOfRome    excluded
PhantomCommand      tracked / root .agent / selected
PrehistoricRush     tracked / root .agent
ZombieOrchard       tracked / root .agent
IntoTheMeadow       tracked / root .agent
MyCozyIsland        tracked / root .agent
TheUnmappedHouse    tracked / root .agent
```

## Product loop

```txt
menu -> Begin/Continue route -> campaign boot -> pointer/keyboard input
-> direct state mutation -> fixed-step simulation -> source-frame render
-> CRT contain/curve presentation -> repeat
```

## Main finding

```txt
render: display UV -> containUv -> curveUv -> source sample
input:  display UV -> contain correction -> source coordinate
```

The input mapper omits the CRT curve used by the display shader. Campaign drag selection also converts only two source-screen rectangle corners into a world AABB, which does not preserve the visual rectangle.

## Output set

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
.agent/turn-ledger/2026-07-11T09-40-19-04-00.md
.agent/architecture-audit/2026-07-11T09-40-19-04-00-display-input-projection-dsk-map.md
.agent/render-audit/2026-07-11T09-40-19-04-00-crt-source-pointer-parity-gap.md
.agent/gameplay-audit/2026-07-11T09-40-19-04-00-pointer-world-action-loop.md
.agent/interaction-audit/2026-07-11T09-40-19-04-00-display-source-world-admission-map.md
.agent/input-projection-audit/2026-07-11T09-40-19-04-00-crt-and-drag-selection-contract.md
.agent/deploy-audit/2026-07-11T09-40-19-04-00-projection-parity-fixture-gate.md
```