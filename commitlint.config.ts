import { type UserConfig } from '@commitlint/types'

const DEPENDENCY_UPDATES = /^build\((deps|deps-dev|security)\):/

export default {
  defaultIgnores: true,
  extends: ['@commitlint/config-conventional'],
  ignores: [message => DEPENDENCY_UPDATES.test(message)],
} satisfies UserConfig
