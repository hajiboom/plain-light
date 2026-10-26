# Change Log

All notable changes to the "julia" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [Unreleased]
- 新增 OpenCode TUI 自定义主题：`opencode/themes/simple.json`，由 Zed 配色数据生成，包含亮/暗模式并映射语法、Markdown、Diff 与反馈色
- 新增 `scripts/build-opencode-theme.js` 与 `npm run build:opencode`

## [1.1.0] - 2026-10-10
- 浅色主题代码高亮改为 MATLAB 经典配色：关键字 `#0000FF`、字符串 `#A020F0`、注释 `#228B22`、预处理指令 `#B28C00`，数字/常量回归黑色原色；标题栏/状态栏藏蓝与 UI 配色保持不变
- 同步更新 Zed 浅色主题（Simple Light / Simple Light Hazy）语法配色

## [1.0.0] - 2026-09-15
- 新增 Zed 主题扩展：Simple Dark / Simple Dark Hazy（毛玻璃透明，融合 Subliminal Nightfall Hazy 透明层级）
- dark 主题：白色文本整体降亮度，Function 改为哑光白，状态栏 remote 图标与背景同色
- light 主题：关键字加深提升对比度，状态栏 remote 图标停止高亮，菜单与白色背景区分层级
- 打包版本升级至 1.0.0

- 浅色主题大改版：编辑区改为 Debian vim/emacs 风格纯白底，高亮精简为四色（藏蓝关键字 / 暗红字符串 / 灰绿注释 / 暗绿常量），函数、类型等标识符保持原色，标题栏与状态栏保留 go.dev 藏蓝，标题栏控制按钮改白色
