import WooCommerceRestApiModule from '@woocommerce/woocommerce-rest-api'
import Env from '../../lib/env.js'

// @ts-expect-error - See https://github.com/woocommerce/woocommerce-rest-api-js-lib/issues/66
const WooCommerceRestApi = WooCommerceRestApiModule.default as typeof WooCommerceRestApiModule

/**
 * WooCommerce client instance.
 */
export default new WooCommerceRestApi({
  consumerKey: Env.WOOCOMMERCE_KEY,
  consumerSecret: Env.WOOCOMMERCE_SECRET,
  url: Env.WOOCOMMERCE_URL,
  version: 'wc/v3',
})

export * from './enums.js'
export * from './types.js'
