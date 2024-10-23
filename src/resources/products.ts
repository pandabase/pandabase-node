import { AxiosInstance } from "axios";

import { ApiResponse, PaginationQuerystring } from "../types/common";

import {
  CreateProductRequestBody,
  CreateProductResponse,
  DeleteProductResponse,
  ListProductResponse,
  RetrieveProductResponse,
  UpdateProductRequestBody,
  UpdateProductResponse,
} from "../types/products";

import { formatUrlParams } from "../utils/formatURLParam";

export function productOperations(api: AxiosInstance, shopId: string) {
  const baseUrl = `/shops/${shopId}/products`;

  return {
    list: async (querystring?: PaginationQuerystring) => {
      const url = formatUrlParams(baseUrl, {
        page: querystring?.page,
        page_size: querystring?.page_size,
      });

      const response = await api.get<ApiResponse<ListProductResponse>>(url);
      return response.data.payload;
    },
    retrieve: async (id: string) => {
      const response = await api.get<ApiResponse<RetrieveProductResponse>>(
        baseUrl + "/" + id
      );

      return response.data.payload;
    },
    retrieveByHandle: async (handle: string) => {
      const response = await api.get<ApiResponse<RetrieveProductResponse>>(
        baseUrl + "/slug/" + handle
      );

      return response.data.payload;
    },
    create: async (body: CreateProductRequestBody) => {
      const response = await api.post<ApiResponse<CreateProductResponse>>(
        baseUrl,
        body
      );

      return response.data.payload;
    },
    update: async (id: string, body: UpdateProductRequestBody) => {
      const response = await api.patch<ApiResponse<UpdateProductResponse>>(
        baseUrl + "/" + id,
        body
      );

      return response.data.payload;
    },
    delete: async (id: string) => {
      const response = await api.delete<ApiResponse<DeleteProductResponse>>(
        baseUrl + "/" + id
      );

      return response.data.payload;
    },
  };
}
