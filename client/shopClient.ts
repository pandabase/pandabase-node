import { AxiosInstance } from "axios";
import { ShopClient } from "../types";

export function createShopClient(
  api: AxiosInstance,
  shopId: string,
  publicKey: string
): ShopClient {
  return {
    analytics: {
      retrieve: async () => {
        return {};
      },
      group_by: async (options: { type: string[]; days?: number }) => {
        return {};
      },
    },
    blacklists: {
      list: async () => {
        return {};
      },
      retrieve: async (id: string) => {
        return {};
      },
      create: async (id: string, data: any) => {
        return {};
      },
      update: async (id: string, data: any) => {
        return {};
      },
      delete: async (id: string) => {
        return {};
      },
      purge_all: async () => {
        return {};
      },
    },
    coupons: {
      list: async () => {
        return {};
      },
      retrieve: async (id: string) => {
        return {};
      },
      create: async (id: string, data: any) => {
        return {};
      },
      update: async (id: string, data: any) => {
        return {};
      },
      delete: async (id: string) => {
        return {};
      },
    },
    orders: {
      list: async () => {
        const response = await api.get(`/shops/${shopId}/orders`, {
          headers: { "Pandabase-Publishable-Key": publicKey },
        });
        return response.data;
      },
      retrieve: async (id: string) => {
        const response = await api.get(`/shops/${shopId}/orders/${id}`, {
          headers: { "Pandabase-Publishable-Key": publicKey },
        });
        return response.data;
      },
    },
  };
}
