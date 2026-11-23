# Julia

一套极简护眼的亮/暗双主题，并同步提供 Zed、OpenCode、Codex CLI、Claude Code 与 Pi 版本。浅色沿用 Linux vim 默认的语义配色（注释蓝 / 关键字橄榄 / 字符串红 / 类型绿 / 函数青）、按暖白底重新定色，暗色移植自 Tsoding 的 Emacs Gruber Darker；两种模式都只在顶部标题栏保留标志性的 go.dev 藏蓝。摒弃冗余的彩虹式高亮，回归干净纯粹的代码阅读体验。

## ✨ 核心特性
- **克制的语法高亮**：仅对核心关键字着色，函数、属性等自定义标识符保持原色，大幅降低视觉噪音，让注意力聚焦在代码逻辑本身
- **一体化界面视觉**：编辑区暖白底 `#f5f5f5`，侧边栏、标签栏等界面区域统一浅灰 `#ededed`；仅顶部标题栏保留 go.dev 藏蓝，底部状态栏不再染色，视觉干净统一
- **统一的暗色体系**：暗色编辑器、侧栏与标签栏统一为 Gruber 炭黑 `#181818`，状态栏再深一档 `#141414`，彩色只出现在语法与哑金强调上
- **长时间编码护眼**：亮色用暖白底 `#f5f5f5` + 深灰字（21:1 → 15.96:1），暗色用哑金与降饱和色（关键字峰值亮度 0.73 → 0.52、正文 12:1 → 10.4:1），避免纯白/纯黑高对比与纯饱和色在散光下产生的光晕、重影和边缘色散；两套主题的所有语法色均达到 WCAG AA（≥4.5:1）
- **完整终端配色体系**：终端底色跟随编辑器（亮 `#f5f5f5` / 暗 `#181818`），ANSI 色系同步降饱和——亮色按 Windows Terminal *Warm Light*，暗色下 ANSI 红从 3.51:1 提到 4.64:1

## 📸 效果预览
### Go 语言代码效果

*仅保留核心语法区分，代码结构清晰不杂乱*

## 🚀 安装方式

### Zed 编辑器支持

本仓库同时提供 Zed 主题扩展（`zed-extension/`），包含 **Simple Dark**、**Simple Light** 两套不透明主题，以及对应的 **Hazy** 毛玻璃变体（借鉴 Subliminal Nightfall Hazy 的透明层级）。安装方式：

1. 将 `zed-extension/` 目录复制到本地任意位置
2. 打开 Zed → `Ctrl+Shift+P` → `zed: install dev extension` → 选择 `zed-extension` 目录
3. 通过 `theme selector: toggle` 选择主题；Hazy 变体建议在 `settings.json` 中添加 `"window_background_blur": 24` 以获得完整毛玻璃效果

### OpenCode TUI 支持

仓库同时提供 OpenCode 自定义主题（`opencode/themes/simple.json`），从上面的 VS Code / Zed 配色自动生成，同时包含亮色与暗色模式，并映射了语法高亮、Markdown、Diff、边框与反馈色。终端无法合成半透明颜色，因此 OpenCode 版本使用不透明色值。

安装：

```bash
mkdir -p ~/.config/opencode/themes
cp opencode/themes/simple.json ~/.config/opencode/themes/
```

重启 OpenCode 后运行 `/themes` 选择 `simple`，或在 `~/.config/opencode/cli.json` 中固定主题与模式：

```json
{
  "theme": {
    "name": "simple",
    "mode": "dark"
  }
}
```

### OpenAI Codex CLI 支持

仓库提供两套 Codex `.tmTheme` 主题（`codex/themes/`）：

- **Simple Dark**：适合深色终端
- **Simple Light**：适合浅色终端

Codex 的 TUI 背景由终端决定，主题主要负责语法高亮、`codex.accent` 强调色和 Diff 背景，因此请按终端明暗选择对应版本。

安装：

```bash
mkdir -p ~/.codex/themes
cp codex/themes/*.tmTheme ~/.codex/themes/
```

在 Codex 中执行 `/theme`，选择 `simple-dark (custom)` 或 `simple-light (custom)`；或在 `~/.codex/config.toml` 中固定：

```toml
[tui]
theme = "simple-dark"
```

### Claude Code 支持

仓库提供两套 Claude Code 自定义主题（`claude/themes/`）：

- `simple-dark.json`：暗色模式
- `simple-light.json`：亮色模式

Claude Code 不控制终端自身的底色，`simple-dark` / `simple-light` 需配合对应明暗的终端使用。

安装：

```bash
mkdir -p ~/.claude/themes
cp claude/themes/*.json ~/.claude/themes/
```

在 Claude Code 中执行 `/theme`，选择 **Simple Dark (custom)** 或 **Simple Light (custom)**；或在 `~/.claude/settings.json` 中固定：

```json
{
  "theme": "custom:simple-dark"
}
```

Claude Code 会监听 `~/.claude/themes/`，修改主题文件后无需重启。

### Pi 支持

仓库提供两套 Pi 主题（`pi/themes/`）：

- `simple-dark.json`：Gruber Darker 暗色调色板
- `simple-light.json`：暖白底 + vim 语义配色（降饱和特调）+ go.dev 藏蓝强调色

Pi 的主题只管角色颜色，终端底色由终端决定，因此请按终端明暗选择对应版本。

安装：

```bash
mkdir -p ~/.pi/agent/themes
cp pi/themes/*.json ~/.pi/agent/themes/
```

然后在 Pi 里执行 `/settings` → **Theme** 选择 `simple-dark` 或 `simple-light`；也可以在 `~/.pi/agent/settings.json` 中固定：

```json
{
  "theme": "simple-light/simple-dark"
}
```

写在前面的作为浅色终端主题，后面的作为深色终端主题；Pi 会根据终端汇报的背景色自动切换。项目级主题也可以放在 `.pi/themes/`。

### 重新生成 TUI 主题

修改 `themes/zed-theme-data/` 中的配色后，可一次性重新生成 Zed、OpenCode、Codex 和 Claude Code 主题：

```bash
npm run build:zed
npm run build:themes
```

也可以单独运行 `npm run build:opencode`、`npm run build:codex` 或 `npm run build:claude`。Pi 主题（`pi/themes/`）为手写角色映射，不参与自动生成。

### 方式一：插件市场安装（推荐）
1. 打开 VS Code → 扩展面板（快捷键 `Ctrl+Shift+X` / `Cmd+Shift+X`）
2. 搜索 `julia`
3. 点击「安装」，完成后通过快捷键 `Ctrl+K Ctrl+T` / `Cmd+K Cmd+T` 切换主题即可

### 方式二：离线 VSIX 安装
1. 从 [Releases 页面](https://github.com/hajiboom/plain-light/releases) 下载最新版 `.vsix` 安装包
2. 打开 VS Code 扩展面板 → 点击右上角「...」→ 选择「从 VSIX 安装...」
3. 选中下载的文件，重启 VS Code 即可生效

## 🎨 配色规范
### Simple Light
| 元素 | 色值 | 说明 |
|---|---|---|
| 编辑器背景 | `#f5f5f5` | 暖白，削弱高对比光晕 |
| 正文 | `#1a1a1a` | 深灰而非纯黑，对比度 15.96:1 |
| 界面背景（侧边栏/标签栏） | `#ededed` | 浅灰层级，干净统一 |
| 标题栏（仅顶部） | `#007894` | go.dev 藏蓝 |
| 状态栏 / 面板 | `#ededed` | 跟随界面浅灰，不再使用藏蓝 |
| 终端背景 | `#f5f5f5` | 暖白 + 低饱和 ANSI |
| 注释 | `#4b6577`（斜体） | vim 蓝的降饱和版（板岩蓝灰），5.62:1；文档注释同色 |
| 核心关键字 | `#7a5c00` | vim 的黄在暖底上收成橄榄，5.74:1 |
| 字符串 | `#a3212b` | vim 的红（深砖红，非纯饱和），6.86:1 |
| 预处理 / 转义 | `#8c3a1e` | 铁锈红，替掉 vim 的洋红以免引入紫色，7.03:1 |
| 类型 / 类名 | `#1a7f37` | vim 的绿，4.66:1 |
| 函数 / 属性 / 标签 | `#0b6a78` | vim 的青（Identifier 族），5.75:1 |
| 数字常量 | `#1a1a1a` | vim 会把字面量染红，这里有意保持正文色 |

### Simple Dark
移植自 Tsoding 的 Emacs Gruber Darker，配色对齐插件市场的 *Tsoding Emacs Gruber Minimal*，并用原版 Emacs 主题的 ANSI 色修正终端里残留的 VS Code 默认蓝。2026-11 起整套降亮降饱和：保留色相（依然是那套 Gruber 棕橙黄绿），只把峰值亮度和饱和度压下来，减轻暗底亮字的光晕与纯饱和色的边缘色散。

| 元素 | 色值 | 说明 |
|---|---|---|
| 编辑器 / 侧边栏 / 标签栏 | `#181818` | Gruber 经典炭黑，界面统一无分层色块 |
| 标题栏（仅顶部） | `#007894` | 标志性 go.dev 藏蓝 |
| 状态栏 / 面板 | `#141414` / `#151515` | 比正文底再深一档，不染藏蓝 |
| 正文 | `#c6c6c6` | 10.40:1（原 `#d4d4d4` 为 11.98:1） |
| 关键字 | `#d8bd55` | 哑金，峰值亮度 0.52 / 饱和度 63%（原 `#ffdd33` 为 0.73 / 100%）；活动栏 / 标签 / 补全选中同步使用 |
| 字符串 | `#7fb757` | 7.45:1 |
| 注释 | `#858585` | 改用 JetBrains Darcula 的注释灰（原 `#7A7A7A` 在 `#181818` 上仅 4.14:1，微调至 4.81:1）；文档注释同步去绿，不再与代码抢注意力 |
| 数字 | `#dc7a45` | 饱和度 68%（原 `#ff6200` 为 100%） |
| 错误 | `#e35d64` | 5.09:1（原 `#f43841` 为 4.64:1） |
| 函数 / 类名 | `#949bb0` | niagara |
| 类型 / 常量 | `#94b0a6` | quartz |
| 属性 / 链接 | `#95a2c9` | |
| 选区 / 选中项 | `#504945` | |

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
- 暗色主题走 Gruber Darker 的暖色路线：炭黑底 + 黄关键字 + 绿字符串，界面不引入第二套色相

## 🐹 关于图标
主题图标采用极简风格的 Gopher 形象，与主题简洁高效的调性一致。Gopher 是 Go 语言的吉祥物，也代表着简单、务实的编码理念。

## 📝 更新日志
### v1.2.5
- 浅色代码高亮从 MATLAB 换成 Linux vim 默认的语义映射（注释蓝 / 关键字橄榄 / 字符串红 / 类型绿 / 函数青），逐色按暖白底重新定亮度与饱和度：去掉紫色字符串，全部 ≥4.5:1
- 暗色整系降亮降饱和（关键字 `#d8bd55`、注释改 JetBrains 灰 `#858585`），并修复侧边栏图标 / 焦点框 / 进度条的可见性（2.01:1 → 5.28–9.58:1）

### v1.2.0
- 暗色主题重做：配色与界面样式整体移植自 Tsoding Emacs Gruber Minimal（`#181818` 炭黑底 / 哑金强调 / `#504945` 选区），清理此前混入的藏蓝、灰蓝与霓虹绿，并补全语义高亮、终端 ANSI 与 Chat/Peek/Diff 等新版 UI 色

### v1.1.0
- 浅色主题代码高亮切换为 MATLAB 经典配色（蓝色关键字 / 紫色字符串 / 森林绿注释 / 金色预处理指令），数字与常量保持黑色原色
- UI 藏蓝风格不变，Zed 浅色主题同步更新

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