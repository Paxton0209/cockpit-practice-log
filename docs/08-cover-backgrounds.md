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

v0.4.0 pushed the four non-navigation palettes further apart in hue (they read as one beige before): media coral/orchid, climate teal/coral, vehicle honey/slate, information periwinkle.

`cv0` base · `cv1` top left · `cv2` bottom right · `cv3` top right

| Context | Entries | Light | Dark |
|---|---|---|---|
| Navigation (`nav`) | 001 | `#e2e0da` `#efc4a3` `#98aec2` `#c3d4bb` · apricot, haze blue, pale sage | `#0f1115` `#2c2e34` `#1e3a5e` `#14171c` · night blue |
| Media (`med`) | 002, 008 | `#e9dbe0` `#f0a7a1` `#b48bbd` `#f2cdb4` · coral, orchid, peach | `#110f14` `#2d2c32` `#5a2a5e` `#17141b` · plum |
| Climate (`cli`) | 003, 006, 009 | `#dbe7e7` `#86c3cf` `#f3ae8c` `#c9e2d9` · teal left, coral right | `#0d1214` `#164852` `#5a2e28` `#121819` · teal top left, a corner of coral |
| Vehicle & controls (`veh`) | 004, 007, 010, 017, 018 | `#e4ddd0` `#e8c48f` `#8c99a8` `#ece0c6` · honey sand, slate | `#101112` `#2f3033` `#2f4256` `#16171a` · slate |
| Information & layout (`inf`) | 005, 011, 012, 015, 016 | `#dfe1f0` `#c2c7f5` `#8ea3dc` `#e5d5ef` · periwinkle, lilac | `#0f1016` `#2a2c38` `#3a3f86` `#14151d` · indigo |

When a new entry doesn't fit a context, map it to the closest one in `CTX`. Don't add a sixth context until at least 3 entries need it.

## Checking a cover

- Read "300 m" at thumbnail size (about 350 px wide) without squinting, in both themes.
- The component is the brightest thing in a light cover, and a step lighter than the background in a dark cover.
- Put all five side by side: they should look like one set.
