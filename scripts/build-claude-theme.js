const fs = require('fs');
const path = require('path');
const { repo, loadPalettes, mix, shimmer } = require('./lib/palette');

const outDir = path.join(repo, 'claude', 'themes');

function overrides(p) {
  const dark = p.mode === 'dark';
  const accent = p.accent;
  const purple = dark ? '#c888d0' : '#a020f0';
  const pink = dark ? '#f1a5ab' : '#c2185b';
  const orange = dark ? '#e09a50' : '#b36205';
  const indigo = dark ? '#80a8e0' : '#0000ff';
  const surface = dark ? '#22262a' : '#f3f3f3';
  const surfaceHover = dark ? '#292d31' : '#ececec';
  const sidebar = dark ? '#1a1e22' : '#f3f3f3';
  const selection = dark ? '#4a6890' : '#cce4ff';
  const rateEmpty = dark ? '#3c4044' : '#d4d4d4';

  const rainbow = {
    red: dark ? '#ff5860' : '#e11b14',
    orange,
    yellow: dark ? '#ffe850' : '#b28c00',
    green: dark ? '#90e050' : '#388e3c',
    blue: dark ? '#4898e0' : '#1976d2',
    indigo,
    violet: purple,
  };

  const diffAdded = mix(p.added, p.background, dark ? 0.15 : 0.1);
  const diffRemoved = mix(p.removed, p.background, dark ? 0.15 : 0.1);
  const diffAddedDimmed = mix(p.added, p.background, dark ? 0.08 : 0.05);
  const diffRemovedDimmed = mix(p.removed, p.background, dark ? 0.08 : 0.05);
  const diffAddedWord = mix(p.added, p.background, dark ? 0.25 : 0.16);
  const diffRemovedWord = mix(p.removed, p.background, dark ? 0.25 : 0.16);

  return {
    // Brand and accent
    claude: accent,
    claudeShimmer: shimmer(accent, p.mode),
    claudeBlue_FOR_SYSTEM_SPINNER: p.modified,
    claudeBlueShimmer_FOR_SYSTEM_SPINNER: shimmer(p.modified, p.mode),
    professionalBlue: p.modified,
    chromeYellow: p.warning,

    // Foreground text
    text: p.editorForeground,
    inverseText: p.background,
    inactive: p.muted,
    inactiveShimmer: shimmer(p.muted, p.mode),
    subtle: p.faint,
    suggestion: dark ? '#78d8f0' : accent,
    remember: dark ? '#f0e080' : '#8b6606',
    background: p.background,

    // Status
    success: p.success,
    error: p.error,
    warning: p.warning,
    warningShimmer: shimmer(p.warning, p.mode),
    merged: purple,

    // Input box and mode indicators
    promptBorder: p.border,
    promptBorderShimmer: shimmer(accent, p.mode),
    permission: accent,
    permissionShimmer: shimmer(accent, p.mode),
    planMode: dark ? '#78d8f0' : p.modified,
    autoAccept: p.success,
    autoAcceptShimmer: shimmer(p.success, p.mode),
    skill: p.success,
    effortUltra: p.warning,
    bashBorder: p.warning,
    ide: p.modified,
    fastMode: accent,
    fastModeShimmer: shimmer(accent, p.mode),

    // Diff rendering
    diffAdded,
    diffRemoved,
    diffAddedDimmed,
    diffRemovedDimmed,
    diffAddedWord,
    diffRemovedWord,

    // Fullscreen surfaces
    userMessageBackground: surface,
    userMessageBackgroundHover: surfaceHover,
    composerSidebarBackground: sidebar,
    bashMessageBackgroundColor: surface,
    memoryBackgroundColor: surface,
    selectionBg: selection,

    // Usage meter and labels
    rate_limit_fill: accent,
    rate_limit_empty: rateEmpty,
    briefLabelYou: accent,
    briefLabelClaude: dark ? '#90e0ff' : '#000080',

    // Mascot
    clawd_body: dark ? '#c89648' : '#8b6606',
    clawd_background: surface,

    // Rainbow palette
    rainbow_red: rainbow.red,
    rainbow_red_shimmer: shimmer(rainbow.red, p.mode),
    rainbow_orange: rainbow.orange,
    rainbow_orange_shimmer: shimmer(rainbow.orange, p.mode),
    rainbow_yellow: rainbow.yellow,
    rainbow_yellow_shimmer: shimmer(rainbow.yellow, p.mode),
    rainbow_green: rainbow.green,
    rainbow_green_shimmer: shimmer(rainbow.green, p.mode),
    rainbow_blue: rainbow.blue,
    rainbow_blue_shimmer: shimmer(rainbow.blue, p.mode),
    rainbow_indigo: rainbow.indigo,
    rainbow_indigo_shimmer: shimmer(rainbow.indigo, p.mode),
    rainbow_violet: rainbow.violet,
    rainbow_violet_shimmer: shimmer(rainbow.violet, p.mode),

    // Subagent palette
    red_FOR_SUBAGENTS_ONLY: rainbow.red,
    blue_FOR_SUBAGENTS_ONLY: p.modified,
    green_FOR_SUBAGENTS_ONLY: p.success,
    yellow_FOR_SUBAGENTS_ONLY: p.warning,
    purple_FOR_SUBAGENTS_ONLY: purple,
    orange_FOR_SUBAGENTS_ONLY: orange,
    pink_FOR_SUBAGENTS_ONLY: pink,
    cyan_FOR_SUBAGENTS_ONLY: accent,
  };
}

const { dark, light } = loadPalettes();

const themes = [
  { name: 'Simple Dark', file: 'simple-dark.json', base: 'dark', source: dark },
  { name: 'Simple Light', file: 'simple-light.json', base: 'light', source: light },
];

fs.mkdirSync(outDir, { recursive: true });
for (const item of themes) {
  const theme = {
    name: item.name,
    base: item.base,
    overrides: overrides(item.source),
  };
  const file = path.join(outDir, item.file);
  fs.writeFileSync(file, `${JSON.stringify(theme, null, 2)}\n`);
  console.log(`wrote ${path.relative(repo, file)}`);
}
