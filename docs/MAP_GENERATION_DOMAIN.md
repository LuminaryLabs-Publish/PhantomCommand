# Map Generation Domain

## Status

Initial map generation domain design for Phantom Command.

## Core concept

The map is generated around one central enemy objective:

```txt
Grim Reaper Totem
```

The player starts near the outer edge and pushes inward through danger rings.

## Domain kit

```txt
phantom-map-generation-domain-kit
```

## What it owns

- deterministic map seed,
- map bounds,
- terrain zones,
- ring model,
- player start placement,
- resource node placement,
- Grim Reaper Totem placement,
- Totem seal placement,
- enemy camp placement,
- wave lane placement,
- landmark placement,
- spawn safety validation.

## What it does not own

- unit combat,
- building construction,
- resource balances,
- XP rewards,
- active enemy tactical AI,
- renderer drawing.

## Subdomain kits

```txt
phantom-map-generation-domain-kit
├─ map-seed-domain-kit
├─ terrain-shape-domain-kit
├─ ritual-ring-domain-kit
├─ resource-node-placement-domain-kit
├─ grim-totem-objective-domain-kit
├─ enemy-camp-placement-domain-kit
├─ wave-lane-domain-kit
├─ landmark-placement-domain-kit
└─ map-spawn-safety-domain-kit
```

## Ring model

```txt
Outer Ring
  Player start, safe resources, weak enemies.

Middle Ring
  Contested resources, enemy camps, soul wells.

Inner Ring
  Cursed terrain, stronger defenders, Totem aura.

Center
  Grim Reaper Totem, boss structure, final objective.
```

## Grim Reaper Totem

The Totem is:

- central objective,
- wave source,
- corruption source,
- map pressure source,
- boss structure.

It can be configured to:

- spawn waves,
- empower camps,
- corrupt resources,
- increase pressure after player expansion,
- require Totem seals to be destroyed before final damage.

## Totem phases

```txt
Phase 1: Dormant
  Weak scouts and small patrols.

Phase 2: Awakening
  Triggered by middle-ring expansion or XP rank.
  Mixed waves begin.

Phase 3: Enraged
  Triggered by broken seals.
  Inner-ring defenders gain pressure.

Final Phase
  Shield down.
  Player can destroy the Totem.
```

## Map pacing

```txt
early game = outer-ring survival and expansion
mid game = middle-ring resource fights and camp clearing
late game = inner-ring seal breaking
finale = center Totem assault
```

## Generated map descriptor

The map-generation kit should output a descriptor, not draw the map directly.

```json
{
  "id": "phantom-map-001",
  "seed": "reaper-valley-001",
  "bounds": { "width": 2400, "height": 2400 },
  "rings": {
    "outer": { "radiusMin": 850, "radiusMax": 1200 },
    "middle": { "radiusMin": 500, "radiusMax": 850 },
    "inner": { "radiusMin": 180, "radiusMax": 500 },
    "center": { "radiusMin": 0, "radiusMax": 180 }
  },
  "playerStart": { "x": 180, "y": 210, "ring": "outer" },
  "grimReaperTotem": {
    "id": "grim_reaper_totem",
    "x": 1200,
    "y": 1200,
    "ring": "center",
    "auraRadius": 420,
    "shieldedBy": ["north_seal", "east_seal", "south_seal"]
  },
  "resourceNodes": [],
  "enemyCamps": [],
  "waveLanes": [],
  "landmarks": []
}
```

## Resource placement rule

Resource nodes should not be random noise.

Generation must guarantee:

- safe starting resources near player,
- at least two expansion choices,
- higher-value contested nodes in the middle ring,
- dangerous high-value nodes near the inner ring.

## Enemy placement rule

Enemy camps should teach pacing.

- Outer ring: weak camps and patrols.
- Middle ring: cleric shrines and defended soul wells.
- Inner ring: Totem guard posts and seal defenders.
- Center: Grim Reaper Totem and boss guards.

## Wave lane rule

The generator should create readable lanes from center outward.

Wave lanes let the Totem attack the player without feeling random.

The first version should use 3 fixed lanes, then graduate to config-driven procedural lanes.

## First implementation target

```txt
fixed square map
center Grim Reaper Totem
outer player start
3 grave fields
2 bone yards
2 middle soul wells
3 enemy camps
3 wave lanes
3 Totem seals
```

## Config ownership

Map generation values should live in:

- `config/map-generation.config.json`,
- `config/scenario-001.config.json`,
- `config/enemy-waves.config.json`.
