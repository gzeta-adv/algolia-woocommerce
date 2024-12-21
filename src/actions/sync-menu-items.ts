import type { Action } from '../lib/types.js'
import menuItemsTransformers from '../transformers/menu-items.js'
import { syncService } from './utils.js'

/**
 * Syncs WordPress menu items to Algolia.
 */
const syncMenuItems: Action = async () => {
  await syncService('wordPress', 'listMenuItems', menuItemsTransformers)
}

export default syncMenuItems
