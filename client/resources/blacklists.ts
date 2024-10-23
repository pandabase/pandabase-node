import { AxiosInstance } from "axios";

import { ApiResponse, PaginationQuerystring } from "../../types/common";

import {
  CreateBlacklistRequestBody,
  CreateBlacklistResponse,
  DeleteBlacklistResponse,
  ListBlacklistResponse,
  RetrieveBlacklistResponse,
  UpdateBlacklistRequestBody,
  UpdateBlacklistResponse,
} from "../../types/blacklists";

import { formatUrlParams } from "../../utils/formatURLParam";

export function blacklistOperations(api: AxiosInstance, shopId: string) {
  const baseUrl = `/shops/${shopId}/blacklists`;

  return {
    list: async (querystring?: PaginationQuerystring) => {
      const url = formatUrlParams(baseUrl, {
        page: querystring?.page,
        page_size: querystring?.page_size,
      });

      const response = await api.get<ApiResponse<ListBlacklistResponse>>(url);
      return response.data.payload;
    },

    retrieve: async (id: string) => {
      const response = await api.get<ApiResponse<RetrieveBlacklistResponse>>(
        `${baseUrl}/${id}`
      );

      return response.data.payload;
    },
    create: async (body: CreateBlacklistRequestBody) => {
      const response = await api.post<ApiResponse<CreateBlacklistResponse>>(
        baseUrl,
        body
      );

      return response.data.payload;
    },
    update: async (id: string, body: UpdateBlacklistRequestBody) => {
      const response = await api.put<ApiResponse<UpdateBlacklistResponse>>(
        `${baseUrl}/${id}`,
        body
      );

      return response.data.payload;
    },
    delete: async (id: string) => {
      const response = await api.delete<ApiResponse<DeleteBlacklistResponse>>(
        `${baseUrl}/${id}`
      );

      return response.data.payload;
    },
  };
}
