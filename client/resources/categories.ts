import { AxiosInstance } from "axios";

import { ApiResponse, PaginationQuerystring } from "../../types/common";

import { formatUrlParams } from "../utils/formatURLParam";

export function categoryOperations(api: AxiosInstance, shopId: string) {
  const baseUrl = `/shops/${shopId}/categories`;

  return {
    list: async (querystring?: PaginationQuerystring) => {},
    retrieve: async (id: string) => {},
    retrieveByHandle: async (handle: string) => {},
    create: async () => {},
    update: async (id: string) => {},
    delete: async (id: string) => {},
  };
}
