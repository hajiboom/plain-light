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
      diffAdded: '#213029',
      diffRemoved: '#3b292b',
      invalid: '#ff5860',
      heading: '#ffe850',
      strong: '#d4d0c8',
      emphasis: '#c89648',
      link: '#90e0ff',
      linkText: '#f0e080',
      listMarker: '#ffe850',
      added: '#58b85c',
      removed: '#e84848',
      commentItalic: false,
    }),
  },
  {
    name: 'Simple Light',
    file: 'simple-light.tmTheme',
    source: theme(light, {
      name: 'Simple Light',
      diffAdded: '#e8f2e9',
      diffRemoved: '#fce8e7',
      invalid: '#b20000',
      heading: '#000080',
      strong: '#000000',
      emphasis: '#228b22',
      link: '#007894',
      linkText: '#000080',
      listMarker: '#000080',
      added: '#388e3c',
      removed: '#e11b14',
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
