import type { Action } from '../lib/types.js'
import { syncService } from './utils.js'

/**
 * Syncs WooCommerce products to Algolia.
 */
const syncProducts: Action = async () => {
  await syncService('wooCommerce', 'listProducts')
}

export default syncProducts
