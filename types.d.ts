export type HttpMethodType = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type BaseErrorType = {
  message: string;
  statusCode: number;
};

export interface PandabaseOptions {
  idempotency_enabled?: boolean;
  base_url?: string;
}

export interface PayoutsMethods {
  list: () => Promise<any>;
  retrive: (id: string) => Promise<any>;
  create: (id: string, amount: number, method_id: string) => Promise<any>;
}

export interface ShopClient {
  analytics?: AnalyticsMethods;
  blacklists?: BlacklistsMethods;
  coupons?: CouponsMethods;
  disputes?: DisputesMethods;
  files?: FilesMethods;
  orders?: OrdersMethods;
  payments?: PaymentsMethods;
  products?: ProductsMethods;
  refunds?: RefundsMethods;
  reviews?: ReviewsMethods;
  settings?: SettingsMethods;
  taxes?: TaxesMethods;
  teams?: TeamsMethods;
  tokens?: TokensMethods;
  webhooks?: WebhooksMethods;
}

interface AnalyticsMethods {
  retrieve: () => Promise<any>;
  group_by: (options: { type: string[]; days?: number }) => Promise<any>;
}

interface BlacklistsMethods {
  list: () => Promise<any>;
  retrieve: (id: string) => Promise<any>;
  create: (id: string, data: any) => Promise<any>;
  update: (id: string, data: any) => Promise<any>;
  delete: (id: string) => Promise<any>;
  purge_all: () => Promise<any>;
}

interface CouponsMethods {
  list: () => Promise<any>;
  retrieve: (id: string) => Promise<any>;
  create: (id: string, data: any) => Promise<any>;
  update: (id: string, data: any) => Promise<any>;
  delete: (id: string) => Promise<any>;
}

interface DisputesMethods {
  list: () => Promise<any>;
  retrieve: (id: string) => Promise<any>;
  respond: (id: string, data: any) => Promise<any>;
}

interface FilesMethods {
  list: () => Promise<any>;
  retrieve: (id: string) => Promise<any>;
}

interface OrdersMethods {
  list: () => Promise<any>;
  retrieve: (id: string) => Promise<any>;
}

interface PaymentsMethods {
  retrieve: (id: string) => Promise<any>;
  create: (data: any) => Promise<any>;
}

interface ProductsMethods {
  list: () => Promise<any>;
  retrieve: (id: string) => Promise<any>;
  create: (id: string, data: any) => Promise<any>;
  update: (id: string, data: any) => Promise<any>;
  delete: (id: string) => Promise<any>;
  purge_all: () => Promise<any>;
}

interface RefundsMethods {
  list: () => Promise<any>;
  retrieve: (id: string) => Promise<any>;
  create: (id: string, data: any) => Promise<any>;
}

interface ReviewsMethods {
  list: () => Promise<any>;
  retrieve: (id: string) => Promise<any>;
  update: (id: string, data: any) => Promise<any>;
}

interface SettingsMethods {
  retrieve: () => Promise<any>;
  update: (data: any) => Promise<any>;
}

interface TaxesMethods {
  list: () => Promise<any>;
}

interface TeamsMethods {
  list: () => Promise<any>;
  retrieve: (id: string) => Promise<any>;
  create: (data: any) => Promise<any>;
  update: (id: string, data: any) => Promise<any>;
  delete: (id: string) => Promise<any>;
}

interface TokensMethods {
  list: () => Promise<any>;
  retrieve: (id: string) => Promise<any>;
  create: (data: any) => Promise<any>;
  update: (id: string, data: any) => Promise<any>;
  delete: (id: string) => Promise<any>;
}

interface WebhooksMethods {
  list: () => Promise<any>;
  retrieve: (id: string) => Promise<any>;
  create: (data: any) => Promise<any>;
  update: (id: string, data: any) => Promise<any>;
  delete: (id: string) => Promise<any>;
}
