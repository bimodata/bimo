// eslint-disable-next-line no-unused-vars
const airbnbBase = require('eslint-config-airbnb-base');
// The above is there to avoid removal of the package from the dependencies by the updateDependencies script

module.exports = {
  extends: [
    'eslint-config-airbnb-base',
  ],
  parserOptions:
    { ecmaVersion: 'latest' },
  env: {
    commonjs: true,
    node: true,
    mocha: true,
  },
  globals: { cy: 'readonly' },
  rules: {
    quotes: ['error', 'single', { allowTemplateLiterals: true }], // because I often end up converting strings to templates
    'linebreak-style': ['off'], // Because autocrlf and stuff is unmanageable on the SNCF PC ...
    'max-len': ['warn', 140], // Because I like long variable names
    'no-underscore-dangle': ['off'], // Because I like it
    'no-use-before-define': ['off'], // Because I like it
    'brace-style': ['warn', 'stroustrup'], // Because I Like it
    'newline-per-chained-call': ['error', { ignoreChainWithDepth: 8 }],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'no-unused-vars': [
      'error', {
        varsIgnorePattern: '^Trip|^Variant|^Network|^Map|^Agathe|^Block|^Place|^Task|^Vehicle|^Route|^Excel'
          + '|^Entity|^Collection|^DataFile|^Consist|^Dated|^Policy|^Sncf|^Oscar|^Bimo|config',
      }], // To allow using classes only in JSDoc comments and help intellisense

    'object-curly-newline': ['error', {
      ObjectExpression: { multiline: true },
      ObjectPattern: { multiline: true },
    }],

    'function-paren-newline': ['off'],
    'function-call-argument-newline': ['off'],

    'import/no-extraneous-dependencies': ['error', {
      devDependencies: [
        '**/scripts/*.js', 'ui/**',
        '**/data/**',
        '**/__tests__/**', '**/*.test.js', '**/*.spec.js',
      ],
    }],
    'prefer-destructuring': ['off'], // Because in some cases it's easier to document for intellisense
  },
};
