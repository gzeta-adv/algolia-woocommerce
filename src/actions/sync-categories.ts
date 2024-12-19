import { type WooCommerceProductCategory } from '../clients/woocommerce/index.js'
import { type Action } from '../lib/types.js'
import { syncWooCommerceEntities } from './utils.js'

/**
 * Syncs WooCommerce categories to Algolia.
 */
const syncCategories: Action = async () => {
  await syncWooCommerceEntities<WooCommerceProductCategory>('categories')
}

export default syncCategories
