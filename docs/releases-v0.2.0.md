Entry 001 polished into the template for every future entry.

**Entry sheet**
- Header is the component name with the number as a small badge. Close button has no background until hover.
- Under the picture, one toolbar row: Before / After on the left, Copy SVG on the right (fades out on Before).
- Before: one grey card. The default prompt, then 3 problems.
- After: 3 matching fixes, then the Prompt row with Copy prompt. The prompt opens to a fixed max height, fades at the bottom and scrolls.
- Tested caption under the body.

**Motion**
- Open/close: the sheet content is clipped to the shell, so the title never spills outside. The grid thumbnail hides while the shell flies over it, so you only see one outline.
- Background blur is static (no live backdrop-filter), the sheet is anchored to the top, and the shell follows the sheet height. Opening and closing no longer stutter.
- Prompt row: 180ms open / 120ms close, ease-out.

**Not done yet**
Climate, settings and music entries still need a real Before, a Figma After and an accuracy test. Use `docs/07-entry-template.md`.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

https://claude.ai/code/session_017MfCTfbx6TjRqWpbg1YLry
