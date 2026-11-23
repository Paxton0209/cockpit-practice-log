First public version of Dashnote: a notebook on designing car screens with AI.

**What's in it**
- Home: sidebar chapters + 3-column grid; 001 Turn-by-turn panel pinned first.
- Entry sheet opens from its cover (Dashline spring), blurred light veil, remembers your place across reloads.
- Before / After toggle with a crossfade of two same-size layers.
  - Before: the real first result of a one-line prompt (`before/001-tbt-raw.html`).
  - After: 1:1 from the Figma library (node 2077:17360), Inter embedded.
- Body follows the toggle: default prompt + 3 problems ↔ the rule + 3 matching fixes.
- Copy prompt and Copy SVG, with Dashline's tick animation and tap sound.

**Accuracy**
The After prompt was run in 4 fresh sessions (Claude Opus ×2, Sonnet ×2). Every result matched the Figma SVG at SSIM ≥ 0.970 (mean 0.979). Files and script in `tests/001/`.

**Not done yet**
Entries using the climate, settings and music scenes still have placeholder Before images and no Figma-checked After.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

https://claude.ai/code/session_017MfCTfbx6TjRqWpbg1YLry
