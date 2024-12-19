import algolia, { algoliaUpdateOptions } from '../clients/algolia/index.js'
import wooCommerce, { type WooCommerceProduct, type WooCommerceProductCategory } from '../clients/woocommerce/index.js'
import Env from '../lib/env.js'
import { error, info, notice } from '../lib/logger.js'
import { timeFrom } from '../lib/utils.js'

/**
 * Syncs the specified WooCommerce resources to Algolia.
 */
export const syncWooCommerceEntities = async <T extends WooCommerceProduct | WooCommerceProductCategory>(
  method: keyof typeof wooCommerce,
) => {
  let time = 0
  const start = Date.now()
  const entities: T[] = []
  const entitiesName = method.replace(/^list/, '').toLowerCase()

  try {
    info(`Fetching WooCommerce ${entitiesName}...`)
    const response = (await wooCommerce[method]()) as T[]
    entities.push(...response)
    time = timeFrom(start)
    info(`Fetched ${entities.length} ${entitiesName} in ${time} seconds`)
  } catch (e) {
    error(`Error fetching WooCommerce ${entitiesName}`)
    info(`Elapsed time: ${timeFrom(start)}s`)
    throw e
  }

  try {
    info(`Uploading ${entitiesName} to Algolia...`)
    const objects = entities.map(entity => ({ objectID: entity.id, ...entity })) as Record<string, any>[]
    const indexName = Env.get(`ALGOLIA_INDEX_${entitiesName.toUpperCase()}`)
    const batches = await algolia.partialUpdateObjects({ ...algoliaUpdateOptions, indexName, objects })
    const objectIDs = batches.map(batch => batch.objectIDs).flat()
    notice(`Updated ${objectIDs.length} ${entitiesName} in ${timeFrom(start) - time} seconds`)
  } catch (e) {
    error(`Error uploading ${entitiesName} to Algolia`)
    info(`Elapsed time: ${timeFrom(start)}s`)
    throw e
  }

  info(`Elapsed time: ${timeFrom(start)}s`)
}
