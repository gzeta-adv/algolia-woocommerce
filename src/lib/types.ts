/**
 * Action execution function.
 */
export interface Action {
  (): Promise<void>
}

/**
 * A collection of actions.
 */
export interface Actions {
  [key: string]: Action
}

/**
 * Empty array type.
 */
export type EmptyArray = []

/**
 * Generic object interface.
 */
export interface AnyObject extends Record<string, any> {}

/**
 * Generic resource interface.
 */
export interface AnyResource extends AnyObject {
  id: number
}
