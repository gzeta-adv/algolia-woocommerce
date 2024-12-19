import { exit as exitProcess } from 'node:process'
import { error } from './logger.js'

/**
 * Exits the process with an error message.
 * The process will exit with code 1 if not specified.
 */
export const exit = (message?: string, code: number = 1): void => {
  if (message) error(`${message}\n`)
  exitProcess(code)
}

/**
 * Converts a kebab-case string to camelCase.
 */
export const kebabToCamel = (input: string): string => input.replace(/-([a-z])/g, g => g[1].toUpperCase())

/**
 * Converts a camelCase string to kebab-case.
 */
export const camelToKebab = (input: string): string => input.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()

/**
 * Gets the time elapsed in seconds from a given timestamp.
 */
export const timeFrom = (from: number) => Math.round((Date.now() - from) / 1_000)
