# Interaction audit: select build order result attribution map

Timestamp: 2026-07-10T14-11-51-04-00

## Interaction surface

The interaction surface is compact and player-readable:

- pointer click selects units or build pads;
- drag selects allied units;
- repeat click on selected pad attempts build;
- right-click issues move or attack order;
- wheel zooms around the pointer;
- WASD/arrows pan;
- Space starts wave;
- 1/2/3 choose tower type;
- P pauses, R reloads, F focuses selection.

## Attribution gap

Interaction commands currently mutate or no-op without durable result rows. The missing result map should answer:

```txt
what command was requested?
which source row authorized it?
what state did it read?
was it accepted, rejected, skipped, or unsupported?
what reason was returned?
which renderer/HUD row should display it?
what did GameHost expose afterward?
```

## Next fixture target

Add one accepted and one rejected case for select, build, order, and start-wave. The fixture should assert stable reason strings and resulting state deltas without relying on pointer events or canvas rendering.
