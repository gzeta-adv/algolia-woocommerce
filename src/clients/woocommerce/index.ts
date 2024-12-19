import * as wooCommerceRequests from './requests.js'

/**
 * WooCommerce client instance.
 */
const wooCommerce = {
  ...wooCommerceRequests,
}

export default wooCommerce
export * from './enums.js'
export * from './types.js'
