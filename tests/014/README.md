# 014 · Before

`before.html` is the first answer from a fresh Claude Opus session with no prior context and no tools, to this one line plus an output-format note:

> Design a place details panel for a car navigation screen, for a destination with charging, 560 × 678 px, light theme.
>
> Output: reply with one self-contained HTML snippet — a single root <div> with its own <style> inside — in one code block, and nothing else. Do not use any tools. Use the Inter font.

Kept as returned. On the site the Google Fonts @import is dropped (the page already loads Inter); in 014 the generic .g/.a/.r classes are scoped under .rsp so they don't leak into the page.

The After is built 1:1 from the Figma file (UI/UX Library · Examples), light and dark variables. Its prompt has not been run through fresh sessions yet.
