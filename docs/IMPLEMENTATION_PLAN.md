# Implementation Plan

## Status

Initial staged plan for Phantom Command.

## Target repo

```txt
LuminaryLabs-Publish/PhantomCommand
```

## Target branch

```txt
main
```

## Phase 1: Docs and config foundation

Goal:

Create stable design docs and JSON configuration examples before writing gameplay code.

Deliverables:

- docs for game design,
- docs for roster,
- docs for buildings,
- docs for economy/progression,
- docs for kit architecture,
- docs for map generation,
- docs for config model,
- first playable slice plan,
- sample config JSON.

Gate:

```txt
A developer can understand what to build without reading chat history.
```

## Phase 2: Static playable RTS slice

Goal:

Build a minimal browser-playable RTS using the config data.

Deliverables:

- full-screen game canvas,
- fixed map,
- unit selection,
- move command,
- attack command,
- resources,
- production,
- basic enemy waves,
- win/loss states.

Gate:

```txt
A player can build Skeletons/Zombies and clear the first enemy camp.
```

## Phase 3: Kit/domain extraction

Goal:

Move gameplay logic into clear domain kits.

Deliverables:

- `phantom-command-mode-kit`,
- `world-economy-domain-kit`,
- `soul-economy-domain-kit`,
- `undead-unit-domain-kit`,
- `necropolis-building-domain-kit`,
- `rts-command-domain-kit`,
- `rts-combat-resolution-domain-kit`.

Gate:

```txt
Renderer no longer owns gameplay truth.
```

## Phase 4: Map generation domain

Goal:

Replace the fixed battlefield with deterministic map-generation descriptors.

Deliverables:

- ring model,
- Grim Reaper Totem center objective,
- player start generation,
- grave field placement,
- bone yard placement,
- soul well placement,
- enemy camp placement,
- wave lane placement,
- Totem seal placement.

Gate:

```txt
Same seed creates same playable map.
```

## Phase 5: PvE director and Totem phases

Goal:

Make the central Totem drive pressure and mission escalation.

Deliverables:

- wave scheduling,
- Totem dormant/awakening/enraged/final phases,
- camp activation,
- inner-ring corruption,
- final push objective.

Gate:

```txt
The Totem feels like the central enemy, not just a static prop.
```

## Phase 6: Expanded units and buildings

Goal:

Add the second tier of the first roster.

Deliverables:

- Ghouls,
- Wights,
- Black Chapel,
- first upgrades,
- improved kill rewards,
- stronger enemy types.

Gate:

```txt
The player can transition from Skeleton/Zombie survival into Ghoul/Wight offensive pressure.
```

## Phase 7: Campaign mission pass

Goal:

Turn the skirmish loop into a campaign-ready structure.

Deliverables:

- mission config format,
- mission 1 through 5 outlines,
- objective types,
- persistent progression plan.

Gate:

```txt
New missions can be created by adding config and map seeds.
```

## Implementation rule

Always preserve this split:

```txt
JSON config = what exists and how it is tuned
Kits = how rules are interpreted
Renderer = presentation only
PvE director = enemy pressure and event timing
```

## Push rule

Do not push implementation code unless the plan names the target repo and branch.

Current target:

```txt
LuminaryLabs-Publish/PhantomCommand main
```
