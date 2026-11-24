# 019 · Before

`before.html` is the first answer from a fresh Claude Opus 5.5 subagent (Claude app) with no prior context, told not to use tools (it made no tool calls), to this one line plus the output note:

> Design a locks settings section for a car settings screen, with child lock options Off, Left, Right and Both, and switches for window lock, walk-away lock and unlock on park, 772 × 436 px, light theme.
>
> Output: reply with one self-contained HTML snippet — a single root <div> with its own <style> inside — in one code block, and nothing else. Do not use any tools. Use the Inter font.

Kept as returned. On the site the Google Fonts @import is dropped (the page already loads Inter); its classes are already prefixed, so nothing else changed.

The After is built 1:1 from the Figma file (UI/UX Library · Examples · “Dashnote · App & device management” for 015–017, `System Settings / Update dialog` for 019), light and dark variables. Its prompt has not been run through fresh sessions yet.
