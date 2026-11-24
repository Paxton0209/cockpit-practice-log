Dashnote publishes 12 entries, six each in Navigation and Settings.

**Entries**
- 001 Turn-by-turn panel: now the panel alone, without the trip summary bar.
- 002 Route selection, 003 Place details (were 013, 014).
- 004 App list: a row opens its app; one trash icon is the only button.
- 005 Update settings: two 108 px rows, a label, its line and its control, no divider.
- 006 Opening tiles: Frunk, Trunk and Charge port as 72 px-icon tiles.
- 007 Locks: the child lock as a flat four-way control and three 108 px switch rows.
- 008 Confirm dialog (Navigation, 672 × 320 px): centred title and body, equal-width actions and a filled Confirm button.
- 009 Search keyboard (Navigation, 1180 × 432 px): whole-pixel key grid with 12 px gaps and a filled Search key.
- 010 Result row (Navigation, 566 × 116 px): place name, distance and address, with add-stop and direction icons.
- 011 Tire pressure (Settings, 960 × 480 px): four 64 px readings placed by the wheels of a traced top-down car.
- 012 Dial pad (Settings, 512 × 582 px): 160 × 86 px keys, a 48 px number and the library's filled handset on a green call key.

Cards after 012 are marked “Coming soon”. Before and After share the exact component bounds for all 12 entries. The baseline prompts and saved Befores live in `tests/0NN/`.

**Home**
- Sidebar: Index, Navigation and Settings. Media, Climate, Driving assist and Voice & AI are marked Soon.
- Covers are framed for reading: wide and tall components get a tighter canvas so their text is legible on the card; the sheet keeps the full view and the flight scales between the two.
- Covers and component accents start in monochrome. The **Colour** switch restores the [cover palettes](08-cover-backgrounds.md) and the library's blue accent. Day / Night is independent, and the dial pad keeps its green call key in both Colour settings.
- After components with outer surfaces use a 20 px radius. The Before/After swap uses opacity and transform, with both sides held to the same bounds.
- Open/close is smoother: the page blur moved to the veil (backdrop-filter), and the flight no longer animates filters or layout.

**Figma**
- Cards: 24 px top and bottom padding (library `list-card` too); switch rows 108 px with their line.
- New filled icons built from the library's line icons: `nav/navigation_filled`, `general/layers_filled`, `media/radio_filled`, `part/phone_filled`. `general/delete` redrawn as one path.
- Route selection, Place details and Confirm dialog use 20 px outer corners. The dial pad uses `general/phone_filled`.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

https://claude.ai/code/session_017MfCTfDg9mWkjtxA9BVeJf
