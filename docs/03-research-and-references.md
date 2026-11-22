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
