import { exit as exitProcess } from 'node:process'
import { error } from './logger.js'
import { type AnyObject } from './types.js'

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
 * Converts a camelCase string to a normal sentence.
 */
export const camelToSentence = (input: string): string => input.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase()

/**
 * Converts a string to title case.
 */
export const titlize = (input: string): string => input.charAt(0).toUpperCase() + input.slice(1)

/**
 * Gets the time elapsed in seconds from a given timestamp.
 */
export const timeFrom = (from: number) => Math.round((Date.now() - from) / 1_000)

/**
 * Sleeps for the specified number of milliseconds.
 */
export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

/**
 * Checks if a value is an object.
 */
export const isObject = (item: any) => item !== null && typeof item === 'object' && !Array.isArray(item)

/**
 * Deep merges two or more objects.
 */
export const deepMerge = <T extends AnyObject>(...args: Array<Partial<T>>): T => {
  const [target, ...sources] = args

  if (!sources.length) return target as T
  const source = sources.shift()

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        const sourceValue = source[key] as AnyObject
        const targetValue = target[key] as AnyObject
        if (isObject(sourceValue) && isObject(targetValue)) {
          (target[key] as any) = deepMerge(targetValue, sourceValue)
          continue
        }
        (target[key] as any) = sourceValue
      }
    }
  }
  return deepMerge(target, ...sources)
}
