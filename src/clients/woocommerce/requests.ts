import client from './client.js'
import { type WooCommerceProduct, type WooCommerceProductCategory } from './types.js'

const PAGINATION_LIMIT = 100

/**
 * List all WooCommerce products.
 */
export const products = async (): Promise<WooCommerceProduct[]> => {
  const allProducts: WooCommerceProduct[] = []
  let products: WooCommerceProduct[] = []
  let page = 1

  do {
    const { data } = (await client.get('products', {
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

/**
 * List all WooCommerce categories.
 */
export const categories = async (): Promise<WooCommerceProductCategory[]> => {
  const allCategories: WooCommerceProductCategory[] = []
  let categories: WooCommerceProductCategory[] = []
  let page = 1

  do {
    const { data } = (await client.get('products/categories', {
      page,
      per_page: PAGINATION_LIMIT,
    })) as { data: WooCommerceProductCategory[] }

    categories = data
    allCategories.push(...data)

    if (data.length < PAGINATION_LIMIT) break
    page++
  } while (categories.length === PAGINATION_LIMIT)

  return allCategories
}
