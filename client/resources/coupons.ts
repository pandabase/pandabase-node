import { AxiosInstance } from "axios";

import { ApiResponse } from "../../types/common";

import {
  CreateCouponRequestBody,
  CreateCouponResponse,
  DeleteCouponResponse,
  ListCouponResponse,
  RetrieveCouponResponse,
  UpdateCouponRequestBody,
  UpdateCouponResponse,
} from "../../types/resources/coupon";

export function couponOperations(api: AxiosInstance, shopId: string) {
  const baseUrl = `/shops/${shopId}/coupons`;

  return {
    list: async () => {
      const response = await api.get<ApiResponse<ListCouponResponse>>(baseUrl);

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
    update: async (id: string, data: UpdateCouponRequestBody) => {
      const response = await api.put<ApiResponse<UpdateCouponResponse>>(
        `${baseUrl}/${id}`,
        data
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
