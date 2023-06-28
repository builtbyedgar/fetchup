module.exports = {
  $schema: 'http://json.schemastore.org/lintstagedrc.schema',
  '*.+(ts)': ['npm run lint'],
  '*.+(ts)': ['npm run format'],
}
