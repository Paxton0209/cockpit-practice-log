# Handoff: entry sheet open/close motion

Repo `Paxton0209/cockpit-practice-log`, branch `sheet-motion` (not merged). Everything is in `site/index.html`. Published artifact slug `186c7d5a-b563-4fe1-9a3e-38cb905a2568`.

## Goal
Make it work like Dashline's inspector (`Paxton0209/Dashline`, `index.html`, `springDialog` / `closeInsp`, around lines 2318–2410):
- **Open**: the home cover (`.thumb.cov`, the After panel on a gradient) grows into the sheet's stage (`.hero3.cov`, 16:9, the same picture). The white surface grows with it. Title, columns and prompt fade in. Nothing scales except the picture.
- **Close**: click the backdrop or press Esc (there's no close button). The picture flies back and lands exactly on the cover. The surface shrinks with it; the other content fades out first. If the sheet is on Before, it fades to After on the way.

## What's wrong now
On a real Mac, frames stutter and the parts drift apart mid-flight: the shell (`#sc`), the sheet clip (`#sheet2`) and the stage transform (`.hero3`) don't stay locked. The screenshot showed the title and content outside the white surface while opening.

Current approach: three separate Web Animations, one each on `#sc` (clip-path), `#sheet2` (clip-path) and `.hero3` (transform), plus the content fades. They now share `startTime`, but they can still end up on different threads (compositor vs main).

## Suggested fix
Copy Dashline's structure 1:1 instead of patching:
1. One element owns the motion. Draw the surface as `#sheet2::before` with `opacity: var(--dialog-surface-opacity)`, the way Dashline does. Drop `#sc`.
2. Two springs only: the sheet (`dialogStyle`) and the stage (`lensPose` → transform), both created with the same keyframe sampling and the same `startTime`.
3. Content opacity is driven from the same spring progress (Dashline's `--dialog-copy-opacity`), not from separate fades.
4. Keep these rules: open on After; the stage is 16:9 so the cover and the stage match exactly (cover `.cs` width 95.24%); while flying, the sheet must not clip the stage (overflow visible).

## How to check
- Sample per frame with `requestAnimationFrame`: the surface rect and the stage rect must stay aligned on every frame.
- Freeze at 10%, 30% and 60% (`getAnimations()`, pause, set `currentTime`) on both open and close, then screenshot.
- Check on a real browser: headless Chrome here renders at about 20–30 fps and hides thread-split issues.

## Don't break
- Before/After toggle: After plays the scan line (`scan()`); Before fades over the old picture in 300 ms (`fadeTo()`).
- The page blur behind the sheet (`body.dim .shell`).
- Light theme first.
