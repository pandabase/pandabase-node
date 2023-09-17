# Pandabase Node.js Library

The Pandabase Node library provides convenient access to the Pandabase API from applications written in server-side JavaScript.

## Requirements

- Node / Bun.

## Installation

Install the package with:

```
npm install @pandabase/node
# or
yarn add @pandabase/node
# or
pnpm add @pandabase/node
# or
bun add @pandabase/node
```

## Available resources and methods

- `user`

  - `get()`

- `shop`

  - `get(id)`

- `customer`

  - `list()`
  - `get(id)`
  - `create({data})`
  - `update({id, data})`
  - `delete(id)`

- `product`

  - `list()`
  - `get(id)`
  - `create({data})`
  - `update({id, data})`
  - `delete(id)`

- `transaction`

  - `get(id)`
  - `create({data})`
