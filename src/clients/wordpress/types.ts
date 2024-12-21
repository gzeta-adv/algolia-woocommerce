import type { EmptyArray } from '../../lib/types.js'

export interface WordPressEntity {
  /**
   * Unique identifier for the resource.
   * @readonly
   */
  readonly id: number
}

/**
 * The relations for the object and its properties.
 */
export interface WordPressObjectLinks {
  [k: string]: {
    href: string
    embeddable?: boolean
    [k: string]: unknown
  }[]
}

/**
 * A menu item in a REST API context.
 */
export interface WordPressMenuItem {
  /**
   * The title for the menu item.
   */
  title: string
  /**
   * Unique identifier for the menu item.
   */
  id: number
  /**
   * The singular label used to describe this type of menu item.
   */
  type_label: string
  /**
   * The family of objects originally represented.
   */
  type: 'taxonomy' | 'post_type' | 'post_type_archive' | 'custom'
  /**
   * A named status for the menu item.
   */
  status: 'publish' | 'future' | 'draft' | 'pending' | 'private'
  /**
   * The ID for the parent of the menu item.
   */
  parent: number
  /**
   * Text for the title attribute of the link element for this menu item.
   */
  attr_title: string
  /**
   * Class names for the link element of this menu item.
   */
  classes: string[]
  /**
   * The description of this menu item.
   */
  description: string
  /**
   * The DB ID of the nav_menu_item that is this item's menu parent, if any, otherwise 0.
   */
  menu_order: number
  /**
   * The type of object originally represented, such as "category", "post", or "attachment".
   */
  object: string
  /**
   * The database ID of the original object this menu item represents, for example the ID for posts or the term_id for categories.
   */
  object_id: number
  /**
   * The target attribute of the link element for this menu item.
   */
  target: '_blank' | ''
  /**
   * The URL to which this menu item points.
   */
  url: string
  /**
   * The XFN relationship expressed in the link of this menu item.
   */
  xfn: string[]
  /**
   * Whether the menu item represents an object that no longer exists.
   */
  invalid: boolean
  /**
   * The terms assigned to the menu item in the nav_menu taxonomy.
   */
  menus: number
  /**
   * Meta fields.
   */
  meta:
    | EmptyArray
    | {
        [k: string]: unknown
      }
  _links: WordPressObjectLinks
  /**
   * The embedded representation of relations. Only present when the '_embed' query parameter is set.
   */
  _embedded?: {
    /**
     * The taxonomy terms for the nav menu item.
     */
    'wp:term': unknown[]
    [k: string]: unknown
  }
  [k: string]: unknown
}

/**
 * A nested menu item in a REST API context.
 */
export interface WordPressNestedMenuItem extends WordPressMenuItem {
  children: WordPressNestedMenuItem[]
}
