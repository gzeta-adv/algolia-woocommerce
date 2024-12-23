import type { Actions } from '../lib/types.js'
import syncCategories from './sync-categories.js'
import syncMenuItems from './sync-menu-items.js'
import syncProducts from './sync-products.js'
import sync from './sync.js'

/**
 * Collection of actions.
 */
export default {
  sync,
  syncCategories,
  syncMenuItems,
  syncProducts,
} as Actions
