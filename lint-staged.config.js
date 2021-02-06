module.exports = {
  '**/*.ts?(x)': () => 'npm type-check',
  '**/*.(ts|js)?(x)': (filenames) => `npm lint ${filenames.join(' ')}`,
}