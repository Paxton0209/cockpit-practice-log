# 13 · Dashnote 交接（2026-11-24）

从本地 `sheet-motion` 分支的 `save/2026-11-24-claude-handoff` 接手。网页入口是 [site/index.html](../site/index.html)，本机预览在 [Dashnote](http://127.0.0.1:55226/#home)。预览进程关闭时，在仓库根目录运行 `python3 -m http.server 55226 --bind 127.0.0.1 --directory site`。这是本地检查点，线上发布状态以此前记录为准。

## 当前网页版本

首页有 12 个条目，编号为 001、002、003、005 至 013。004 App list 已退出首页、分类和详情路由，原有代码与 Before 源稿保留在仓库里。013 Multi-stop itinerary 使用英文文案和独立卡片，地图底图留在 Figma 参考场景。卡片为 560 × 444 px，四个标记与虚线共用一条轴，地点和距离共享文字左线，两个到达时间完整右对齐，底部只显示 Edit stops。十个浅深色 SVG 在 [site/itinerary](../site/itinerary)，独立生成的 Before 和原始提问在 [tests/013](../tests/013)。

007 Locks 最后一轮加大了 Child lock 到卡片上缘，以及最后一行说明到卡片下缘的留白。上下内边距各为 28 px，四个组件组间距为 12 px，三个开关行高各 104 px。After 卡片为 772 × 536 px，Before 的网页外框也适配到相同尺寸，原始 772 × 520 px 的 brief 和 [Before 源稿](../tests/007/before.html)留作生成记录。首页另用 003 Place details 作基准对齐 007 的卡片上缘。详情完整显示整张卡片与 Before/After 切换。

005 Update settings 两行之间为 8 px，右箭头为 3 px 线宽。006 Opening tiles 的图标和文字用一级前景色，008 Confirm dialog 正文用二级前景色。001 Turn-by-turn 和 011 Tire pressure 的封面比例已调平，011 网页卡片为 800 × 400 px，浅深色分别用 65% 和 70% 填充及 12 px 背景模糊，车图用 154 × 332 px 矢量。012 Dial pad 的号码为 48 px，删除图标为 72 px、3 px 线宽，详情保留完整通话键。009 Search 键用半透明中性填充，012 通话键用半透明绿。卡片阴影共用 `--preview-shadow`，两种主题用相同几何参数和各自透明度。

Prompt 区按钮统一显示 Copy。成功时原图标短暂变勾，失败时变叉，切换时按钮宽度一致，屏幕阅读器有状态反馈。已通过浏览器验证复制成功、失败和复位。存档时重新验证了 12 个详情入口和 Before 切换，确认 013 的两张卡片尺寸都是 560 × 444 px，十个 SVG 均能加载，内嵌 Before 与保存的首稿一致。007 的上下留白、对比尺寸和裁切边界已在宽度为 1539、390 和 320 px 的浏览器里核对。

## 继续修改时

依用户下一轮反馈处理。界面文案保持英文，优先复用自家组件和语义色。新的 Before 用独立、简短的内容需求和尺寸生成，保存原始提问与首稿，并核对两个对比预览的实际外框尺寸。封面的构图与卡片内部的间距分别检查，尤其是 003 和 007 的外缘对齐，以及 007 标题与最后一行说明的内缘留白。

Figma 源文件是 UI/UX Library（`qiPTH6OH2yigVKfIavhQbI`），Examples 页面含 011 和行程示例。标题栏和列表行的尾部定位用横向 Auto Layout 固定间距、左侧 Fill、右侧 Fixed 或 Hug。从主组件修复，核对实例的覆盖，并进入实例选择子层后复查右边缘坐标、长文案和深浅主题。此前已把规则补进 [12-session-handoff.md](12-session-handoff.md)。本次存档核对的是本地网页，Figma 全库检查状态待核实。
