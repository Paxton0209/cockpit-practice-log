# Reference board, sorted (2026-11-22)

Source: Figma "Design Reference", page node 1021:22, 18 images.
Each one is filed under what we take from it. Nothing is copied whole.

## 1. Tone: how it should feel

| Reference | What to take | Where it goes |
|---|---|---|
| Untitled UI halftone backgrounds (image 5) | One texture layer: dithered or halftone, black / grey only | Hero background, or a dithered road texture behind the live cockpit |
| Feldar, ASCII text around the product (image 19) | Texture that carries meaning (text, data) instead of decoration | Could become faint driving data (speed, distance) drifting behind the hero |
| AI Fleet, two-tone headline (image 17) | First line black, second line grey | **Done**: main headline |
| Dark pricing card with dithered header (6345326) | How dark mode can still feel warm | Reference for night mode and later paid pages |
| nachi, white card on a photo (image 13) | One calm card on a full-bleed scene | Option for the hero: live driving scene with one card on top |

## 2. Structure: how the page is built

| Reference | What to take | Where it goes |
|---|---|---|
| Cerno editorial grid (6345322) | Mono section labels like `[SEC-01]`, counters like `03/06`, hairline grid cells | **Done**: `[01] [02] [03]` section labels |
| "How it works", 3 steps (6345315) | Numbered steps; active is black, the rest grey; auto-advances | **Done**: How it works section |
| "The Problem", 3 cards (6345314) | Mono tag + centered headline + 3 cards with micro-UI and red marks | Later: chapter intro pages ("What AI gets wrong about Layout") |
| Sales OS, 3 visual cards with caption below (image 16) | Picture on top, short title + 2 lines below | Already close to our entry cards |
| Launchtree bento blog (6345324) | Mixed card sizes, pill filters, search | Later, when there are 30+ entries: feature the latest entry large |

## 3. Components and spec

| Reference | What to take | Where it goes |
|---|---|---|
| Topinspo vocabulary (6345325) | "Jump to" chips, demo stage, "Say it to AI" block | **Done**: Jump to by symptom; prompt block |
| Canvas UI docs (6345327) | "Copy for AI" button, tags, floating Controls, Playground | **Done**: Copy for AI; later: floating controls on mobile |
| Nested card in a tray, with footer action (6345323) | Inner white card, grey tray, footer with status + action | **Done**: prompt tray |
| AI Fleet stat tiles (image 17) | Big number + small label | **Done**: "Glance budget" on entry 001 |
| Claude-style sidebar (image 14) | Large, calm nav type, soft selected fill | Later: chapter index / table of contents |
| Profile editor (image 6), Twombly app (6345328) | Quiet app chrome, hairlines, black pill button | General component tone |

## 4. Not for us

- Portraits and testimonial layouts (image 16, 6345322 photo side): too much "person", reads as a portfolio.
- Colourful gradient art (6345321 logo, Launchtree images): breaks the neutral palette.
- Pricing (6345326): later, when we monetise.

## Features taken from the course notes (other chat)

1. **Glance budget**: a single glance ≤ about 2 s, a whole task ≤ about 12 s of eyes-off time. Each entry shows countable facts: things to read, smallest text, primary size. Started on 001.
2. **One-second test, with results**: Glance mode can later record what people say they saw, and show "68% caught the distance". This needs a small database.
3. **How it was checked**: simulator, bench or parked car. A small badge per entry once there is real testing.
4. **Chapter 09, Voice & AI**: "say it once, and the system picks: do it, show a card, or open a window". No one has a method for this yet, so it can be the strongest chapter.
5. **Running prototypes, not stills**: entries stay interactive. Later, a short screen recording per entry for X.
