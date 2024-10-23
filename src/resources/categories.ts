import { AxiosInstance } from "axios";

import { ApiResponse, PaginationQuerystring } from "../types/common";

import {
  CreateCategoryRequestBody,
  CreateCategoryResponse,
  DeleteCategoryResponse,
  ListCategoryResponse,
  RetrieveCategoryResponse,
  UpdateCategoryRequestBody,
  UpdateCategoryResponse,
} from "../types/categories";

import { formatUrlParams } from "../utils/formatURLParam";

export function categoryOperations(api: AxiosInstance, shopId: string) {
  const baseUrl = `/shops/${shopId}/categories`;

  return {
    list: async (querystring?: PaginationQuerystring) => {
      const url = formatUrlParams(baseUrl, {
        page: querystring?.page,
        page_size: querystring?.page_size,
      });

      const response = await api.get<ApiResponse<ListCategoryResponse>>(url);
      return response.data.payload;
    },
    retrieve: async (id: string) => {
      const response = await api.get<ApiResponse<RetrieveCategoryResponse>>(
        `${baseUrl}/${id}`
      );

      return response.data.payload;
    },
    retrieveByHandle: async (handle: string) => {
      const response = await api.get<ApiResponse<RetrieveCategoryResponse>>(
        `${baseUrl}/slug/${handle}`
      );

      return response.data.payload;
    },
    create: async (body: CreateCategoryRequestBody) => {
      const response = await api.post<ApiResponse<CreateCategoryResponse>>(
        baseUrl,
        body
      );

      return response.data.payload;
    },
    update: async (id: string, body: UpdateCategoryRequestBody) => {
      const response = await api.patch<ApiResponse<UpdateCategoryResponse>>(
        baseUrl,
        body
      );

      return response.data.payload;
    },
    delete: async (id: string) => {
      const response = await api.delete<ApiResponse<DeleteCategoryResponse>>(
        baseUrl + "/" + id
      );

      return response.data.payload;
    },
  };
}
