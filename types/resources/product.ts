import { PaginatedResponse } from "../common";

import { BaseFile } from "./file";

// Union Types
type ProductType =
  | "SERIAL"
  | "ONE_TIME"
  | "LICENSE"
  | "SERVICE"
  | "DOWNLOADABLE"
  | "SUBSCRIPTION";

type ProductCurrency = "USD" | "EUR" | "GBP";

// Base

type BaseProductData = {
  id: string;
  title: string;
  subtitle: string;
  handle: string;
  description: string;
  price: number;
  type: ProductType;
  in_stock: boolean;
  is_draft: boolean;
  is_archived: boolean;
  created_at: string;
  updated_at: string;
  images: BaseFile[];
};

// EXTENDED

type ExtendedProductData = BaseProductData &
  (
    | { type: "SERIAL"; serial_count: number }
    | { type: Exclude<ProductType, "SERIAL"> }
  );

// REQUEST

export interface CreateProductRequestBody {
  title: string;
  subtitle: string;
  description: string;
  handle: string;
  price: number;
  currency: ProductCurrency;
  type: ProductType;
  in_stock?: boolean;
  is_draft?: boolean;
  is_archived?: boolean;
  categories?: string[];
}

export interface UpdateProductRequestBody
  extends Partial<CreateProductRequestBody> {
  images?: string[];
}

export interface CreateProductSerialKeysRequest {}

export interface UpdateProductSerialKeysRequest {}

export interface CreateProductMessageRequest {}

export interface UpdateProductMessageRequest {}

export interface CreateProductDownloadsRequest {}

export interface UpdateProductDownloadsRequest {}

export interface CreateProductSubscriptionRequest {}

export interface UpdateProductSubscriptionRequest {}

export interface CreateProductVariantsRequest {}

export interface UpdateProductVariantsRequest {}

// Response

export type ListProductResponse = PaginatedResponse<
  "products",
  ExtendedProductData[]
>;

export type RetrieveProductResponse = {
  product: BaseProductData;
};

export type CreateProductResponse = { product: ExtendedProductData };

export type UpdateProductResponse = { product: ExtendedProductData };

export type DeleteProductResponse = { product: { id: string } };

export type RetrieveProductSerialKeysResponse = {};

export type UpdateProductSerialKeysResponse = {};

export type RetrieveProductMessageResponse = {};

export type UpdateProductMessageResponse = {};

export type RetrieveProductDownloadsResponse = {};

export type UpdateProductDownloadsResponse = {};

export type RetrieveProductSubscriptionResponse = {};

export type UpdateProductSubscriptionResponse = {};

export type RetrieveProductVariantsResponse = {};

export type UpdateProductVariantsResponse = {};
