const fs = require('fs');
const path = require('path');
const JSON5 = require('json5');

const repo = path.join(__dirname, '..');
const dataDir = path.join(repo, 'themes', 'zed-theme-data');
const outDir = path.join(repo, 'zed-extension', 'themes');

// keys whose alpha should be stripped to fully opaque (full-surface colors)
const opaqueKeys = new Set([
  'background',
  'editor.background',
  'editor.gutter.background',
  'editor.subheader.background',
  'editor.element.background',
  'editor.highlighted_line.background',
  'terminal.background',
  'terminal.ansi.background',
  'title_bar.background',
  'title_bar.inactive_background',
  'status_bar.background',
  'tab_bar.background',
  'tab.active_background',
  'tab.inactive_background',
  'panel.background',
  'panel.overlay_background',
  'surface.background',
  'elevated_surface.background',
  'element.background',
  'element.hover',
  'element.active',
  'element.selected',
  'element.disabled',
  'ghost_element.background',
  'ghost_element.hover',
  'ghost_element.active',
  'ghost_element.selected',
  'ghost_element.disabled',
  'notification.background',
  'scrollbar.track.background',
  'hint.background',
  'predictive.background',
  'editor.hunk.background',
  'drop_target.background',
  'border.transparent'
]);

const toOpaque = (style) => {
  const out = {};
  for (const [k, v] of Object.entries(style)) {
    if (k === 'background.appearance') continue;
    if (typeof v === 'string' && /^#[0-9a-fA-F]{8}$/.test(v)) {
      out[k] = opaqueKeys.has(k) ? v.slice(0, 7) + 'FF' : v.slice(0, 7) + v.slice(7);
    } else if (k === 'status_bar.background') {
      out[k] = v.slice(0, 7) + 'FF';
    } else {
      out[k] = v;
    }
  }
  return out;
};

function load(file) {
  const src = JSON5.parse(fs.readFileSync(path.join(dataDir, file), 'utf8'));
  const t = src.themes[0];
  return { family: src.name, name: t.name, appearance: t.appearance, style: t.style };
}

const out = {
  $schema: 'https://zed.dev/schema/themes/v0.2.0',
  author: 'neoh',
  name: 'Simple',
  themes: []
};

for (const file of ['simple-dark-hazy.json', 'simple-light-hazy.json']) {
  const { name, appearance, style } = load(file);
  out.themes.push({ name: name.replace(' Hazy', ''), appearance, style: toOpaque(style) });
  out.themes.push({ name, appearance, style });
}

fs.writeFileSync(path.join(outDir, 'simple.json'), JSON.stringify(out, null, 2));
fs.rmSync(path.join(outDir, 'simple-dark.json'), { force: true });
console.log(out.themes.map((t) => `${t.name} (${t.appearance})`).join(', '));
