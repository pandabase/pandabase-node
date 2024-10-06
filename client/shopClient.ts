import { AxiosInstance } from "axios";

import { couponOperations } from "./resources/coupons";

export function createShopClient(api: AxiosInstance, shopId: string) {
  return {
    coupons: couponOperations(api, shopId),
  };
}
