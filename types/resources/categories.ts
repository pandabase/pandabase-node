import { PaginatedResponse } from "../common";

// BASE

type BaseCategoryData = {};

// REQUEST

export interface CreateCategoryRequestBody {}

export interface UpdateCategoryRequestBody {}

// RESPONSES

export type ListProductResponse = PaginatedResponse<
  "categories",
  BaseCategoryData[]
>;

export type RetrieveProductResponse = {
  product: BaseCategoryData;
};

export type CreateCategoryResponse = { product: BaseCategoryData };

export type UpdateCategoryResponse = { product: BaseCategoryData };

export type DeleteCategoryResponse = { product: { id: string } };
