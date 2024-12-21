import type { WooCommerceProduct, WooCommerceProductCategory } from './types.js'
import { wooCommerceList } from './utils.js'

/**
 * List all WooCommerce products.
 */
export const listProducts = async () => wooCommerceList<WooCommerceProduct>('products')

/**
 * List all WooCommerce categories.
 */
export const listCategories = async () => wooCommerceList<WooCommerceProductCategory>('products/categories')
