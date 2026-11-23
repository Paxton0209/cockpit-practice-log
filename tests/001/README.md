# 001 accuracy test

Prompt: `prompt.txt` (the After prompt shown on the site), plus content, the two Figma icons and a one-line output format note.
Each run is a fresh session with no tools, no skills and no prior context. First result, no edits.
Reference: `ref.png`, the After state, built 1:1 from Figma node 2077:17360.
Score: SSIM on grayscale, 2x renders, same Inter fonts. Run `python3 cmpall.py`.

| Run | Model  | SSIM  | Pixels within 2% |
|-----|--------|-------|------------------|
| A1  | Opus   | 0.984 | 98.8% |
| A2  | Opus   | 0.971 | 98.4% |
| S1  | Sonnet | 0.991 | 99.4% |
| S2  | Sonnet | 0.970 | 98.4% |

Mean SSIM 0.979, lowest 0.970.
