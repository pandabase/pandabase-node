import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  AxiosResponseHeaders,
  InternalAxiosRequestConfig,
  RawAxiosResponseHeaders,
} from "axios";
import { v4 as uuidv4 } from "uuid";

import { createShopClient } from "./src/shopClient";
import { ApiErrorResponse, PandabaseOptions } from "./src/types/common";

interface RateLimitInfo {
  limit: number;
  remaining: number;
  reset: number;
}

export class PandabaseException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PandabaseException";
    Object.setPrototypeOf(this, PandabaseException.prototype);
  }
}

const PRODUCTION_BASE_URL: string = "https://api.pandabase.io";
const SANDBOX_BASE_URL: string = "https://api.sandbox.pandabase.io";

export default class Pandabase {
  private readonly secret: string;
  private readonly axiosInstance: AxiosInstance;
  private readonly idempotencyEnabled: boolean;
  private readonly maxRetries: number;
  private readonly maxRetryDelay: number;
  private readonly baseRetryDelay: number;
  private rateLimitInfo: RateLimitInfo | null = null;

  constructor(secret: string, options?: PandabaseOptions) {
    this.secret = secret;
    this.idempotencyEnabled = options?.idempotency_enabled ?? true;
    this.maxRetries = options?.retries?.max_retries ?? 3;
    this.maxRetryDelay = options?.retries?.max_delay ?? 32000;
    this.baseRetryDelay = options?.retries?.base_delay ?? 1000;

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
      this.responseSuccessInterceptor.bind(this),
      this.responseErrorInterceptor.bind(this)
    );
  }

  private getHeaderValue(
    headers: RawAxiosResponseHeaders | AxiosResponseHeaders,
    key: string
  ): string {
    const value = headers[key.toLowerCase()];
    if (Array.isArray(value)) {
      return value[0] || "";
    }
    return value?.toString() || "";
  }

  private updateRateLimitInfo(
    headers: RawAxiosResponseHeaders | AxiosResponseHeaders
  ) {
    this.rateLimitInfo = {
      limit:
        parseInt(this.getHeaderValue(headers, "x-ratelimit-limit"), 10) || 0,
      remaining:
        parseInt(this.getHeaderValue(headers, "x-ratelimit-remaining"), 10) ||
        0,
      reset:
        parseInt(this.getHeaderValue(headers, "x-ratelimit-reset"), 10) || 0,
    };
  }

  private calculateRetryDelay(retryCount: number): number {
    const exponentialDelay = Math.min(
      Math.pow(2, retryCount) * this.baseRetryDelay,
      this.maxRetryDelay
    );
    const jitter = Math.random() * (this.baseRetryDelay / 2);
    return exponentialDelay + jitter;
  }

  private async waitForRateLimit(): Promise<void> {
    if (!this.rateLimitInfo || this.rateLimitInfo.remaining > 0) {
      return;
    }

    const now = Math.floor(Date.now() / 1000);
    const waitTime = Math.max(0, this.rateLimitInfo.reset - now) * 1000;

    if (waitTime > 0) {
      await new Promise((resolve) => setTimeout(resolve, waitTime + 100));
    }
  }

  private requestInterceptor(config: InternalAxiosRequestConfig) {
    const method = config.method?.toUpperCase() ?? "";

    if (["POST", "PATCH", "PUT"].includes(method)) {
      config.headers = config.headers || {};
      config.headers["Content-Type"] = "application/json";

      if (this.idempotencyEnabled && !config.headers["Idempotency-Key"]) {
        const idempotencyKey = uuidv4();
        config.headers["Idempotency-Key"] = idempotencyKey;
      }
    }

    return config;
  }

  private responseSuccessInterceptor(response: AxiosResponse) {
    this.updateRateLimitInfo(response.headers);
    return response;
  }

  private async responseErrorInterceptor(error: AxiosError) {
    if (!error.response) {
      return Promise.reject(
        new PandabaseException("A network error has occurred.")
      );
    }

    const { status, headers } = error.response;
    this.updateRateLimitInfo(headers);

    const config = error.config as InternalAxiosRequestConfig & {
      _retry?: number;
    };

    if (status === 429 && (config._retry ?? 0) < this.maxRetries) {
      config._retry = (config._retry ?? 0) + 1;

      let delay: number;

      if (this.rateLimitInfo?.reset) {
        const now = Math.floor(Date.now() / 1000);
        delay = Math.max(0, (this.rateLimitInfo.reset - now) * 1000);
      } else {
        delay = this.calculateRetryDelay(config._retry);
      }

      await new Promise((resolve) => setTimeout(resolve, delay));
      await this.waitForRateLimit();

      return this.axiosInstance(config);
    }

    const { message } = error.response.data as ApiErrorResponse;
    return Promise.reject(new PandabaseException(message));
  }

  public getRateLimitInfo(): RateLimitInfo | null {
    return this.rateLimitInfo;
  }

  public async shops(shopId: string) {
    await this.waitForRateLimit();
    return createShopClient(this.axiosInstance, shopId);
  }
}
