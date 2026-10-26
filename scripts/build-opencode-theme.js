const fs = require('fs');
const path = require('path');
const JSON5 = require('json5');

const repo = path.join(__dirname, '..');
const dataDir = path.join(repo, 'themes', 'zed-theme-data');
const outDir = path.join(repo, 'opencode', 'themes');

// ---------------------------------------------------------------------------
// Palette helpers
// ---------------------------------------------------------------------------

// Terminals cannot composite alpha, so every source color is flattened to an
// opaque hex value before it reaches the OpenCode theme.
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

function rgbToHsl(hex) {
  const [r255, g255, b255] = parseHex(hex);
  const r = r255 / 255;
  const g = g255 / 255;
  const b = b255 / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l];

  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h;
  if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
  else if (max === g) h = (b - r) / d + 2;
  else h = (r - g) / d + 4;
  return [h / 6, s, l];
}

function hslToHex(h, s, l) {
  if (s === 0) {
    const value = Math.round(l * 255);
    return toHex([value, value, value]);
  }
  const hue = (p, q, t) => {
    let next = t;
    if (next < 0) next += 1;
    if (next > 1) next -= 1;
    if (next < 1 / 6) return p + (q - p) * 6 * next;
    if (next < 1 / 2) return q;
    if (next < 2 / 3) return p + (q - p) * (2 / 3 - next) * 6;
    return p;
  };
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const r = hue(p, q, h + 1 / 3);
  const g = hue(p, q, h);
  const b = hue(p, q, h - 1 / 3);
  return toHex([r * 255, g * 255, b * 255]);
}

const DARK_OFFSETS = [0.14, 0, -0.08, -0.16, -0.25, -0.34, -0.43, -0.52, -0.58];
const LIGHT_OFFSETS = [-0.12, 0, 0.09, 0.18, 0.27, 0.35, 0.42, 0.47, 0.51];

// Nine-step hue scale anchored at step 200. Dark themes get lighter colors at
// low steps, light themes get darker colors at low steps.
function scale(anchor, mode) {
  const [h, s, l] = rgbToHsl(anchor);
  const offsets = mode === 'dark' ? DARK_OFFSETS : LIGHT_OFFSETS;
  const steps = {};
  offsets.forEach((offset, index) => {
    const lightness = Math.max(0.04, Math.min(0.97, l + offset));
    let saturation = s;
    if (lightness < l) saturation *= Math.pow(lightness / l, 0.75);
    if (lightness > 0.8) saturation *= Math.max(0.35, 1 - (lightness - 0.8) * 2.5);
    steps[String((index + 1) * 100)] = hslToHex(h, saturation, lightness);
  });
  return steps;
}

// The native Zed/VSCode grays are deliberately kept as-is instead of being
// regenerated, so the TUI surfaces match the editor themes exactly.
const NEUTRAL = {
  dark: {
    100: '#e6e2dc',
    200: '#d8d4cc',
    300: '#a0a4a8',
    400: '#787c80',
    500: '#3c4044',
    600: '#292d31',
    700: '#22262a',
    800: '#1e2226',
    900: '#161a1e',
  },
  light: {
    100: '#000000',
    200: '#000000',
    300: '#9e9e9e',
    400: '#b0b0b0',
    500: '#d4d4d4',
    600: '#ececec',
    700: '#f3f3f3',
    800: '#ffffff',
    900: '#ffffff',
  },
};

function load(file) {
  const src = JSON5.parse(fs.readFileSync(path.join(dataDir, file), 'utf8'));
  return src.themes[0].style;
}

function palette(style, mode) {
  const color = (key) => opaque(style[key]);
  const syntax = style.syntax;
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
    syntax,
  };
}

function hues(p) {
  const dark = p.mode === 'dark';
  return {
    gray: NEUTRAL[p.mode],
    red: scale(p.error, p.mode),
    orange: scale(dark ? '#c98538' : '#c9722a', p.mode),
    yellow: scale(p.warning, p.mode),
    green: scale(p.success, p.mode),
    cyan: scale(p.accent, p.mode),
    blue: scale(dark ? p.modified : p.info, p.mode),
    purple: scale(dark ? '#c888d0' : '#a020f0', p.mode),
    accent: '$hue.cyan',
    interactive: '$hue.blue',
    neutral: '$hue.gray',
  };
}

// ---------------------------------------------------------------------------
// Semantic token trees
// ---------------------------------------------------------------------------

function diffTokens(p) {
  const dark = p.mode === 'dark';
  return {
    text: {
      added: p.added,
      removed: p.removed,
      context: p.muted,
      hunkHeader: p.faint,
    },
    background: {
      added: mix(p.added, p.background, dark ? 0.15 : 0.1),
      removed: mix(p.removed, p.background, dark ? 0.15 : 0.1),
      context: '$hue.neutral.700',
    },
    highlight: {
      added: dark ? p.addedBright : p.added,
      removed: dark ? p.removedBright : p.removed,
    },
    lineNumber: {
      text: p.lineNumber,
      background: {
        added: mix(p.added, p.background, dark ? 0.18 : 0.14),
        removed: mix(p.removed, p.background, dark ? 0.18 : 0.14),
      },
    },
  };
}

function syntaxTokens(p) {
  const syn = p.syntax;
  return {
    comment: opaque(syn.comment.color),
    keyword: opaque(syn.keyword.color),
    function: opaque(syn.function.color),
    variable: opaque(syn.variable.color),
    string: opaque(syn.string.color),
    number: opaque(syn.number.color),
    type: opaque(syn.type.color),
    operator: opaque(syn.operator.color),
    punctuation: opaque(syn.punctuation.color),
  };
}

function markdownTokens(p) {
  const syn = p.syntax;
  const color = (key) => opaque(syn[key].color);
  return {
    text: p.editorForeground,
    heading: color('markup.heading'),
    link: color('link_uri'),
    linkText: color('link_text'),
    code: color('markup.code'),
    blockQuote: color('markup.quote'),
    emphasis: color('emphasis'),
    strong: color('emphasis.strong'),
    horizontalRule: p.faint,
    listItem: color('markup.list'),
    listEnumeration: color('punctuation.list_marker'),
    image: color('link_uri'),
    imageText: color('link_text'),
    codeBlock: p.editorForeground,
  };
}

function feedbackBackgrounds(mode) {
  return mode === 'dark'
    ? {
        error: '#3b292b',
        warning: '#3a3726',
        success: '#27392e',
        info: '#2f3e47',
      }
    : {
        error: '#fce8e7',
        warning: '#f6eee1',
        success: '#e8f2e9',
        info: '#e8f1fa',
      };
}

const darkStyle = load('simple-dark-hazy.json');
const lightStyle = load('simple-light-hazy.json');
const dark = palette(darkStyle, 'dark');
const light = palette(lightStyle, 'light');

const baseTokens = {
  categorical: ['cyan', 'purple', 'green', 'blue', 'orange'],
  text: {
    base: '$hue.neutral.200',
    muted: '$hue.neutral.300',
    faint: '$hue.neutral.400',
    action: {
      primary: {
        base: '$hue.accent.200',
        $hovered: '$hue.accent.100',
        $focused: '$hue.accent.200',
        $selected: '$hue.accent.100',
        $disabled: '$hue.neutral.400',
      },
      secondary: {
        base: '$text.muted',
        $hovered: '$text.base',
        $focused: '$hue.interactive.200',
        $disabled: '$hue.neutral.400',
      },
      destructive: {
        base: '$hue.red.200',
        $hovered: '$hue.red.100',
        $focused: '$hue.red.200',
        $disabled: '$hue.neutral.400',
      },
    },
    formfield: {
      base: '$text.base',
      $hovered: '$hue.interactive.200',
      $focused: '$hue.interactive.200',
      $pressed: '$hue.interactive.200',
      $disabled: '$text.faint',
      $selected: '$hue.interactive.200',
    },
    feedback: {
      error: { base: '$hue.red.200' },
      warning: { base: '$hue.yellow.200' },
      success: { base: '$hue.green.200' },
      info: { base: '$hue.blue.200' },
    },
  },
  background: {
    base: '$hue.neutral.800',
    raised: {
      base: '$hue.neutral.700',
      high: '$hue.neutral.600',
      max: '$hue.neutral.500',
    },
    action: {
      primary: {
        base: 'transparent',
        $hovered: '$hue.neutral.600',
        $focused: '$hue.interactive.600',
        $selected: '$hue.interactive.600',
        $disabled: '$hue.neutral.700',
      },
      secondary: {
        base: 'transparent',
        $hovered: '$hue.neutral.600',
        $focused: '$hue.interactive.600',
        $selected: '$hue.interactive.600',
        $disabled: '$hue.neutral.700',
      },
      destructive: {
        base: '$hue.red.700',
        $hovered: '$hue.red.600',
        $focused: '$hue.red.700',
        $selected: '$hue.red.700',
        $disabled: '$hue.neutral.700',
      },
    },
    formfield: {
      base: '$background.base',
    },
    feedback: {
      error: { base: '$background.raised.base' },
      warning: { base: '$background.raised.base' },
      success: { base: '$background.raised.base' },
      info: { base: '$background.raised.base' },
    },
  },
  border: {
    base: '$hue.neutral.500',
  },
  scrollbar: {
    base: '$hue.neutral.500',
  },
  diff: diffTokens(dark),
  syntax: syntaxTokens(dark),
  markdown: markdownTokens(dark),
  '@dialog': {
    background: {
      base: '$background.raised.base',
      action: {
        primary: { $hovered: '$background.raised.high' },
        secondary: { $hovered: '$background.raised.high' },
      },
    },
  },
};

function modeOverrides(p) {
  const dark = p.mode === 'dark';
  const feedback = feedbackBackgrounds(p.mode);
  return {
    categorical: dark
      ? ['cyan', 'purple', 'green', 'blue', 'orange']
      : ['blue', 'purple', 'green', 'orange', 'red'],
    text: {
      feedback: {
        error: { base: '$hue.red.200' },
        warning: { base: '$hue.yellow.200' },
        success: { base: '$hue.green.200' },
        info: { base: '$hue.blue.200' },
      },
    },
    background: {
      formfield: {
        base: dark ? '$background.raised.base' : '$background.base',
      },
      feedback: {
        error: { base: feedback.error },
        warning: { base: feedback.warning },
        success: { base: feedback.success },
        info: { base: feedback.info },
      },
    },
    border: {
      base: dark ? '$hue.neutral.500' : '#d4d4d4',
    },
    scrollbar: {
      base: dark ? '#484c50' : '#c0c0c0',
    },
    diff: diffTokens(p),
    syntax: syntaxTokens(p),
    markdown: markdownTokens(p),
    '@dialog': {
      background: {
        base: dark ? '$background.raised.base' : '$hue.neutral.800',
        action: {
          primary: {
            $hovered: dark ? '$background.raised.high' : '$background.raised.base',
          },
          secondary: {
            $hovered: dark ? '$background.raised.high' : '$background.raised.base',
          },
        },
      },
    },
  };
}

// ---------------------------------------------------------------------------
// Build
// ---------------------------------------------------------------------------

const theme = {
  $schema: 'https://opencode.ai/theme.json',
  base: baseTokens,
  light: {
    hue: hues(light),
    ...modeOverrides(light),
  },
  dark: {
    hue: hues(dark),
    ...modeOverrides(dark),
  },
};

fs.mkdirSync(outDir, { recursive: true });
const outFile = path.join(outDir, 'simple.json');
fs.writeFileSync(outFile, `${JSON.stringify(theme, null, 2)}\n`);
console.log(`wrote ${path.relative(repo, outFile)}`);
