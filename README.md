# Plain Light

A minimal, eye-friendly light theme for VS Code, inspired by Vim's default style. No fancy highlights, just clean code reading experience.

## 🌟 Features
- **Minimal Highlight**: Only core keywords are bolded, custom identifiers (functions/properties) are unbolded.
- **Unified UI**: Consistent color for title bar, sidebar, and status bar (soft gray `#f5f5f5`), no visual fragmentation.
- **Eye-Friendly**: Low-saturation colors, warm off-white background (`#f8f8f8`), reduces eye strain during long coding sessions.
- **Rich Terminal Colors**: Terminal background is slightly darker (`#f0f0f0`) than editor, with soft ANSI colors for better readability.

## 📸 Screenshots
### Code Preview (Go Language)
![Code Preview](https://github.com/hajiboom/plain-light/blob/main/images/screen-go.png)
*Note: Screenshot shows Go code with Plain Light theme, highlighting core keywords and minimal syntax styling.*

## 🚀 Installation
### Method 1: Install from VS Code Marketplace
1. Open VS Code → Extensions (Ctrl+Shift+X)
2. Search for "Plain Light"
3. Click "Install" and activate the theme (Ctrl+K → Ctrl+T)

### Method 2: Install from VSIX (Offline)
1. Download the latest VSIX file from [Releases](https://github.com/your-username/plain-light/releases)
2. Open VS Code → Extensions → Click "..." → "Install from VSIX..."
3. Select the downloaded VSIX file and restart VS Code

## 🎨 Color Palette
| Element               | Color Code |
|-----------------------|------------|
| Editor Background     | #f8f8f8    |
| UI Background (Sidebar/Title Bar) | #f5f5f5 |
| Terminal Background   | #f0f0f0    |
| Core Keywords         | #000080 (bold) |
| Strings               | #a31515 (italic) |
| Comments              | #608b4e (italic) |
| Numbers               | #098658 (italic) |

## 🔧 Customization
If you want to adjust colors or highlights, you can:
1. Fork this repository
2. Modify `themes/plain-light.json`
3. Package into VSIX (using `vsce package`) and install locally

## 🐹 About the Icon
The icon features a minimal Gopher mascot, matching the theme's simple and clean style. Gopher is the mascot of Go language, representing simplicity and efficiency.

## 📝 Changelog
### v0.0.1 (Initial Release)
- First stable version with core features:
  - Minimal syntax highlighting
  - Unified UI colors
  - Eye-friendly color scheme
  - Rich terminal colors

## 🤝 Contributing
Contributions are welcome! Feel free to open issues or pull requests to improve the theme.

## 📄 License
MIT License © 2024 [Your Name]