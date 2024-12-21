import { HTTPMethod } from '../../lib/enums.js'
import Env from '../../lib/env.js'
import { error, info } from '../../lib/logger.js'
import type { AnyObject } from '../../lib/types.js'
import { sleep } from '../../lib/utils.js'
import { type WordPressEndpoint } from './enums.js'

const BASE_URL = Env.STORE_URL
const USER = Env.WORDPRESS_USERNAME
const PASSWORD = Env.WORDPRESS_PASSWORD
const PAGINATION_LIMIT = 100
const RETRY_LIMIT = 5

/**
 * Makes an authenticated request to the WordPress API.
 */
export const wordPressFetch = async <T>(
  endpoint: WordPressEndpoint,
  method: HTTPMethod,
  params?: AnyObject,
  init: RequestInit = {},
): Promise<T> => {
  const queryParams = new URLSearchParams(params).toString()
  const stringifiedParams = queryParams ? `?${queryParams}` : ''
  const url = `${BASE_URL}/wp-json/wp/v2/${endpoint}${stringifiedParams}`

  const response = await fetch(url, {
    headers: {
      Authorization: `Basic ${btoa(`${USER}:${PASSWORD}`)}`,
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
    method,
    ...init,
  })

  return (await response.json()) as T
}

/**
 * Makes an authenticated GET request to the WordPress API.
 */
export const wordPressGet = async <T>(
  endpoint: WordPressEndpoint,
  params?: AnyObject,
  init?: RequestInit,
): Promise<T> => await wordPressFetch<T>(endpoint, HTTPMethod.GET, params, init)

/**
 * Makes a recursive GET request to the WordPress API.
 */
export const wordPressList = async <T>(
  endpoint: WordPressEndpoint,
  objects: T[] = [],
  page = 1,
  retry = 1,
): Promise<T[]> => {
  while (true) {
    try {
      const data = await wordPressGet<T[]>(endpoint, { page, per_page: PAGINATION_LIMIT })
      objects.push(...data)
      if (data.length < PAGINATION_LIMIT) break
      page++
    } catch (e) {
      const err = e as Error
      if (retry > RETRY_LIMIT) {
        error('Exceeded retry limit')
        throw err
      }
      info(`Connection error, retrying in 10 seconds (${retry}/${RETRY_LIMIT})`)
      await sleep(10_000)
      return wordPressList(endpoint, objects, page, retry + 1)
    }
  }
  return objects
}
