Dashnote is trimmed to what's confirmed: seven entries, sorted by where they live in the car.

**Entries**
- 001 Turn-by-turn panel: now the panel alone, without the trip summary bar.
- 002 Route selection, 003 Place details (were 013, 014).
- 004 App list: a row opens its app; one trash icon is the only button.
- 005 Update settings: two 108 px rows, a label, its line and its control, no divider.
- 006 Opening tiles: Frunk, Trunk and Charge port as 72 px-icon tiles.
- 007 Locks: the child lock as a flat four-way control and three 108 px switch rows.

The old placeholder entries (the earlier 002–012 scenes) are gone; everything after 007 is "Coming soon". Befores for 004–007 come from clean, tool-less sessions given an ask that fixes the content, so only the design differs (`tests/0NN/`).

**Home**
- Sidebar: All entries, Navigation, Settings; Media, Climate, Driving assist and Voice & AI are marked Soon.
- Covers are framed for reading: wide and tall components get a tighter canvas so their text is legible on the card; the sheet keeps the full view and the flight scales between the two.
- Cover palettes: one family of neighbouring hues per context (navigation sky–teal, settings periwinkle–lilac and light grey). Dark covers stay darker than the dark card.
- Open/close is smoother: the page blur moved to the veil (backdrop-filter), and the flight no longer animates filters or layout.

**Figma**
- Cards: 24 px top and bottom padding (library `list-card` too); switch rows 108 px with their line.
- New filled icons built from the library's line icons: `nav/navigation_filled`, `general/layers_filled`, `media/radio_filled`, `part/phone_filled`. `general/delete` redrawn as one path.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

https://claude.ai/code/session_017MfCTfDg9mWkjtxA9BVeJf
