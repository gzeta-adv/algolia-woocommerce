import WooCommerceRestApiModule from '@woocommerce/woocommerce-rest-api'
import Env from '../../lib/env.js'

// @ts-expect-error - See https://github.com/woocommerce/woocommerce-rest-api-js-lib/issues/66
const WooCommerceRestApi = WooCommerceRestApiModule.default as typeof WooCommerceRestApiModule

/**
 * Base WooCommerce client instance.
 */
const wooCommerceClient = new WooCommerceRestApi({
  consumerKey: Env.WOOCOMMERCE_KEY,
  consumerSecret: Env.WOOCOMMERCE_SECRET,
  url: Env.STORE_URL,
  version: 'wc/v3',
})

export default wooCommerceClient
