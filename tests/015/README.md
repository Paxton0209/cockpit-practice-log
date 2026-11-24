# 015 · Before

`before.html` is the first answer from a fresh Claude Opus 5.5 subagent (Claude app) with no prior context, told not to use tools (it made no tool calls), to this one line plus the output note:

> Design an installed apps list for a car settings screen, 772 × 531 px, light theme. Content, exactly: a section title “Apps”, then four apps, Phone, Maps, Task master and FM, each with its icon; each app can be opened and uninstalled. Nothing else.
>
> Output: reply with one self-contained HTML snippet — a single root <div> with its own <style> inside — in one code block, and nothing else. Do not use any tools. Use the Inter font.

The ask fixes the content, so Before and After show the same things and only the design differs. Kept as returned; on the site the Google Fonts @import is dropped (the page already loads Inter). Its classes are already scoped under its root.

The After is built 1:1 from the Figma file (UI/UX Library · “Dashnote · App & device management”), light and dark variables. Its prompt has not been run through fresh sessions yet.
