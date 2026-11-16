const fs = require('fs');
const path = require('path');
const { repo, loadPalettes, mix, shimmer } = require('./lib/palette');

const outDir = path.join(repo, 'claude', 'themes');

function overrides(p) {
  const dark = p.mode === 'dark';
  const accent = p.accent;
  const purple = dark ? '#9e95c7' : '#7a1fa2';
  const pink = dark ? '#dc9ba1' : '#c2185b';
  const orange = dark ? '#d99f57' : '#a4560a';
  const indigo = dark ? '#95a2c9' : '#1b4b8f';
  const surface = dark ? '#282828' : '#ededed';
  const surfaceHover = dark ? '#333333' : '#e6e6e6';
  const sidebar = dark ? '#181818' : '#ededed';
  const selection = dark ? '#504945' : '#cce4ff';
  const rateEmpty = dark ? '#444444' : '#d4d4d4';
  const professionalBlue = dark ? '#95a2c9' : p.modified;

  const rainbow = {
    red: dark ? '#e35d64' : '#b31d28',
    orange,
    yellow: dark ? '#d8bd55' : '#8a6100',
    green: dark ? '#7fb757' : '#1a7f37',
    blue: dark ? '#95a2c9' : '#2c63a8',
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
    claudeBlue_FOR_SYSTEM_SPINNER: professionalBlue,
    claudeBlueShimmer_FOR_SYSTEM_SPINNER: shimmer(professionalBlue, p.mode),
    professionalBlue,
    chromeYellow: p.warning,

    // Foreground text
    text: p.editorForeground,
    inverseText: p.background,
    inactive: p.muted,
    inactiveShimmer: shimmer(p.muted, p.mode),
    subtle: p.faint,
    suggestion: dark ? '#95a2c9' : accent,
    remember: dark ? '#d8bd55' : '#8a6100',
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
    planMode: dark ? '#95a2c9' : p.modified,
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
    briefLabelClaude: dark ? '#95a2c9' : '#123c63',

    // Mascot
    clawd_body: dark ? '#c18132' : '#8a6100',
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
    blue_FOR_SUBAGENTS_ONLY: professionalBlue,
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
