# Economy and Progression

## Status

Initial economy and progression model for Phantom Command.

## Core rule

Do not hardcode rewards inside combat, buildings, or units.

Use separate domains:

```txt
World Economy Kit = generic resources, costs, income, ledgers
Soul Economy Kit = undead soul upkeep, decay, harvest meaning
Experience Progression Kit = XP, rank, mastery, reward claims
Unlock Registry Kit = access to buildings, units, upgrades, rituals
```

## Starting resources

Use only a small starting set:

| Resource | Purpose |
|---|---|
| Souls | production, upkeep, rituals, undead stability |
| Bone | buildings, undead bodies, upgrades |
| Command | army cap and control capacity |
| XP | rank and progression; not a normal spendable resource at first |

## World Economy Kit

`world-economy-domain-kit` is the broad reusable economy layer.

It owns:

- resource catalog,
- current balances,
- maximum caps,
- income streams,
- payment validation,
- transaction ledgers,
- resource grant requests,
- resource spend requests.

It answers:

```txt
Can the player afford this?
Was this transaction already applied?
What income streams exist?
What resources are capped?
```

## Soul Economy Kit

`soul-economy-domain-kit` composes the world economy kit and adds Phantom Command-specific undead rules.

It owns:

- soul upkeep,
- soul decay,
- loose soul residue,
- soul harvesting from battlefield death,
- soul stability modifiers,
- soul crisis state.

Souls are not just money.

They are also the fuel keeping the army animated.

## Experience Progression Kit

`experience-progression-domain-kit` owns:

- faction XP,
- commander XP,
- unit veterancy XP later,
- rank thresholds,
- mastery point grants,
- reward claim ledgers.

It emits events such as:

```txt
experience.gained
experience.rankReached
experience.masteryPointGranted
experience.rewardClaimed
experience.command.rejected
```

The experience kit should not directly build things.

It should emit progression facts.

## Unlock Registry Kit

`unlock-registry-domain-kit` owns access rules.

It tracks:

- unlocked building IDs,
- unlocked unit IDs,
- unlocked upgrade IDs,
- unlocked ritual IDs,
- prerequisite state,
- unlock claim ledgers.

It answers:

```txt
Can this faction build Bone Pit?
Can this faction build Black Chapel?
Can this unit be produced?
Can this upgrade be researched?
```

## Kill reward routing

Combat only emits a death fact.

```txt
combat.target.defeated
```

Reward routing translates that fact into requests:

```txt
combat.target.defeated
-> kill-reward-routing-domain-kit
-> soul.grant.request
-> experience.gain.request
-> corpse.create.request
-> unlock.progress.request
```

Every reward uses a stable `defeatId` or reward operation ID so it cannot be duplicated.

## Example kill reward

A living soldier dies:

```txt
combat.target.defeated
  targetArchetype: living_soldier
  defeatId: defeat_living_soldier_0042
```

Reward routing looks up `living_soldier` in `config/kill-rewards.config.json` and emits:

```txt
+12 souls
+8 XP
create human_corpse
```

## Progression loop

```txt
fight enemies
-> gain XP
-> reach rank 2
-> unlock Black Chapel access
-> pay souls and bone
-> build Black Chapel
-> produce Ghouls and Wights
-> push toward Totem seals
```

## Config ownership

- Resource catalog: `config/resources.config.json`
- Kill rewards: `config/kill-rewards.config.json`
- Experience thresholds: `config/experience.config.json`
- Unlock requirements: `config/unlocks.config.json`
