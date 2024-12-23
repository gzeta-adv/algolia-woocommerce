<div align="center">
  <picture>
    <source media="(prefers-color-scheme: light)" srcset=".github/static/logo.png" width="220">
    <source media="(prefers-color-scheme: dark)" srcset=".github/static/logo-light.png" width="220">
    <img src=".github/static/logo.png" width="220">
  </picture>
  <h1>Algolia WooCommerce</h1>
  <img src="https://img.shields.io/github/package-json/v/gzeta-adv/algolia-woocommerce?style=flat&color=white">
  <a href="https://github.com/gzeta-adv/algolia-woocommerce/actions/workflows/sync.yml">
    <img src="https://github.com/gzeta-adv/algolia-woocommerce/actions/workflows/sync.yml/badge.svg" />
  </a>
  <a href="https://github.com/gzeta-adv/algolia-woocommerce/actions/workflows/code-quality.yml">
    <img src="https://github.com/gzeta-adv/algolia-woocommerce/actions/workflows/code-quality.yml/badge.svg" />
  </a>
</div>

GitHub Actions based utilities to manage and synchronize products between WooCommerce, WordPress and Algolia.

## Prerequisites

You must download and activate the Node.js version specified [here](.node-version).

Copy the `.env.example` file to `.env` and fill in the necessary environment variables.

## Setup

Clone the project or use it [as a template](https://github.com/new?template_name=algolia-woocommerce&template_owner=gzeta-adv):

```sh
gh repo clone gzeta-adv/algolia-woocommerce
# or
git clone https://github.com/gzeta-adv/algolia-woocommerce.git
```

Activate pnpm using corepack, install the dependencies and build the project:

```sh
corepack enable
corepack install
pnpm install
pnpm build
```

## Actions

Each action can be run with either:

```sh
# In production mode with node
pnpm action <action-name>

# In development mode with tsx
pnpm action:dev <action-name>
```

### Available Actions

#### `sync`

Syncs all products and categories between WooCommerce, WordPress and Algolia.

#### `sync-categories`

Syncs all categories between WooCommerce and Algolia.

#### `sync-menu-items`

Syncs all menu items between WordPress and Algolia.

#### `sync-products`

Syncs all products between WooCommerce and Algolia.

### Triggers

The [`sync` workflow](.github/workflows/sync.yml) is configured to run every 5 minutes, which is the GitHub limit for scheduled workflows.

Every workflow can also be triggered:

- With a `workflow_dispatch` event via the GitHub interface
- With a `repository_dispatch` event via the GitHub API:

  ```sh
  curl --request POST \
    --url 'https://api.github.com/repos/<repo>/dispatches' \
    --header 'authorization: Bearer <GITHUB_ACCESS_TOKEN>' \
    --data '{ "event_type": "<workflow-name>" }'
  ```
