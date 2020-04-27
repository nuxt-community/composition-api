module.exports = {
  '*.js': ['yarn lint:eslint', 'yarn lint:prettier'],
  '*.ts': ['yarn lint:eslint', 'yarn lint:prettier'],
  '{!(package)*.json,*.code-snippets,.*rc}': [
    'yarn lint:prettier --parser json',
  ],
  'package.json': ['yarn lint:prettier'],
}
