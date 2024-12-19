import { type WooCommerceProduct } from '../clients/woocommerce/index.js'
import { type Action } from '../lib/types.js'
import { syncWooCommerceEntities } from './utils.js'

/**
 * Syncs WooCommerce products to Algolia.
 */
const syncProducts: Action = async () => {
  await syncWooCommerceEntities<WooCommerceProduct>('products')
}

export default syncProducts
