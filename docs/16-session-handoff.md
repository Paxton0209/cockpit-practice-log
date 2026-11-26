# 16 · Dashnote 交接（2026-11-26）

本文件用于新开对话快速接手，汇总当前仓库状态、Figma 资产、视频工作流、用户偏好与表达规范。设计规范主文档见 [15-card-guideline.md](15-card-guideline.md)。

## 1. 仓库、预览与关键路径

- Dashnote 网页仓库：`/Users/peixin/.gemini/antigravity/scratch/dashnote`（`main` 分支，线上 `https://paxton0209.github.io/dashnote/`，单组件短链格式 `https://paxton0209.github.io/dashnote/?021`，无 `#entry-`，兼容旧 `#entry-NNN`）
- Dashline 图标仓库：`/Users/peixin/.gemini/antigravity/scratch/Dashline`（`main` 分支，线上 `https://paxton0209.github.io/Dashline/`）。注意本地 `Dashline/index.html` 可能保留用户未提交的改动，推送前先检查 `git status`，必要时用独立 worktree 推送。
- Figma 组件库 `UI-UX-Library`：`fileKey = qiPTH6OH2yigVKfIavhQbI`
- Figma 规范文档 `Guideline`：`fileKey = yxHbApCtnealXacguziLKe`
- 视频工程目录：`/Users/peixin/.gemini/antigravity/scratch/video_studio/`（最新 10 秒 60fps 模板在 `clip_021/`）
- 桌面成片目录（目标 100 个视频）：`/Users/peixin/Desktop/Dashnote-Videos/`
  - 已归档 `000-Dashnote-Showcase-24s.mp4`、`021-Navigation-Search-10s.mp4`
  - 命名规则 `NNN-Component-Name-10s.mp4`

## 2. 本轮已完成内容

### Dashnote 网页（当前 20 / 100）

- 首页已发布 20 个组件（`001–003`、`005–021`，`004` 已下架保留代码）。
- 完成并上线 **`021 Navigation search`**（`560 × 204 px`，Prompt 评测像素匹配度 `99.10%`）
  - 上下比例平衡为 `100 px` 顶部搜索区 + `104 px` 底部轻色带（浅色 `#1D1D1F 4.5%`、深色 `#FFFFFF 5%`），取消横向分割线。
  - 搜索、历史、充电图标统一使用 `56 px` `3 px` 线宽中性次要色（无蓝/红点缀），图标框到文字间距 `8 px`（视觉净距约 `20 px`）。
  - 底部快捷目的地直接绑定标准字号 token：`24/32`（`en/body/m/medium`）+ `2 px` + `20/28`（`en/label/default`），左右等宽分布，中间 `2 × 48 px` 竖分割线（浅色 `rgba(15,23,41,.08)`，深色 `rgba(255,255,255,.08)`）两侧对称 `20 px`。
  - 右侧 Home / Work 快捷入口采用 `48 px` 纯面性图标（无描边，Home 门洞底部圆角 `R1.25`）。
  - 深色描边从 `2px` 改为 `::after` 顶层 `1px` 细描边（`rgba(255,255,255,.08)` + 顶部 `inset 0 1px 0 rgba(255,255,255,.05)`），避免紧凑卡片描边过重及底部色带叠加泛白，与 `001 Turn-by-turn`、`015 Drive modes`、`016 Energy use` 保持一致。

### Dashline 图标库

- 新增 `general/home_filled`（纯面性无描边，门洞底部圆角 `R1.25`），详情弹窗自动支持 Outline / Filled 切换。
- 调整 `general/home` 线性图标造型向内收 `1 px`，与 `home_filled` 轮廓结构 1 比 1 对齐，切换状态无明显跳变。
- 新增 `drive/work_filled`（归入 `Navigation → Places`）。

### Figma `UI-UX-Library` 与 `Guideline`

- `UI-UX-Library` 的 `Examples`（`35:2`）零散组件已全部归类到对应分类页，只保留主组件（不重复摆放 Light/Dark 副本，依赖变量模式切换）
  - `Cards`（`6:62`）、`Popup`（`6:67`）、`Navigation`（`6:80`）、`Search`（`6:72`）、新建 `Voice & AI`（`2298:6095`）、`Toggle`、`List`、`Icons`。
- 按第一性原理清理了 73 项零引用死资产（空页面 `Getting Started`、13 个死文字样式含全部 `zh/*`、13 个死 `Type` 变量、4 个死 `Size` 变量、21 个死 `Color` 变量、21 个死 `Primitives` 变量）。
- 补全此前空白的 3 个 Foundations 规范板：`Color`（`6:88`）、`Typography`（`6:98`）、`Layout`（`6:108`），全部绑定真实变量与样式。
- `Guideline` 同步更新 `02 Type`、`03 Size`、`Voice & AI Guide`（`7799:867`），并新增 `Navigation search & Energy use Guide`（`7808:860`）。

## 3. 用户偏好与硬性约束（新对话务必遵守）

### 设计与开发

- 第一性原理精简，没用到的字号、间距、变量直接删，不做无用堆砌。
- Figma 分类页只放 Master Components，不手动复制浅色/深色两份。
- Figma 规范页与 Foundations 页严格对齐 Guideline（`01 Color` / `02 Type` / `03 Size`）的瑞士极简排版：`#F5F5F7` 画布直接用 `1px` 细横线分行，左栏分组说明、右栏真样本与中性深色 token 名，不用厚重白底表格框、不用蓝字 token 链接、不用灰底规则框，间距条采用 `12%` 浅蓝填充加 `1px` `#007AFF` 细描边。
- 同一个图标的线性版与面性版必须共享同一轮廓结构；面性图标保持纯填充不额外加描边。
- 紧凑型双色带浮卡（如 `001`、`021`）的外描边必须放在 `::after` 顶层用 `1px` 细描边，不要直接套 `.nv` 默认 `2px` 内阴影。
- 调整组件内部比例时，未经要求不要改动整体外框尺寸。
- 每次改动页面或视频，必须截图核对浅色、深色以及列表页与详情弹窗的一致性后再交付。

### 海外社媒与视频制作（目标 100 条）

- 重点平台在海外：**X**、**LinkedIn**、**YouTube**，文案默认英文。
- 形式固定为 **10 秒、1920×1080、60fps 单组件短视频**，每完成一个组件同步导出到 `/Users/peixin/Desktop/Dashnote-Videos/`。
- 每条视频更换不同建筑质感背景，同时**音频也要每条做变化，风格统一保持极简柔和连贯，严禁碎节拍和叮叮咚咚的敲击感**
  - `000`：暖橄榄米色背景 + C 大调玻璃琴键律动（`Fmaj9 → G6/9 → Am9 → Cmaj9`）
  - `021`：冷调雾灰蓝背景（`#E2E8F0 → #384658`）+ E♭ 大调柔和毛毡钢琴与暖模拟垫音、轻缓低频脉动（`Cm9 → A♭maj9 → B♭6/9 → Fm9 → E♭maj9`）
- 标准 10 秒 120 BPM 卡点结构（**全程浅色模式，不切深色**；窗口底图只画顶部 36px 标题栏，网址文字用静态 `HelveticaNeue.ttc` 4 倍超采样，严禁使用会变形的 `SFNS.ttf` 可变字体；Chrome 必须按内容区原尺寸 `1400 × 874` 配 `deviceScaleFactor: 2` 录制 `2800 × 1748` 再整倍 2 比 1 缩放，禁止 `1440 × 900` 非等比缩放导致文字发虚变形；内容区不做纯白垫底，配合 4x 超采样圆角遮罩彻底消除白边；可复用 `video_studio/clip_021/` 脚本）
  - `1.0s` 打开组件详情（After）→ `2.5s` 切 Before（停留 2.5s）→ `5.0s` 切回 After（停留 2.5s）→ `7.5s` 点击 Copy 出现 `✓` 并停顿到 `10.0s`。
- 系列编号统一按组件进度标 **`Dashnote NNN/100 · Component Name`**（如 `Dashnote 021/100 · Navigation search`），与官网编号和 100 格进度条对齐，不用 `Day N` 或发文序号 `02/100`。
- 用户是 **X 蓝标（Premium）**，不受 280 字符限制，不要为了凑字数删掉“为什么”的底层原因，直接把车机视角和设计取舍讲透（保持简洁直白、少换行即可）。

### 文字与沟通风格（严格执行）

- 参考隔壁对话 `ebe37023-5687-4f24-a2c3-6a99a76072b2`（`知识库文章风格优化`）的口吻。
- **严禁标题党**，用户非常反感夸张营销口吻。
- **正文禁用冒号（`:` / `：`）与破折号（`—`）**（仅 URL 协议头例外）。
- 禁用成语、互联网黑话和 AI 腔套话，直接讲真实设计判断和具体像素参数。
- 少换行，只在逻辑分段或必要格式处换行，不要一句一行切碎。

## 4. 下一步接手方向

- 继续按 100 个组件目标推进 `022` 及后续组件，每做一个同步完成四件事：Figma 组件与规范同步 → Dashline 补缺图标（如有）→ Dashnote 网页接入与 Prompt 评测（≥ 90%）→ 录制 10 秒新背景视频归档到 `/Users/peixin/Desktop/Dashnote-Videos/` 并配齐 X / LinkedIn / YouTube 英文文案。
