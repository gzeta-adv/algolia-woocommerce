import { type WordPressMenuItem, type WordPressNestedMenuItem } from '../clients/wordpress/index.js'
import { deepMerge } from '../lib/utils.js'

/**
 * Filter active menu items.
 */
export const filterMenuItems = (menuItems: WordPressMenuItem[]): WordPressMenuItem[] =>
  menuItems.filter(item => item.status === 'publish' && item.type === 'taxonomy')

/**
 * Dedupe menu items by title.
 */
export const dedupeMenuItems = (menuItems: WordPressMenuItem[]): WordPressMenuItem[] =>
  Object.entries(
    menuItems.reduce<Record<string, WordPressMenuItem[]>>((categories, item) => {
      const title = item.title
      const titleCategories = (categories[item.title] as WordPressMenuItem[] | undefined) || []
      return { ...categories, [title]: titleCategories.concat(item) }
    }, {}),
  )
    .map(([_title, items]) => deepMerge(...items))
    .flat()
    .sort((a, b) => a.menu_order - b.menu_order)

/**
 * Nest menu items by parent ID.
 */
export const nestMenuItems = (menuItems: WordPressMenuItem[]): WordPressNestedMenuItem[] => {
  const appendChildren = (items: WordPressMenuItem[]): WordPressNestedMenuItem[] =>
    items.map(item => {
      const children = menuItems.filter(child => child.parent === item.id)
      return {
        ...item,
        children: children.length ? appendChildren(children.sort((a, b) => a.menu_order - b.menu_order)) : [],
      }
    })
  return appendChildren(menuItems.filter(item => item.parent === 0))
}

/**
 * Transformations to apply to WordPress menu items.
 */
const menuItemsTransformers = [filterMenuItems, dedupeMenuItems, nestMenuItems]

export default menuItemsTransformers
