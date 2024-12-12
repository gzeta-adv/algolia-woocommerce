import { type PartialUpdateObjectsOptions } from '@algolia/client-search'
import algolia from '../clients/algolia/index.js'
import woocommerce, { type WooCommerceProduct } from '../clients/woocommerce/index.js'
import Env from '../lib/env.js'
import { error, info, notice } from '../lib/logger.js'

const PAGINATION_LIMIT = 100

const updateOptions: Omit<PartialUpdateObjectsOptions, 'objects'> = {
  createIfNotExists: true,
  indexName: Env.ALGOLIA_INDEX,
  waitForTasks: true,
}

const timeFrom = (from: number) => Math.round((Date.now() - from) / 1_000)

const listProducts = async (): Promise<WooCommerceProduct[]> => {
  const allProducts: WooCommerceProduct[] = []
  let products: WooCommerceProduct[] = []
  let page = 1

  do {
    const { data } = (await woocommerce.get('products', {
      page,
      per_page: PAGINATION_LIMIT,
    })) as { data: WooCommerceProduct[] }

    products = data
    allProducts.push(...data)

    if (data.length < PAGINATION_LIMIT) break
    page++
  } while (products.length === PAGINATION_LIMIT)

  return allProducts
}

const syncProducts = async () => {
  let time = 0
  const start = Date.now()
  const products: WooCommerceProduct[] = []

  try {
    info('Fetching WooCommerce products...')
    products.push(...(await listProducts()))
    time = timeFrom(start)
    info(`Fetched ${products.length} WooCommerce products in ${time} seconds.`)
  } catch (e) {
    error('Error fetching WooCommerce products.')
    info(`Elapsed time: ${timeFrom(start)}s`)
    throw e
  }

  try {
    info('Updating Algolia objects...')
    const objects = products.map(product => ({ objectID: product.id, ...product }))
    const batches = await algolia.partialUpdateObjects({ ...updateOptions, objects })
    const objectIDs = batches.map(batch => batch.objectIDs).flat()
    notice(`Updated ${objectIDs.length} Algolia objects in ${timeFrom(start) - time} seconds.`)
  } catch (e) {
    error('Error updating Algolia objects.')
    info(`Elapsed time: ${timeFrom(start)}s`)
    throw e
  }

  info(`Elapsed time: ${timeFrom(start)}s`)
}

export default syncProducts
