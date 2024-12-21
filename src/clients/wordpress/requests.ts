import { WordPressEndpoint } from './enums.js'
import type { WordPressMenuItem } from './types.js'
import { wordPressList } from './utils.js'

type WordPressMenuItemBase = WordPressMenuItem & {
  title: {
    /**
     * Title for the menu item, as it exists in the database.
     */
    raw?: string
    /**
     * HTML title for the menu item, transformed for display.
     */
    rendered: string
  }
}

/**
 * Get all menu items of the WordPress site.
 *
 * @see https://developer.wordpress.org/rest-api/reference/nav_menus_items
 */
export const listMenuItems = async (): Promise<WordPressMenuItem[]> => {
  const items = await wordPressList<WordPressMenuItemBase>(WordPressEndpoint.MenuItems)
  return items.map(item => ({ ...item, title: item.title.rendered }))
}
