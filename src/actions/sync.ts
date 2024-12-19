import { info } from '../lib/logger.js'
import syncCategories from './sync-categories.js'
import syncProducts from './sync-products.js'

/**
 * Syncs WooCommerce products and categories to Algolia.
 */
const sync = async () => {
  await syncProducts()
  info()
  await syncCategories()
}

export default sync
