# 12 · Session handoff (2026-11-24)

Branch `sheet-motion`. Checkpoints: `save/2026-11-24-fade` (before 008–012) and `save/2026-11-24-dialpad` (this state).
Site: `site/index.html` (single file). Published artifact slug `186c7d5a-b563-4fe1-9a3e-38cb905a2568`.
Figma: UI/UX Library `qiPTH6OH2yigVKfIavhQbI`.

## Entries (PUBLISHED = 12)

| # | Key | Name | Size | Chapter |
|---|-----|------|------|---------|
| 001 | T | Turn-by-turn panel | 480 × 214 | Navigation |
| 002 | R | Route selection | 560 × 648 | Navigation |
| 003 | P | Place details | 560 × 678 | Navigation |
| 004 | M | App list | 772 × 480 | Settings |
| 005 | U | Update settings | 772 × 264 | Settings |
| 006 | O | Opening tiles | 772 × 156 | Settings |
| 007 | L | Locks | 772 × 520 | Settings |
| 008 | D | Confirm dialog | 672 × 320 | Navigation |
| 009 | K | Search keyboard | 1180 × 432 | Navigation |
| 010 | S | Result row | 566 × 116 | Navigation |
| 011 | W | Tire pressure | 960 × 480 | Settings |
| 012 | N | Dial pad | 512 × 582 | Settings |

Befores live in `tests/NNN/before.html` with their exact ask in `README.md`.

## Rules learned this session

- **Before and After are the same box.** The ask fixes content and size; the After must render at exactly that size (checked for all 12). A size mismatch makes the Before/After swap jump.
- **Prefix every new class** (`dg-`, `kb-`, `sr-`, `tp-`, `dp-`, `.st.dial`). Old scene styles such as `.px .r`, `.dp`, `.sm .r` leak into short names and caused grey patches twice.
- **Sheet canvas per entry:** component ≈ 70% of the canvas width and ≤ 80% of its height, aspect 1245:698. Cover framing uses `cv:{W,top}`; tall ones are top-anchored with a 96 px bottom fade.
- **Corner radius 20** on every component surface. No superellipse.
- **Presence:** library hairline + small shadow, plus an ambient layer (`--amb`) so it still reads when the stage scales components to ~50%.
- **Monochrome by default**, Colour switch restores palettes and blue. Semantic colours stay: call green `#1F9D3A`.
- Icons come from the library only (filled phone = `general/phone_filled`). Line weight scales with size (2 px at 48, 3 px at 72).
- Swap transition: opacity + transform only, never filter.

## Figma changes this session

- Popup `dialog` set: centred layout kept, equal-width buttons 16 apart, S has placeholder confirm content, radius 20. Duplicate close removed from the loose "1 line" frame.
- Search page `search-keyboard`: 104 × 91 keys on a whole-pixel grid, 12 gaps, 16 padding, new variable `bg/keyboard`, key shadow 1 px crisp, Search filled accent.
- Examples page, section "Dashnote · Tire pressure": component `tire-pressure` (traced car, soft wheels under an opaque body) with Light/Dark instances; new text style `en/number/display/medium` 64/72.
- Panel page Dial pad: call icon swapped to `general/phone_filled`.

## Open

- Route selection and Place details panels in Figma are still radius 24 (site is 20).
- Device management stays parked (options A/B/C in Figma frame 2190:5373).
- docs/08 and release notes don't yet describe the mono default, Colour switch or entries 008–012.
