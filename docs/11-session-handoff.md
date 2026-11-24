# Session handoff (2026-11-24)

Pick up from here in a new session. Reply to the user in Chinese; site and Figma copy stay English.

## Where things are
- Repo `cockpit-practice-log`, branch `sheet-motion`. Read `docs/10-handoff-015-024.md` first: specs, tokens, the **Reference rule**, Codex phases.
- Figma: UI/UX Library `qiPTH6OH2yigVKfIavhQbI`, page Examples `35:2`.
  - Section "Dashnote 015–024" `2157:5261`: finals, light at x 40, dark at x 852.
  - Section "Dashnote · References & 1:1 structure" `2164:5626`: per component a label, a reference image slot (grey frame with red boxes already drawn), and the 1:1 structure frame.
- Reference images: user's desktop folder `车机 HMI 素材` (device bridge; connected folder).
- Figma skills: load figma-use + figma-generate-design before mutating `use_figma`. Bind alpha colour variables with the resolved alpha on paint opacity (`resolveForConsumer`), or they render black. `createAutoLayout` frames get a white fill by default: clear it on inner frames.

## Done
| | Final light / dark | 1:1 structure | Source |
|---|---|---|---|
| 017 Takeover alert | `2164:5634` / `2164:5641` | `2164:5627` | 驾驶/小米 澎程 N90 017 车道居中辅助 接管警告 |
| 021 Parking spot picker | `2165:5443` / `2165:5472` | `2165:5370` | 小鹏官方界面/05 泊车车位选择 |
| 023 Range | `2167:5431` / `2167:5452` | `2167:5419` | 信息娱乐/理想 L9 Livis 014 (middle card) + 车辆设置/蔚来 ES8 004 (battery bar) |
| 022 Assistant answer | `2168:5458` / `2168:5509` | `2168:5416` | 信息娱乐/理想 L9 Livis 014 (left column) + 小鹏官方界面/07 (answer bubble) |

Codex finished Phase 1 (015 `2157:5262`, 016 `2157:5304`, 020 `2162:6123`, 024 `2157:5318`, each with a dark twin) and Phase 2 (ten Befores in `tests/0NN/`). 016 and 024 keep library sizes (decided).

## Next, in order
1. **Upload the real reference screenshots** into the empty slots with `upload_assets` (nodeIds = slot ids, scaleMode FILL; POST bytes with curl). The last session was blocked by the network; the user has since allowed `mcp.figma.com`.
   - `2167:5395` ← 驾驶/小米 澎程 N90 017 车道居中辅助 接管警告 [网页手册].png
   - `2167:5400` ← 小鹏官方界面/05 泊车车位选择.png
   - `2167:5406` and `2167:5413` ← 信息娱乐/理想 L9 Livis 014 理想同学 实时百科 [网页手册].png
   - `2167:5408` ← 车辆设置/蔚来 ES8 004 天际屏电量与续航 [手册p125 去标注].png
   - `2167:5415` ← 小鹏官方界面/07 车机桌面与小 P 对话.png
   Then screenshot the section and check that the red boxes sit on the right parts.
2. **018 Seat heat & ventilation** (source: 车辆设置/理想 L9 Livis 004 前排空调, the bottom icon+label button row) and **019 Sound presets** (source: 信息娱乐/乐道 L60 014 智能声场与均衡器). Same flow: reference row (label + screenshot + red box) → 1:1 structure → light/dark final in the gap between 017 (y 728) and 020 (y 1648). Library has `ac/seat_heat`, `ac/seat_vent`, `media/equalizer`, `tile-button`, Button Segment, Slider, `list-row`.
3. Tell the user Phase 1 is reviewed, then give Codex the go for Phase 3 (site build) per doc 10.
