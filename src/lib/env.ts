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

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
const get = <T = string>(key: string, defaultValue?: any): T => {
  const value = process.env[key] || String(defaultValue)
  if (!value) throw new EnvError(key)
  if (!isNaN(Number(value))) return Number(value) as T
  if (/^(true|false)$/.test(value)) return (value === 'true') as T
  return value as T
}

const Env = {
  /**
   * ID of the Algolia application.
   */
  ALGOLIA_APPLICATION_ID: get('ALGOLIA_APPLICATION_ID'),
  /**
   * Name of the main Algolia index.
   */
  ALGOLIA_INDEX: get('ALGOLIA_INDEX'),
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
   * Current Node.js environment.
   * @type {'development' | 'production' | 'test'}
   * @default 'development'
   */
  NODE_ENV: get('NODE_ENV', 'development'),
  /**
   * WooCommerce consumer key.
   */
  WOOCOMMERCE_KEY: get('WOOCOMMERCE_KEY'),
  /**
   * WooCommerce consumer secret.
   */
  WOOCOMMERCE_SECRET: get('WOOCOMMERCE_SECRET'),
  /**
   * URL of the WooCommerce store.
   */
  WOOCOMMERCE_URL: get('WOOCOMMERCE_URL'),
  /**
   * Gets the value of an environment variable or throws an error if not defined.
   */
  get,
}

export default Env
