import { error, info } from '../../lib/logger.js'
import { sleep } from '../../lib/utils.js'
import client from './client.js'
import type { WooCommerceEntity } from './types.js'

const PAGINATION_LIMIT = 100
const RETRY_LIMIT = 5

/**
 * List the specified WooCommerce resources recursively.
 */
export const wooCommerceList = async <T extends WooCommerceEntity>(
  endpoint: 'products' | 'products/categories',
  objects: T[] = [],
  page = 1,
  retry = 1,
): Promise<T[]> => {
  while (true) {
    try {
      const { data } = (await client.get(endpoint, { page, per_page: PAGINATION_LIMIT })) as { data: T[] }
      objects.push(...data)
      if (data.length < PAGINATION_LIMIT) break
      page++
    } catch (e) {
      const err = e as Error & { code: string }
      if (err?.code !== 'ECONNRESET') throw err
      if (retry > RETRY_LIMIT) {
        error('Exceeded retry limit')
        throw err
      }
      info(`Connection error, retrying in 5 seconds (${retry + 1}/${RETRY_LIMIT})`)
      await sleep(5_000)
      return wooCommerceList(endpoint, objects, page, retry + 1)
    }
  }
  return objects
}
