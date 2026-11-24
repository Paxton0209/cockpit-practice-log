# Cover backgrounds

Every entry cover is the After component, centered on a soft background. The backgrounds are drawn in CSS, not generated images: one shoot, five contexts. They share the same lights, grain and light direction; only four colours change, and they say which part of the car the component belongs to.

We tried generated images first (photographic dusk, then textures, then structural reliefs). They read as story art or illustration and competed with the component. Colour and light alone keep the component the only object in the picture, stay sharp at any size, cost no file weight, and have a matching dark version.

## How it is built

`site/index.html`, selector `.thumb.cov, .hero3.cov`:

- Three large radial lights over a base: `--cv1` top left, `--cv2` bottom right, `--cv3` top right, on `--cv0`.
- Fine grain on top (`::after`), strength `--grain`: 0.6 in light, 0.12 in dark. Grain on dark reads as dirt, so it is almost off.
- The palette comes from `data-ctx` on the cover (`nav`, `med`, `cli`, `veh`, `inf`). Entries map to a context in `CTX` (entry number → context); anything unmapped falls back to `nav`.
- In the dark theme the After panel on a cover switches to its dark variant (dark grey at 86%, white text, lighter bottom band, deeper shadow). The Before stays as AI made it.

## Rules

1. **Colour and light only.** No shapes, textures, objects, text or logos. The component is the only object in the picture.
2. **A quiet center.** The lights sit at the corners; the middle stays smooth.
3. **Light theme:** light to mid tones, clearly darker than the white panel. **Dark theme:** clean, cool near-black a step darker than the dark panel, one neutral key light top left, one context colour bottom right. Avoid warm colours in dark: they turn brown.
4. **Same structure for all.** Only the four colours change. Don't move the lights or change the grain per context.
5. **Context sets the colour**, not the entry's chapter (Layout, Type, Color…).

## Context → palette

`cv0` base · `cv1` top left · `cv2` bottom right · `cv3` top right

| Context | Entries | Light | Dark |
|---|---|---|---|
| Navigation (`nav`) | 001 | `#e2e0da` `#efc4a3` `#98aec2` `#c3d4bb` · apricot, haze blue, pale sage | `#0f1115` `#2c2e34` `#1e3a5e` `#14171c` · night blue |
| Media (`med`) | 002, 008 | `#e5dcd5` `#efbd9e` `#cfa3a6` `#e6cfb0` · apricot, dusty rose, sand | `#100f13` `#2d2c32` `#45264a` `#16141a` · plum |
| Climate (`cli`) | 003, 006, 009 | `#dee2e1` `#a8c3cd` `#efc0a0` `#cfdcd6` · cool left, warm right | `#0e1114` `#173e48` `#4a2a28` `#131719` · teal top left, a corner of coral |
| Vehicle & controls (`veh`) | 004, 007, 010 | `#dcd8d3` `#d8c5af` `#a39d97` `#e5dccf` · warm grey, sand, graphite | `#101012` `#2e2f33` `#34373c` `#161618` · steel |
| Information & layout (`inf`) | 005, 011, 012 | `#e0e3e7` `#efdcc8` `#a7b7ca` `#d2dbe5` · pale blue-grey | `#0f1115` `#2b2e34` `#243552` `#14171c` · blue-grey |

When a new entry doesn't fit a context, map it to the closest one in `CTX`. Don't add a sixth context until at least 3 entries need it.

## Checking a cover

- Read "300 m" at thumbnail size (about 350 px wide) without squinting, in both themes.
- The component is the brightest thing in a light cover, and a step lighter than the background in a dark cover.
- Put all five side by side: they should look like one set.
