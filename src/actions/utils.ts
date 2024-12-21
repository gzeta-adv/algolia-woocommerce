import algolia, { algoliaUpdateOptions } from '../clients/algolia/index.js'
import wooCommerce from '../clients/woocommerce/index.js'
import wordPress from '../clients/wordpress/index.js'
import Env from '../lib/env.js'
import { error, info, notice } from '../lib/logger.js'
import type { AnyResource } from '../lib/types.js'
import { camelToSentence, timeFrom, titlize } from '../lib/utils.js'

interface Services {
  wooCommerce: typeof wooCommerce
  wordPress: typeof wordPress
}

export const syncService = async <T extends AnyResource, K extends keyof Services>(
  service: K,
  method: keyof Services[K] & string,
  transformers: ((entities: T[]) => T[])[] = [],
) => {
  let time = 0
  const start = Date.now()
  const entities: T[] = []

  const client = service === 'wooCommerce' ? wooCommerce : wordPress
  const serviceName = titlize(service)
  const entitiesName = camelToSentence(method.replace(/^list/, ''))

  try {
    info(`Fetching ${serviceName} ${entitiesName}...`)
    const request = client[method as keyof typeof client] as () => Promise<T[]>
    const items = await request()
    const transformed = transformers.length ? transformers.reduce((acc, transformer) => transformer(acc), items) : items
    entities.push(...transformed)
    time = timeFrom(start)
    info(`Fetched ${entities.length} ${entitiesName} in ${time} seconds`)
  } catch (e) {
    error(`Error fetching ${serviceName} ${entitiesName}`)
    info(`Elapsed time: ${timeFrom(start)}s`)
    throw e
  }

  try {
    const indexName = Env.get(`ALGOLIA_INDEX_${entitiesName.replace(/\s/g, '_').toUpperCase()}`)
    if (!indexName) throw new Error(`Algolia index name for ${entitiesName} is not defined`)

    info(`Uploading objects to Algolia index ${indexName}...`)
    const objects = entities.map(entity => ({ objectID: entity.id, ...entity }) as Record<string, any>)
    const batches = await algolia.partialUpdateObjects({ ...algoliaUpdateOptions, indexName, objects })
    const objectIDs = batches.map(batch => batch.objectIDs).flat()
    notice(`Updated ${objectIDs.length} objects in ${timeFrom(start) - time} seconds`)
  } catch (e) {
    error(`Error uploading ${entitiesName} to Algolia`)
    info(`Elapsed time: ${timeFrom(start)}s`)
    throw e
  }

  info(`Elapsed time: ${timeFrom(start)}s`)
}
