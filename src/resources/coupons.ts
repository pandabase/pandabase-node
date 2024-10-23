import { AxiosInstance } from "axios";

import { ApiResponse, PaginationQuerystring } from "../types/common";

import {
  CreateCouponRequestBody,
  CreateCouponResponse,
  DeleteCouponResponse,
  ListCouponResponse,
  RetrieveCouponResponse,
  UpdateCouponRequestBody,
  UpdateCouponResponse,
} from "../types/coupons";

import { formatUrlParams } from "../utils/formatURLParam";

export function couponOperations(api: AxiosInstance, shopId: string) {
  const baseUrl = `/shops/${shopId}/coupons`;

  return {
    list: async (querystring?: PaginationQuerystring) => {
      const url = formatUrlParams(baseUrl, {
        page: querystring?.page,
        page_size: querystring?.page_size,
      });

      const response = await api.get<ApiResponse<ListCouponResponse>>(url);
      return response.data.payload;
    },

    retrieve: async (id: string) => {
      const response = await api.get<ApiResponse<RetrieveCouponResponse>>(
        `${baseUrl}/${id}`
      );

      return response.data.payload;
    },
    create: async (body: CreateCouponRequestBody) => {
      const response = await api.post<ApiResponse<CreateCouponResponse>>(
        baseUrl,
        body
      );

      return response.data.payload;
    },
    update: async (id: string, body: UpdateCouponRequestBody) => {
      const response = await api.put<ApiResponse<UpdateCouponResponse>>(
        `${baseUrl}/${id}`,
        body
      );

      return response.data.payload;
    },
    delete: async (id: string) => {
      const response = await api.delete<ApiResponse<DeleteCouponResponse>>(
        `${baseUrl}/${id}`
      );

      return response.data.payload;
    },
  };
}
