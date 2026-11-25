# Cover backgrounds

Every entry cover shows the After component on a soft CSS background. The site opens in monochrome with a shared neutral palette across all contexts. The **Colour** control in the top right restores the context palettes and the library's blue accent.

The **Day / Night** control switches the light or dark palette independently. Dashnote remembers both settings locally. The dial pad's translucent green call key stays green in both Colour settings. The keyboard's Search key uses a translucent neutral fill.

## How it is built

`site/index.html`, selector `.thumb.cov, .hero3.cov`:

- Three large radial lights over a base: `--cv1` top left, `--cv2` bottom right, `--cv3` top right, on `--cv0`.
- Fine grain on top (`::after`), strength `--grain`: 0.6 in light, 0.12 in dark. Grain on dark reads as dirt, so it is almost off.
- With Colour off, the neutral tokens override the context palette. With Colour on (`data-color="on"`), `data-ctx` selects the palette. `CTX` maps each entry to a context and defaults to `nav`.
- The After panel follows the light or dark palette. Covers and details share the component shadow in `--preview-shadow`, with the same offsets and blur and theme-specific opacities. Before previews retain their original styling.

## Default monochrome palette

| Theme | `--cv0` base | `--cv1` top left | `--cv2` bottom right | `--cv3` top right |
|---|---|---|---|---|
| Light | `#EBEBEB` | `#F7F7F7` | `#D4D4D4` | `#F2F2F2` |
| Dark | `#0B0B0B` | `#191919` | `#1F1F1F` | `#101010` |

## Rules

1. **Colour and light only.** No shapes, textures, objects, text or logos. The component is the only object in the picture.
2. **A quiet center.** The lights sit at the corners; the middle stays smooth.
3. **Dark theme contrast:** every dark light stays darker than the dark card (`bg/card` #262628), so the component never melts into the cover; only the context colour in the bottom-right corner may reach the card's brightness, and never behind it.
4. **Light theme:** light to mid tones, clearly darker than the white panel. **Dark theme:** clean, cool near-black a step darker than the dark panel, one neutral key light top left, one context colour bottom right. Avoid warm colours in dark: they turn brown.
5. **Same structure for all.** Each theme uses the same light positions and grain across contexts. The context changes the four palette values.
6. **Context sets the palette.** Navigation and Settings are the site chapters. Each chapter can contain entries with different cover contexts.

## Context palettes with Colour on

Each context uses one family of neighbouring hues. Vehicle & controls uses quiet light greys.

`cv0` base · `cv1` top left · `cv2` bottom right · `cv3` top right

| Context | Entries | Light | Dark |
|---|---|---|---|
| Navigation (`nav`) | 001–003, 008–010 | `#e0e7ea` `#b4d3e6` `#8ab6bf` `#d3e6e4` · sky, teal, pale aqua | `#090c0e` `#1a2126` `#173a47` `#0d1113` · deep teal |
| Media (`med`) | — | `#ecdcdc` `#f3b3a6` `#d293a6` `#f3d6cc` · coral pink, rose, peach | `#0c0a0c` `#211c21` `#4a2035` `#120f11` · wine |
| Climate (`cli`) | — | `#dde7e0` `#b3dbc6` `#8db8a8` `#dcebd8` · mint, sage | `#090c0b` `#17221e` `#173d35` `#0d1110` · pine |
| Vehicle & controls (`veh`) | 006, 007, 011 | `#e3e4e6` `#d3d5d9` `#a8acb2` `#ececee` · light grey, a cool graphite corner | `#0a0b0c` `#1b1c1f` `#28323f` `#0f1012` · steel (warm turns brown at night) |
| Information & layout (`inf`) | 004, 005, 012 | `#dfe1f0` `#c2c7f5` `#8ea3dc` `#e5d5ef` · periwinkle, lilac | `#0a0a0f` `#1c1d28` `#30357a` `#0f1016` · indigo |

When a new entry doesn't fit a context, map it to the closest one in `CTX`. Don't add a sixth context until at least 3 entries need it.

## Checking a cover

- Read "300 m" at thumbnail size (about 350 px wide) without squinting, in both themes.
- The component is the brightest thing in a light cover, and a step lighter than the background in a dark cover.
- Check the shared monochrome palette in Day and Night. Turn on Colour and compare the active context palettes for contrast.

## Framing on the home grid

A component whose body text would drop below about 11 px on a 350 px home card gets a tighter cover canvas (`cv.W` in `CMP`). Entries 008–012 use cover widths of 900, 1260, 700, 920 and 760 px respectively. Tall components such as the dial pad are top-anchored with `cv.top` and fade at the bottom edge. The sheet shows the full component and `coverPose` scales between the two framings.
