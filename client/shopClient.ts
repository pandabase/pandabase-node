import { AxiosInstance } from "axios";

import { Shop } from "../types/global";
import { couponOperations } from "./resources/coupons";

export function createShopClient(api: AxiosInstance, shopId: string) {
  return {
    coupons: couponOperations(api, shopId),
    retrieve: async (): Promise<Shop> => {
      const shop = await api.get<{ payload: any }>(`/shops/${shopId}`);
      const flags = await api.get<{ payload: any }>(`/shops/${shopId}/flags`);

      return {
        ...shop.data.payload.shop,
        flags: flags.data.payload.flags,
      };
    },
    list: async () => {
      const response = await api.get<{ payload: any }>(`/shops`);

      return response.data.payload;
    },
  };
}
