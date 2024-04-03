import axios, { AxiosResponse, AxiosInstance } from "axios";
import { createShopClient } from "./client/shopClient";
import { PANDABASE_BASE_URL } from "./constants";
import {
  ShopClient,
  HttpMethodType,
  BaseErrorType,
  PayoutsMethods,
  PandabaseOptions,
} from "./types";

export default class Pandabase {
  private secret: string;
  private idempotencyKey?: string;
  private axiosInstance: AxiosInstance;

  public payouts: PayoutsMethods;

  constructor(secret: string, options?: PandabaseOptions) {
    this.secret = secret;
    this.idempotencyKey = options?.idempotency_enabled
      ? this.generateUUID()
      : undefined;

    this.axiosInstance = axios.create({
      baseURL: options?.base_url || PANDABASE_BASE_URL,
      headers: {
        Authorization: `Bearer ${this.secret}`,
      },
    });

    this.payouts = {
      list: this.listPayouts.bind(this),
      retrive: this.retrivePayout.bind(this),
      create: this.createPayout.bind(this),
    };
  }

  private generateUUID(): string {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0,
          v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  protected async makeRequest<T>(
    method: HttpMethodType,
    path: string,
    data?: Record<string, any>
  ): Promise<T> {
    try {
      const url = `${path}`;
      const headers = {
        ...(this.idempotencyKey && { "Idempotency-Key": this.idempotencyKey }),
      };
      const response: AxiosResponse<T> = await this.axiosInstance({
        method,
        url,
        data,
        headers,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const APIError = {
          statusCode: error.response?.status || 500,
          message: error.response?.data?.message || error.message,
        };

        throw APIError as BaseErrorType;
      } else {
        throw error;
      }
    }
  }

  private async listPayouts(): Promise<any> {
    return await this.makeRequest<any>("GET", "/payouts");
  }

  private async createPayout(
    id: string,
    amount: number,
    method_id: string
  ): Promise<any> {
    return await this.makeRequest<any>("POST", `/payouts/${id}`, {
      method_id,
      amount,
    });
  }

  private async retrivePayout(id: string): Promise<any> {
    return await this.makeRequest<any>("GET", `/payouts/${id}`);
  }

  public newShopClient(shopId: string, publishableKey: string): ShopClient {
    return createShopClient(this.axiosInstance, shopId, publishableKey);
  }
}