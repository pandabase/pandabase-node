# Pandabase Node.js Library

The Pandabase Node library provides convenient access to the Pandabase API from applications written in server-side JavaScript.

## Requirements

- Node / Bun.

## Installation

Install the package with:

```sh
npm install @pandabase/node
# or
yarn add @pandabase/node
# or
pnpm add @pandabase/node
# or
bun add @pandabase/node
```

## Usage

For complete details on the library's methods and signatures, please refer to our documentation: [TypeScript SDK Documentation](https://docs.pandabase.io/developers/sdks/typescript).

```ts
import Pandabase from "@pandabase/node";

const pandabase = new Pandabase(process.env.PANDABASE_SECRET_KEY);

// Retrieve the shop
const shop = await pandabase.shops(process.env.PANDABASE_SHOP_ID).retrieve();

// List coupons
const coupons = await pandabase
  .shops(process.env.PANDABASE_SHOP_ID)
  .coupons.list();

console.log(shop, coupons);
```
