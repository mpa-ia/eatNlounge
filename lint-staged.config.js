module.exports = {
  '**/*.ts?(x)': () => 'npm run lint',
  '**/*.(ts|js)?(x)': (filenames) => `npm run lint ${filenames.join(' ')}`,
}