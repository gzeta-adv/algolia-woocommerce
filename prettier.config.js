/**
 * Custom Prettier configuration.
 *
 * @type {import('prettier').Options}
 */
export default {
  arrowParens: 'avoid',
  printWidth: 120,
  quoteProps: 'as-needed',
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  overrides: [
    {
      files: ['*.css'],
      options: {
        singleQuote: false,
      },
    },
    {
      files: ['*.json'],
      options: {
        printWidth: 100,
        singleQuote: false,
        trailingComma: 'none',
      },
    },
    {
      files: ['*.yml', '*.yaml'],
      options: {
        printWidth: 100,
        singleQuote: false,
      },
    },
    {
      files: ['.github/workflows/*.yml'],
      options: {
        printWidth: 100,
        singleQuote: true,
      },
    },
  ],
}
