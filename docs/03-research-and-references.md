# 调研与参考

## 内容形式参考

| 网站 | 值得学的 |
|---|---|
| [topinspo.design/vocabulary](https://topinspo.design/vocabulary) | 每个词条一个设计概念；可交互对比（如 Linear vs Ease-out）；一句解释；"Say to AI"可复制提示词；按问题分组（Cramped / No focus / Muddy / Stiff） |
| [vibedesign.tips](https://vibedesign.tips/) | 编号连载 001–022；每条标 X 阅读和点赞；"Diagnosing and fixing …"系列；按 Motion / Interaction / Components / Type & Layout / Effects 分类 |
| [Dashline](https://paxton0209.github.io/Dashline/) | 自己的作品：侧栏分类带数量；分组标签 + 网格；细线分隔；详情弹窗（大预览 + 网格背景 + Copy SVG） |

## AI + 设计参考库

| 产品 | 说明 |
|---|---|
| [Mobbin MCP](https://mobbin.com/mcp) | 2026 年 5 月上线，把 60 多万真实界面开放给 AI 工具，付费可用 |
| [DAG Screens / Open Screens](https://www.cardesignnews.com/screens/1460.bio) | 车机界面对标平台，面向车企、Tier1、设计公司；免费版每日观看时长有限 |
| [MockFlow Automotive HMI skill](https://mockflow.com/skills/automotive-hmi-infotainment) | 生成暗色高对比线框图。亲测效果不好 |

## 平台与工具（2026-11 查证）

- **Qt**：Figma to Qt 1.0 是 Qt Bridge for Figma 的继任者，直接生成 QML，支持 Figma 库和 token。
- **Kanzi**：Kanzi Figma Importer 支持组件、组件属性、实例替换、变体；布局状态需在 Kanzi 里手工重建。
- **Android Compose**：Google 的 Relay 已于 2025-04-30 下线，没有可量产的 Figma → Compose 一键方案。
- **Unreal**：已有 35+ 车型 HMI 基于 Unreal（Ford、GM、Rivian、Geely、Lotus、Volvo 等）。
- **Design Tokens**：DTCG 规范 2025.10 发布首个稳定版。
- **Figma 变量 REST API**：仅 Enterprise；插件 API 无此限制，变量同步要走插件。

## 北美座舱市场（2026-11 查证）

- Android Automotive / Google built-in：Ford、GM、Volvo；Subaru 2026 Outback 起；GM 新车型逐步去掉 CarPlay / Android Auto。
- Gemini 已推送到 Google built-in 车型（美国英语优先）。
- AAOS SDV：扩展到仪表、座椅、空调等，计划 2026 年晚些时候进 AOSP。
- Apple CarPlay Ultra：Acura、Aston Martin、Ford、Genesis、Honda、Hyundai、Kia 等计划支持；Audi、Mercedes-Benz、Polestar、Renault、Volvo 明确不支持。
- AAOS 第三方 App 走模板库，颜色只能定两个强调色；车企可通过 RRO 覆盖层定制。

## Dashnote 的 AI Prompt 与 Before / After 设计调研

2026-11-23 · 32 个新增参考，另复核了已找到的两个网站。

### 判断

Dashnote 最值得做深的是**把一条座舱设计规则变成可见、可定位、可复用的改动**。读者来到一条案例要完成三个动作：看懂差异、判断为什么要改、把修正 Prompt 带回自己的项目。对照区域固定，同一个变化在两个状态中都能定位，读者就少一次重新找位置的成本。Prompt 固定在同一处，读者看完任一状态都能直接复制。

Vibe Design Tips 擅长把一个局部问题做成独立、可持续发布的条目。以空状态、选择控件和缓动为例，它给每条一个可独立传播的标题，再展开如何诊断或取舍。Topinspo 把入口换成读者自己的症状，如 Cramped、No focus、Muddy 和 Stiff。Easing 词条让读者在同一面板反复播放 Linear 与 Ease-out，下方给出曲线参数和一条可直接使用的指令。前者解决选题颗粒度，后者解决读者怎样看懂差异。[Vibe Design Tips](https://vibedesign.tips/) · [Topinspo Design Vocabulary](https://www.topinspo.design/vocabulary)

### 最值得先研究的案例

| 案例 | 它怎么做 | Dashnote 可借用的部分 |
|---|---|---|
| [Sina Builds](https://www.sinabuilds.com/blog/fix-generic-ai-design-prompt-recipes) | 用同一个虚构产品演示 12 类 UI 问题，每组附前后图、修正 Prompt 和验收方法，明确图片是构造的教学示例。 | 每条写清可观察的失败，附一个可检查的结果。正式模型输出、教学重绘和 Figma 参考各自标明来源。 |
| [REFRAME](https://reframeweb.com/examples/gallery/) | 列表里先用缩略图交代旧站与改版，详情可打开两页实时并排，同一原站还可以看不同风格方向。 | 卡片负责扫读，详情负责放大检查。地图、全屏布局等整体构图题可以考虑实时并排。 |
| [WE](https://we.inc/guides/web-design-principles) | 把层级、对齐和接近性等原则做成可就地切换的 Before / After 小例子。 | 保持画布和对象位置稳定。读者看切换后的差异时可以继续盯着同一块区域。 |
| [uWarp](https://www.uwarp.design/design-prompts) | 用同一落地页展示不同主题，预览、说明和 Prompt 随样式选择联动。 | 固定任务、文案和画布，控制要教学的变量。 |
| [ShowMotion](https://showmotion.bohehub.com/) | 先播放可见效果，再给名称、可展开 Prompt 和复制动作。模板将应用位置留给读者填写。 | 给复用指令保留变量，如控件、触发与退出条件。实验用的固定输入放在说明里。 |
| [Workbench](https://workbench.design/modules/ai-redesign) | 从现有站点提取结构，生成前审查资料，生成后可对照原站、迭代版本和手机预览。 | 专业案例可以展示输入和版本。记录发生变化的材料和文案。 |
| [DesignPrompts](https://designprompts.dev/) | 先选择页面模板，再选择风格，预览和 Prompt 联动。 | 独立记录任务和改动变量。对照时先固定任务。 |
| [ReBrandMyAI](https://rebrandmyai.com/transformations/) | 展示虚构产品的 AI 基线或手工基线与人工主导的改版，并解释设计决策。 | 当 After 由设计师或 Figma 提供时，保留来源，读者可以判断哪里需要自己的设计判断。 |

### 其他参考

| 参考 | 展示方式及可看的细节 |
|---|---|
| [Anticode](https://anticode.dev/guides/ai-website-builder-prompt-examples) | 12 个 Prompt 改写以表格并排，第四列标明最有影响的一条补充信息。适合研究如何压缩 Prompt 差异。 |
| [Jiro](https://jiro.build/) | 用整页和区块的实时预览引导复制。可看预览和复制入口的距离。 |
| [UIGrammer](https://uigrammer.com/) | 将术语、组件、风格和完整主题放在同一个库。可看命名如何连到可执行 Prompt。 |
| [UI Promptly](https://github.com/dotHP-harshu/ui-promptly) | 在详情的实时预览、优化设计说明和原始 Prompt 间切换。可参考证据入口的分层。 |
| [Design for AI](https://designforai.dev/styles) | 每种风格配同构示例页、数值化 Prompt 和可下载规则文件。可参考用同一标本比较，以及规范的复用方式。 |
| [Superdesign Prompts](https://github.com/superdesigndev/superdesign-prompts) | 设计规范和实时示例成对，按界面类型及风格检索。可研究规模变大后的索引。 |
| [VibePrompt](https://vibeprompts.dev/) | 用 Hero、Pricing、导航等组件的任务分类组织 Prompt 与 Tailwind 示例。适合研究较大规模的任务检索。 |
| [DesignXstream](https://www.designxstream.com/ui-prompt-library) | 将交互热点、对比组件等拆成可直接复制的模式。可看对比组件本身如何被描述成 Prompt。 |
| [v-1.design](https://v-1.design/library/guide) | 从可运行示例出发，整站构建和逐屏构建分别指导，要求构建后对照 demo。可参考给 Prompt 附验收要求。 |
| [Refero Styles](https://styles.refero.design/) | 把真实网站的样式拆成规范与 DESIGN.md。可看项目规则如何打包成可导入的资产。 |
| [Ping](https://ping.design/prompts/) | 以真实网站为参考，把样式转成 Prompt，同时提供查看原站的入口。可借用可溯源的参考链接。 |
| [Base44 Prompt Library](https://b44-prompts.base44.app/) | 将成品提示词按按钮、布局和流程等粒度组织。可对照编辑侧的模板检索逻辑。 |
| [Siteprint](https://siteprint.app/website-to-prompt/) | 用划线和替换值展示两份设计的样式差异，再生成修正 Prompt。可借用“值 A → 值 B”的精确表达。 |
| [Upscale Motion Pack](https://upscalecreativeclub.com/motion-pack) | 单条动效提供短预览和可展开的长 Prompt，09 是 Before/After 拖动示例。可研究快速复制与阅读全文如何共存。 |
| [First CH Designs](https://designs.first-ch.com/en) | 拖动对照分隔线时，变化说明跟着分隔线移动。适合研究整屏长图上的就地标注。 |
| [Pinky UI](https://pinkyui.com/systems/before-after/) | 同一画框内用原生 range 移动分隔线。对完全对齐的前后图，滑块能给出连续、可键盘操作的对照。 |
| [shadcn.io Before After Gallery](https://www.shadcn.io/blocks/gallery-before-after) | 比较滑块和多项图库结合。可看主题切换与同一项对照的控件如何分开。 |
| [Motion Image Reveal Slider](https://motion.dev/examples/js-image-reveal-slider) | 用拖动驱动遮罩，适合连续图像揭示。仪表文字密集时要验证遮罩会不会把关键读数组切断。 |
| [Easing Wizard](https://easingwizard.com/) | 把参数、曲线和预览连接起来。可参考动效案例中修改一个参数、立即看反馈的方式。 |
| [Master Design Motion Craft](https://design.master.co/craft/motion) | 用可控示例解释反转、退出、分组和减弱动态。适合参考 Motion 章节的变量控制。 |
| [Refactoring UI](https://refactoringui.com/) | 用具体视觉示例讲层级、对比和留白，通常从局部可修改的决策开始。可看一条内容应该切多细。 |
| [DesignArena](https://www.designarena.ai/) | 让读者比较模型产出。这里移动的是模型变量，Dashnote 的 Prompt 实验应固定模型。 |
| [GoodUI](https://goodui.org/) | 用真实 A/B 案例和结果呈现改动及证据等级。可借用其证据意识，转换率结论留在原测试场景。 |
| [ProcessGallery](https://ejane.me/assets/pdf/papers/yen2024processgallery.pdf) | 研究者用同主题的早期与最终设计解释原则，以原则为索引配对案例。可借用案例匹配和教学说明，原研究的任务是海报设计。 |

以上涵盖直接同类、可借鉴的局部交互和证据展示方式。我核对了公开页面、作者资料或研究原文。各站的付费功能和 Prompt 的跨模型效果待测。Topinspo 的词条与文案通过站点 HTML 核对。

### 落到 Dashnote 的 001

| 读者想搞清楚的事 | 这版怎么处理 |
|---|---|
| 画面哪变了 | 同一位置切换 Before 和 After。下方一直显示方向图标、距离、下一步与到达时间三组前后值。点行标题会在两种状态的对应区域定位。 |
| 为什么这么改 | 原则放在对照下方。导航面板让当前转向和剩余距离优先进入视线，下一步与 ETA 降为第二层。 |
| 我该给 AI 什么 | Prompts 展开后同时看到两次输入，Copy prompt 固定复制带座舱规则的版本，Before 状态也可用。Figma SVG 仍有独立复制入口。 |
| 这两张图和测试是什么关系 | 页面标明对照为重绘。测试说明单独交代了四次 Claude 运行、固定内容、Figma 图标和输出格式。SSIM 0.970–0.991 是相对 Figma 参考的图像相似度。 |

[001 原始测试记录](https://github.com/Paxton0209/cockpit-practice-log/tree/main/tests/001)（私有仓库）

下一条内容可以复用这套结构。发版前针对同一条样例固定模型、输入素材、内容、画布和渲染环境，分别保存默认 Prompt 和规则 Prompt 的首份原始输出，再记录模型版本及人工改动。图像相似度回答的是“有多像参考”。如果要判断“驾驶者是否更快读对”，需要另做有明确任务和正确答案的测试，例如限时曝光后回答距离与转向，再记录读对率。网页测试可以检验可读性假设，实车表现仍需在相应驾驶条件下验证。
