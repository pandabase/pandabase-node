import { AxiosInstance } from "axios";

import { ApiResponse, PaginationQuerystring } from "../types/common";

import {
  CreateWebhookRequestBody,
  CreateWebhookResponse,
  DeleteWebhookResponse,
  ListWebhookResponse,
  RetrieveWebhookResponse,
  UpdateWebhookRequestBody,
  UpdateWebhookResponse,
} from "../types/webhooks";

import { formatUrlParams } from "../utils/formatURLParam";

export function webhookOperations(api: AxiosInstance, shopId: string) {
  const baseUrl = `/shops/${shopId}/webhooks`;

  return {
    list: async (querystring?: PaginationQuerystring) => {
      const url = formatUrlParams(baseUrl, {
        page: querystring?.page,
        page_size: querystring?.page_size,
      });

      const response = await api.get<ApiResponse<ListWebhookResponse>>(url);
      return response.data.payload;
    },

    retrieve: async (id: string) => {
      const response = await api.get<ApiResponse<RetrieveWebhookResponse>>(
        `${baseUrl}/${id}`
      );

      return response.data.payload;
    },
    create: async (body: CreateWebhookRequestBody) => {
      const response = await api.post<ApiResponse<CreateWebhookResponse>>(
        baseUrl,
        body
      );

      return response.data.payload;
    },
    update: async (id: string, body: UpdateWebhookRequestBody) => {
      const response = await api.put<ApiResponse<UpdateWebhookResponse>>(
        `${baseUrl}/${id}`,
        body
      );

      return response.data.payload;
    },
    delete: async (id: string) => {
      const response = await api.delete<ApiResponse<DeleteWebhookResponse>>(
        `${baseUrl}/${id}`
      );

      return response.data.payload;
    },
  };
}
