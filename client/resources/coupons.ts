import { AxiosInstance } from "axios";

import { Coupon, CouponListResponse, CreateCoupon } from "../../types/global";

export function couponOperations(api: AxiosInstance, shopId: string) {
  const baseUrl = `/shops/${shopId}/coupons`;

  return {
    list: async (): Promise<CouponListResponse> => {
      const response = await api.get<{ payload: CouponListResponse }>(baseUrl);

      return response.data.payload;
    },
    retrieve: async (id: string) => {
      const response = await api.get<{ payload: Coupon }>(`${baseUrl}/${id}`);

      return response.data.payload;
    },
    create: async (data: CreateCoupon) => {
      const response = await api.post<{ payload: Coupon }>(baseUrl, data);

      return response.data.payload;
    },
    update: async (id: string, data: Partial<CreateCoupon>) => {
      const response = await api.put<{ payload: Coupon }>(
        `${baseUrl}/${id}`,
        data
      );

      return response.data.payload;
    },
    delete: async (id: string) => {
      const response = await api.delete<{ payload: Coupon }>(
        `${baseUrl}/${id}`
      );

      return response.data.payload;
    },
  };
}
