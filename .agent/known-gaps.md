# Known Gaps

**Generated:** `2026-07-18T10-38-06-04-00`  
**Status:** `campaign-target-query-work-budget-authority-audited`

## Current priority

Combat target queries rebuild enemy and ally arrays inside the fixed-step path. Team membership, target-query work and the visible combat frame are not governed by one accepted generation.

## Confirmed by inspection

```txt
enemies() uses Object.values(state.units): present
enemies() filters into a second array: present
allies() uses Object.values(state.units): present
allies() filters into a second array: present
untargeted player query per unit: present
untargeted enemy query per unit: present
tower enemy query per accepted tick: present
splash enemy query at impact: present
shared team index: absent
```

## Source-visible construction floor

```txt
initial players: 6
initial enemies: 0
pre-wave enemies() calls per accepted tick: 6
source-visible arrays per call: 2
source-visible arrays per accepted idle tick: 12
conditional arrays at 60 accepted ticks: 720 / second
additional arrays per tower per accepted tick: 2
```

## Authority gaps

```txt
CampaignCombatGenerationResult: absent
CombatTeamIndexResult: absent
TargetQueryResult: absent
TargetQueryBudgetResult: absent
stale team-index rejection: absent
query work observations: absent
CombatTargetQueryDigest: absent
FirstTargetQueryBoundFrameAck: absent
```

## Validation gaps

```txt
idle query observation fixture: absent
tower-count query fixture: absent
deterministic target parity fixture: absent
equal-distance tie fixture: absent
target-death retarget fixture: absent
splash candidate fixture: absent
built artifact parity: not run
Pages parity: not run
heap and frame-time observations: not run
```

## Retained gap

The prior menu pointer-target finding remains unresolved: pointer hit-test misses can still activate retained menu or settings selections. This pass does not replace or close that authority.

## Risk boundary

No user-visible slowdown, GC pause, dropped frame or targeting error was reproduced. The confirmed gap is repeated source-owned query construction without a shared generation, budget settlement or matching frame proof.

## Claim boundary

Do not claim performance improvement, memory reduction, deterministic parity, artifact parity, Pages parity or production readiness until executable fixtures pass.