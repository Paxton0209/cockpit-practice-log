# 018 · Before

`before.html` is the first answer from a fresh Claude Opus 5.5 subagent (Claude app) with no prior context, told not to use tools (it made no tool calls), to this one line plus the output note:

> Design a locks settings section for a car settings screen, 772 × 564 px, light theme. Content, exactly: a section title “Locks”; “Child lock” with the options Off, Left, Right and Both (Both selected); then three switches, each with one line under it: “Window lock” with “Disable rear window switches” (off), “Walk-away lock” with “Lock when your phone key leaves” (on), “Unlock on park” with “Unlock all doors in Park” (on). Nothing else.
>
> Output: reply with one self-contained HTML snippet — a single root <div> with its own <style> inside — in one code block, and nothing else. Do not use any tools. Use the Inter font.

The ask fixes the content, so Before and After show the same things and only the design differs. Kept as returned; on the site the Google Fonts @import is dropped (the page already loads Inter). Its classes are already scoped under its root.

The After is built 1:1 from the Figma file (UI/UX Library · the “Locks” group of `System Settings / Update dialog`), light and dark variables. Its prompt has not been run through fresh sessions yet.
