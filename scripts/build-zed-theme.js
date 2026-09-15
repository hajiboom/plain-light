const fs = require('fs');
const JSON5 = require('json5');
const home = process.env.HOME;

const hazy = JSON5.parse(fs.readFileSync(home + '/.config/zed/themes/simple-dark-hazy.json', 'utf8'));
const style = hazy.themes[0].style;

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
  'terminal.ansi.background',
  'editor.hunk.background',
  'drop_target.background',
  'border.transparent'
]);

const stripAlpha = (c) => c.length === 9 ? c.slice(0, 7) + 'FF' : c;
const keep = (c) => c.length === 9 ? c.slice(0, 7) + c.slice(7) : c;

const opaqueStyle = {};
for (const [k, v] of Object.entries(style)) {
  if (k === 'background.appearance') continue;
  if (typeof v === 'string' && /^#[0-9a-f]{8}$/.test(v)) {
    opaqueStyle[k] = opaqueKeys.has(k) ? stripAlpha(v) : keep(v);
  } else {
    opaqueStyle[k] = v;
  }
}

// opaque status bar uses its solid dark bg
opaqueStyle['status_bar.background'] = '#161a1eFF';

const out = {
  $schema: "https://zed.dev/schema/themes/v0.2.0",
  author: "neoh",
  name: "Simple Dark",
  themes: [
    { name: "Simple Dark", appearance: "dark", style: opaqueStyle },
    { name: "Simple Dark Hazy", appearance: "dark", style }
  ]
};

fs.writeFileSync(__dirname + '/../zed-extension/themes/simple-dark.json', JSON.stringify(out, null, 2));
console.log('written, opaque keys opaqued:', [...opaqueKeys].length);
