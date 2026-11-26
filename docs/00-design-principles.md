# 00 · Design Principles

This document defines the aesthetic baseline, structural patterns, and scope boundaries shared across the HMI Design System (`Guideline`, `UI-UX-Library`), the Dashnote web notebook, and external publications. It pairs directly with the `00 Principles` page in Figma `Guideline` (pure text and structure, no reference bitmaps). For the full 24-image reference teardown, see [17-design-reference-deconstruction.md](17-design-reference-deconstruction.md).

## 01 Aesthetic DNA

Six non-negotiable visual instincts govern every surface we design.

| ID | Principle | Rule |
|---|---|---|
| `DNA-01` | Structure over ornament | Swiss hairline grids (`1 px`), mono indices (`[01]`, `001/100`), and disciplined spacing carry the visual language. No decorative illustrations, stickers, or busy backdrops. |
| `DNA-02` | Two-tone luminance hierarchy | Create emphasis with value contrast first (`#1D1D1F` primary ink vs muted grey secondary), not loud color, heavy drop shadows, or shrinking font sizes. |
| `DNA-03` | 90% neutral + 1 surgical accent | Keep surfaces pure white, cool light-grey tray (`#F5F5F7`), and dark graphite (`#141416`–`#262628`). Reserve one functional accent (`#007AFF` / `#0A84FF`) for active, selected, or progress states only. |
| `DNA-04` | Contained tray depth | Build layering with a quiet outer tray holding a crisp inner card (`1 px` hairline edge and subtle ground shadow) rather than heavy elevation shadows or glossy glass effects. |
| `DNA-05` | Meaningful texture only | When a background uses texture, allow at most one restrained layer (monochrome halftone/dither, faint data/telemetry, or soft out-of-focus light). Never stack multiple textures or literal stock photos. |
| `DNA-06` | Quiet micro-tool ergonomics | Favor calm, legible tool chrome with generous breathing room, clear active states, and high signal-to-noise controls over promotional marketing layouts. |

## 02 Scope Boundary (Car HMI vs Web & Editorial)

Shared DNA does not mean identical execution. In-car screens operate under a 2-second glance budget at arm's length while moving, whereas Dashnote web pages and social cards are read up close on desktop or phone.

| Dimension | In-Car HMI (`UI-UX-Library` / `Guideline 01–07`) | Web, Docs & Social (`Dashnote` / X / LinkedIn) |
|---|---|---|
| Typography | English `Inter` only, 2 weights (`Medium 500`, `Semibold 600`), 7 strict steps (`20/28` min up to `120/116`). Zero serif fonts. | `Inter` + monospace labels (`[01]`, `021/100`). Editorial serif or mid-sentence two-tone spotlight permitted on social/brand cards only. |
| Grid & lines | Full-bleed `1920 × 1200` split (`740` SR + `1180` App + `110` Dock). No decorative `1 px` grid lines or corner dots. | `1 px` hairline grids, centered `1104 px` editorial column, optional subtle corner registration dots or Figma-style micro-frame tags. |
| Color & accent | Semantic `<purpose>/<weight>` tokens only (`text/*`, `icon/*`, `surface/*`, `fill/*`, `border/*`, `accent/*`, `status/*`). | Monochrome default (`#FFFFFF` / `#F5F5F7` / `#1D1D1F`), optional single context tint or experimental architectural orange (`#FF4D00`) on standalone posters only. |
| Surfaces | Solid surfaces (`surface/panel`, `surface/card`), plus `surface/floating-glass` with `blur 12` and `1 px` `border/tertiary` over map/3D scenes. | White card inside `#F5F5F7` tray, or calm app window centered over soft atmospheric / architectural backdrop. |
| Touch & glance | Min `56 × 56` hit area (`68` standard), `48 × 48` icon artboard (`2 px` / `3 px` stroke), single glance `≤ 2 s`. | Desktop hover hairlines, compact `24–28 px` tinted icon chips in inspectors, keyboard shortcuts (`Cmd+K`). |

## 03 Reusable Structural Patterns

Six validated patterns extracted from our reference board for Dashnote, tools, and future products.

1. **Nested tray + white card + footer bar** (`PAT-01`). Outer `#F5F5F7` container wrapping a `#FFFFFF` content card, leaving a quiet bottom tray strip for status metadata on the left and a primary action button on the right (used for Prompt blocks, code snippets, and token exports).
2. **Two-tone inline spotlight type** (`PAT-02`). Within a single headline or statement, set supporting words in muted grey and highlight the core claim in solid black (used for Dashnote headlines, chapter intros, and weekly X/LinkedIn quote cards).
3. **Oversized metric + dimmed precision** (`PAT-03`). Pair a large tabular numeral with a small descriptor and slightly dim decimals or units (e.g. `99.1% Match`, `≤ 2.0s Glance`) to communicate engineering proof at a glance.
4. **Grouped micro-inspector panel** (`PAT-04`). Compact `~300 px` floating white panel with inset search, collapsible category groups, subtle hover hairline + right `+` affordance, and `24–28 px` soft-tinted icon badges (planned for Dashnote `Cmd+K` jumper and future Figma/MCP block picker).
5. **Asymmetric `2+1` Bento index** (`PAT-05`). Top text/pill filter strip + capsule search bar above a 3-column grid where the latest/featured item spans 2 columns (50% visual left, 50% clean title + bottom excerpt right with generous middle whitespace). Activate at 30+ entries.
6. **Three-card micro-UI problem intro** (`PAT-06`). Centered mono tag + headline above 3 equal hairline-divided cards showing simplified micro-UI failure states with subtle red callouts (planned for chapter intro pages such as Navigation, Settings, and Voice & AI).

## 04 Not For Us (Anti-Patterns)

Explicit exclusions that violate the system regardless of trend.

- **Multi-color 3D gradients and glowing brand marks**. Break neutral hierarchy and age quickly.
- **Human portraits and testimonial carousels**. Turn a design-engineering handbook into a generic agency portfolio.
- **Heavy drop shadows, thick borders, and decorative glassmorphism**. Add visual muddiness without improving scannability.
- **Noisy stock photography and stacked textures**. Compete directly with UI components on the stage.
- **Hype copy, clickbait headlines, and AI filler prose**. State concrete pixel measurements, physical constraints, and real trade-offs directly.
