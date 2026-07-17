# Oldest Selection / Input Region Reconciliation

**Timestamp:** `2026-07-17T06-38-14-04-00`

## Selection

```txt
Publish repositories: 11
eligible after Cavalry exclusion: 10
central ledgers: 10
root .agent states: 10
new or missing ledger: 0
missing root .agent: 0
undocumented: 0
runtime-ahead: 0
selected: LuminaryLabs-Publish/PhantomCommand
reason: oldest synchronized eligible central timestamp
previous timestamp: 2026-07-16T23-59-01-04-00
reviewed pre-audit head: c36fdc0cb2b9a23e002b4b949efe30f913f3b541
reviewed runtime source: e92f61c79ed20998fdb4edfb962cac3754d3a651
excluded: LuminaryLabs-Publish/TheCavalryOfRome
```

## Reconciled finding

The campaign presents world, HUD, controls, minimap and modal overlays in one source canvas. Pointer handlers preserve the CRT source mapping result but do not enforce its `inside` flag or classify the topmost visible region before issuing selection, marquee and order commands.

## Repo-local output

```txt
.agent/trackers/2026-07-17T06-38-14-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-17T06-38-14-04-00.md
.agent/architecture-audit/2026-07-17T06-38-14-04-00-campaign-input-region-arbitration-dsk-map.md
.agent/render-audit/2026-07-17T06-38-14-04-00-visible-ui-world-command-occlusion-gap.md
.agent/gameplay-audit/2026-07-17T06-38-14-04-00-visible-region-world-command-loop.md
.agent/interaction-audit/2026-07-17T06-38-14-04-00-input-region-command-result-map.md
.agent/input-region-audit/2026-07-17T06-38-14-04-00-source-region-occlusion-contract.md
.agent/deploy-audit/2026-07-17T06-38-14-04-00-input-region-browser-fixture-gate.md
```

## Central update required

```txt
repo-ledger/LuminaryLabs-Publish/PhantomCommand.md
internal-change-log/2026-07-17T06-38-14-04-00-phantom-command-campaign-input-region-arbitration.md
```

## Boundary

Documentation only. No runtime input-region arbitration, command suppression, browser fixture, artifact parity, Pages parity or production readiness is claimed.