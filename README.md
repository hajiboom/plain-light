# Julia

一款极简护眼的 VS Code 浅色主题，支持亮/暗两种主题，暗色主题源自Tsoding Emacs Dark (Gruber Darcula)风格。摒弃冗余的彩虹式高亮，回归干净纯粹的代码阅读体验。

## ✨ 核心特性
- **克制的语法高亮**：仅对核心关键字做加粗处理，函数、属性等自定义标识符保持原色，大幅降低视觉噪音，让注意力聚焦在代码逻辑本身
- **一体化界面视觉**：编辑区纯白底，侧边栏、标签栏等界面区域统一浅灰 `#f3f3f3`，标题栏与状态栏保留 go.dev 藏蓝，视觉干净统一
- **长时间编码护眼**：纯白编辑器底色 `#ffffff` 源自 Debian vim/emacs 的经典质感，高亮精简为四色，大幅降低视觉噪音
- **完整终端配色体系**：终端纯白底 `#ffffff`，搭配经典 ANSI 色系，命令输出清晰不刺眼

## 📸 效果预览
### Go 语言代码效果

*仅保留核心语法区分，代码结构清晰不杂乱*

## 🚀 安装方式

### Zed 编辑器支持

本仓库同时提供 Zed 主题扩展（`zed-extension/`），包含 **Simple Dark**（不透明）与 **Simple Dark Hazy**（毛玻璃透明，借鉴 Subliminal Nightfall Hazy 的透明层级）两个变体。安装方式：

1. 将 `zed-extension/` 目录复制到本地任意位置
2. 打开 Zed → `Ctrl+Shift+P` → `zed: install dev extension` → 选择 `zed-extension` 目录
3. 通过 `theme selector: toggle` 选择主题；Hazy 变体建议在 `settings.json` 中添加 `"window_background_blur": 24` 以获得完整毛玻璃效果

### 方式一：插件市场安装（推荐）
1. 打开 VS Code → 扩展面板（快捷键 `Ctrl+Shift+X` / `Cmd+Shift+X`）
2. 搜索 `julia`
3. 点击「安装」，完成后通过快捷键 `Ctrl+K Ctrl+T` / `Cmd+K Cmd+T` 切换主题即可

### 方式二：离线 VSIX 安装
1. 从 [Releases 页面](https://github.com/hajiboom/plain-light/releases) 下载最新版 `.vsix` 安装包
2. 打开 VS Code 扩展面板 → 点击右上角「...」→ 选择「从 VSIX 安装...」
3. 选中下载的文件，重启 VS Code 即可生效

## 🎨 配色规范
| 元素 | 色值 | 说明 |
|---|---|---|
| 编辑器背景 | `#ffffff` | 纯白（Debian vim/emacs 风格） |
| 界面背景（侧边栏/标签栏） | `#f3f3f3` | 浅灰层级，干净统一 |
| 标题栏 / 状态栏 | `#007894` | go.dev 藏蓝（保留） |
| 终端背景 | `#ffffff` | 纯白，贴近原生终端 |
| 核心关键字 | `#007894` | go.dev 藏蓝，与主题一致 |
| 字符串 | `#a31515` | 暗红 |
| 注释 | `#608b4e`（斜体） | 灰绿色，不干扰主代码阅读 |
| 数字常量 | `#098658` | 暗绿色，与字符串自然区分 |

## 🔧 自定义调整
如果需要微调配色或高亮规则，可选择两种方式：

### 轻量修改（无需重新打包）
直接在 VS Code 的 `settings.json` 中，通过 `workbench.colorCustomizations` 和 `editor.tokenColorCustomizations` 字段覆盖对应配置即可，适合局部颜色微调。

### 深度定制
1. Fork 本仓库
2. 修改 `themes/simple-light-color-theme.json`（或 `simple-dark-color-theme.json`）中的配色规则
3. 使用 `vsce package` 命令打包为 VSIX 文件，本地安装使用

## 💡 设计理念
多数浅色主题要么过度高亮、色彩杂乱，要么对比度不足、阅读费力。simple-light 遵循「少即是多」的原则：
- 拒绝彩虹式高亮，只保留最必要的语法区分，减少视觉负担
- 统一界面灰度层级，避免多色块分散注意力
- 所有色值均经过长时间阅读测试，兼顾辨识度与舒适度，适配日间办公、靠窗自然光等多种光线环境
- 暗色主题融合了Go.dev配色

## 🐹 关于图标
主题图标采用极简风格的 Gopher 形象，与主题简洁高效的调性一致。Gopher 是 Go 语言的吉祥物，也代表着简单、务实的编码理念。

## 📝 更新日志
### v1.0.0
- 新增 Zed 编辑器同款主题扩展（不透明 + 毛玻璃两种变体）
- dark/light 主题细节全面打磨：暗色主题文本降亮度、函数改为哑光白、修复状态栏 remote 图标高亮；浅色主题关键字对比度增强、菜单与侧边栏层级区分

### v0.0.1（初始版本）
- 发布首个稳定版本
- 支持核心语法高亮规则
- 统一全界面 UI 配色
- 补全终端 ANSI 全色值

## 🤝 参与贡献
欢迎提交 Issue 反馈问题，或提交 PR 优化主题、补充更多语言的高亮适配，共同完善使用体验。

## 📄 开源协议
MIT License © 2024 hajiboom