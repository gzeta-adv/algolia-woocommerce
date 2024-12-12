import type {
  WooCommerceContext,
  WooCommerceOrder,
  WooCommerceOrderBy,
  WooCommerceProductBackorders,
  WooCommerceProductCatalogVisibility,
  WooCommerceProductStatus,
  WooCommerceProductStockStatus,
  WooCommerceProductTaxStatus,
  WooCommerceProductType,
} from './enums.js'

export interface WooCommerceProduct {
  /**
   * Unique identifier for the resource.
   * @readonly
   */
  readonly id: number
  /**
   * Product name.
   */
  name: string
  /**
   * Product slug.
   */
  slug: string
  /**
   * Product URL.
   * @readonly
   */
  readonly permalink: string
  /**
   * The date the product was created, in the site's timezone.
   * @readonly
   */
  readonly date_created: string
  /**
   * The date the product was created, as GMT.
   * @readonly
   */
  readonly date_created_gmt: string
  /**
   * The date the product was last modified, in the site's timezone.
   * @readonly
   */
  readonly date_modified: string
  /**
   * The date the product was last modified, as GMT.
   * @readonly
   */
  readonly date_modified_gmt: string
  /**
   * Product type. Options: `simple`, `grouped`, `external` and `variable`.
   * @default 'simple'
   */
  type: WooCommerceProductType
  /**
   * Product status (post status). Options: `draft`, `pending`, `private` and `publish`
   * @default 'publish'
   */
  status: WooCommerceProductStatus
  /**
   * Featured product.
   * @default false
   */
  featured: boolean
  /**
   * Catalog visibility. Options: `visible`, `catalog`, `search` and `hidden`.
   * @default 'visible'
   */
  catalog_visibility: WooCommerceProductCatalogVisibility
  /**
   * Product description.
   */
  description: string | null
  /**
   * Product short description.
   */
  short_description: string | null
  /**
   * Unique identifier.
   */
  sku: string
  /**
   * Current product price.
   * @readonly
   */
  readonly price: string
  /**
   * Product regular price.
   */
  regular_price: string
  /**
   * Product sale price.
   */
  sale_price: string
  /**
   * Start date of sale price, in the site's timezone.
   */
  date_on_sale_from: string | null
  /**
   * Start date of sale price, as GMT.
   */
  date_on_sale_from_gmt: string | null
  /**
   * End date of sale price, in the site's timezone.
   */
  date_on_sale_to: string | null
  /**
   * End date of sale price, as GMT.
   */
  date_on_sale_to_gmt: string | null
  /**
   * Price formatted in HTML.
   * @readonly
   */
  readonly price_html: string
  /**
   * Shows if the product is on sale.
   * @readonly
   */
  readonly on_sale: boolean
  /**
   * Shows if the product can be bought.
   * @readonly
   */
  readonly purchasable: boolean
  /**
   * Amount of sales.
   * @readonly
   */
  readonly total_sales: number
  /**
   * If the product is virtual.
   * @default false
   */
  virtual: boolean
  /**
   * If the product is downloadable.
   * @default false
   */
  downloadable: boolean
  /**
   * List of downloadable files.
   */
  downloads: WooCommerceProductDownload[]
  /**
   * Number of times downloadable files can be downloaded after purchase.
   * @default -1
   */
  download_limit: number
  /**
   * Number of days until access to downloadable files expires.
   * @default -1
   */
  download_expiry: number
  /**
   * Product external URL. Only for external products.
   */
  external_url: string
  /**
   * Product external button text. Only for external products.
   */
  button_text: string
  /**
   * Tax status. Options: `taxable`, `shipping` and `none`.
   * @default 'taxable'
   */
  tax_status: WooCommerceProductTaxStatus
  /**
   * Tax class.
   */
  tax_class: string
  /**
   * Stock management at product level.
   * @default false
   */
  manage_stock: boolean
  /**
   * Stock quantity.
   */
  stock_quantity: number
  /**
   * If managing stock, this controls if backorders are allowed. Options: no, notify and yes.
   * @default 'no'
   */
  backorders: WooCommerceProductBackorders
  /**
   * Shows if backorders are allowed.
   * @readonly
   */
  readonly backorders_allowed: boolean
  /**
   * Shows if the product is on backordered.
   * @readonly
   */
  readonly backordered: boolean
  /**
   * Allow one item to be bought in a single order.
   * @default false
   */
  sold_individually: boolean
  /**
   * Product weight.
   */
  weight: string
  /**
   * Product dimensions.
   */
  dimensions: WooCommerceProductDimensions
  /**
   * Shows if the product need to be shipped.
   * @readonly
   */
  readonly shipping_required: boolean
  /**
   * Shows whether or not the product shipping is taxable.
   * @readonly
   */
  readonly shipping_taxable: boolean
  /**
   * Shipping class slug.
   */
  shipping_class: string
  /**
   * Shipping class ID.
   * @readonly
   */
  readonly shipping_class_id: number
  /**
   * Product reviews allowed.
   * @default true
   */
  reviews_allowed: boolean
  /**
   * Reviews average rating.
   * @readonly
   */
  readonly average_rating: string
  /**
   * Amount of reviews that the product have.
   * @readonly
   */
  readonly rating_count: number
  /**
   * List of related products IDs.
   * @readonly
   */
  readonly related_ids: number[]
  /**
   * List of up-sell products IDs.
   * @readonly
   */
  readonly upsell_ids: number[]
  /**
   * List of cross-sell products IDs.
   * @readonly
   */
  readonly cross_sell_ids: number[]
  /**
   * Product parent ID.
   */
  parent_id: number
  /**
   * Optional note to send the customer after purchase.
   */
  purchase_note: string | null
  /**
   * List of categories.
   */
  categories: WooCommerceProductCategory[]
  /**
   * List of tags.
   */
  tags: WooCommerceProductTag[]
  /**
   * List of images.
   */
  images: WooCommerceProductImage[]
  /**
   * List of attributes.
   */
  attributes: WooCommerceProductAttribute[]
  /**
   * Defaults variation attributes.
   */
  default_attributes: WooCommerceProductDefaultAttribute[]
  /**
   * List of variations IDs.
   * @readonly
   */
  readonly variations: number[]
  /**
   * List of grouped products IDs.
   */
  grouped_products: number[]
  /**
   * Menu order, used to custom sort products.
   * @default 0
   */
  menu_order: number
  /**
   * Meta data.
   */
  meta_data: WooCommerceProductMetaData[]
  /**
   * Limit result set to products with specified stock status.
   */
  stock_status: WooCommerceProductStockStatus
}

export interface WooCommerceProductRequest {
  /**
   * Scope under which the request is made; determines fields present in response.
   * @default 'view'
   */
  context?: WooCommerceContext
  /**
   * Current page of the collection.
   */
  page?: number
  /**
   * Maximum number of items to be returned in result set.
   */
  per_page?: number
  /**
   * Limit results to those matching a string.
   */
  search?: string
  /**
   * Limit response to resources published after a given ISO8601 compliant date.
   */
  after?: string
  /**
   * Limit result set to resources published before a given ISO8601 compliant date.
   */
  before?: string
  /**
   * Ensure result set excludes specific IDs.
   */
  exclude?: number[]
  /**
   * Limit result set to specific IDs.
   */
  include?: number[]
  /**
   * Offset the result set by a specific number of items.
   */
  offset?: number
  /**
   * Order sort attribute ascending or descending.
   */
  order?: WooCommerceOrder
  /**
   * Sort collection by object attribute.
   */
  orderby?: WooCommerceOrderBy
  /**
   * Limit result set to those of particular parent IDs.
   */
  parent?: number[]
  /**
   * Limit result set to all items except those of a particular parent ID.
   */
  parent_exclude?: number[]
  /**
   * Limit result set to products with a specific slug.
   */
  slug?: string
  /**
   * Limit result set to products assigned a specific status.
   */
  status?: WooCommerceProductStatus
  /**
   * Limit result set to products assigned a specific type.
   */
  type?: WooCommerceProductType
  /**
   * Limit result set to products with a specific SKU.
   */
  sku?: string
  /**
   * Limit result set to featured products.
   */
  featured?: boolean
  /**
   * Limit result set to products assigned a specific category ID.
   */
  category?: number
  /**
   * Limit result set to products assigned a specific tag ID.
   */
  tag?: number
  /**
   * Limit result set to products assigned a specific shipping class ID.
   */
  shipping_class?: number
  /**
   * Limit result set to products with a specific attribute. Use the taxonomy name/attribute slug.
   */
  attribute?: string
  /**
   * Limit result set to products with a specific attribute term ID (required an assigned attribute).
   */
  attribute_term?: number
  /**
   * Limit result set to products on sale.
   */
  on_sale?: boolean
  /**
   * Limit result set to products based on a minimum price.
   */
  min_price?: string
  /**
   * Limit result set to products based on a maximum price.
   */
  max_price?: string
  /**
   * Limit result set to products with specified stock status.
   */
  stock_status?: WooCommerceProductStockStatus
}

export interface WooCommerceProductAttribute {
  /**
   * Attribute ID.
   */
  id: number
  /**
   * Attribute name.
   */
  name: string
  /**
   * Attribute position.
   */
  position: number
  /**
   * Define if the attribute is visible on the "Additional information" tab in the product's page.
   * @default false
   */
  visible: boolean
  /**
   * Define if the attribute can be used as variation.
   * @default false
   */
  variation: boolean
  /**
   * List of available term names of the attribute.
   */
  options: string[]
}

export interface WooCommerceProductCategory {
  /**
   * Category ID.
   */
  id: number
  /**
   * Category name.
   * @readonly
   */
  readonly name: string
  /**
   * Category slug.
   * @readonly
   */
  readonly slug: string
}

export interface WooCommerceProductDefaultAttribute {
  /**
   * Attribute ID.
   */
  id: number
  /**
   * Attribute name.
   */
  name: string
  /**
   * Selected attribute term name.
   */
  option: string
}

export interface WooCommerceProductDimensions {
  /**
   * Product length.
   */
  length: string
  /**
   * Product width.
   */
  width: string
  /**
   * Product height.
   */
  height: string
}

export interface WooCommerceProductDownload {
  /**
   * File ID.
   */
  id: number
  /**
   * File name.
   */
  name: string
  /**
   * File URL.
   */
  file: string
}

export interface WooCommerceProductImage {
  /**
   * The attachment ID from the Media Library.
   */
  id: number
  /**
   * The date the image was created, in the site's timezone.
   * @readonly
   */
  readonly date_created: string
  /**
   * The date the image was created, as GMT.
   * @readonly
   */
  readonly date_created_gmt: string
  /**
   * The date the image was last modified, in the site's timezone.
   * @readonly
   */
  readonly date_modified: string
  /**
   * The date the image was last modified, as GMT.
   * @readonly
   */
  readonly date_modified_gmt: string
  /**
   * Image URL.
   */
  src: string
  /**
   * Image name.
   */
  name: string
  /**
   * Image alternative text.
   */
  alt: string
}

export interface WooCommerceProductMetaData {
  /**
   * Meta ID.
   */
  id: number
  /**
   * Meta key.
   */
  key: string
  /**
   * Meta value.
   */
  value: string
}

export interface WooCommerceProductTag {
  /**
   * Tag ID.
   */
  id: number
  /**
   * Tag name.
   * @readonly
   */
  readonly name: string
  /**
   * Tag slug.
   * @readonly
   */
  readonly slug: string
}
