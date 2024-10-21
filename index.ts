import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";

import { createShopClient } from "./client/shopClient";
import { PRODUCTION_BASE_URL, SANDBOX_BASE_URL } from "./constants";
import { ApiErrorResponse, PandabaseOptions } from "./types/common";

export class PandabaseException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PandabaseException";
    Object.setPrototypeOf(this, PandabaseException.prototype);
  }
}

export default class Pandabase {
  private readonly secret: string;
  private readonly axiosInstance: AxiosInstance;
  private readonly idempotencyEnabled: boolean;
  private readonly maxRetries: number;

  constructor(secret: string, options?: PandabaseOptions) {
    this.secret = secret;
    this.idempotencyEnabled = options?.idempotency_enabled ?? true;
    this.maxRetries = options?.max_retries ?? 3;

    this.axiosInstance = axios.create({
      baseURL: options?.sandbox ? SANDBOX_BASE_URL : PRODUCTION_BASE_URL,
      headers: {
        Authorization: `Bearer ${this.secret}`,
      },
    });

    this.axiosInstance.interceptors.request.use(
      this.requestInterceptor.bind(this)
    );
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      this.responseErrorInterceptor.bind(this)
    );
  }

  private requestInterceptor(config: InternalAxiosRequestConfig) {
    const method = config.method?.toUpperCase() ?? "";

    if (["POST", "PATCH", "PUT"].includes(method)) {
      config.headers = config.headers || {};
      config.headers["Content-Type"] = "application/json";

      if (this.idempotencyEnabled && !config.headers["Idempotency-Key"]) {
        config.headers["Idempotency-Key"] = crypto.randomUUID();
      }
    }

    return config;
  }

  private async responseErrorInterceptor(error: AxiosError) {
    if (!error.response) {
      return Promise.reject(
        new PandabaseException("A network error has occurred.")
      );
    }

    const { status, headers } = error.response;
    const config = error.config as InternalAxiosRequestConfig & {
      _retry?: number;
    };

    if (status === 429 && (config._retry ?? 0) < this.maxRetries) {
      config._retry = (config._retry ?? 0) + 1;

      const retryAfter = parseInt(headers["retry-after"] as string, 10) || 1;
      const jitter = Math.random() * 1000;
      const delay = Math.pow(2, config._retry) * 1000 + jitter;

      await new Promise((resolve) =>
        setTimeout(resolve, Math.max(retryAfter * 1000, delay))
      );

      return this.axiosInstance(config);
    }

    const { message } = error.response.data as ApiErrorResponse;
    return Promise.reject(new PandabaseException(message));
  }

  public shops(shopId: string) {
    return createShopClient(this.axiosInstance, shopId);
  }
}
