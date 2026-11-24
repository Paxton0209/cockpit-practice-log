# Entry template

How to make a new entry the way 001 (Turn-by-turn panel) was made. Follow it step by step.

## 1. After (the answer)
- Pick one component node in the Figma UI/UX Library (file `qiPTH6OH2yigVKfIavhQbI`).
- Rebuild it 1:1 in HTML at its real size. Use embedded Inter and the icons exported from Figma (currentColor).
- Export the node as SVG with outlined text and save it to `assets/NNN-<name>-after.svg`. That file is the Copy SVG.

## 2. Before (the honest default)
- Run a clean subagent: no skills, no tools, no earlier prompts.
- Use a one-line prompt: what the component is, the size (the same as After) and "light theme".
- Give it the same content and the same icon as After, so only the design changes when you toggle.
- Use the first result as-is and save it to `before/NNN-<name>-raw.html`.

## 3. Body copy
The sheet has the same layout for every entry. Only the picture changes when you toggle.
- **Picture**: opens on Before. Clicking After plays the scan; clicking Before fades back.
- **3 columns**: one per problem, in this order:
  - ✕ What's wrong and why, in one short line (≤ 30 characters), e.g. "Blue tile outshouts distance".
  - ✓ The fix as a short title, e.g. "Icon steps back".
  - One sentence with the detail.
- **Note line**: "Before is the first answer to one plain line, “…”", filled in from `ask`.
- **Prompt box**: the full After prompt, with the test result and Copy Figma SVG at the bottom.
- Plain, direct sentences. No label-colon lists, no lecturing.

In `CMP`, `wrong[i][0]` is the ✕ line and `notes[i]` is the [title, sentence] pair for the ✓.

## 4. Accuracy test
- Run the After prompt in 4 fresh sessions (2 models × 2).
- Score each result against the Figma PNG with SSIM (`tests/001/cmpall.py`).
- Aim for ≥ 0.95 on every run. If one falls short, tighten the prompt and run again.
- Save the runs, the reference image, the prompt and a README with the scores in `tests/NNN/`. Put the result in the tested caption.

## 5. Wire it in
- Add the component to `CMP` in `site/index.html` (W, H, name, html, ask, wrong[3], notes[3], svg, tested), then point the entry at it.
- Check open/close, the Before/After toggle, Copy prompt and Copy SVG in the light theme first.

## 6. Ship
- Branch, screenshot, get approval, merge.
- Publish the artifact and add release notes in `docs/releases-vX.Y.Z.md`.
