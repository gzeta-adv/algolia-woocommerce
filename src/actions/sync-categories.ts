import type { Action } from '../lib/types.js'
import { syncService } from './utils.js'

/**
 * Syncs WooCommerce categories to Algolia.
 */
const syncCategories: Action = async () => {
  await syncService('wooCommerce', 'listCategories')
}

export default syncCategories
