# Cover backgrounds

Every entry cover is the After component, centered on an abstract background. The backgrounds form one series: they look like the same photographer shot them on the same day. Each one says which part of the car the component belongs to.

## Rules for the whole series

1. **Abstract only.** No roads, cars, dashboards, people, text or logos. The component is the only object in the picture.
2. **A quiet center.** The middle 60% × 55% has low detail and low contrast, because the component sits there. Texture and color live at the edges.
3. **Light to mid tones.** Average lightness is about 70–88 (L\*). The light-theme panel is white at 65% with a soft shadow, so the background must be darker than white and never busy.
4. **Same lens and light for all.** Soft focus, very shallow depth of field. Light comes from the top left. There is fine film grain, the same amount on every image.
5. **One hue family per image.** Two or three close colors, low saturation. Never a rainbow.
6. **Context sets the mood.** The background matches where the component lives in the car (see the table). It does not depend on whether the entry is about Layout, Type or Color.
7. **Same output.** 1600 × 900, WebP, 300 KB or less, file name `site/covers/<context>.webp`.

## Context → background

| Context | Entries | Mood | Palette | Abstract motif |
|---|---|---|---|---|
| Navigation | 001 Turn-by-turn | Moving forward, dusk | Apricot, haze blue, pale sage | Long horizontal light streaks, like a horizon seen through a soft-focus windshield |
| Media | Now playing, Big controls | Warm, sound, night out | Amber, rose, deep plum at the edges | Out-of-focus round bokeh, soft halation |
| Climate | Climate edge, Temperature headline, + and − | Air, temperature | Cool mint to warm peach, left to right | Mist and slow vapor gradients, like breath on glass |
| Vehicle & controls | 76 px rows, Toggles, Drop the fake 9:41 | Material, touch | Warm grey, sand, graphite at the edges | Brushed metal or matte stone with grazing light |
| Information & layout | 38 / 62 split, One primary, Charts | Calm, clarity | Off-white, pale blue-grey | Folded paper or frosted glass with large soft planes |

When a new entry doesn't fit a context, reuse the closest one. Don't add a sixth context until at least 3 entries need it.

## Prompt for Codex

Shared part (keep it the same for every image):

```
Abstract photographic background, 16:9, 1600x900. Extremely soft focus, very shallow depth of field, light from the top left, fine 35mm film grain. Low saturation, two or three close colors only. The center 60% of the frame is calm, smooth and low-contrast; texture and color stay toward the edges. Overall lightness light to mid (not white, not dark). No objects, no people, no vehicles, no roads, no text, no logos.
```

Then add one line for the context:

- **Navigation:** `Motif: long horizontal streaks of dusk light, like a horizon through a soft-focus windshield. Palette: apricot, haze blue, pale sage.`
- **Media:** `Motif: large out-of-focus round bokeh with soft halation. Palette: amber and rose, deep plum only at the edges.`
- **Climate:** `Motif: slow mist and vapor gradients, like breath on cold glass. Palette: cool mint on the left fading to warm peach on the right.`
- **Vehicle & controls:** `Motif: brushed metal or matte stone surface under grazing light. Palette: warm grey and sand, graphite only at the edges.`
- **Information & layout:** `Motif: large soft planes of folded paper or frosted glass. Palette: off-white and pale blue-grey.`

## Checking an image before using it

- Put the After component on top at cover size. Can you read "300 m" without squinting?
- Blur the image a lot. Is the center still calmer than the edges?
- Put it next to the other covers. Do they look like one set, with the same grain, light and softness?
