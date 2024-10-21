import { AxiosInstance } from "axios";

import {
  ListShopResponse,
  RetrieveFlagsResponse,
  RetrieveShopResponse,
} from "../types/resources/shop";

import { ApiResponse } from "../types/common";
import { couponOperations } from "./resources/coupons";

export function createShopClient(api: AxiosInstance, shopId: string) {
  return {
    coupons: couponOperations(api, shopId),
    retrieve: async () => {
      const shop = await api.get<ApiResponse<RetrieveShopResponse>>(
        `/shops/${shopId}`
      );
      const flags = await api.get<ApiResponse<RetrieveFlagsResponse>>(
        `/shops/${shopId}/flags`
      );

      return {
        ...shop.data.payload,
        flags: flags.data.payload,
      };
    },
    list: async () => {
      const response = await api.get<ApiResponse<ListShopResponse>>(`/shops`);

      return response.data.payload.shops;
    },
  };
}
