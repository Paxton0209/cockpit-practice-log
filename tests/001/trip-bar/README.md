# 001 · trip summary bar · Before

`before.html` is the first answer from a fresh Claude Opus session with no prior context and no tools, to this one line plus an output-format note:

> Design a trip summary bar for a car navigation screen, showing remaining distance, remaining time and an end-navigation action, 480 × 64 px, light theme.
>
> Output: reply with one self-contained HTML snippet — a single root <div> with its own <style> inside — in one code block, and nothing else. Do not use any tools. Use the Inter font.

Kept as returned. On the site the Google Fonts @import is dropped (the page already loads Inter); in 014 the generic .g/.a/.r classes are scoped under .rsp so they don't leak into the page.

On the site this bar sits under the TBT panel (entry 001, the Figma "TBT / Trip summary" group). The After is built 1:1 from the Figma file. The combined prompt has not been run through fresh sessions yet.
