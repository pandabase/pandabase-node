import { PaginatedResponse } from "./common";

// @type Base Type

export type BaseCategoryData = {
  id: string;
  name: string;
  handle: string;
  created_at: string;
  updated_at: string;
};

// @type Requests

export interface CreateCategoryRequestBody {
  name: string;
  handle: string;
  products?: string[];
}

export interface UpdateCategoryRequestBody
  extends Partial<CreateCategoryRequestBody> {}

// @type Responses

export type ListCategoryResponse = PaginatedResponse<
  "categories",
  BaseCategoryData[]
>;

export type RetrieveCategoryResponse = {
  category: BaseCategoryData;
};

export type CreateCategoryResponse = { category: BaseCategoryData };

export type UpdateCategoryResponse = { category: BaseCategoryData };

export type DeleteCategoryResponse = { category: { id: string } };
