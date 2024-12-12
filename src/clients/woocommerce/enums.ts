export enum WooCommerceContext {
  View = 'view',
  Edit = 'edit',
}

export enum WooCommerceEndpoint {
  Products = 'products',
}

export enum WooCommerceOrder {
  Asc = 'asc',
  Desc = 'desc',
}

export enum WooCommerceOrderBy {
  Date = 'date',
  Id = 'id',
  Include = 'include',
  Title = 'title',
  Slug = 'slug',
}

export enum WooCommercePagination {
  Page = 'page',
  PerPage = 'per_page',
  After = 'after',
  Before = 'before',
  Offset = 'offset',
}

export enum WooCommerceProductBackorders {
  No = 'no',
  Notify = 'notify',
  Yes = 'yes',
}

export enum WooCommerceProductCatalogVisibility {
  Visible = 'visible',
  Catalog = 'catalog',
  Search = 'search',
  Hidden = 'hidden',
}

export enum WooCommerceProductStatus {
  Draft = 'draft',
  Pending = 'pending',
  Private = 'private',
  Publish = 'publish',
}

export enum WooCommerceProductStockStatus {
  InStock = 'instock',
  OutOfStock = 'outofstock',
  OnBackorder = 'onbackorder',
}

export enum WooCommerceProductTaxStatus {
  Taxable = 'taxable',
  Shipping = 'shipping',
  None = 'none',
}

export enum WooCommerceProductType {
  Simple = 'simple',
  Grouped = 'grouped',
  External = 'external',
  Variable = 'variable',
}
