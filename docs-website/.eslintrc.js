module.exports = {
  extends: [
    'eslint-config-next',
    'plugin:@docusaurus/recommended',
  ],
  rules: {
    'import/no-unresolved': [
      2,
      {
        // Ignore certain webpack aliases because they can't be resolved
        ignore: [
          '^@theme',
          '^@docusaurus',
          '^@generated',
          '^@site',
          '^@testing-utils',
        ],
      },
    ],
  },

};
