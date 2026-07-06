# Config Model

## Status

Initial JSON configuration model for Phantom Command.

## Core rule

Most game design data should be JSON configuration.

Kits interpret config.

JSON should define values, catalogs, requirements, and tables.

JSON should not contain JavaScript functions or direct state mutation.

## Config can define

- available resources,
- starting resources,
- generated map nodes,
- unit stats,
- unit costs,
- building costs,
- production lists,
- kill rewards,
- XP thresholds,
- unlock requirements,
- upgrades,
- enemy wave schedules,
- scenario objectives,
- map generation rules.

## Config should not define

- JavaScript functions,
- renderer behavior,
- direct resource mutation,
- custom combat code,
- one-off hidden side effects,
- unmanaged async behavior.

## Recommended folder structure

```txt
config/
  resources.config.json
  units.config.json
  buildings.config.json
  map-generation.config.json
  kill-rewards.config.json
  experience.config.json
  unlocks.config.json
  enemy-waves.config.json
  scenario-001.config.json
```

## Every config file should include

```json
{
  "schema": "phantom-command.example.v1",
  "version": "0.1.0"
}
```

## Resource IDs

Use stable resource IDs such as:

```txt
souls
bone
command
```

Do not hardcode separate resource modules per resource.

The world economy kit should use generic APIs:

```txt
economy.grant(resourceId, amount, context)
economy.pay(costObject, context)
economy.canAfford(costObject)
```

## Costs as data

Buildings and units should reference resources by ID.

```json
{
  "cost": {
    "souls": 150,
    "bone": 80
  }
}
```

The building or unit kit does not need to know what all resources are.

It asks the economy kit to validate and pay.

## Rewards as data

Kill reward routing should use a table.

```json
{
  "living_soldier": {
    "resources": { "souls": 12 },
    "xp": 8,
    "corpse": "human_corpse"
  }
}
```

Combat emits `combat.target.defeated`.

Reward routing consults the config and emits reward requests.

## Unlocks as data

Unlocks should reference rank, buildings, resources, objectives, or other unlocked IDs.

```json
{
  "black_chapel": {
    "type": "building",
    "requirements": {
      "rankAtLeast": 2,
      "buildings": ["crypt_core"],
      "resourcesEverCollected": { "souls": 300 }
    }
  }
}
```

The unlock registry interprets this data.

## Map generation as data

Map generation config should define:

- map size,
- center objective,
- ring radii,
- starting resources,
- node counts,
- camp counts,
- lane counts,
- Totem seal count.

The map-generation kit should create a deterministic descriptor from this config.

## Migrations

If a resource or ID changes, add migration data instead of silently breaking old configs.

Example:

```json
{
  "migrations": {
    "soul": "souls",
    "bones": "bone"
  }
}
```

## First config philosophy

Start simple:

```txt
3 resources
4 units
4 buildings
1 map config
1 wave config
1 scenario config
```

Add complexity after the first playable loop works.
