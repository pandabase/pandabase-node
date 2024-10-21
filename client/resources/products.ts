import { AxiosInstance } from "axios";

import { ApiResponse, PaginationQuerystring } from "../../types/common";

import { ListProductResponse } from "../../types/resources/product";

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
  };
}
