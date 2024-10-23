import { AxiosInstance } from "axios";

import {
  ListShopResponse,
  RetrieveFlagsResponse,
  RetrieveShopResponse,
} from "./types/shops";

import { ApiResponse } from "./types/common";

import { blacklistOperations } from "./resources/blacklists";
import { categoryOperations } from "./resources/categories";
import { couponOperations } from "./resources/coupons";
import { productOperations } from "./resources/products";
import { webhookOperations } from "./resources/webhooks";

export function createShopClient(api: AxiosInstance, shopId: string) {
  return {
    products: productOperations(api, shopId),
    coupons: couponOperations(api, shopId),
    categories: categoryOperations(api, shopId),
    webhooks: webhookOperations(api, shopId),
    blacklists: blacklistOperations(api, shopId),
    retrieve: async () => {
      const shopResponse = await api.get<ApiResponse<RetrieveShopResponse>>(
        `/shops/${shopId}`
      );
      const shopFlagsResponse = await api.get<
        ApiResponse<RetrieveFlagsResponse>
      >(`/shops/${shopId}/flags`);

      return {
        ...shopResponse.data.payload.shop,
        flags: shopFlagsResponse.data.payload.flags,
      };
    },
    list: async () => {
      const response = await api.get<ApiResponse<ListShopResponse>>(`/shops`);

      return response.data.payload.shops;
    },
  };
}
