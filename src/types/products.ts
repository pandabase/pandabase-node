import { BaseCategoryData } from "./categories";
import { PaginatedResponse } from "./common";

import { BaseFileData } from "./files";

// @type Union Types

export type ProductType =
  | "SERIAL"
  | "ONE_TIME"
  | "LICENSE"
  | "SERVICE"
  | "DOWNLOADABLE"
  | "SUBSCRIPTION";

export type ProductCurrency = "USD" | "EUR" | "GBP";

export type BillingFrequency = "WEEKLY" | "MONTHLY" | "YEARLY";

// @type Base Type

export type BaseProductData = {
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
};

export type ExtendedBaseProductData = BaseProductData &
  (
    | { type: "SERIAL"; serial_count: number }
    | { type: Exclude<ProductType, "SERIAL"> }
  );

export type BaseProductMessageData = {
  id: string;
  title: string;
  content: string;
};

export type BaseProductSerialData = {
  id: string;
  encrypted_value: string;
  value: string;
};

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
}

export interface UpdateProductRequestBody
  extends Partial<CreateProductRequestBody> {
  images?: string[];
}

export interface UpdateProductSerialKeysRequest {
  serials: string[];
}

export interface UpdateProductMessageRequest {
  message: Pick<BaseProductMessageData, "title" | "content">;
}

export interface UpdateProductDownloadsRequest {
  downloads: string[]; // keys of File[]
}

export interface UpdateProductSubscriptionRequest {
  subscription: {
    trial_period_days: number;
    setup_fee: number;
    billing_frequency: BillingFrequency;
    metered_billing: {
      is_enabled: boolean;
      unit_name: string;
      unit_price: number;
    };
  };
}

// unavailable in api level
export interface UpdateProductVariantsRequest {}

// @type Responses

export type ListProductResponse = PaginatedResponse<
  "products",
  (ExtendedBaseProductData & { images: BaseFileData[]; categories: string[] })[]
>;

export type RetrieveProductResponse = {
  product: BaseProductData & {
    images: BaseFileData[];
    categories: Pick<BaseCategoryData, "id" | "handle" | "name">[];
  };
};

export type CreateProductResponse = { product: ExtendedBaseProductData };

export type UpdateProductResponse = {
  product: Pick<ExtendedBaseProductData, "id">;
};

export type DeleteProductResponse = {
  product: Pick<ExtendedBaseProductData, "id">;
};

export type RetrieveProductSerialKeysResponse = {
  product: {
    serials: Pick<BaseProductSerialData, "id" | "value">[];
  };
};

export type UpdateProductSerialKeysResponse = {
  product: { serials: number };
};

export type RetrieveProductMessageResponse = {
  product: { message: BaseProductMessageData };
};

export type UpdateProductMessageResponse = {
  product: { message: Pick<BaseProductMessageData, "id"> };
};

export type RetrieveProductDownloadsResponse = {};

export type UpdateProductDownloadsResponse = {};

export type RetrieveProductSubscriptionResponse = {};

export type UpdateProductSubscriptionResponse = {};

export type RetrieveProductVariantsResponse = {};

export type UpdateProductVariantsResponse = {};
