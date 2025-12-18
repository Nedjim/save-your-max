module.exports = {
  singleQuote: true,
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  importOrderSortSpecifiers: true,
  importOrderCaseInsensitive: true,
  importOrder: [
    '<THIRD_PARTY_MODULES>',
    '^src/(.*)$',
    '^(.*)/(?!generated)(.*)/(.*)$', // Everything not generated
    '^(.*)/generated/(.*)$', // Everything generated
    '^[./]', // Absolute path imports
  ],
};
