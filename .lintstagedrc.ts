const path = require('path');

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames.map((f) => path.relative(process.cwd(), f)).join(' --file ')}`;

module.exports = {
  '*.{js,jsx,ts,tsx}': [buildEslintCommand, 'npm run format:fix', 'git add .'],
  '*.{json,css,scss,md,webmanifest}': ['npm run format:fix', 'git add .'],
};