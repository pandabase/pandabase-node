export interface PandabaseOptions {
  idempotency_enabled?: boolean;
  base_url?: string;
  max_retries: number;
}

export interface PaginationMeta {
  current_page: number;
  page_size: number;
  total_items: number;
  total_pages: number;
  next_page_url: string | null;
  previous_page_url: string | null;
  first_page_url: string;
  last_page_url: string;
}

export type Shop = {
  id: string;
  icon: string | null;
  title: string;
  description: string;
  category: string;
  statement_descriptor: string | null;
  customer_support_email: string | null;
  plan: string;
  type: string;
  handle: string;
  balance: number;
  total_sales: number;
  total_revenue: number;
  terms: string | null;
  privacy_policy: string | null;
  refund_policy: string | null;
  links: string[];
  banners: string[];
  flags: {
    id: string;
    payment_methods: string[];
    storefront_enabled: boolean;
    custom_domain: boolean;
    stripe_connect: boolean;
    is_verified: boolean;
    is_blocked: boolean;
    is_under_review: boolean;
    dispute_protection: boolean;
    is_high_risk: boolean;
    mor_mode: boolean;
    statement_descriptor: string | null;
    customer_support_email: string | null;
    cname_record: string | null;
    timezone: string;
    stripe_connect_id: string | null;
    taxes_enabled: boolean;
    carts_enabled: boolean;
    categories_enabled: boolean;
    blacklists_enabled: boolean;
    payments_enabled: boolean;
    plan: string;
    type: string;
  };
};

type CouponType = "PERCENTAGE" | "FIXED";

export interface Coupon {
  id: string;
  name: string;
  code: string;
  type: CouponType;
  value: number;
  limit: number;
  limit_enabled: boolean;
  enabled: boolean;
  times_used: number;
  created_at: string;
}

export interface CreateCoupon {
  name: string;
  type: CouponType;
  code: string;
  value: number;
  limit: number;
  limited: boolean;
}

export interface CouponListResponse {
  coupons: Coupon[];
  meta: PaginationMeta;
}
