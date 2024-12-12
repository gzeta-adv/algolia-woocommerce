import { config } from 'dotenv'
import { type Config } from 'release-it'

config({ path: '.env.release' })

export default {
  git: {
    commitMessage: 'chore: release v${version}',
    push: true,
    tagName: 'v${version}',
  },
  github: {
    autoGenerate: true,
    release: true,
    releaseName: 'v${version}',
  },
  hooks: {
    'after:init': 'pnpm run check',
    'after:release': 'echo Successfully released ${name}@${version}.',
    'before:git:release': ['pnpm run lint:fix', 'git add .'],
  },
  npm: {
    publish: false,
  },
  plugins: {
    '@release-it/bumper': {
      out: {
        file: 'package.json',
        path: 'version',
      },
    },
    '@release-it/conventional-changelog': {
      header: '# Changelog',
      infile: 'CHANGELOG.md',
      preset: {
        name: 'conventionalcommits',
      },
    },
    'release-it-pnpm': {},
  },
} satisfies Config
