# Change Log

All notable changes to the "julia" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [1.2.2] - 2026-11-16
### 暗色主题：降亮降饱和（与浅色同一套思路）
- 检出问题：关键字黄 `#ffdd33` 对比度 13.23:1、峰值亮度 0.73、饱和度 100%；数字 `#ff6200` 与 warning `#ff9b21` 饱和度 100%；error `#f43841` 4.64:1 / 饱和度 90%；终端 brightYellow `#ffe566` 峰值亮度 0.78、brightWhite `#f4f4ff` 0.91；ANSI 红 `#c73c3f` 仅 3.51:1。暗底上的高亮度、纯饱和字会“外溢”成光晕，散光下更明显，且纯饱和度的边缘会被眼球色差抹出色带
- 正文 `#d4d4d4` → `#c6c6c6`（11.98:1 → 10.40:1），二级 UI 文字 `#cccccc` → `#bfbfbf`，行号 `#b3b3b3` → `#9a9a9a`；纯白 UI 文字降为 `#e8e8e8`，但标题栏、按钮、徽标、调试状态栏等色块上的文字仍保留 `#ffffff`
- 色相不变，只压饱和度与峰值亮度：关键字 `#ffdd33` → `#d8bd55`（0.73 → 0.52、100% → 63%），字符串 `#79bf46` → `#7fb757`，数字 `#ff6200` → `#dc7a45`（100% → 68%），error `#f43841` → `#e35d64`（4.64 → 5.09:1），warning `#ff9b21` → `#d99f57`，conflict `#f1a5ab` → `#dc9ba1`，modified `#e2c08d` → `#d6b98d`
- 终端：bright 系列同步降亮（亮黄 0.78 → 0.62、亮白 0.91 → 0.75），ANSI 红 `#c73c3f` → `#d05f61`（3.51 → 4.64:1），终端正文与编辑区正文对齐为 `#c6c6c6`
- 语法色在 `#181818` 上全部 ≥4.5:1；同步重生成 Zed（Simple Dark / Hazy）、OpenCode、Codex CLI、Claude Code 暗色主题与 Pi 暗色配置；浅色主题本轮未改动

## [1.2.1] - 2026-11-16
### 浅色主题：暖白降对比（散光友好）
- 底色由纯白 `#ffffff` 改为暖白 `#F5F5F5`，正文由纯黑改为深灰 `#1a1a1a`（白底对比度 21:1 → 15.96:1），降低高对比边缘的光晕（halation）与重影；界面浅色分层层级同步下移一档（侧栏/状态栏 `#ededed`、标签栏 `#ebebeb`、浮层 `#fafafa`、活动栏 `#e7e7e7`），行高亮改为 `#ededed` 以免与底色重叠
- 语法配色保留 MATLAB 骨架但整体降饱和、降亮度：关键字 `#0000FF` → `#1b4b8f`，字符串 `#A020F0` → `#7a1fa2`，注释 `#228B22` → `#1a7f37`，预处理指令 `#B28C00` → `#8a6100`，藏蓝 `#000080` → `#123c63`，转义 `#7F007F` → `#5c1880`。纯蓝/纯紫在视网膜前方成像（纵向色差），长时间阅读会持续触发调节抖动，散光人群尤其明显，故一并压掉
- 原因是只改背景会**降低**可读性：注释绿在纯白底为 4.39:1，换到 `#F5F5F5` 后跌至 4.03:1，预处理金由 3.16:1 跌至 2.90:1，均低于 WCAG AA。重校后注释 4.66:1、预处理金 5.08:1、关键字 7.86:1、字符串 7.57:1
- 状态色与终端 ANSI 换用低饱和暖色系：红 `#b31d28`、绿 `#1a7f37`、黄 `#976404`、品红 `#7a1fa2`、青 `#0e6e7a`、蓝 `#1b4f8f`；终端底色与编辑区一致为 `#F5F5F5`
- 同步重生成 Zed（Simple Light / Simple Light Hazy）、OpenCode、Codex CLI 的 Simple Light，并同步 Claude Code 与 Pi 的浅色主题配置；暗色主题未改动

## [1.2.0]
- 暗色主题整体重做：配色与界面样式移植自 Tsoding Emacs Gruber Minimal（`#181818` 炭黑底、`#ffdd33` 关键字/强调色、`#79bf46` 字符串、`#c18132` 注释、`#ff6200` 数字、`#949bb0` 函数、`#94b0a6` 类型/常量、`#504945` 选区），移除此前混入的藏蓝状态栏、灰蓝选中色与霓虹绿；补全 semanticTokenColors、终端 ANSI、Chat/Peek/Diff/Git 装饰等新版 UI 配色
- 藏蓝"go.dev"配色改为只保留在顶部标题栏：暗色状态栏改用 `#141414`，浅色状态栏改用 `#f3f3f3`；VSCode 与 Zed 主题同步调整
- Zed 暗色主题（Simple Dark / Simple Dark Hazy）整套换成新的 Gruber 调色板，OpenCode、Codex、Claude Code 主题由新调色板重新生成
- 新增 Pi 主题：`pi/themes/simple-dark.json`、`pi/themes/simple-light.json`，覆盖消息、工具、Markdown、Diff、语法与 thinking 渐变
- 新增 OpenCode TUI 自定义主题：`opencode/themes/simple.json`，由 Zed 配色数据生成，包含亮/暗模式并映射语法、Markdown、Diff 与反馈色
- 新增 Codex CLI 主题：`codex/themes/simple-dark.tmTheme`、`simple-light.tmTheme`
- 新增 Claude Code 主题：`claude/themes/simple-dark.json`、`simple-light.json`
- 新增 `scripts/build-opencode-theme.js`、`scripts/build-codex-theme.js`、`scripts/build-claude-theme.js` 与 `npm run build:themes`

## [1.1.0] - 2026-10-10
- 浅色主题代码高亮改为 MATLAB 经典配色：关键字 `#0000FF`、字符串 `#A020F0`、注释 `#228B22`、预处理指令 `#B28C00`，数字/常量回归黑色原色；标题栏/状态栏藏蓝与 UI 配色保持不变
- 同步更新 Zed 浅色主题（Simple Light / Simple Light Hazy）语法配色

## [1.0.0] - 2026-09-15
- 新增 Zed 主题扩展：Simple Dark / Simple Dark Hazy（毛玻璃透明，融合 Subliminal Nightfall Hazy 透明层级）
- dark 主题：白色文本整体降亮度，Function 改为哑光白，状态栏 remote 图标与背景同色
- light 主题：关键字加深提升对比度，状态栏 remote 图标停止高亮，菜单与白色背景区分层级
- 打包版本升级至 1.0.0

- 浅色主题大改版：编辑区改为 Debian vim/emacs 风格纯白底，高亮精简为四色（藏蓝关键字 / 暗红字符串 / 灰绿注释 / 暗绿常量），函数、类型等标识符保持原色，标题栏与状态栏保留 go.dev 藏蓝，标题栏控制按钮改白色
