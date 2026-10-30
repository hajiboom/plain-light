const fs = require('fs');
const path = require('path');
const JSON5 = require('json5');

const repo = path.join(__dirname, '..', '..');
const dataDir = path.join(repo, 'themes', 'zed-theme-data');

// Terminals cannot composite alpha, so every source color is flattened to an
// opaque hex value before it reaches a terminal theme.
const opaque = (value) => (value.length === 9 ? value.slice(0, 7) : value);

function parseHex(hex) {
  const value = hex.slice(1);
  return [
    parseInt(value.slice(0, 2), 16),
    parseInt(value.slice(2, 4), 16),
    parseInt(value.slice(4, 6), 16),
  ];
}

function toHex([r, g, b]) {
  return `#${[r, g, b]
    .map((c) => Math.round(Math.max(0, Math.min(255, c))).toString(16).padStart(2, '0'))
    .join('')}`;
}

function mix(foreground, background, alpha) {
  const fg = parseHex(foreground);
  const bg = parseHex(background);
  return toHex(fg.map((c, i) => bg[i] + (c - bg[i]) * alpha));
}

function shimmer(color, mode) {
  return mix(color, '#ffffff', mode === 'dark' ? 0.35 : 0.25);
}

function loadStyle(file) {
  const src = JSON5.parse(fs.readFileSync(path.join(dataDir, file), 'utf8'));
  return src.themes[0].style;
}

function palette(style, mode) {
  const color = (key) => opaque(style[key]);
  return {
    mode,
    background: color('background'),
    editorForeground: color('editor.foreground'),
    lineNumber: color('editor.line_number'),
    muted: color('text.muted'),
    faint: color('text.disabled'),
    accent: color('text.accent'),
    border: color('border.variant'),
    scrollbar: color('scrollbar.thumb.background'),
    added: color('version_control.added'),
    removed: color('version_control.deleted'),
    modified: color('version_control.modified'),
    error: color('error'),
    warning: color('warning'),
    success: color('success'),
    info: color('info'),
    addedBright: color('terminal.ansi.bright_green'),
    removedBright: color('terminal.ansi.bright_red'),
    syntax: style.syntax,
  };
}

function loadPalettes() {
  return {
    dark: palette(loadStyle('simple-dark-hazy.json'), 'dark'),
    light: palette(loadStyle('simple-light-hazy.json'), 'light'),
  };
}

module.exports = {
  repo,
  dataDir,
  opaque,
  parseHex,
  toHex,
  mix,
  shimmer,
  loadStyle,
  palette,
  loadPalettes,
};
