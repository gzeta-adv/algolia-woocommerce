import { type Action } from '../lib/types.js'
import syncProducts from './sync-products.js'

/**
 * Collection of actions.
 */
const actions = {
  syncProducts,
} as {
  [key: string]: Action
}

export default actions
