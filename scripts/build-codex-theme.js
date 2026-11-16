const fs = require('fs');
const path = require('path');
const { repo, loadPalettes } = require('./lib/palette');

const outDir = path.join(repo, 'codex', 'themes');

const escapeXml = (value) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');

function rule(scope, foreground, extra = {}) {
  const settings = [`      <key>foreground</key><string>${foreground}</string>`];
  if (extra.background) {
    settings.push(`      <key>background</key><string>${extra.background}</string>`);
  }
  if (extra.fontStyle) {
    settings.push(`      <key>fontStyle</key><string>${extra.fontStyle}</string>`);
  }
  return [
    '  <dict>',
    `    <key>scope</key><string>${escapeXml(scope)}</string>`,
    '    <key>settings</key><dict>',
    ...settings,
    '    </dict>',
    '  </dict>',
  ].join('\n');
}

function theme(p, options) {
  const s = (key) => p.syntax[key].color;
  const insertedBackground = options.diffAdded;
  const deletedBackground = options.diffRemoved;

  const rules = [
    rule('codex.accent', p.accent),
    rule('comment, punctuation.definition.comment', s('comment'), {
      fontStyle: options.commentItalic ? 'italic' : undefined,
    }),
    rule('string, punctuation.definition.string', s('string')),
    rule('keyword, storage, keyword.control, keyword.declaration', s('keyword')),
    rule('support.type, support.class, support.variable, entity.name.type', s('type')),
    rule('constant, constant.numeric, constant.language, constant.boolean', s('number')),
    rule('entity.name.function, support.function, variable.function', s('function')),
    rule('variable, variable.parameter, variable.other.member', s('variable')),
    rule('punctuation, keyword.operator', s('operator')),
    rule('invalid, invalid.illegal', options.invalid),
    rule('markup.heading, entity.name.section.markdown', options.heading, {
      fontStyle: 'bold',
    }),
    rule('markup.bold', options.strong, { fontStyle: 'bold' }),
    rule('markup.italic', options.emphasis, { fontStyle: 'italic' }),
    rule('markup.quote', options.emphasis, { fontStyle: 'italic' }),
    rule('markup.inline.raw, markup.fenced_code.block', s('markup.code')),
    rule('markup.link.url, markup.underline.link', options.link, {
      fontStyle: 'underline',
    }),
    rule('string.other.link.title.markdown', options.linkText),
    rule('punctuation.definition.list.markdown', options.listMarker),
    rule('markup.inserted, diff.inserted', options.added, {
      background: insertedBackground,
    }),
    rule('markup.deleted, diff.deleted', options.removed, {
      background: deletedBackground,
    }),
  ];

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">',
    '<plist version="1.0">',
    '<dict>',
    `  <key>name</key><string>${escapeXml(options.name)}</string>`,
    '  <key>settings</key>',
    '  <array>',
    '  <dict>',
    '    <key>settings</key><dict>',
    `      <key>foreground</key><string>${p.editorForeground}</string>`,
    '    </dict>',
    '  </dict>',
    ...rules,
    '  </array>',
    '</dict>',
    '</plist>',
    '',
  ].join('\n');
}

const { dark, light } = loadPalettes();

const themes = [
  {
    name: 'Simple Dark',
    file: 'simple-dark.tmTheme',
    source: theme(dark, {
      name: 'Simple Dark',
      diffAdded: '#1e2a1a',
      diffRemoved: '#2b1a1c',
      invalid: '#f43841',
      heading: '#ffdd33',
      strong: '#d4d4d4',
      emphasis: '#ffdd33',
      link: '#95a2c9',
      linkText: '#ffdd33',
      listMarker: '#ffdd33',
      added: '#79bf46',
      removed: '#f43841',
      commentItalic: false,
    }),
  },
  {
    name: 'Simple Light',
    file: 'simple-light.tmTheme',
    source: theme(light, {
      name: 'Simple Light',
      diffAdded: '#e8eee6',
      diffRemoved: '#f7e5e4',
      invalid: '#b31d28',
      heading: '#123c63',
      strong: '#1a1a1a',
      emphasis: '#1a7f37',
      link: '#007894',
      linkText: '#123c63',
      listMarker: '#123c63',
      added: '#1a7f37',
      removed: '#b31d28',
      commentItalic: true,
    }),
  },
];

fs.mkdirSync(outDir, { recursive: true });
for (const item of themes) {
  const file = path.join(outDir, item.file);
  fs.writeFileSync(file, item.source);
  console.log(`wrote ${path.relative(repo, file)}`);
}
