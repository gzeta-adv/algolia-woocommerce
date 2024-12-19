import { builtinModules } from 'node:module'
import eslint from '@eslint/js'
import typescript from 'typescript-eslint'
import stylisticPlugin from '@stylistic/eslint-plugin'
import stylisticTsPlugin from '@stylistic/eslint-plugin-ts'
import gitignoreConfig from 'eslint-config-flat-gitignore'
import importPlugin from 'eslint-plugin-import'
import perfectionistPlugin from 'eslint-plugin-perfectionist'
import prettierPlugin from 'eslint-plugin-prettier'
import sortDestructureKeysPlugin from 'eslint-plugin-sort-destructure-keys'
import sortKeysPlugin from 'eslint-plugin-sort-keys-fix'
import unusedImportsPlugin from 'eslint-plugin-unused-imports'
import requireExtensionPlugin from './eslint-plugin-require-extension.js'

/**
 * @type {import('eslint').Linter.Config[]}
 */
export default [
  gitignoreConfig(),
  eslint.configs.recommended,
  {
    name: 'base',
    files: ['**/*.{js,ts}'],
    plugins: {
      '@stylistic': stylisticPlugin,
      '@stylistic/ts': stylisticTsPlugin,
      perfectionist: perfectionistPlugin,
      import: importPlugin,
      prettier: prettierPlugin,
      'require-extension': requireExtensionPlugin,
      'sort-destructure-keys': sortDestructureKeysPlugin,
      'sort-keys': sortKeysPlugin,
      'unused-imports': unusedImportsPlugin,
    },
    rules: {
      'arrow-body-style': [2, 'as-needed'],
      'comma-dangle': [2, 'always-multiline'],
      eqeqeq: [2, 'always'],
      'func-style': [2, 'expression'],
      'max-lines': 2,
      'no-console': [1, { allow: ['error', 'warn'] }],
      'no-duplicate-imports': [2, { includeExports: true }],
      'no-restricted-imports': [
        2,
        {
          paths: [
            {
              name: 'node',
              importNames: ['default'],
              message: 'Use named imports instead',
            },
          ],
          patterns: [
            {
              group: builtinModules.map(name => [name, `${name}/**/*`]).flat(),
              message: `Use the 'node:' prefix for built-in modules.`,
            },
          ],
        },
      ],
      'no-unused-vars': [
        2,
        {
          argsIgnorePattern: '^_',
        },
      ],
      'no-var': 2,
      'object-shorthand': [2, 'always'],
      'prefer-arrow-callback': [
        2,
        {
          allowNamedFunctions: true,
        },
      ],
      'prefer-const': [
        2,
        {
          destructuring: 'any',
          ignoreReadBeforeAssign: false,
        },
      ],
      'prefer-template': 2,
      'sort-vars': [
        1,
        {
          ignoreCase: false,
        },
      ],
      '@stylistic/array-bracket-newline': [2, 'consistent'],
      '@stylistic/array-bracket-spacing': [2, 'never'],
      '@stylistic/array-element-newline': [2, 'consistent'],
      '@stylistic/eol-last': 2,
      '@stylistic/jsx-curly-brace-presence': [
        2,
        {
          props: 'never',
          children: 'always',
          propElementValues: 'always',
        },
      ],
      '@stylistic/max-len': [
        2,
        {
          code: 140,
          ignoreUrls: true,
        },
      ],
      '@stylistic/no-extra-semi': 2,
      '@stylistic/no-multi-spaces': 2,
      '@stylistic/no-multiple-empty-lines': [
        2,
        {
          max: 1,
        },
      ],
      '@stylistic/no-trailing-spaces': 2,
      '@stylistic/object-curly-spacing': [2, 'always'],
      '@stylistic/quotes': [
        2,
        'single',
        {
          allowTemplateLiterals: true,
          avoidEscape: true,
        },
      ],
      '@stylistic/template-curly-spacing': [2, 'never'],
      'import/first': 2,
      'import/newline-after-import': [
        2,
        {
          exactCount: true,
          considerComments: true,
        },
      ],
      'import/no-absolute-path': 0,
      'import/no-amd': 2,
      'import/no-commonjs': 2,
      'import/no-deprecated': 2,
      'import/no-duplicates': [
        2,
        {
          'prefer-inline': true,
        },
      ],
      'import/no-empty-named-blocks': 2,
      'import/no-mutable-exports': 2,
      'import/no-self-import': 2,
      'perfectionist/sort-exports': 2,
      'perfectionist/sort-imports': [
        2,
        {
          groups: [
            ['side-effect', 'side-effect-style'],
            'builtin',
            'external',
            'internal',
            ['parent', 'index', 'sibling'],
          ],
          newlinesBetween: 'never',
        },
      ],
      'perfectionist/sort-named-imports': [
        2,
        {
          type: 'alphabetical',
          groupKind: 'values-first',
        },
      ],
      'prettier/prettier': 2,
      'require-extension/require-extension': 2,
      'require-extension/require-index': 2,
      'sort-destructure-keys/sort-destructure-keys': 2,
      'sort-keys/sort-keys-fix': 2,
      'unused-imports/no-unused-imports': 2,
    },
  },
  ...typescript.config(
    {
      ignores: ['**/*.?(c|m)js'],
    },
    typescript.configs.recommendedTypeChecked,
    typescript.configs.strictTypeChecked,
    {
      name: 'typescript',
      languageOptions: {
        parserOptions: {
          projectService: true,
          tsconfigRootDir: '.',
        },
      },
      settings: {
        'import/resolver': {
          typescript: true,
        },
      },
      rules: {
        'no-unused-vars': 0,
        '@stylistic/ts/member-delimiter-style': [
          2,
          {
            multiline: {
              delimiter: 'none',
              requireLast: false,
            },
          },
        ],
        '@typescript-eslint/consistent-type-imports': [
          2,
          {
            prefer: 'type-imports',
            fixStyle: 'inline-type-imports',
            disallowTypeAnnotations: false,
          },
        ],
        '@typescript-eslint/no-empty-object-type': [
          2,
          {
            allowInterfaces: 'always',
          },
        ],
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/no-floating-promises': 0,
        '@typescript-eslint/no-namespace': 0,
        '@typescript-eslint/no-unsafe-call': 0,
        '@typescript-eslint/no-unused-vars': [
          2,
          {
            argsIgnorePattern: '^_',
          },
        ],
        '@typescript-eslint/no-useless-empty-export': 2,
        '@typescript-eslint/no-unnecessary-condition': 0,
        '@typescript-eslint/no-unnecessary-type-parameters': 0,
        '@typescript-eslint/prefer-for-of': 2,
        '@typescript-eslint/prefer-string-starts-ends-with': 2,
        '@typescript-eslint/restrict-template-expressions': [
          2,
          {
            allowNumber: true,
          },
        ],
      },
    },
    {
      name: 'types',
      files: ['**/*.d.ts', '**/types.ts'],
      rules: {
        'max-lines': 0,
      },
    },
  ),
]
