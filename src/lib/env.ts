import 'dotenv/config'

/**
 * Error thrown when an environment variable is not defined.
 */
export class EnvError extends Error {
  constructor(key: string) {
    super(`Environment variable ${key} is not defined`)
    this.name = 'EnvError'
  }
}

const get = <T = string>(key: string, defaultValue?: any): T => {
  const value = process.env[key] || String(defaultValue)
  if (!value) throw new EnvError(key)
  if (!isNaN(Number(value))) return Number(value) as T
  if (/^(true|false)$/.test(value)) return (value === 'true') as T
  return value as T
}

const error = (message: string) => {
  throw new EnvError(message)
}

const HOSTNAME = get('HOSTNAME')
const STORE_URL = `https://${HOSTNAME}`

const Env = {
  /**
   * ID of the Algolia application.
   */
  ALGOLIA_APPLICATION_ID: get('ALGOLIA_APPLICATION_ID'),
  /**
   * Name of the Algolia index storing categories.
   */
  ALGOLIA_INDEX_CATEGORIES: get('ALGOLIA_INDEX_CATEGORIES'),
  /**
   * Name of the Algolia index storing products.
   */
  ALGOLIA_INDEX_PRODUCTS: get('ALGOLIA_INDEX_PRODUCTS'),
  /**
   * Algolia Admin API key.
   */
  ALGOLIA_PRIVATE_KEY: get('ALGOLIA_PRIVATE_KEY'),
  /**
   * Set to `true` when running in a CI environment.
   */
  CI: get<boolean>('CI', false),
  /**
   * Set to `true` when GitHub Actions is running a workflow.
   * @default false
   */
  GITHUB_ACTIONS: get<boolean>('GITHUB_ACTIONS', false),
  /**
   * Hostname of the store.
   */
  HOSTNAME,
  /**
   * Current Node.js environment.
   * @default 'development'
   */
  NODE_ENV: get('NODE_ENV', 'development'),
  /**
   * URL of the store.
   */
  STORE_URL,
  /**
   * WooCommerce consumer key.
   */
  WOOCOMMERCE_KEY: get('WOOCOMMERCE_KEY'),
  /**
   * WooCommerce consumer secret.
   */
  WOOCOMMERCE_SECRET: get('WOOCOMMERCE_SECRET'),
  /**
   * Throws an environment error with the specified message.
   */
  error,
  /**
   * Gets the value of an environment variable or throws an error if not defined.
   */
  get,
}

export default Env
