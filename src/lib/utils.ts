import { exit as exitProcess } from 'node:process'
import { error } from './logger.js'

/**
 * Imports a module with a default export.
 */
export const importDefault = async <T extends () => any = () => Promise<void>>(path: string): Promise<T> =>
  ((await import(path)) as { default: T }).default

/**
 * Exits the process with an error message.
 * The process will exit with code 1 if not specified.
 */
export const exit = (message: string, code: number = 1): void => {
  error(`${message}\n`)
  exitProcess(code)
}

/**
 * Converts a kebab-case string to camelCase.
 */
export const kebabToCamel = (input: string): string => input.replace(/-([a-z])/g, g => g[1].toUpperCase())
