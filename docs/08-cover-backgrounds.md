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
3. **Dark theme contrast:** every dark light stays darker than the dark card (`bg/card` #262628), so the component never melts into the cover; only the context colour in the bottom-right corner may reach the card's brightness, and never behind it.
4. **Light theme:** light to mid tones, clearly darker than the white panel. **Dark theme:** clean, cool near-black a step darker than the dark panel, one neutral key light top left, one context colour bottom right. Avoid warm colours in dark: they turn brown.
4. **Same structure for all.** Only the four colours change. Don't move the lights or change the grain per context.
5. **Context sets the colour**, not the entry's chapter (Layout, Type, Color…).

## Context → palette

v0.4.0: each palette is now one family of neighbouring hues (the way information's periwinkle and lilac sit together), and each context owns its own part of the wheel: navigation sky–teal, climate mint–sage, vehicle light grey (settings stay quiet), media coral–rose, information periwinkle–lilac. Before, navigation mixed apricot, blue and sage, and the others read as one beige.

`cv0` base · `cv1` top left · `cv2` bottom right · `cv3` top right

| Context | Entries | Light | Dark |
|---|---|---|---|
| Navigation (`nav`) | 001, 013, 014 | `#e0e7ea` `#b4d3e6` `#8ab6bf` `#d3e6e4` · sky, teal, pale aqua | `#090c0e` `#1a2126` `#173a47` `#0d1113` · deep teal |
| Media (`med`) | 002, 008 | `#ecdcdc` `#f3b3a6` `#d293a6` `#f3d6cc` · coral pink, rose, peach | `#0c0a0c` `#211c21` `#4a2035` `#120f11` · wine |
| Climate (`cli`) | 003, 006, 009 | `#dde7e0` `#b3dbc6` `#8db8a8` `#dcebd8` · mint, sage | `#090c0b` `#17221e` `#173d35` `#0d1110` · pine |
| Vehicle & controls (`veh`) | 004, 007, 010, 017, 018 | `#e3e4e6` `#d3d5d9` `#a8acb2` `#ececee` · light grey, a cool graphite corner | `#0a0b0c` `#1b1c1f` `#28323f` `#0f1012` · steel (warm turns brown at night) |
| Information & layout (`inf`) | 005, 011, 012, 015, 016 | `#dfe1f0` `#c2c7f5` `#8ea3dc` `#e5d5ef` · periwinkle, lilac | `#0a0a0f` `#1c1d28` `#30357a` `#0f1016` · indigo |

When a new entry doesn't fit a context, map it to the closest one in `CTX`. Don't add a sixth context until at least 3 entries need it.

## Checking a cover

- Read "300 m" at thumbnail size (about 350 px wide) without squinting, in both themes.
- The component is the brightest thing in a light cover, and a step lighter than the background in a dark cover.
- Put all five side by side: they should look like one set.
